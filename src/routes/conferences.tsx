import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const conferences = [
  {
    name: "WhatTheStack",
    tagline: "The modern builders' conference.",
    description:
      "WhatTheStack is Base42's community-powered developer conference focused on modern web, cloud platforms, and practical software engineering for teams shipping real products.",
    url: "https://wts.sh",
    icon: "lucide:layers",
    accent: "primary",
    accentClass: "text-primary",
    glowClass: "from-primary/18 via-primary/8 to-transparent",
    ringClass: "border-primary/20",
    stats: [
      { label: "Focus", value: "Web · Cloud · Software" },
      { label: "Format", value: "Talks, panels, hallway track" },
      { label: "Built by", value: "Base42 community" },
    ],
  },
  {
    name: "UXPlore",
    tagline: "Where product taste meets user empathy.",
    description:
      "UXPlore brings together designers, researchers, and product thinkers around user experience, product design, and design thinking with a distinctly Macedonian community perspective.",
    url: "https://uxplore.mk",
    icon: "lucide:palette",
    accent: "secondary",
    accentClass: "text-secondary",
    glowClass: "from-secondary/18 via-secondary/8 to-transparent",
    ringClass: "border-secondary/20",
    stats: [
      { label: "Focus", value: "UX · Product · Design systems" },
      { label: "Energy", value: "Case studies and critique" },
      { label: "Audience", value: "Designers and product teams" },
    ],
  },
  {
    name: "Blockchain Skopje",
    tagline: "Deep dives into decentralized systems.",
    description:
      "Blockchain Skopje opens up serious conversations around blockchain infrastructure, Web3 ecosystems, and decentralized systems for developers, founders, and the crypto-curious.",
    url: "https://blockchainskopje.com",
    icon: "lucide:link",
    accent: "primary",
    accentClass: "text-primary/85",
    glowClass: "from-primary/12 via-secondary/10 to-transparent",
    ringClass: "border-primary/15",
    stats: [
      { label: "Focus", value: "Blockchain · Web3 · Protocols" },
      { label: "Topics", value: "Infra, ecosystems, trust" },
      { label: "Vibe", value: "Technical, future-facing" },
    ],
  },
] as const;

const involvementOptions = [
  {
    title: "Submit a talk",
    description: "Bring a hard-earned lesson, live demo, or sharp opinion that can move the local scene forward.",
    icon: "lucide:mic",
  },
  {
    title: "Volunteer",
    description: "Help with stage flow, guest experience, production, community care, and all the invisible details.",
    icon: "lucide:heart-handshake",
  },
  {
    title: "Sponsor",
    description: "Back independent tech culture in Skopje and help more practitioners share their work publicly.",
    icon: "lucide:handshake",
  },
  {
    title: "Attend",
    description: "Show up, ask great questions, meet people building ambitious things, and keep the momentum alive.",
    icon: "lucide:ticket",
  },
] as const;

