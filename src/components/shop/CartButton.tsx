import { Icon } from "@iconify-icon/solid";
import { Show } from "solid-js";
import { cart } from "~/lib/cart";

export default function CartButton() {
  return (
    <button
      class="relative p-2 text-text-secondary hover:text-primary transition-colors"
      onClick={() => cart.setIsOpen(true)}
      aria-label="Open cart"
    >
      <Icon icon="lucide:shopping-cart" class="text-xl" />
      <Show when={cart.totalItems() > 0}>
        <span class="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-dark-900 text-[10px] font-bold flex items-center justify-center">
          {cart.totalItems()}
        </span>
      </Show>
    </button>
  );
}
