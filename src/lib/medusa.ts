/**
 * Lightweight Medusa Store API client using fetch.
 * Avoids @medusajs/js-sdk which has ESM compatibility issues with Vite.
 */

const MEDUSA_BACKEND_URL =
  import.meta.env.VITE_MEDUSA_BACKEND_URL ||
  (typeof process !== "undefined" ? process.env.MEDUSA_BACKEND_URL : "") ||
  "http://localhost:9000";

const MEDUSA_PUBLISHABLE_KEY =
  import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY ||
  (typeof process !== "undefined" ? process.env.MEDUSA_PUBLISHABLE_KEY : "") ||
  "";

export const MEDUSA_REGION_ID =
  import.meta.env.VITE_MEDUSA_REGION_ID ||
  (typeof process !== "undefined" ? process.env.MEDUSA_REGION_ID : "") ||
  "";

async function medusaFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${MEDUSA_BACKEND_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(MEDUSA_PUBLISHABLE_KEY
      ? { "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY }
      : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Medusa API ${res.status}: ${body}`);
  }

  return res.json();
}

function qs(params: Record<string, any>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
}

// --- Products ---

export async function listProducts(params: {
  limit?: number;
  offset?: number;
  region_id?: string;
  fields?: string;
  handle?: string;
} = {}) {
  const query = qs(params);
  return medusaFetch<{ products: any[]; count: number }>(`/store/products${query}`);
}

export async function retrieveProduct(id: string, params: { region_id?: string; fields?: string } = {}) {
  const query = qs(params);
  return medusaFetch<{ product: any }>(`/store/products/${id}${query}`);
}

// --- Categories ---

export async function listCategories(params: { limit?: number; offset?: number } = {}) {
  const query = qs(params);
  return medusaFetch<{ product_categories: any[] }>(`/store/product-categories${query}`);
}

// --- Cart ---

export async function createCart(body: { region_id?: string }) {
  return medusaFetch<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function retrieveCart(cartId: string) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}`);
}

export async function updateCart(cartId: string, body: Record<string, any>) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function addLineItem(cartId: string, body: { variant_id: string; quantity: number }) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateLineItem(cartId: string, lineItemId: string, body: { quantity: number }) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function deleteLineItem(cartId: string, lineItemId: string) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "DELETE",
  });
}

export async function completeCart(cartId: string) {
  return medusaFetch<{ type: "order" | "cart"; order?: any; cart?: any; error?: any }>(
    `/store/carts/${cartId}/complete`,
    { method: "POST" }
  );
}

// --- Shipping ---

export async function listShippingOptions(cartId: string) {
  const query = qs({ cart_id: cartId });
  return medusaFetch<{ shipping_options: any[] }>(`/store/shipping-options${query}`);
}

export async function addShippingMethod(cartId: string, body: { option_id: string }) {
  return medusaFetch<{ cart: any }>(`/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// --- Payment ---

export async function listPaymentProviders(regionId: string) {
  const query = qs({ region_id: regionId });
  return medusaFetch<{ payment_providers: any[] }>(`/store/payment-providers${query}`);
}

export async function initiatePaymentSession(
  paymentCollectionId: string,
  body: { provider_id: string }
) {
  return medusaFetch<{ payment_collection: any }>(
    `/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    { method: "POST", body: JSON.stringify(body) }
  );
}
