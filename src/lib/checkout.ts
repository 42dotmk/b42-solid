"use server";

/**
 * Server-side checkout functions.
 * Uses the Medusa Store API via fetch (server-to-server).
 */

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const MEDUSA_PUBLISHABLE_KEY = process.env.MEDUSA_PUBLISHABLE_KEY || "";

async function serverMedusaFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${MEDUSA_BACKEND_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(MEDUSA_PUBLISHABLE_KEY ? { "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY } : {}),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Medusa API ${res.status}: ${body}`);
  }
  return res.json();
}

/**
 * Initialize payment and return a Stripe client secret.
 */
export async function initiateCheckout(cartId: string, email: string) {
  if (!cartId) {
    return { error: "No cart found" };
  }

  try {
    // 1. Update cart with email
    await serverMedusaFetch(`/store/carts/${cartId}`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    // 2. Get available shipping options
    const { shipping_options } = await serverMedusaFetch<{ shipping_options: any[] }>(
      `/store/shipping-options?cart_id=${cartId}`
    );

    // 3. Add first available shipping method if none set
    if (shipping_options?.length) {
      const { cart: currentCart } = await serverMedusaFetch<{ cart: any }>(`/store/carts/${cartId}`);
      if (!currentCart.shipping_methods?.length) {
        await serverMedusaFetch(`/store/carts/${cartId}/shipping-methods`, {
          method: "POST",
          body: JSON.stringify({ option_id: shipping_options[0].id }),
        });
      }
    }

    // 4. Initialize Stripe payment session
    const { cart } = await serverMedusaFetch<{ cart: any }>(`/store/carts/${cartId}`);
    const paymentCollection = cart.payment_collection;

    if (!paymentCollection) {
      return { error: "Payment collection not available" };
    }

    // Find or create Stripe payment session
    let paymentSession = paymentCollection.payment_sessions?.find(
      (s: any) => s.provider_id.includes("stripe")
    );

    if (!paymentSession) {
      await serverMedusaFetch(
        `/store/payment-collections/${paymentCollection.id}/payment-sessions`,
        {
          method: "POST",
          body: JSON.stringify({ provider_id: "pp_stripe_stripe" }),
        }
      );

      const { cart: updatedCart } = await serverMedusaFetch<{ cart: any }>(`/store/carts/${cartId}`);
      paymentSession = updatedCart.payment_collection?.payment_sessions?.find(
        (s: any) => s.provider_id.includes("stripe")
      );
    }

    if (!paymentSession) {
      return { error: "Failed to create payment session" };
    }

    const clientSecret = paymentSession.data?.client_secret;
    if (!clientSecret) {
      return { error: "Payment session missing client secret" };
    }

    return { clientSecret, cartId };
  } catch (error: any) {
    console.error("Checkout error:", error);
    return { error: error?.message || "Something went wrong during checkout" };
  }
}

/**
 * Complete the cart after payment is confirmed.
 */
export async function completeCheckoutCart(cartId: string) {
  if (!cartId) {
    return { error: "No cart found" };
  }

  try {
    const result = await serverMedusaFetch<{
      type: "order" | "cart";
      order?: any;
      error?: any;
    }>(`/store/carts/${cartId}/complete`, { method: "POST" });

    if (result.type === "order") {
      return { success: true, orderId: result.order.id };
    } else {
      return { error: "Order could not be completed. Please try again." };
    }
  } catch (error: any) {
    console.error("Complete cart error:", error);
    return { error: error?.message || "Failed to complete order" };
  }
}
