#!/bin/bash
#
# Medusa first-boot initialization script.
# Idempotent — safe to run multiple times.
#
# Creates: admin user, region, sales channel, stock location, publishable API key.
# Does NOT create products — manage those through the Admin UI.
#
# Usage:
#   pnpm dev:medusa:init
#   # or directly:
#   ./medusa-backend/init.sh [--medusa-url http://localhost:9000]

set -euo pipefail

MEDUSA_URL="${1:-http://localhost:9000}"
ADMIN_EMAIL="${MEDUSA_ADMIN_EMAIL:-admin@base42.mk}"
ADMIN_PASSWORD="${MEDUSA_ADMIN_PASSWORD:-admin123}"

CT="Content-Type: application/json"

# --- Helpers ---

log()  { echo -e "\033[32m[init]\033[0m $*"; }
warn() { echo -e "\033[33m[init]\033[0m $*"; }
err()  { echo -e "\033[31m[init]\033[0m $*" >&2; }

api_get() {
  curl -s -X GET "$MEDUSA_URL$1" -H "$CT" -H "Authorization: Bearer $TOKEN"
}

api_post() {
  curl -s -X POST "$MEDUSA_URL$1" -H "$CT" -H "Authorization: Bearer $TOKEN" -d "$2"
}

json_val() {
  python3 -c "import sys,json; print(json.load(sys.stdin)$1)" 2>/dev/null
}

# --- Wait for Medusa ---

log "Waiting for Medusa at $MEDUSA_URL..."
for i in $(seq 1 60); do
  if curl -sf "$MEDUSA_URL/health" > /dev/null 2>&1; then
    break
  fi
  if [ "$i" -eq 60 ]; then
    err "Medusa did not start within 5 minutes. Check container logs."
    exit 1
  fi
  sleep 5
done
log "Medusa is healthy."

# --- Create admin user ---

log "Ensuring admin user ($ADMIN_EMAIL)..."
CONTAINER="${MEDUSA_CONTAINER:-b42_medusa_dev}"
USER_OUT=$(docker exec "$CONTAINER" npx medusa user -e "$ADMIN_EMAIL" -p "$ADMIN_PASSWORD" 2>&1 || true)
if echo "$USER_OUT" | grep -q "already exists"; then
  log "Admin user already exists."
elif echo "$USER_OUT" | grep -q "created successfully"; then
  log "Admin user created."
else
  warn "Admin user creation output: $(echo "$USER_OUT" | tail -1)"
fi

# --- Authenticate ---

log "Authenticating..."
TOKEN=$(curl -s -X POST "$MEDUSA_URL/auth/user/emailpass" \
  -H "$CT" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | json_val "['token']")

if [ -z "$TOKEN" ] || [ "$TOKEN" = "None" ]; then
  err "Failed to authenticate. Check admin credentials."
  exit 1
fi
log "Authenticated."

# --- Region ---

EXISTING_REGION=$(api_get "/admin/regions" | json_val "['regions'][0]['id'] if [r for r in data.get('regions',[]) if r['currency_code']=='eur'] else ''" 2>/dev/null || echo "")

# Simpler check
REGION_ID=$(api_get "/admin/regions" | python3 -c "
import sys,json
data = json.load(sys.stdin)
for r in data.get('regions',[]):
    if r['currency_code'] == 'eur':
        print(r['id']); break
else:
    print('')
" 2>/dev/null)

if [ -n "$REGION_ID" ]; then
  log "Region already exists: $REGION_ID"
else
  log "Creating EUR region..."
  REGION_ID=$(api_post "/admin/regions" '{
    "name": "Europe",
    "currency_code": "eur",
    "countries": ["mk","de","fr","nl","at","bg","rs","hr","si","al","me"]
  }' | json_val "['region']['id']")
  log "Created region: $REGION_ID"
fi

# --- Sales Channel ---

SC_ID=$(api_get "/admin/sales-channels" | python3 -c "
import sys,json
data = json.load(sys.stdin)
for sc in data.get('sales_channels',[]):
    if sc['name'] == 'Base42 Webshop':
        print(sc['id']); break
else:
    print('')
" 2>/dev/null)

if [ -n "$SC_ID" ]; then
  log "Sales channel already exists: $SC_ID"
else
  log "Creating sales channel..."
  SC_ID=$(api_post "/admin/sales-channels" '{
    "name": "Base42 Webshop",
    "description": "Base42 hackerspace online store"
  }' | json_val "['sales_channel']['id']")
  log "Created sales channel: $SC_ID"
fi

# --- Stock Location ---

SL_ID=$(api_get "/admin/stock-locations" | python3 -c "
import sys,json
data = json.load(sys.stdin)
for sl in data.get('stock_locations',[]):
    if sl['name'] == 'Base42 HQ':
        print(sl['id']); break
else:
    print('')
" 2>/dev/null)

if [ -n "$SL_ID" ]; then
  log "Stock location already exists: $SL_ID"
else
  log "Creating stock location..."
  SL_ID=$(api_post "/admin/stock-locations" '{
    "name": "Base42 HQ",
    "address": {"address_1": "Rimska 25", "city": "Skopje", "country_code": "mk"}
  }' | json_val "['stock_location']['id']")
  log "Created stock location: $SL_ID"

  # Link stock location to sales channel
  api_post "/admin/stock-locations/$SL_ID/sales-channels" "{\"add\":[\"$SC_ID\"]}" > /dev/null
  log "Linked stock location to sales channel."
fi

# --- Publishable API Key ---

PK_TOKEN=$(api_get "/admin/api-keys" | python3 -c "
import sys,json
data = json.load(sys.stdin)
for k in data.get('api_keys',[]):
    if k.get('title') == 'Base42 Storefront' and k.get('type') == 'publishable':
        print(k['token']); break
else:
    print('')
" 2>/dev/null)

if [ -n "$PK_TOKEN" ]; then
  log "Publishable API key already exists."
else
  log "Creating publishable API key..."
  PK_RESP=$(api_post "/admin/api-keys" '{
    "title": "Base42 Storefront",
    "type": "publishable"
  }')
  PK_ID=$(echo "$PK_RESP" | json_val "['api_key']['id']")
  PK_TOKEN=$(echo "$PK_RESP" | json_val "['api_key']['token']")

  # Link API key to sales channel
  api_post "/admin/api-keys/$PK_ID/sales-channels" "{\"add\":[\"$SC_ID\"]}" > /dev/null
  log "Created and linked publishable API key."
fi

# --- Output ---

echo ""
echo "========================================"
echo "  Medusa initialization complete"
echo "========================================"
echo ""
echo "  Admin dashboard:  $MEDUSA_URL/app"
echo "  Login:            $ADMIN_EMAIL / $ADMIN_PASSWORD"
echo ""
echo "  Add to your .env (if not already set):"
echo ""
echo "  VITE_MEDUSA_PUBLISHABLE_KEY=$PK_TOKEN"
echo "  MEDUSA_PUBLISHABLE_KEY=$PK_TOKEN"
echo "  VITE_MEDUSA_REGION_ID=$REGION_ID"
echo "  MEDUSA_REGION_ID=$REGION_ID"
echo ""
echo "  Next steps:"
echo "  1. Add products via Admin UI at $MEDUSA_URL/app"
echo "  2. Restart the web app to pick up .env changes"
echo "========================================"
