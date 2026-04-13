import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

// ── Main Area highlights ──────────────────────────────────────────────
const mainAreaFeatures = [
  {
    icon: "lucide:projector",
    title: "Event Hall",
    description:
      "Up to 80 people in standard layout, around 100 using both projectors and the full L-shape of the room. Reconfigure with chairs or tables for workshops and hackathons — max capacity 120.",
  },
  {
    icon: "lucide:mic-2",
    title: "Full Stage & A/V",
    description:
      "Professional-grade audio, video equipment, and lighting. A mixer, capture cards, and everything needed to perform, present, record, or livestream any type of event.",
  },
  {
    icon: "lucide:server",
    title: "Server Rack & Mini Datacenter",
    description:
      "Two server racks on-site. The Base42 website and most related services are hosted right here. Available for all members to tinker with, learn, and use.",
  },
  {
    icon: "lucide:coffee",
    title: "Coffee Machine",
    description:
      "A vending machine serving espresso and other types of coffee — easily and on the cheap. Fuel for late-night debugging sessions and early morning hackathons.",
  },
] as const;

// ── Living Room features ──────────────────────────────────────────────
const livingRoomFeatures = [
  {
    icon: "lucide:cooking-pot",
    title: "Full Kitchen",
    description: "Microwave, tea kettle, pots, and a fridge usually stocked with beer — available to visitors if they leave a donation.",
  },
  {
    icon: "lucide:book-open",
    title: "The Bookshelf",
    description: "Divides the kitchen from the living room. Filled with books, fun gadgets, and of course a full copy of The Hitchhiker's Guide to the Galaxy.",
  },
  {
    icon: "lucide:gamepad-2",
    title: "Chill Zone",
    description: "Sofa, bean bags, a 4K TV with game consoles hooked up and ready to go. Plus a makeshift mini table — two tires and a glass on top.",
  },
] as const;

// ── A/V & Stage equipment ─────────────────────────────────────────────
const equipmentCategories = [
  {
    icon: "lucide:mic-2",
    title: "Pro Audio",
    details: [
      "Dynamic and condenser microphones",
      "Mixer and full monitoring chain",
      "Clean voice capture for events and recordings",
    ],
  },
  {
    icon: "lucide:video",
    title: "Video",
    details: [
      "Cameras and production lights",
      "Flexible framing for demos and interviews",
      "Green screen support for creative setups",
    ],
  },
  {
    icon: "lucide:radio",
    title: "Stage",
    details: [
      "PA coverage for talks and performances",
      "Wireless microphones for presenters",
      "Reliable event-ready playback and amplification",
    ],
  },
  {
    icon: "lucide:clapperboard",
    title: "Recording & Streaming",
    details: [
      "Capture cards for multi-source recording",
      "Livestream workflows powered by OBS",
      "Podcast, tutorial, and community archive sessions",
    ],
  },
] as const;

// ── Hidden Gems ───────────────────────────────────────────────────────
const hiddenGems = [
  {
    icon: "lucide:flame",
    title: "Sauna & Turkish Bath",
    description:
      "Yes, we have a sauna and a Turkish bath. Yes, they actually work. No, they're mostly used for storage right now. But if you're feeling adventurous, they're there.",
    image: "/images/hero-space.jpg",
    imageAlt: "The sauna and Turkish bath area at Base42",
  },
  {
    icon: "lucide:joystick",
    title: "The Retro Jacuzzi",
    description:
      "A fully functioning jacuzzi — filled not with water but with retro consoles, a retro TV, and an SNES. It's our unofficial retro gaming lounge. Don't ask how it happened. Just enjoy it.",
    image: "/images/jacuzzi.jpg",
    imageAlt: "Retro gaming setup in the jacuzzi at Base42",
  },
] as const;

// ── Production formats ────────────────────────────────────────────────
const productionFormats = ["Podcasts", "Tutorials", "Livestreams", "Product demos", "Hackathons"] as const;