export default function ConferencesPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Conferences")}</Title>
      <Meta
        name="description"
        content="Explore the conferences launched through Base42 in Skopje, from developer and UX events to blockchain gatherings across Macedonia."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
              <Icon icon="lucide:arrow-left" class="text-base" />
              Back to Home
            </A>
          </Reveal>

          <section class="mb-20">
            <div class="grid gap-8 lg:grid-cols-2 items-start">
              <Reveal>
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.32em] text-primary mb-4">Base42 conferences</p>
                  <h1 class="text-4xl md:text-6xl font-display font-bold text-text-primary leading-tight mb-6">
                    Conferences as a <span class="text-gradient">launchpad</span> for Macedonia's tech communities.
                  </h1>
                  <p class="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                    Base42 helps ideas evolve into full-scale conference experiences in Skopje. We create space for
                    developers, designers, and emerging technology communities to gather, publish their thinking, and
                    make Macedonia's tech scene feel louder, sharper, and more connected.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 md:p-8 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/10" />
                  <div class="relative space-y-6">
                    <div class="grid grid-cols-2 gap-6">
                      <div class="rounded-xl bg-dark-700 border border-border p-4">
                        <div class="text-3xl font-display font-bold text-primary">3</div>
                        <div class="text-sm text-text-muted mt-1">flagship conferences</div>
                      </div>
                      <div class="rounded-xl bg-dark-700 border border-border p-4">
                        <div class="text-3xl font-display font-bold text-secondary">1</div>
                        <div class="text-sm text-text-muted mt-1">community backbone</div>
                      </div>
                    </div>
                    <div class="rounded-xl bg-dark-700 border border-border p-6">
                      <p class="text-sm uppercase tracking-[0.3em] text-text-muted mb-3">What makes it memorable</p>
                      <p class="text-text-primary leading-relaxed">
                        Every conference carries a different voice, but the same Base42 instinct: practical knowledge,
                        warm community energy, and a local scene confident enough to host world-class conversations.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Featured Conferences"
              subtitle="Three distinct formats, three different communities, one shared mission to elevate the regional ecosystem."
            />

            <div class="space-y-8">
              <For each={conferences}>
                {(conference, index) => (
                  <Reveal delay={index() * 120}>
                    <article class={`rounded-2xl bg-dark-800 border border-border ${conference.ringClass} p-6 md:p-8 relative overflow-hidden`}>
                      <div class={`absolute inset-0 bg-gradient-to-br ${conference.glowClass}`} />
                      <div class="relative grid gap-8 lg:grid-cols-2 lg:items-start">
                        <div>
                          <div class="flex flex-wrap items-center gap-4 mb-5">
                            <div class={`w-14 h-14 rounded-2xl bg-dark-700 border border-border flex items-center justify-center shrink-0 ${conference.accentClass}`}>
                              <Icon icon={conference.icon} class="text-3xl" />
                            </div>
                            <div>
                              <h2 class="text-3xl md:text-4xl font-display font-bold text-text-primary">{conference.name}</h2>
                              <p class={`text-sm md:text-base font-medium ${conference.accentClass}`}>{conference.tagline}</p>
                            </div>
                          </div>

                          <p class="text-lg text-text-secondary leading-relaxed max-w-3xl">{conference.description}</p>
                        </div>

                        <div class="rounded-2xl bg-dark-700 border border-border p-6">
                          <p class="text-sm uppercase tracking-[0.28em] text-text-muted mb-4">Key stats</p>
                          <div class="space-y-4 mb-6">
                            <For each={conference.stats}>
                              {stat => (
                                <div class="flex items-start justify-between gap-4 border-b border-border/70 pb-4 last:border-b-0 last:pb-0">
                                  <span class="text-sm text-text-muted">{stat.label}</span>
                                  <span class="text-right text-sm font-medium text-text-primary max-w-[14rem]">{stat.value}</span>
                                </div>
                              )}
                            </For>
                          </div>

                          <a href={conference.url} target="_blank" rel="noopener noreferrer" class="inline-flex">
                            <Button type="button" variant={conference.accent === "secondary" ? "secondary" : "primary"}>
                              <Icon icon="lucide:external-link" class="text-base" />
                              Visit conference
                            </Button>
                          </a>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Get Involved"
              subtitle="These conferences grow because people step in with ideas, labor, support, and curiosity."
            />

            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <For each={involvementOptions}>
                {(option, index) => (
                  <Reveal delay={index() * 90}>
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="w-12 h-12 rounded-xl bg-dark-700 border border-border flex items-center justify-center text-primary mb-4 shrink-0">
                        <Icon icon={option.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-xl font-display font-semibold text-text-primary mb-3">{option.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{option.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8 relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-secondary/10 via-transparent to-primary/10" />
                <div class="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.32em] text-secondary mb-4">Partner with Base42</p>
                    <h2 class="text-3xl md:text-5xl font-display font-bold text-text-primary mb-4">
                      Want to organize a <span class="text-gradient">conference with us?</span>
                    </h2>
                    <p class="text-lg text-text-secondary leading-relaxed max-w-3xl mb-6">
                      If you're building a serious community around a discipline, we can help shape the concept, host
                      the momentum, and connect it with the right people in Skopje and beyond.
                    </p>
                    <div class="space-y-2 text-text-secondary">
                      <p>
                        Email: <a href="mailto:hello@42.mk" class="text-primary hover:text-primary/80 transition-colors">hello@42.mk</a>
                      </p>
                      <p>
                        Website: <a href={siteMeta.siteUrl} target="_blank" rel="noopener noreferrer" class="text-secondary hover:text-secondary/80 transition-colors">{siteMeta.siteUrl}</a>
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row lg:flex-col gap-4">
                    <a href="mailto:hello@42.mk" class="inline-flex">
                      <Button type="button" size="lg">
                        <Icon icon="lucide:mail" class="text-lg" />
                        Start the conversation
                      </Button>
                    </a>
                    <A href="/#contact" class="inline-flex">
                      <Button type="button" variant="outline" size="lg">
                        <Icon icon="lucide:messages-square" class="text-lg" />
                        Contact Base42
                      </Button>
                    </A>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
