import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { personas } from "~/data/for-data";
import { siteMeta } from "~/data/site";

export default function WhoIsItForPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Who Is It For")}</Title>
      <Meta
        name="description"
        content="Base42 is for tech communities, students, professionals, gamers, cultural organizations, and anyone who wants to bring people together. Find your place."
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
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,10,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />
                <div class="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div class="relative max-w-3xl">
                  <span class="inline-flex items-center gap-2 rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-secondary mb-6">
                    <Icon icon="lucide:compass" class="text-primary" />
                    Find Your Place
                  </span>
                  <h1 class="text-4xl md:text-6xl font-display font-bold text-text-primary leading-tight mb-6">
                    Who Is <span class="text-gradient">Base42</span> For?
                  </h1>
                  <p class="text-xl leading-relaxed text-text-secondary mb-4">
                    Not just a space — an organization built to empower every community that walks through the door.
                    Tech meetups, conferences, students, professionals, gamers, cultural organizations, or anyone with
                    a reason to bring people together.
                  </p>
                  <p class="text-lg text-text-muted">
                    Find your fit below and see exactly what Base42 can do for you.
                  </p>
                </div>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Pick Your Path"
              subtitle="Every group uses Base42 differently. Here's how each one fits."
            />

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <For each={personas}>
                {(persona, index) => (
                  <Reveal delay={index() * 80}>
                    <A href={`/for/${persona.slug}`} class="group block h-full">
                      <div class="rounded-2xl border border-border bg-dark-800 p-6 h-full flex flex-col transition-colors hover:border-primary/40">
                        <div class="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-dark-700">
                          <img
                            src={persona.heroImage}
                            alt={persona.title}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-dark-900/70 via-transparent to-transparent" />
                          <div class="absolute top-3 left-3">
                            <div class={`flex items-center justify-center w-10 h-10 rounded-xl bg-dark-900/80 backdrop-blur-sm ${persona.accent === "primary" ? "text-primary" : "text-secondary"}`}>
                              <Icon icon={persona.icon} class="text-xl" />
                            </div>
                          </div>
                        </div>

                        <h3 class="text-xl font-display font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                          {persona.title}
                        </h3>
                        <p class="text-text-secondary leading-relaxed mb-6 flex-1">
                          {persona.tagline}
                        </p>

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

          <section class="mb-20">
            <Reveal>
              <div class="bg-dark-800 rounded-2xl p-8 md:p-12 border border-border">
                <div class="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 class="text-3xl font-display font-bold text-text-primary mb-4">
                      Don't see your use case?
                    </h2>
                    <p class="text-text-secondary leading-relaxed mb-6">
                      Base42 is flexible by design. If you have a reason to bring people together — a workshop, a screening,
                      a hackathon, a cultural exchange, or something we haven't imagined yet — reach out. We'll figure it out together.
                    </p>
                    <div class="flex flex-wrap gap-4">
                      <a href="mailto:hello@42.mk" class="inline-flex">
                        <Button type="button" size="lg">
                          <Icon icon="lucide:mail" class="text-lg" />
                          Email hello@42.mk
                        </Button>
                      </a>
                      <A href="/book" class="inline-flex">
                        <Button type="button" variant="outline" size="lg">
                          <Icon icon="lucide:calendar-range" class="text-lg" />
                          Book the Space
                        </Button>
                      </A>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-4">
                    <For each={[
                      { icon: "lucide:users", label: "19+ Partners", accent: "text-primary" },
                      { icon: "lucide:calendar", label: "50+ Events/yr", accent: "text-secondary" },
                      { icon: "lucide:message-square", label: "1000+ Members", accent: "text-primary" },
                    ]}>
                      {stat => (
                        <div class="rounded-xl bg-dark-700 border border-border p-4 text-center">
                          <Icon icon={stat.icon} class={`text-2xl ${stat.accent} mb-2`} />
                          <div class="text-sm text-text-muted">{stat.label}</div>
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12 text-center">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_top,rgba(255,214,10,0.12),transparent_42%)]" />
                <div class="relative max-w-3xl mx-auto">
                  <div class="inline-flex items-center gap-2 rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-secondary mb-6">
                    <Icon icon="lucide:sparkles" class="text-primary" />
                    Open to everyone
                  </div>
                  <h2 class="text-3xl md:text-5xl font-display font-bold text-text-primary mb-5">
                    Base42 is built for <span class="text-gradient">every community</span>
                  </h2>
                  <p class="text-lg text-text-secondary leading-relaxed mb-8">
                    Not a coworking space. Not a rental venue. An organization dedicated to empowering communities
                    through open knowledge, shared resources, and a space that actually works.
                  </p>
                  <div class="flex flex-wrap justify-center gap-4">
                    <A href="/membership" class="inline-flex">
                      <Button type="button" size="lg">
                        Become a Member
                      </Button>
                    </A>
                    <A href="/about" class="inline-flex">
                      <Button type="button" variant="outline" size="lg">
                        Learn About Base42
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
