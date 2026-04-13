import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const opportunities = [
  {
    title: "Event Support",
    icon: "lucide:calendar-check-2",
    description:
      "Help shape the atmosphere at Base42 by greeting people, setting up chairs, coordinating flow, and making every meetup feel effortless.",
  },
  {
    title: "A/V Production",
    icon: "lucide:video",
    description:
      "Run cameras, sound, livestreams, and recordings so talks, workshops, and demos reach people far beyond the room.",
  },
  {
    title: "Space Maintenance",
    icon: "lucide:wrench",
    description:
      "Keep the hackerspace sharp, functional, and welcoming by improving the setup, fixing details, and caring for the shared environment.",
  },
  {
    title: "Open Source Projects",
    icon: "lucide:github",
    description:
      "Contribute code, design, documentation, or infrastructure to community-built tools and experiments with real people using them.",
  },
  {
    title: "Community Outreach",
    icon: "lucide:megaphone",
    description:
      "Help spread the word about Base42, connect with partner communities, and bring new curious minds into the orbit.",
  },
  {
    title: "Mentorship",
    icon: "lucide:graduation-cap",
    description:
      "Support newcomers, guide students, and share what you know through practical, project-based learning.",
  },
] as const;

const benefitTiers = [
  {
    name: "Casual",
    commitment: "A few hours per month",
    accent: "text-primary",
    perks: ["Recognition in the community", "Special Discord role", "Free access to Base42 events"],
  },
  {
    name: "Regular",
    commitment: "Weekly involvement",
    accent: "text-secondary",
    perks: ["Everything in Casual", "Free Base42 membership", "Equipment priority", "Base42 merch"],
  },
  {
    name: "Dedicated",
    commitment: "Consistent long-term contribution",
    accent: "text-primary",
    perks: [
      "Everything in Regular",
      "University internship pathway",
      "Speaker opportunities",
      "Reference letters",
    ],
  },
] as const;

const workflowSteps = [
  {
    step: "01",
    title: "Join Discord",
    description: "Introduce yourself, say what you're into, and let people know you want to help.",
  },
  {
    step: "02",
    title: "Show up",
    description: "Come to events, volunteer days, or project sessions in Skopje and get a feel for the space.",
  },
  {
    step: "03",
    title: "Start helping",
    description: "Pick something practical, contribute at your own pace, and work alongside people already doing it.",
  },
  {
    step: "04",
    title: "Grow",
    description: "Take on more ownership, build trust, and unlock deeper opportunities as your impact compounds.",
  },
] as const;

