import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A, createAsync, useParams } from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";
import NotFoundPage from "~/components/common/NotFoundPage";
import Reveal from "~/components/common/Reveal";
import CartButton from "~/components/shop/CartButton";
import ProductCard from "~/components/shop/ProductCard";
import Button from "~/components/ui/Button";
import { siteMeta } from "~/data/site";
import { cart } from "~/lib/cart";
import { getProductImageUrl } from "~/lib/shop-api";
import { getProductPageData } from "~/lib/shop-queries";
import { cn } from "~/lib/utils";

function formatPrice(amount: number, currency: string) {
  const value = amount / 100;
  const symbol = currency === "eur" ? "\u20AC" : currency.toUpperCase() + " ";
  return `${symbol}${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}

export default function ProductPage() {
  const params = useParams();
  const data = createAsync(() => getProductPageData(params.handle!));
  const [selectedImage, setSelectedImage] = createSignal(0);

  return (
    <>
      <Show when={data()?.product} fallback={<Title>{siteMeta.titleTemplate("Product Not Found")}</Title>}>
        {product => (
          <>
            <Title>{siteMeta.titleTemplate(product().title)}</Title>
            <Meta name="description" content={product().description || `${product().title} — Base42 merch`} />
          </>
        )}
      </Show>

      <Show when={data() !== undefined}>
        <Show when={data()} fallback={<NotFoundPage />}>
          {pageData => {
            const product = () => pageData().product;
            const related = () => pageData().related;
            const outOfStock = () => product().stock === 0;
            const lowStock = () => product().stock > 0 && product().stock <= 5;

            const allImages = () => {
              const images = product().images ?? [];
              if (images.length > 0) return images;
              const thumb = product().thumbnail;
              return thumb ? [{ url: thumb }] : [];
            };

            const currentImageUrl = () =>
              getProductImageUrl(allImages()[selectedImage()]?.url ?? product().thumbnail);

            return (
              <div class="min-h-screen pt-24 pb-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Breadcrumb */}
                  <Reveal>
                    <div class="flex items-center justify-between mb-8">
                      <A href="/shop" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                        <Icon icon="lucide:arrow-left" class="w-4 h-4" />
                        Back to Shop
                      </A>
                      <CartButton />
                    </div>
                  </Reveal>

                  {/* Product detail */}
                  <div class="grid lg:grid-cols-2 gap-10 lg:gap-14">
                    {/* Images */}
                    <Reveal>
                      <div class="space-y-4">
                        <div class="relative aspect-square rounded-2xl overflow-hidden bg-dark-800 border border-border">
                          <img
                            src={currentImageUrl()}
                            alt={product().title}
                            class="w-full h-full object-cover"
                          />
                          <Show when={product().featured}>
                            <div class="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-primary/90 text-dark-900 text-xs font-bold uppercase tracking-wider">
                              Featured
                            </div>
                          </Show>
                          <Show when={outOfStock()}>
                            <div class="absolute inset-0 bg-dark-900/60 flex items-center justify-center">
                              <span class="text-text-muted font-display font-semibold text-2xl uppercase">Sold Out</span>
                            </div>
                          </Show>
                        </div>

                        {/* Thumbnail gallery */}
                        <Show when={allImages().length > 1}>
                          <div class="flex gap-3">
                            <For each={allImages()}>
                              {(image, index) => (
                                <button
                                  class={cn(
                                    "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                                    selectedImage() === index()
                                      ? "border-primary"
                                      : "border-border hover:border-primary/50"
                                  )}
                                  onClick={() => setSelectedImage(index())}
                                >
                                  <img
                                    src={getProductImageUrl(image.url)}
                                    alt={`${product().title} ${index() + 1}`}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              )}
                            </For>
                          </div>
                        </Show>
                      </div>
                    </Reveal>

                    {/* Info */}
                    <Reveal delay={100}>
                      <div class="flex flex-col">
                        {/* Category */}
                        <Show when={product().category}>
                          <span class="text-xs text-text-muted/70 px-2.5 py-1 rounded bg-dark-700 font-medium w-fit mb-4">
                            {product().category}
                          </span>
                        </Show>

                        {/* Title + Price */}
                        <h1 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
                          {product().title}
                        </h1>

                        <span class="text-3xl text-primary font-mono font-bold mb-6">
                          {formatPrice(product().price, product().currencyCode)}
                        </span>

                        {/* Stock */}
                        <div class="flex items-center gap-2 mb-6">
                          <div
                            class={cn(
                              "w-2.5 h-2.5 rounded-full",
                              outOfStock() ? "bg-error" : lowStock() ? "bg-warning" : "bg-green-500"
                            )}
                          />
                          <span
                            class={cn(
                              "text-sm font-mono",
                              outOfStock() ? "text-error" : lowStock() ? "text-warning" : "text-text-secondary"
                            )}
                          >
                            <Show when={outOfStock()} fallback={
                              <Show when={lowStock()} fallback="In Stock">
                                Only {product().stock} left
                              </Show>
                            }>
                              Out of Stock
                            </Show>
                          </span>
                        </div>

                        {/* Description */}
                        <Show when={product().description}>
                          <p class="text-text-secondary leading-relaxed mb-8">
                            {product().description}
                          </p>
                        </Show>

                        {/* Add to cart */}
                        <Button
                          variant="primary"
                          size="lg"
                          class="w-full sm:w-auto"
                          disabled={outOfStock() || cart.loading()}
                          onClick={() => cart.addItem(product())}
                        >
                          <Show when={cart.loading()} fallback={
                            <>
                              <Icon icon="lucide:shopping-cart" class="text-base" />
                              Add to Cart
                            </>
                          }>
                            <Icon icon="lucide:loader-2" class="text-base animate-spin" />
                            Adding...
                          </Show>
                        </Button>

                        {/* Shipping info */}
                        <div class="mt-8 pt-8 border-t border-border space-y-4">
                          <div class="flex items-center gap-3 text-sm text-text-secondary">
                            <div class="p-2 rounded-lg bg-secondary/10">
                              <Icon icon="lucide:map-pin" class="text-base text-secondary" />
                            </div>
                            <span>Free local pickup at Base42, Rimska 25</span>
                          </div>
                          <div class="flex items-center gap-3 text-sm text-text-secondary">
                            <div class="p-2 rounded-lg bg-secondary/10">
                              <Icon icon="lucide:truck" class="text-base text-secondary" />
                            </div>
                            <span>Domestic shipping from <span class="text-primary font-mono">€3</span> &middot; International from <span class="text-primary font-mono">€7</span></span>
                          </div>
                          <div class="flex items-center gap-3 text-sm text-text-secondary">
                            <div class="p-2 rounded-lg bg-secondary/10">
                              <Icon icon="lucide:heart" class="text-base text-secondary" />
                            </div>
                            <span>All proceeds support the Base42 community</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {/* Related products */}
                  <Show when={related().length > 0}>
                    <Reveal>
                      <section class="mt-20">
                        <h2 class="text-2xl font-display font-semibold text-text-primary mb-8">
                          More in {product().category}
                        </h2>
                        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          <For each={related()}>
                            {(relProduct, index) => (
                              <Reveal delay={index() * 80}>
                                <ProductCard product={relProduct} />
                              </Reveal>
                            )}
                          </For>
                        </div>
                      </section>
                    </Reveal>
                  </Show>
                </div>
              </div>
            );
          }}
        </Show>
      </Show>
    </>
  );
}
