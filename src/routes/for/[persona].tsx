import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A, useParams } from "@solidjs/router";
import { For, Show, createMemo } from "solid-js";
import NotFoundPage from "~/components/common/NotFoundPage";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { getPersonaBySlug, personas } from "~/data/for-data";
import { siteMeta } from "~/data/site";

export default function PersonaPage() {
  const params = useParams();
  const persona = createMemo(() => params.persona ? getPersonaBySlug(params.persona) : undefined);

  const otherPersonas = createMemo(() =>
    personas.filter(p => p.slug !== params.persona).slice(0, 3)
  );

  return (
    <Show when={persona()} fallback={
      <>
        <Title>{siteMeta.titleTemplate("Not Found")}</Title>
        <NotFoundPage />
      </>
    }>
      {p => (
        <>
          <Title>{siteMeta.titleTemplate(`${p().title} — Who Is It For`)}</Title>
          <Meta name="description" content={p().description} />

          <div class="min-h-screen pt-24 pb-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal>
                <A href="/for" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
                  <Icon icon="lucide:arrow-left" class="text-base" />
                  Who Is It For
                </A>
              </Reveal>

              {/* Hero */}
              <section class="mb-20">
                <Reveal>
                  <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800">
                    <div class="grid lg:grid-cols-2 gap-0 items-stretch">
                      <div class="relative min-h-[280px] lg:min-h-[400px] overflow-hidden">
                        <img
                          src={p().heroImage}
                          alt={p().title}
                          class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800 hidden lg:block" />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent lg:hidden" />
                      </div>
                      <div class="relative flex items-center p-8 md:p-10">
                        <div>
                          <div class={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] mb-6 ${p().accent === "primary" ? "border-primary/30 bg-primary/10 text-primary" : "border-secondary/30 bg-secondary/10 text-secondary"}`}>
                            <Icon icon={p().icon} class="text-sm" />
                            {p().shortTitle}
                          </div>
                          <h1 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary leading-tight mb-4">
                            {p().tagline}
                          </h1>
                          <p class="text-lg text-text-secondary leading-relaxed mb-8">
                            {p().description}
                          </p>
                          <div class="flex flex-wrap gap-4">
                            <A href={p().cta.primary.href} class="inline-flex">
                              <Button type="button" size="lg">
                                {p().cta.primary.label}
                              </Button>
                            </A>
                            <A href={p().cta.secondary.href} class="inline-flex">
                              <Button type="button" variant="outline" size="lg">
                                {p().cta.secondary.label}
                              </Button>
                            </A>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Benefits */}
              <section class="mb-20">
                <SectionHeader
                  title="What You Get"
                  subtitle={`How Base42 supports ${p().shortTitle.toLowerCase()}.`}
                />
                <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <For each={p().benefits}>
                    {(benefit, index) => (
                      <Reveal delay={index() * 80}>
                        <div class="rounded-2xl border border-border bg-dark-800 p-6 h-full transition-colors hover:border-primary/40">
                          <div class={`flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shrink-0 ${p().accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                            <Icon icon={benefit.icon} class="text-2xl" />
                          </div>
                          <h3 class="text-xl font-display font-bold text-text-primary mb-3">{benefit.title}</h3>
                          <p class="text-text-secondary leading-relaxed">{benefit.description}</p>
                        </div>
                      </Reveal>
                    )}
                  </For>
                </div>
              </section>

              {/* Activities */}
              <section class="mb-20">
                <SectionHeader
                  title="What Happens Here"
                  subtitle="Real activities, real formats, real results."
                />
                <div class="grid gap-6 md:grid-cols-2">
                  <For each={p().activities}>
                    {(activity, index) => (
                      <Reveal delay={index() * 100}>
                        <div class="rounded-2xl border border-border bg-dark-800 p-6 h-full">
                          <div class="flex items-start gap-4">
                            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-dark-700 text-primary font-mono font-bold text-sm">
                              {String(index() + 1).padStart(2, "0")}
                            </div>
                            <div>
                              <h3 class="text-lg font-display font-bold text-text-primary mb-2">{activity.title}</h3>
                              <p class="text-text-secondary leading-relaxed">{activity.description}</p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </For>
                </div>
              </section>

              {/* Quote */}
              <Show when={p().quote}>
                {quote => (
                  <section class="mb-20">
                    <Reveal>
                      <div class="relative py-12">
                        <div class={`absolute inset-0 rounded-2xl ${p().accent === "primary" ? "bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" : "bg-gradient-to-r from-secondary/5 via-transparent to-primary/5"}`} />
                        <blockquote class="relative text-center px-8">
                          <span class="text-6xl text-primary/20 font-serif absolute top-0 left-8">"</span>
                          <p class="text-2xl md:text-3xl font-display text-text-primary max-w-4xl mx-auto leading-relaxed">
                            {quote().text}
                          </p>
                          <footer class="mt-6 text-text-muted">— {quote().author}</footer>
                        </blockquote>
                      </div>
                    </Reveal>
                  </section>
                )}
              </Show>

              {/* FAQ */}
              <section class="mb-20">
                <SectionHeader title="FAQ" subtitle="Practical answers for common questions." />
                <div class="grid gap-6 md:grid-cols-2">
                  <For each={p().faqs}>
                    {(faq, index) => (
                      <Reveal delay={index() * 80}>
                        <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                          <div class="flex items-start gap-4">
                            <div class="flex items-center justify-center w-11 h-11 rounded-2xl bg-dark-700 text-secondary shrink-0">
                              <Icon icon="lucide:message-circle-question" class="text-xl" />
                            </div>
                            <div>
                              <h3 class="text-lg font-display font-bold text-text-primary mb-3">{faq.question}</h3>
                              <p class="text-text-secondary leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </For>
                </div>
              </section>

              {/* Explore other personas */}
              <section class="mb-20">
                <SectionHeader
                  title="Explore Other Use Cases"
                  subtitle="Base42 works differently for every community."
                />
                <div class="grid gap-6 md:grid-cols-3">
                  <For each={otherPersonas()}>
                    {(other, index) => (
                      <Reveal delay={index() * 80}>
                        <A href={`/for/${other.slug}`} class="group block h-full">
                          <div class="rounded-2xl border border-border bg-dark-800 p-6 h-full flex flex-col transition-colors hover:border-primary/40">
                            <div class={`flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shrink-0 ${other.accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                              <Icon icon={other.icon} class="text-2xl" />
                            </div>
                            <h3 class="text-lg font-display font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                              {other.title}
                            </h3>
                            <p class="text-sm text-text-muted mb-4 flex-1">{other.tagline}</p>
                            <div class="flex items-center gap-2 text-sm font-semibold text-primary">
                              Learn more
                              <Icon icon="lucide:arrow-right" class="text-base group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </A>
                      </Reveal>
                    )}
                  </For>
                </div>
              </section>

              {/* CTA */}
              <section class="mb-20">
                <Reveal>
                  <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12 text-center">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_top,rgba(255,214,10,0.12),transparent_42%)]" />
                    <div class="relative max-w-3xl mx-auto">
                      <h2 class="text-3xl md:text-5xl font-display font-bold text-text-primary mb-5">
                        Ready to <span class="text-gradient">get started</span>?
                      </h2>
                      <p class="text-lg text-text-secondary leading-relaxed mb-8">
                        Reach out, visit the space, or just show up at the next event.
                        Base42 is open to anyone who wants to be part of something.
                      </p>
                      <div class="flex flex-wrap justify-center gap-4">
                        <A href={p().cta.primary.href} class="inline-flex">
                          <Button type="button" size="lg">
                            {p().cta.primary.label}
                          </Button>
                        </A>
                        <a href="mailto:hello@42.mk" class="inline-flex">
                          <Button type="button" variant="outline" size="lg">
                            <Icon icon="lucide:mail" class="text-lg" />
                            Contact Us
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>
            </div>
          </div>
        </>
      )}
    </Show>
  );
}