export default function VolunteeringPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Volunteering")}</Title>
      <Meta
        name="description"
        content="Volunteer with Base42 in Skopje through events, production, mentorship, open source, and community-building opportunities."
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
            <div class="grid gap-6 lg:grid-cols-2 lg:items-center">
              <Reveal>
                <div>
                  <p class="text-sm uppercase tracking-[0.3em] text-secondary mb-4">Base42 · Skopje</p>
                  <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight">
                    Volunteer <span class="text-gradient">With Us</span>
                  </h1>
                  <p class="text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
                    Base42 runs on people who care enough to show up, share energy, and make things happen. If you want
                    to create visible impact in the local tech and maker community, volunteering is one of the fastest
                    ways in.
                  </p>
                  <div class="flex flex-wrap gap-4">
                    <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                      <Button type="button" size="lg">
                        <Icon icon="lucide:message-square" class="text-lg" />
                        Join Discord
                      </Button>
                    </a>
                    <a href="mailto:[email protected]">
                      <Button type="button" variant="outline" size="lg">
                        <Icon icon="lucide:mail" class="text-lg" />
                        Email Base42
                      </Button>
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div class="rounded-2xl bg-dark-800 border border-border p-8 relative overflow-hidden">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.14),transparent_38%)]" />
                  <div class="relative space-y-6">
                    <div>
                      <p class="text-sm text-text-muted mb-2">Why it matters</p>
                      <p class="text-2xl font-display font-bold text-text-primary leading-snug">
                        The community remembers the people who build the vibe, not just the schedule.
                      </p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="rounded-xl bg-dark-700 border border-border p-4">
                        <div class="text-2xl font-display font-bold text-primary mb-1">6</div>
                        <p class="text-sm text-text-muted">Ways to contribute right now</p>
                      </div>
                      <div class="rounded-xl bg-dark-700 border border-border p-4">
                        <div class="text-2xl font-display font-bold text-secondary mb-1">Real</div>
                        <p class="text-sm text-text-muted">Projects, events, and mentorship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Opportunities"
              subtitle="Pick the kind of contribution that fits your energy, skills, and curiosity."
            />
            <div class="grid gap-6 md:grid-cols-2 md:[grid-auto-rows:1fr] xl:grid-cols-3">
              <For each={opportunities}>
                {(opportunity, index) => (
                  <Reveal delay={index() * 75} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-700 border border-border text-primary mb-5 shrink-0">
                        <Icon icon={opportunity.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-xl font-display font-bold text-text-primary mb-3">{opportunity.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{opportunity.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Benefits by Commitment"
              subtitle="The more consistently you contribute, the more trust, access, and opportunity you unlock."
            />
            <div class="grid lg:grid-cols-3 gap-6">
              <For each={benefitTiers}>
                {(tier, index) => (
                  <Reveal delay={index() * 100} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full flex flex-col">
                      <div class="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <h3 class={`text-2xl font-display font-bold ${tier.accent}`}>{tier.name}</h3>
                          <p class="text-text-muted mt-1">{tier.commitment}</p>
                        </div>
                        <div class="w-11 h-11 rounded-xl bg-dark-700 border border-border flex items-center justify-center text-secondary shrink-0">
                          <Icon icon="lucide:badge-check" class="text-xl" />
                        </div>
                      </div>
                      <ul class="space-y-3 flex-1">
                        <For each={tier.perks}>
                          {perk => (
                            <li class="flex items-start gap-3 text-text-secondary leading-relaxed">
                              <Icon icon="lucide:sparkles" class="text-primary text-base shrink-0 mt-1" />
                              <span>{perk}</span>
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
            <SectionHeader
              title="University Partnerships"
              subtitle="Volunteering can grow into mentored, credit-worthy experience."
            />
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8">
                <div class="grid gap-6 lg:grid-cols-2 items-start">
                  <div class="rounded-2xl bg-dark-700 border border-border p-6">
                    <p class="text-sm uppercase tracking-[0.25em] text-text-muted mb-3">Official partners</p>
                    <div class="space-y-3">
                      <div class="flex items-center gap-3 text-text-primary">
                        <Icon icon="lucide:building-2" class="text-primary text-xl" />
                        <span class="font-display font-semibold">FCSE</span>
                      </div>
                      <div class="flex items-center gap-3 text-text-primary">
                        <Icon icon="lucide:cpu" class="text-secondary text-xl" />
                        <span class="font-display font-semibold">FEIT</span>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4 text-text-secondary leading-relaxed">
                    <p>
                      Base42 is an official partner of <span class="text-primary font-semibold">FCSE</span> and{" "}
                      <span class="text-secondary font-semibold">FEIT</span>. Dedicated volunteers can receive accepted
                      internships that count toward university requirements.
                    </p>
                    <p>
                      These are not fake placeholder internships. They are project-based, mentored, and rooted in real
                      community needs, which means you build useful experience while contributing to something tangible.
                    </p>
                    <p>
                      If you stay consistent, take ownership, and work well with others, volunteering at Base42 can turn
                      into one of the most practical learning tracks available in Skopje.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="How It Works" subtitle="Simple entry, real momentum." />
            <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              <For each={workflowSteps}>
                {(item, index) => (
                  <Reveal delay={index() * 75} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="text-sm font-mono text-primary mb-4">{item.step}</div>
                      <h3 class="text-xl font-display font-bold text-text-primary mb-3">{item.title}</h3>
                      <p class="text-text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_35%),radial-gradient(circle_at_bottom,rgba(250,204,21,0.12),transparent_40%)]" />
                <div class="relative max-w-3xl mx-auto">
                  <p class="text-sm uppercase tracking-[0.3em] text-text-muted mb-4">Ready?</p>
                  <h2 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                    Start with one message. Build from there.
                  </h2>
                  <p class="text-lg text-text-secondary leading-relaxed mb-8">
                    Reach out at <span class="text-primary">[email protected]</span> or join our Discord and tell us
                    what kind of contribution excites you.
                  </p>
                  <div class="flex flex-wrap justify-center gap-4">
                    <a href="mailto:[email protected]">
                      <Button type="button" size="lg">
                        <Icon icon="lucide:mail" class="text-lg" />
                        [email protected]
                      </Button>
                    </a>
                    <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                      <Button type="button" variant="secondary" size="lg">
                        <Icon icon="lucide:message-square" class="text-lg" />
                        Join Discord
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
  );
}
