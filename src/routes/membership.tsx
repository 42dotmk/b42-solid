import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const membershipTiers = [
  {
    name: "Supporter",
    price: "~€5/mo",
    description: "Support the space from anywhere and stay connected to the people shaping Base42.",
    icon: "lucide:heart-handshake",
    featured: false,
    benefits: [
      "Support the community",
      "Discord access",
      "Newsletter",
      "Community recognition",
      "Voting rights",
    ],
  },
  {
    name: "Member",
    price: "~€15/mo",
    description: "The full Base42 experience with access to the space, tools, infrastructure, and member perks.",
    icon: "lucide:key-round",
    featured: true,
    benefits: [
      "Everything in Supporter",
      "24/7 access to the space",
      "Server infrastructure access",
      "Exclusive discounts to ALL conferences and events",
      "Workshop access",
      "3D printers and tools",
      "Locker/storage space",
    ],
  },
  {
    name: "Founder",
    price: "~€30/mo",
    description: "Go all in with premium access, extra visibility, and a stronger voice in the future of the space.",
    icon: "lucide:gem",
    featured: false,
    benefits: [
      "Everything in Member",
      "Priority event booking",
      "Dedicated desk",
      "Guest passes",
      "Name on Founders Wall",
      "Direct input on space decisions",
    ],
  },
];

const coreBenefits = [
  {
    title: "24/7 Access",
    icon: "lucide:badge-check",
    accent: "text-primary",
    description:
      "Members get a key fob so the hackerspace becomes part of their weekly rhythm, not something locked behind office hours.",
  },
  {
    title: "Server Infrastructure",
    icon: "lucide:server",
    accent: "text-secondary",
    description:
      "From self-hosted experiments to community services, members can learn by working with real infrastructure inside Base42.",
  },
  {
    title: "Event Discounts",
    icon: "lucide:ticket-percent",
    accent: "text-primary",
    description:
      "Get member pricing across conferences, talks, workshops, and special events organized with partners across Skopje and beyond.",
  },
  {
    title: "Community",
    icon: "lucide:users",
    accent: "text-secondary",
    description:
      "Join a network of 1000+ people on Discord and in the space who share opportunities, knowledge, gear, and momentum.",
  },
];

const joinSteps = [
  {
    step: "01",
    title: "Pick a tier",
    description: "Choose the level that matches how close you want to be to the space and the community.",
  },
  {
    step: "02",
    title: "Fill out the form",
    description: "Send us your details so we can confirm your membership and help you get set up quickly.",
  },
  {
    step: "03",
    title: "Get your key fob",
    description: "Once approved, we'll onboard you, answer questions, and hand over access to the space.",
  },
  {
    step: "04",
    title: "Start building",
    description: "Show up, meet people, join events, use the tools, and make Base42 part of your process.",
  },
];

