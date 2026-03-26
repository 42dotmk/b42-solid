import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A, createAsync, useSearchParams } from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";
import Reveal from "~/components/common/Reveal";
import CartButton from "~/components/shop/CartButton";
import ProductCard from "~/components/shop/ProductCard";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";
import { getShopPageData } from "~/lib/shop-queries";
import { cn } from "~/lib/utils";

export default function ShopPage() {
  const data = createAsync(() => getShopPageData());
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = createSignal<string | null>(null);

  const filteredProducts = () => {
    const products = data()?.products ?? [];
    const cat = activeCategory();
    return cat ? products.filter(p => p.category === cat) : products;
  };

  const formatPrice = (amount: number, currency: string = "eur") => {
    const value = amount / 100;
    const symbol = currency === "eur" ? "\u20AC" : currency.toUpperCase() + " ";
    return `${symbol}${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
  };

  return (
    <>
      <Title>{siteMeta.titleTemplate("Shop")}</Title>
      <Meta
        name="description"
        content="Base42 merch and gear. Tees, hoodies, stickers, and hacker accessories."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-12">
            <Reveal>
              <div class="flex items-center justify-between mb-8">
                <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                  <Icon icon="lucide:arrow-left" class="w-4 h-4" />
                  Back to Home
                </A>
                <CartButton />
              </div>
            </Reveal>

            <SectionHeader title="Shop" subtitle="Gear up with Base42 merch and hacker accessories" />
          </div>

          {/* Mission banner */}
          <Reveal>
            <div class="mb-12 p-6 sm:p-8 rounded-2xl bg-dark-800 border border-border relative overflow-hidden">
              <div class="absolute inset-0 gradient-radial opacity-30 pointer-events-none" />
              <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Icon icon="lucide:heart" class="text-2xl text-primary" />
                </div>
                <div>
                  <h3 class="font-display font-semibold text-text-primary mb-1">Every purchase supports the community</h3>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Base42 is a non-profit hackerspace. All proceeds go directly toward keeping the space running,
                    funding community events, and supporting the meetup groups and open-source projects that call Base42 home.
                    When you grab some merch, you're helping builders, hackers, and curious minds keep doing what they do.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Status messages */}
          <Show when={searchParams.status === "success"}>
            <Reveal>
              <div class="mb-8 p-4 rounded-xl bg-success/10 border border-success/30 text-success text-center">
                <Icon icon="lucide:check-circle" class="text-xl inline mr-2" />
                Payment successful! Your order is confirmed.
              </div>
            </Reveal>
          </Show>
          <Show when={searchParams.status === "cancelled"}>
            <Reveal>
              <div class="mb-8 p-4 rounded-xl bg-warning/10 border border-warning/30 text-warning text-center">
                <Icon icon="lucide:alert-circle" class="text-xl inline mr-2" />
                Checkout was cancelled. Your cart is still saved.
              </div>
            </Reveal>
          </Show>

          <Show when={data()}>
            {pageData => (
              <>
                {/* Category filters */}
                <Show when={pageData().categories.length > 1}>
                  <Reveal>
                    <div class="flex flex-wrap gap-2 mb-8">
                      <button
                        class={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          activeCategory() === null
                            ? "bg-primary text-dark-900"
                            : "bg-dark-700 text-text-secondary hover:text-primary border border-border hover:border-primary/50"
                        )}
                        onClick={() => setActiveCategory(null)}
                      >
                        All
                      </button>
                      <For each={pageData().categories}>
                        {category => (
                          <button
                            class={cn(
                              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                              activeCategory() === category
                                ? "bg-primary text-dark-900"
                                : "bg-dark-700 text-text-secondary hover:text-primary border border-border hover:border-primary/50"
                            )}
                            onClick={() => setActiveCategory(category)}
                          >
                            {category}
                          </button>
                        )}
                      </For>
                    </div>
                  </Reveal>
                </Show>

                {/* Product grid */}
                <Show
                  when={filteredProducts().length > 0}
                  fallback={
                    <Reveal>
                      <div class="text-center py-16 px-4 rounded-2xl bg-dark-800 border border-border">
                        <p class="text-text-secondary text-lg mb-2">No products found.</p>
                        <p class="text-text-muted">Check back soon for new drops.</p>
                      </div>
                    </Reveal>
                  }
                >
                  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <For each={filteredProducts()}>
                      {(product, index) => (
                        <Reveal delay={index() * 80}>
                          <ProductCard product={product} />
                        </Reveal>
                      )}
                    </For>
                  </div>
                </Show>
              </>
            )}
          </Show>

          {/* Shipping & info */}
          <Reveal>
            <section class="mt-20">
              <h2 class="text-2xl font-display font-semibold text-text-primary mb-8">Shipping & Info</h2>
              <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="p-5 rounded-xl bg-dark-800 border border-border space-y-2">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon icon="lucide:map-pin" class="text-lg text-secondary" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary">Local Pickup</h3>
                  </div>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Free pickup from Base42 at Rimska 25, Skopje. We'll ping you on Discord or email when your order is ready.
                    Usually same-day if you order before an event.
                  </p>
                </div>

                <div class="p-5 rounded-xl bg-dark-800 border border-border space-y-2">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon icon="lucide:truck" class="text-lg text-secondary" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary">Domestic Shipping</h3>
                  </div>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Flat rate of <span class="text-primary font-mono font-medium">€3</span> anywhere in North Macedonia.
                    Orders ship within 2-3 business days via standard post. Tracking number provided.
                  </p>
                </div>

                <div class="p-5 rounded-xl bg-dark-800 border border-border space-y-2">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon icon="lucide:globe" class="text-lg text-secondary" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary">International</h3>
                  </div>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    We ship to the EU and Balkans for <span class="text-primary font-mono font-medium">€7</span>.
                    Delivery takes 5-10 business days. For other regions, reach out on Discord and we'll figure it out.
                  </p>
                </div>
              </div>

              <div class="mt-6 grid sm:grid-cols-2 gap-6">
                <div class="p-5 rounded-xl bg-dark-800 border border-border space-y-2">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon icon="lucide:refresh-ccw" class="text-lg text-secondary" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary">Returns & Exchanges</h3>
                  </div>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Wrong size? Something arrived damaged? Contact us within 14 days and we'll sort it out.
                    Stickers and pins are final sale. Apparel can be exchanged for a different size if available.
                  </p>
                </div>

                <div class="p-5 rounded-xl bg-dark-800 border border-border space-y-2">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Icon icon="lucide:message-square" class="text-lg text-secondary" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary">Questions?</h3>
                  </div>
                  <p class="text-text-secondary text-sm leading-relaxed">
                    Hit us up on <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary-hover underline underline-offset-2">Discord</a> or
                    email <a href="mailto:[email protected]" class="text-primary hover:text-primary-hover underline underline-offset-2">[email protected]</a>.
                    We're happy to help with sizing, bulk orders for your meetup group, or custom requests.
                  </p>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </>
  );
}
