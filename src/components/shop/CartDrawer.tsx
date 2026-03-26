import { Icon } from "@iconify-icon/solid";
import { For, Show, createSignal, onCleanup, onMount } from "solid-js";
import Button from "~/components/ui/Button";
import { cart } from "~/lib/cart";
import { initiateCheckout, completeCheckoutCart } from "~/lib/checkout";
import { getProductImageUrl } from "~/lib/shop-api";
import { cn } from "~/lib/utils";

function formatPrice(amount: number, currency: string) {
  const value = amount / 100;
  const symbol = currency === "eur" ? "\u20AC" : currency.toUpperCase() + " ";
  return `${symbol}${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}

export default function CartDrawer() {
  const [checkoutLoading, setCheckoutLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") cart.setIsOpen(false);
  }

  onMount(() => {
    cart.loadCart();
    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => document.removeEventListener("keydown", handleKeyDown));
  });

  async function handleCheckout() {
    setCheckoutLoading(true);
    setError("");

    const cid = cart.cartId();
    if (!cid) {
      setError("Cart is empty");
      setCheckoutLoading(false);
      return;
    }

    try {
      // For now, use a simple email prompt. In a full implementation,
      // this would be a checkout form component.
      const email = window.prompt("Enter your email for the order:");
      if (!email) {
        setCheckoutLoading(false);
        return;
      }

      const result = await initiateCheckout(cid, email);

      if (result.error) {
        setError(result.error);
      } else if (result.clientSecret) {
        // With Stripe payment intent, we need to complete the payment.
        // For the initial integration, redirect to a payment confirmation.
        // A full Stripe Elements integration can be added later.
        const completeResult = await completeCheckoutCart(cid);
        if (completeResult.error) {
          setError(completeResult.error);
        } else {
          cart.resetCart();
          cart.setIsOpen(false);
          window.location.href = "/shop?status=success";
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        class={cn(
          "fixed inset-0 z-50 bg-dark-900/70 backdrop-blur-sm transition-opacity duration-300",
          cart.isOpen() ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => cart.setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        class={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-dark-800 border-l border-border shadow-2xl transition-transform duration-300 flex flex-col",
          cart.isOpen() ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div class="flex items-center justify-between p-5 border-b border-border">
          <h2 class="text-lg font-display font-semibold text-text-primary flex items-center gap-2">
            <Icon icon="lucide:shopping-cart" class="text-primary" />
            Cart
            <Show when={cart.totalItems() > 0}>
              <span class="text-xs font-mono bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                {cart.totalItems()}
              </span>
            </Show>
          </h2>
          <button
            class="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-dark-700"
            onClick={() => cart.setIsOpen(false)}
            aria-label="Close cart"
          >
            <Icon icon="lucide:x" class="text-xl" />
          </button>
        </div>

        {/* Items */}
        <div class="flex-1 overflow-y-auto p-5">
          <Show
            when={cart.items.length > 0}
            fallback={
              <div class="flex flex-col items-center justify-center h-full text-center">
                <Icon icon="lucide:shopping-bag" class="text-5xl text-text-muted/30 mb-4" />
                <p class="text-text-secondary font-medium mb-1">Your cart is empty</p>
                <p class="text-text-muted text-sm">Add some gear to get started.</p>
              </div>
            }
          >
            <div class="space-y-4">
              <For each={cart.items}>
                {item => (
                  <div class="flex gap-4 p-3 rounded-lg bg-dark-700 border border-border">
                    <div class="w-16 h-16 rounded-md overflow-hidden bg-dark-600 shrink-0">
                      <img
                        src={getProductImageUrl(item.thumbnail)}
                        alt={item.title}
                        class="w-full h-full object-cover"
                      />
                    </div>

                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-text-primary text-sm truncate">
                        {item.title}
                      </h4>
                      <p class="text-primary font-mono text-sm">
                        {formatPrice(item.price, item.currencyCode)}
                      </p>

                      <div class="flex items-center gap-2 mt-2">
                        <button
                          class="w-6 h-6 rounded bg-dark-600 text-text-secondary hover:text-primary hover:bg-dark-500 transition-colors flex items-center justify-center text-sm"
                          onClick={() => cart.updateQuantity(item.lineItemId, item.quantity - 1)}
                          disabled={cart.loading()}
                        >
                          <Icon icon="lucide:minus" />
                        </button>
                        <span class="text-text-primary font-mono text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          class="w-6 h-6 rounded bg-dark-600 text-text-secondary hover:text-primary hover:bg-dark-500 transition-colors flex items-center justify-center text-sm"
                          onClick={() => cart.updateQuantity(item.lineItemId, item.quantity + 1)}
                          disabled={cart.loading() || item.quantity >= item.stock}
                        >
                          <Icon icon="lucide:plus" />
                        </button>
                        <button
                          class="ml-auto text-text-muted hover:text-error transition-colors"
                          onClick={() => cart.removeItem(item.lineItemId)}
                          disabled={cart.loading()}
                          aria-label={`Remove ${item.title}`}
                        >
                          <Icon icon="lucide:trash-2" class="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>

        {/* Footer */}
        <Show when={cart.items.length > 0}>
          <div class="border-t border-border p-5 space-y-4">
            <Show when={error()}>
              <div class="p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
                {error()}
              </div>
            </Show>

            <div class="flex items-center gap-2 text-xs text-text-muted">
              <Icon icon="lucide:truck" class="text-sm text-secondary shrink-0" />
              <span>Free local pickup &middot; From &euro;3 shipping</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-text-secondary font-medium">Subtotal</span>
              <span class="text-xl font-display font-bold text-text-primary">
                {formatPrice(cart.totalPrice(), cart.items[0]?.currencyCode ?? "eur")}
              </span>
            </div>
            <p class="text-xs text-text-muted">Shipping calculated at checkout</p>

            <Button
              variant="primary"
              size="lg"
              class="w-full"
              onClick={handleCheckout}
              disabled={checkoutLoading() || cart.loading()}
            >
              <Show when={checkoutLoading()} fallback={
                <>
                  <Icon icon="lucide:credit-card" class="text-base" />
                  Checkout
                </>
              }>
                <Icon icon="lucide:loader-2" class="text-base animate-spin" />
                Processing...
              </Show>
            </Button>

            <button
              class="w-full text-center text-sm text-text-muted hover:text-error transition-colors"
              onClick={() => cart.clearCart()}
              disabled={cart.loading()}
            >
              Clear cart
            </button>
          </div>
        </Show>
      </div>
    </>
  );
}