const faqs = [
  {
    question: "Do I need to be an experienced developer or maker to join?",
    answer:
      "No. Base42 is built for curious people at every level. If you want to learn, contribute, or simply be around builders, you're welcome.",
  },
  {
    question: "Can I support Base42 without needing physical access?",
    answer:
      "Yes. The Supporter tier is designed for people who want to back the community, stay in the loop, and keep the space growing from a distance.",
  },
  {
    question: "What kind of events and discounts do members get?",
    answer:
      "Members get discounted access to Base42 conferences, workshops, and partner events, plus early visibility into upcoming programs.",
  },
  {
    question: "How quickly can I get access after joining?",
    answer:
      "Usually as soon as we review your form and complete onboarding. We aim to make the process lightweight so you can get in and start using the space fast.",
  },
  {
    question: "Can I get membership through volunteering instead of paying?",
    answer:
      "Yes. Regular volunteers who contribute weekly get free full membership — same 24/7 access, same tools, same perks. Help with events, A/V, space maintenance, or open source projects. Dedicated long-term volunteers also earn speaker opportunities, reference letters, and internship pathway credits.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Membership")}</Title>
      <Meta
        name="description"
        content="Become a Base42 member and get access to the hackerspace, tools, infrastructure, events, and a thriving builder community in Skopje."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
              <Icon icon="lucide:arrow-left" class="w-4 h-4" />
              Back to Home
            </A>
          </Reveal>

          <section class="mb-20">
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,10,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_34%)]" />
                <div class="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div class="relative grid gap-6 lg:grid-cols-2 lg:items-end">
                  <div>
                    <span class="inline-flex items-center gap-2 rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-secondary mb-6">
                      <Icon icon="lucide:shield-check" class="text-primary" />
                      Membership at Base42
                    </span>
                    <h1 class="text-4xl md:text-6xl font-display font-bold text-text-primary leading-tight mb-6">
                      Join the <span class="text-gradient">Community</span>
                    </h1>
                    <p class="max-w-3xl text-xl leading-relaxed text-text-secondary mb-8">
                      Become a Base42 member and plug into a hackerspace built for builders, makers, and curious minds in
                      Skopje. Your membership keeps the lights on, the tools running, and the community growing.
                    </p>
                    <div class="flex flex-wrap gap-4">
                      <A href="#tiers" class="inline-flex">
                        <Button type="button" size="lg">
                          Choose Your Tier
                        </Button>
                      </A>
                      <a href="mailto:hello@42.mk" class="inline-flex">
                        <Button type="button" variant="outline" size="lg">
                          Ask a Question
                        </Button>
                      </a>
                    </div>
                  </div>

                  <div class="grid gap-6 sm:grid-cols-2">
                    <div class="rounded-2xl bg-dark-700 border border-border p-6">
                      <div class="text-sm text-text-muted mb-2">Community reach</div>
                      <div class="text-3xl font-display font-bold text-secondary mb-2">1000+</div>
                      <p class="text-text-secondary text-sm">Hackers, developers, designers, students, and tinkerers already in the orbit.</p>
                    </div>
                    <div class="rounded-2xl bg-dark-700 border border-border p-6">
                      <div class="text-sm text-text-muted mb-2">Member promise</div>
                      <div class="text-3xl font-display font-bold text-primary mb-2">24/7</div>
                      <p class="text-text-secondary text-sm">Real access to the space, real people to build with, and real reasons to keep showing up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="tiers" class="mb-20 scroll-mt-28">
            <SectionHeader
              title="Membership Tiers"
              subtitle="Choose how you want to support, access, and shape the Base42 hackerspace."
            />
            <div class="grid gap-6 lg:grid-cols-3">
              <For each={membershipTiers}>
                {(tier, index) => (
                  <Reveal delay={index() * 100}>
                    <div
                      class={`rounded-2xl bg-dark-800 border p-8 h-full flex flex-col gap-6 ${tier.featured ? "border-primary shadow-[0_0_0_1px_rgba(255,214,10,0.25),0_24px_80px_rgba(255,214,10,0.12)] lg:-translate-y-3" : "border-border"}`}
                    >
                      <div class="flex flex-wrap items-start justify-between gap-4">
                        <div class="space-y-4">
                          <div class={`inline-flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${tier.featured ? "bg-primary/10 text-primary" : "bg-dark-700 text-secondary"}`}>
                            <Icon icon={tier.icon} class="text-2xl" />
                          </div>
                          <h3 class="text-2xl font-display font-bold text-text-primary">{tier.name}</h3>
                          <p class="text-text-secondary text-sm leading-relaxed">{tier.description}</p>
                        </div>
                        {tier.featured && (
                          <span class="shrink-0 rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            Most Popular
                          </span>
                        )}
                      </div>

                      <div class="space-y-1">
                        <div class="text-4xl font-display font-bold text-text-primary">{tier.price}</div>
                        <div class="text-sm text-text-muted">Flexible community-driven contribution</div>
                      </div>

                      <ul class="space-y-3 flex-1">
                        <For each={tier.benefits}>
                          {benefit => (
                            <li class="flex items-start gap-3 text-text-secondary">
                              <Icon icon="lucide:circle-check-big" class="text-primary text-lg mt-0.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          )}
                        </For>
                      </ul>

                      <a href="mailto:hello@42.mk?subject=Base42%20Membership%20Inquiry" class="inline-flex w-full">
                        <Button type="button" size="lg" variant={tier.featured ? "primary" : "outline"} class="w-full">
                          {tier.featured ? "Become a Member" : `Choose ${tier.name}`}
                        </Button>
                      </a>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12">
                <div class="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
                <div class="relative grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <span class="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm text-secondary mb-6">
                      <Icon icon="lucide:hand-helping" class="text-base" />
                      Alternative path
                    </span>
                    <h2 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
                      Can't pay? <span class="text-secondary">Volunteer.</span>
                    </h2>
                    <p class="text-lg text-text-secondary leading-relaxed mb-4">
                      Membership shouldn't be blocked by budget. If you're willing to contribute your time instead,
                      volunteering gives you the same access — no money required.
                    </p>
                    <p class="text-text-secondary leading-relaxed mb-6">
                      Help with event setup, A/V production, space maintenance, community outreach, or open source projects.
                      Start with a few hours a month and grow from there.
                    </p>
                    <div class="grid sm:grid-cols-3 gap-4 mb-8">
                      <div class="rounded-xl bg-dark-700 border border-border p-4">
                        <div class="text-xs uppercase tracking-[0.22em] text-text-muted mb-2">Casual</div>
                        <div class="text-sm text-text-secondary">A few hours/month — free event access, Discord role</div>
                      </div>
                      <div class="rounded-xl bg-dark-700 border border-secondary/30 p-4">
                        <div class="text-xs uppercase tracking-[0.22em] text-secondary mb-2">Regular</div>
                        <div class="text-sm text-text-secondary">Weekly — free membership, merch, equipment priority</div>
                      </div>
                      <div class="rounded-xl bg-dark-700 border border-primary/30 p-4">
                        <div class="text-xs uppercase tracking-[0.22em] text-primary mb-2">Dedicated</div>
                        <div class="text-sm text-text-secondary">Long-term — internship pathway, speaker slots, references</div>
                      </div>
                    </div>
                    <A href="/volunteering" class="inline-flex">
                      <Button type="button" size="lg" variant="secondary">
                        <Icon icon="lucide:hand-helping" class="text-lg" />
                        Learn About Volunteering
                      </Button>
                    </A>
                  </div>
                  <div class="relative rounded-2xl overflow-hidden min-h-[300px] bg-dark-700 hidden lg:block">
                    <img
                      src="/images/space-events.jpg"
                      alt="Volunteers helping at a Base42 event"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                    <div class="absolute bottom-4 left-4 text-sm text-text-muted font-mono">// time &gt; money</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="What You Get"
              subtitle="Membership is more than a card. It is access to a living, breathing place to learn, host, prototype, and collaborate."
            />
            <div class="grid gap-6 md:grid-cols-2">
              <For each={coreBenefits}>
                {(benefit, index) => (
                  <Reveal delay={index() * 100}>
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class={`flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-700 mb-5 shrink-0 ${benefit.accent}`}>
                        <Icon icon={benefit.icon} class="text-2xl" />
                      </div>
                      <h3 class="text-2xl font-display font-bold text-text-primary mb-3">{benefit.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{benefit.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="How to Join" subtitle="A fast path from curious visitor to active member." />
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <For each={joinSteps}>
                {(item, index) => (
                  <Reveal delay={index() * 90}>
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="text-sm font-mono tracking-[0.24em] text-primary mb-4">{item.step}</div>
                      <h3 class="text-xl font-display font-bold text-text-primary mb-3">{item.title}</h3>
                      <p class="text-text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="FAQ" subtitle="A few practical answers before you reach out." />
            <div class="grid gap-6 md:grid-cols-2">
              <For each={faqs}>
                {(item, index) => (
                  <Reveal delay={index() * 80}>
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="flex items-start gap-4">
                        <div class="flex items-center justify-center w-11 h-11 rounded-2xl bg-dark-700 text-secondary shrink-0">
                          <Icon icon="lucide:message-circle-question" class="text-xl" />
                        </div>
                        <div>
                          <h3 class="text-lg font-display font-bold text-text-primary mb-3">{item.question}</h3>
                          <p class="text-text-secondary leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="relative overflow-hidden rounded-2xl border border-border bg-dark-800 p-8 md:p-12 text-center">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_top,rgba(255,214,10,0.12),transparent_42%)]" />
                <div class="relative max-w-3xl mx-auto">
                  <div class="inline-flex items-center gap-2 rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-secondary mb-6">
                    <Icon icon="lucide:sparkles" class="text-primary" />
                    Ready to join?
                  </div>
                  <h2 class="text-3xl md:text-5xl font-display font-bold text-text-primary mb-5">
                    Build with people who <span class="text-gradient">ship ideas into reality</span>
                  </h2>
                  <p class="text-lg text-text-secondary leading-relaxed mb-8">
                    Email us at hello@42.mk and we'll help you choose a tier, answer your questions, and get you into Base42.
                  </p>
                  <div class="flex flex-wrap justify-center gap-4">
                    <a href="mailto:hello@42.mk" class="inline-flex">
                      <Button type="button" size="lg">
                        Email hello@42.mk
                      </Button>
                    </a>
                    <A href="/about" class="inline-flex">
                      <Button type="button" variant="outline" size="lg">
                        Learn More About Base42
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
