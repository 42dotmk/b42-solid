import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const galleryImages = [
  {
    src: "/images/hero-space.jpg",
    alt: "The main Base42 space",
    title: "Main Floor",
    caption: "The central heartbeat of Base42 in Rimska 25.",
    aspect: "aspect-video md:col-span-2",
  },
  {
    src: "/images/space-events.jpg",
    alt: "Events hall at Base42",
    title: "Events Hall",
    caption: "Talks, demos, screenings, and community nights.",
    aspect: "aspect-square",
  },
  {
    src: "/images/space-workshop.jpg",
    alt: "Workshop area at Base42",
    title: "Workshop Zone",
    caption: "Hands-on making, soldering, repair, and prototyping.",
    aspect: "aspect-square",
  },
  {
    src: "/images/space-3dprint.jpg",
    alt: "3D printers at Base42",
    title: "3D Printing",
    caption: "Rapid iteration from sketch to physical object.",
    aspect: "aspect-video",
  },
  {
    src: "/images/space-lounge.jpg",
    alt: "Lounge area at Base42",
    title: "Lounge",
    caption: "Coffee, conversation, and late-night problem solving.",
    aspect: "aspect-video",
  },
] as const;

const facilities = [
  {
    icon: "lucide:projector",
    title: "Events Hall",
    description: "Flexible seating for 50+ people with projector, presentation setup, and clear room sound.",
  },
  {
    icon: "lucide:wrench",
    title: "Workshop",
    description: "Workbenches for building, fixing, soldering, and testing ideas with other makers nearby.",
  },
  {
    icon: "lucide:printer",
    title: "3D Printing",
    description: "Multiple printers ready for prototypes, enclosures, functional parts, and rapid experiments.",
  },
  {
    icon: "lucide:sofa",
    title: "Lounge",
    description: "Soft seating, coffee energy, and the kind of relaxed corner where collaborations usually start.",
  },
  {
    icon: "lucide:wifi",
    title: "High-Speed Internet",
    description: "Gigabit fiber for livestreams, remote calls, large downloads, and every hackathon emergency.",
  },
  {
    icon: "lucide:door-open",
    title: "Meeting Room",
    description: "A quieter room for focused work, calls, planning sessions, and small team conversations.",
  },
] as const;

const equipmentCategories = [
  {
    icon: "lucide:mic-2",
    title: "Pro Audio",
    details: ["Dynamic and condenser microphones", "Mixer and monitoring chain", "Clean voice capture for events and recordings"],
  },
  {
    icon: "lucide:video",
    title: "Video",
    details: ["Cameras and production lights", "Flexible framing for demos and interviews", "Green screen support for creative setups"],
  },
  {
    icon: "lucide:radio",
    title: "Stage",
    details: ["PA coverage for talks and performances", "Wireless microphones for presenters", "Reliable event-ready playback and amplification"],
  },
  {
    icon: "lucide:clapperboard",
    title: "Recording",
    details: ["Podcast and video sessions", "Livestream workflows powered by OBS", "Capture for tutorials, launches, and community archives"],
  },
] as const;

const productionFormats = ["Podcasts", "Tutorials", "Livestreams", "Product demos"] as const;

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
        content="Explore Base42's physical space at Rimska 25 in Skopje, including facilities, equipment, production capabilities, and booking options."
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
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800">
                <div class="absolute inset-0 bg-grid opacity-30" />
                <div class="absolute inset-0 bg-gradient-to-br from-dark-900/20 via-dark-900/60 to-dark-900/95" />
                <div class="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-secondary/10" />
                <div class="grid lg:grid-cols-2 gap-6 items-stretch relative">
                  <div class="relative min-h-[300px] lg:min-h-[400px] overflow-hidden rounded-2xl">
                    <img src="/images/hero-space.jpg" alt="Base42 space in Skopje" class="w-full h-full object-cover" />
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
                        subtitle="Base42's physical home in Skopje — built for workshops, recordings, events, collaboration, and long conversations after the laptops close."
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

          <section class="mb-20">
            <SectionHeader title="Inside Base42" subtitle="A compact visual tour of the rooms, moods, and maker energy inside the space." />
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <For each={galleryImages}>
                {(image, index) => (
                  <Reveal delay={index() * 80}>
                    <div class={`group relative ${image.aspect} rounded-2xl overflow-hidden border border-border bg-dark-800`}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/10 to-transparent" />
                      <div class="absolute inset-x-0 bottom-0 p-6">
                        <p class="text-xs uppercase tracking-[0.24em] text-primary/80 mb-2">{image.title}</p>
                        <h3 class="text-lg font-display font-semibold text-text-primary mb-1">{image.caption}</h3>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Facilities" subtitle="Everything needed for public events, quiet work, fabrication, and community hangouts." />
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <For each={facilities}>
                {(facility, index) => (
                  <Reveal delay={index() * 80}>
                    <div class="h-full rounded-2xl border border-border bg-dark-800/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-colors hover:border-primary/40">
                      <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 shrink-0">
                        <Icon icon={facility.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-xl font-display font-semibold text-text-primary mb-3">{facility.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{facility.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="A/V & Stage Equipment" subtitle="Production support for talks, performances, recordings, livestreams, and polished community broadcasts." />
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
                      The layout supports both structured programming and spontaneous collisions: a talk in one corner, a prototype on a bench, a planning call behind a door, and a coffee-fueled idea turning into a project by midnight.
                    </p>
                    <p class="text-text-secondary leading-relaxed">
                      For partnerships, visits, or logistics, reach out at <a href="mailto:hello@42.mk" class="text-primary hover:text-primary-hover transition-colors">hello@42.mk</a>.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

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
