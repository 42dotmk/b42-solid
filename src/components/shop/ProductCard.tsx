import { Icon } from "@iconify-icon/solid";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { Card, CardContent } from "~/components/ui/Card";
import Button from "~/components/ui/Button";
import { cart } from "~/lib/cart";
import { getProductImageUrl } from "~/lib/shop-api";
import { cn } from "~/lib/utils";
import type { Product } from "~/types/shop";

interface ProductCardProps {
  product: Product;
}

function formatPrice(amount: number, currency: string) {
  const value = amount / 100;
  const symbol = currency === "eur" ? "\u20AC" : currency.toUpperCase() + " ";
  return `${symbol}${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}

export default function ProductCard(props: ProductCardProps) {
  const imageUrl = () => getProductImageUrl(props.product.thumbnail);
  const outOfStock = () => props.product.stock === 0;
  const lowStock = () => props.product.stock > 0 && props.product.stock <= 5;

  return (
    <Card class="h-full flex flex-col group">
      <A href={`/shop/${props.product.handle}`} class="relative aspect-square overflow-hidden bg-dark-600 block">
        <img
          src={imageUrl()}
          alt={props.product.title}
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Show when={props.product.featured}>
          <div class="absolute top-3 left-3 px-2 py-1 rounded bg-primary/90 text-dark-900 text-xs font-bold uppercase tracking-wider">
            Featured
          </div>
        </Show>
        <Show when={outOfStock()}>
          <div class="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
            <span class="text-text-muted font-display font-semibold text-lg uppercase">Sold Out</span>
          </div>
        </Show>
      </A>

      <CardContent class="flex flex-col flex-1 space-y-3">
        <div class="flex items-start justify-between gap-2">
          <A href={`/shop/${props.product.handle}`} class="font-display font-semibold text-lg text-text-primary line-clamp-2 hover:text-primary transition-colors">
            {props.product.title}
          </A>
          <span class="text-primary font-mono font-bold text-lg shrink-0">
            {formatPrice(props.product.price, props.product.currencyCode)}
          </span>
        </div>

        <p class="text-sm text-text-muted line-clamp-2 flex-1">
          {props.product.description}
        </p>

        <div class="flex items-center justify-between pt-2">
          <span
            class={cn(
              "text-xs font-mono",
              outOfStock() ? "text-error" : lowStock() ? "text-warning" : "text-text-muted"
            )}
          >
            <Show when={outOfStock()} fallback={
              <Show when={lowStock()} fallback={<>In Stock</>}>
                Only {props.product.stock} left
              </Show>
            }>
              Out of Stock
            </Show>
          </span>

          <Show when={props.product.category}>
            <span class="text-xs text-text-muted/70 px-2 py-0.5 rounded bg-dark-600 font-medium">
              {props.product.category}
            </span>
          </Show>
        </div>

        <Button
          variant="primary"
          size="sm"
          class="w-full"
          disabled={outOfStock() || cart.loading()}
          onClick={() => cart.addItem(props.product)}
        >
          <Icon icon="lucide:shopping-cart" class="text-sm" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