// ── Location & CTA ────────────────────────────────────────────────────
const locationFacts = [
  { icon: "lucide:map-pin", label: "Address", value: "Rimska 25, Skopje, North Macedonia" },
  { icon: "lucide:mail", label: "Email", value: "hello@42.mk" },
] as const;

const ctaLinks = [
  {
    href: "/book",
    label: "Book the Space",
    description: "Reserve Base42 for your meetup, workshop, presentation, or community event.",
    variant: "primary" as const,
    icon: "lucide:calendar-range",
  },
  {
    href: "/membership",
    label: "Become a Member",
    description: "Join the community and get deeper access to the space, tools, and people building here.",
    variant: "outline" as const,
    icon: "lucide:user-plus",
  },
] as const;

export default function SpacePage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("The Space")}</Title>
      <Meta
        name="description"
        content="Explore Base42's physical space at Rimska 25 in Skopje — event hall, living room, electronics workshop, 3D printing, server rack, and a jacuzzi full of retro consoles."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Back link ──────────────────────────────────────────── */}
          <Reveal>
            <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
              <Icon icon="lucide:arrow-left" class="text-base" />
              Back to Home
            </A>
          </Reveal>

          {/* ── Hero ───────────────────────────────────────────────── */}
          <section class="mb-20">
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800">
                <div class="absolute inset-0 bg-grid opacity-30" />
                <div class="absolute inset-0 bg-gradient-to-br from-dark-900/20 via-dark-900/60 to-dark-900/95" />
                <div class="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-secondary/10" />
                <div class="grid lg:grid-cols-2 gap-6 items-stretch relative">
                  <div class="relative min-h-[300px] lg:min-h-[400px] overflow-hidden rounded-2xl">
                    <img src="/images/hero-space.jpg" alt="Base42 hackerspace interior in Skopje" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/35 to-transparent" />
                  </div>
                  <div class="relative z-10 flex items-end p-8">
                    <div class="max-w-xl">
                      <div class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-dark-900/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary mb-6">
                        <span class="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_var(--color-primary)]" />
                        Rimska 25 · Skopje
                      </div>
                      <SectionHeader
                        title="The Space"
                        subtitle="An event hall, a living room, an electronics workshop, a 3D printing station, a server rack, and a jacuzzi full of retro consoles. All under one roof."
                        align="left"
                        class="mb-8"
                      />
                      <p class="text-base md:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
                        This is where ideas leave the group chat and become things you can hear, hold, test, present, and ship.
                      </p>
                      <div class="flex flex-col sm:flex-row gap-4">
                        <A href="/book">
                          <Button type="button" size="lg">
                            <Icon icon="lucide:calendar-plus" class="text-lg" />
                            Book a Visit
                          </Button>
                        </A>
                        <A href="/studio">
                          <Button type="button" size="lg" variant="outline">
                            <Icon icon="lucide:video" class="text-lg" />
                            Explore Studio Use
                          </Button>
                        </A>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Main Area / Event Hall ─────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader
              title="The Main Area"
              subtitle="The beating heart of Base42 — where presentations happen, hackathons run overnight, and the servers never sleep."
            />

            <Reveal>
              <div class="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-dark-800 mb-8">
                <img
                  src="/images/main-area.jpeg"
                  alt="Base42 main event hall with stage and seating"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />
                <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div class="flex flex-wrap items-center gap-4">
                    <div class="flex items-center gap-2 rounded-full border border-primary/30 bg-dark-900/80 px-4 py-2 text-sm text-primary backdrop-blur-sm">
                      <Icon icon="lucide:users" class="text-base" />
                      Up to 120 people
                    </div>
                    <div class="flex items-center gap-2 rounded-full border border-secondary/30 bg-dark-900/80 px-4 py-2 text-sm text-secondary backdrop-blur-sm">
                      <Icon icon="lucide:monitor" class="text-base" />
                      2 Projectors
                    </div>
                    <div class="flex items-center gap-2 rounded-full border border-primary/30 bg-dark-900/80 px-4 py-2 text-sm text-primary backdrop-blur-sm">
                      <Icon icon="lucide:layout-grid" class="text-base" />
                      L-shaped room
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div class="grid md:grid-cols-2 gap-6">
              <For each={mainAreaFeatures}>
                {(feature, index) => (
                  <Reveal delay={index() * 80}>
                    <div class="h-full rounded-2xl border border-border bg-dark-800/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-colors hover:border-primary/40">
                      <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 shrink-0">
                        <Icon icon={feature.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-xl font-display font-semibold text-text-primary mb-3">{feature.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          {/* ── The Living Room ────────────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader
              title="The Living Room"
              subtitle="Because you should feel at home."
            />

            <div class="grid lg:grid-cols-5 gap-6 items-stretch">
              <Reveal class="lg:col-span-3">
                <div class="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-border bg-dark-800">
                  <img
                    src="/images/IMG_3250.JPG"
                    alt="Base42 living room with sofa, bean bags, and 4K TV"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                  <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p class="text-xs uppercase tracking-[0.24em] text-secondary/80 mb-2">Where ideas brew</p>
                    <p class="text-lg text-text-primary font-display font-semibold max-w-md">
                      Sofa, bean bags, 4K TV, game consoles, and a DIY tire table. The kind of room where side projects get started at midnight.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div class="lg:col-span-2 flex flex-col gap-6">
                <For each={livingRoomFeatures}>
                  {(feature, index) => (
                    <Reveal delay={index() * 100}>
                      <div class="rounded-2xl border border-border bg-dark-800 p-6 transition-colors hover:border-secondary/40">
                        <div class="flex items-start gap-4">
                          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                            <Icon icon={feature.icon} class="text-2xl" />
                          </div>
                          <div>
                            <h3 class="text-lg font-display font-semibold text-text-primary mb-1">{feature.title}</h3>
                            <p class="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  )}
                </For>
              </div>
            </div>
          </section>

          {/* ── Electronics Workshop ───────────────────────────────── */}
          <section class="mb-20">
            <div class="grid lg:grid-cols-2 gap-6 items-stretch">
              <Reveal>
                <div class="h-full rounded-2xl border border-border bg-gradient-to-br from-dark-800 to-dark-900 p-8 relative overflow-hidden">
                  <div class="absolute inset-0 bg-grid opacity-20" />
                  <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                  <div class="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
                  <div class="relative">
                    <div class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-dark-900/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-primary mb-6">
                      <Icon icon="lucide:cpu" class="text-sm" />
                      Maker space
                    </div>
                    <SectionHeader
                      title="Electronics Workshop"
                      subtitle="If we don't have it, bring it and leave it."
                      align="left"
                      class="mb-6"
                    />
                    <p class="text-text-secondary leading-relaxed mb-6">
                      A full electronics workshop with all kinds of components, soldering kits, lights, diodes, chips — you name it.
                      Bring your own project or start something new. Parts that get left behind become community resources.
                    </p>
                    <div class="flex flex-wrap gap-3">
                      <For each={["Soldering Stations", "Components Library", "Oscilloscopes", "Power Supplies", "Breadboards", "Multimeters"]}>
                        {tag => (
                          <span class="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            {tag}
                          </span>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div class="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-border bg-dark-800">
                  <img
                    src="/images/electronics.jpg"
                    alt="Electronics workshop with soldering stations and components at Base42"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/10 to-transparent" />
                  <div class="absolute inset-x-0 bottom-0 p-6">
                    <p class="text-xs uppercase tracking-[0.24em] text-primary/80 mb-2">Workshop</p>
                    <h3 class="text-lg font-display font-semibold text-text-primary">Solder, prototype, iterate</h3>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── 3D Printing Station ────────────────────────────────── */}
          <section class="mb-20">
            <div class="grid lg:grid-cols-2 gap-6 items-stretch">
              <Reveal>
                <div class="relative h-full min-h-[300px] rounded-2xl overflow-hidden border border-border bg-dark-800">
                  <img
                    src="/images/3d-printer-jacuzzi.jpg"
                    alt="3D printing station at Base42 connected to a server"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/10 to-transparent" />
                  <div class="absolute inset-x-0 bottom-0 p-6">
                    <p class="text-xs uppercase tracking-[0.24em] text-secondary/80 mb-2">Fabrication</p>
                    <h3 class="text-lg font-display font-semibold text-text-primary">From file to physical object</h3>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div class="h-full rounded-2xl border border-border bg-dark-800 p-8 flex flex-col justify-center">
                  <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary/10 text-secondary mb-6 shrink-0">
                    <Icon icon="lucide:printer" class="text-2xl" />
                  </div>
                  <h3 class="text-2xl font-display font-semibold text-text-primary mb-4">3D Printing Station</h3>
                  <p class="text-text-secondary leading-relaxed mb-6">
                    Ready-to-use 3D printers hooked up to a server. Send your prints from the space, or if you're feeling
                    brave — send them from home. Prototypes, enclosures, replacement parts, art projects, whatever you need
                    to materialize.
                  </p>
                  <div class="flex items-center gap-6 text-sm text-text-muted">
                    <div class="flex items-center gap-2">
                      <Icon icon="lucide:wifi" class="text-secondary text-lg" />
                      <span>Remote printing</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon icon="lucide:server" class="text-secondary text-lg" />
                      <span>Server-connected</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <Icon icon="lucide:clock" class="text-secondary text-lg" />
                      <span>24/7 queue</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── A/V & Stage Equipment ──────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader
              title="A/V & Stage Equipment"
              subtitle="Production support for talks, performances, recordings, livestreams, and polished community broadcasts."
            />
            <div class="grid lg:grid-cols-2 gap-6">
              <For each={equipmentCategories}>
                {(category, index) => (
                  <Reveal delay={index() * 100}>
                    <div class="rounded-2xl border border-border bg-dark-800 p-6">
                      <div class="flex items-start gap-4 mb-6">
                        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                          <Icon icon={category.icon} class="text-2xl" />
                        </div>
                        <div>
                          <h3 class="text-xl font-display font-semibold text-text-primary mb-1">{category.title}</h3>
                          <p class="text-sm text-text-muted uppercase tracking-[0.18em]">Ready for real-world use</p>
                        </div>
                      </div>
                      <ul class="space-y-3">
                        <For each={category.details}>
                          {detail => (
                            <li class="flex gap-3 text-text-secondary leading-relaxed">
                              <Icon icon="lucide:check" class="text-primary text-lg mt-0.5 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          {/* ── Recording & Production ─────────────────────────────── */}
          <section class="mb-20">
            <div class="grid lg:grid-cols-2 gap-6 items-stretch">
              <Reveal>
                <div class="h-full rounded-2xl border border-border bg-dark-800 p-8">
                  <SectionHeader
                    title="Recording & Production"
                    subtitle="Use the space to create polished content without assembling your own studio from scratch."
                    align="left"
                    class="mb-8"
                  />
                  <p class="text-text-secondary leading-relaxed mb-6">
                    Base42 can support production for interviews, explainers, live sessions, launches, and community programming.
                    If your idea needs microphones, cameras, lights, or an audience, this room can carry it.
                  </p>
                  <div class="flex flex-wrap gap-3 mb-8">
                    <For each={productionFormats}>
                      {format => (
                        <span class="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                          {format}
                        </span>
                      )}
                    </For>
                  </div>
                  <A href="/studio" class="inline-flex items-center gap-2 text-secondary hover:text-secondary-hover transition-colors font-semibold">
                    Book the studio setup
                    <Icon icon="lucide:arrow-right" class="text-base" />
                  </A>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div class="h-full rounded-2xl border border-border bg-gradient-to-br from-dark-800 to-dark-900 p-8 overflow-hidden relative">
                  <div class="absolute inset-0 bg-grid opacity-20" />
                  <div class="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                  <div class="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
                  <div class="relative">
                    <p class="text-xs uppercase tracking-[0.3em] text-secondary mb-4">Production workflow</p>
                    <h3 class="text-2xl font-display font-semibold text-text-primary mb-6">From idea to publishable output</h3>
                    <div class="space-y-4">
                      <For each={["Plan the format", "Set the room", "Record or stream", "Edit, publish, share"]}>
                        {(step, index) => (
                          <div class="flex items-center gap-4 rounded-2xl border border-border bg-dark-900/60 px-4 py-4">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary font-semibold">
                              {index() + 1}
                            </div>
                            <span class="text-text-secondary">{step}</span>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Hidden Gems ────────────────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader
              title="The Hidden Gems"
              subtitle="Every hackerspace has its quirks. These are ours."
            />

            <div class="grid md:grid-cols-2 gap-6">
              <For each={hiddenGems}>
                {(gem, index) => (
                  <Reveal delay={index() * 120}>
                    <div class="group h-full rounded-2xl border border-border bg-dark-800 overflow-hidden">
                      <div class="relative aspect-video overflow-hidden">
                        <img
                          src={gem.image}
                          alt={gem.imageAlt}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                        <div class="absolute top-4 left-4">
                          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-900/80 text-primary backdrop-blur-sm">
                            <Icon icon={gem.icon} class="text-xl" />
                          </div>
                        </div>
                      </div>
                      <div class="p-6">
                        <h3 class="text-xl font-display font-semibold text-text-primary mb-3">{gem.title}</h3>
                        <p class="text-text-secondary leading-relaxed">{gem.description}</p>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          {/* ── Location ───────────────────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader title="Location" subtitle="Easy to find, easy to remember, and designed to feel like Base42 the moment you walk in." />
            <div class="grid lg:grid-cols-2 gap-6 items-stretch">
              <Reveal>
                <div class="rounded-2xl border border-border bg-dark-800 p-8 h-full">
                  <div class="space-y-6">
                    <For each={locationFacts}>
                      {fact => (
                        <div class="flex items-start gap-4">
                          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon icon={fact.icon} class="text-2xl" />
                          </div>
                          <div>
                            <p class="text-xs uppercase tracking-[0.22em] text-text-muted mb-2">{fact.label}</p>
                            <p class="text-lg text-text-primary leading-relaxed">{fact.value}</p>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div class="rounded-2xl border border-border bg-dark-900 p-8 h-full relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                  <div class="relative">
                    <p class="text-xs uppercase tracking-[0.28em] text-primary mb-4">Why it works</p>
                    <h3 class="text-2xl font-display font-semibold text-text-primary mb-4">A space tuned for community momentum</h3>
                    <p class="text-text-secondary leading-relaxed mb-6">
                      The layout supports both structured programming and spontaneous collisions: a talk in one corner,
                      a prototype on a bench, a planning call behind a door, and a coffee-fueled idea turning into a project
                      by midnight.
                    </p>
                    <p class="text-text-secondary leading-relaxed">
                      For partnerships, visits, or logistics, reach out at{" "}
                      <a href="mailto:hello@42.mk" class="text-primary hover:text-primary-hover transition-colors">
                        hello@42.mk
                      </a>.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Use the Space ──────────────────────────────────────── */}
          <section class="mb-20">
            <SectionHeader title="Use the Space" subtitle="Come for an event, book the venue, or become part of the people who keep it alive." />
            <div class="grid md:grid-cols-2 gap-6">
              <For each={ctaLinks}>
                {link => (
                  <Reveal>
                    <div class="rounded-2xl border border-border bg-dark-800 p-8 h-full flex flex-col">
                      <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-6 shrink-0">
                        <Icon icon={link.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-2xl font-display font-semibold text-text-primary mb-3">{link.label}</h3>
                      <p class="text-text-secondary leading-relaxed mb-8 flex-1">{link.description}</p>
                      <A href={link.href}>
                        <Button type="button" size="lg" variant={link.variant}>
                          {link.label}
                          <Icon icon="lucide:arrow-right" class="text-base" />
                        </Button>
                      </A>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
