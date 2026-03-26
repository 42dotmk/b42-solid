#!/bin/sh
set -e

echo "Running database migrations..."
npx medusa db:migrate || true

echo "Starting Medusa server..."
npx medusa start
