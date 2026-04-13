import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const coreValues = [
  {
    icon: "lucide:book-open-text",
    title: "Open Knowledge",
    description:
      "What you discover here should not stay locked in your head. Share notes, post code, document experiments, and make the next person's path shorter.",
  },
  {
    icon: "lucide:heart-handshake",
    title: "Respect & Inclusion",
    description:
      "Base42 works when people of different ages, backgrounds, disciplines, and skill levels feel safe being fully present. Curiosity is welcome. Gatekeeping is not.",
  },
  {
    icon: "lucide:graduation-cap",
    title: "Teach What You Learn",
    description:
      "A workshop, a short demo, a repo link, a hallway explanation — every act of teaching compounds the value of the space for everyone else.",
  },
  {
    icon: "lucide:git-branch-plus",
    title: "Build in the Open",
    description:
      "Progress beats polish. Show prototypes early, ask for feedback, and let unfinished work become a conversation instead of a private struggle.",
  },
  {
    icon: "lucide:users-round",
    title: "Community Over Ego",
    description:
      "Your title, stack, and follower count matter less than how you treat people. The strongest builders here make room for others to build too.",
  },
  {
    icon: "lucide:sparkles",
    title: "Leave It Better Than You Found It",
    description:
      "Improve the wiki page. Rewind the cable. Wipe the table. Fix the script. Small acts of stewardship are the operating system of a healthy hackerspace.",
  },
];

const codeOfConduct = [
  {
    icon: "lucide:message-circle-heart",
    title: "Speak with respect",
    description: "Debate ideas hard if you want, but never weaponize tone, ridicule, or personal attacks against the people behind them.",
  },
  {
    icon: "lucide:shield-alert",
    title: "No harassment, ever",
    description: "Harassment, intimidation, discrimination, stalking, unwanted advances, or exclusionary behavior are incompatible with this space.",
  },
  {
    icon: "lucide:brush-cleaning",
    title: "Keep the space clean",
    description: "Shared environments decay fast when everyone assumes someone else will handle it. Reset your station before you leave.",
  },
  {
    icon: "lucide:hand-metal",
    title: "Share equipment fairly",
    description: "Use common tools with awareness. If others are waiting, rotate. If a setup is scarce, communicate and coordinate.",
  },
  {
    icon: "lucide:hand-helping",
    title: "Help newcomers orient",
    description: "A kind answer, a quick tour, or an introduction can turn an awkward first visit into a long-term contribution.",
  },
  {
    icon: "lucide:scan-eye",
    title: "Respect active projects",
    description: "Do not move, modify, or dismantle someone else's work without explicit permission, even if it looks abandoned.",
  },
];

const spaceRules = [
  "Clean up your desk, cables, tools, cups, and packaging before you leave.",
  "Label personal parts, devices, and ongoing builds if they will remain in the space.",
  "Ask before using equipment that is clearly assigned, reserved, or part of someone else's workflow.",
  "Report broken tools, damaged furniture, safety issues, or missing supplies as soon as you notice them.",
  "No sleeping in the space. Rest if you need to, but Base42 is not a crash pad.",
  "Respect quiet hours and focused zones when other members are recording, presenting, or doing deep work.",
];

const hackerEthic = [
  {
    label: "01",
    title: "Information wants to circulate",
    text: "Knowledge becomes more useful when it can be inspected, remixed, and taught onward. We default toward openness unless there is a real safety or privacy reason not to.",
  },
  {
    label: "02",
    title: "Judge by contribution, not credentials",
    text: "The best idea in the room may come from the youngest person, the quietest person, or the first-timer with a strange question. Listen for signal, not status.",
  },
  {
    label: "03",
    title: "Make tools and knowledge accessible",
    text: "A true hacker lowers barriers. Document setup steps, explain jargon, and design systems that more people can actually use and understand.",
  },
  {
    label: "04",
    title: "Build with responsibility",
    text: "Being able to make something does not automatically mean you should. Consider safety, consent, sustainability, and the social impact of what you release into the world.",
  },
];

export default function Codex() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Codex")}</Title>
      <Meta
        name="description"
        content="The Base42 Codex outlines the values, conduct, and hacker ethic that shape how our Skopje hackerspace learns, builds, and shares together."
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
            <div class="grid gap-6 items-stretch lg:grid-cols-2">
              <Reveal>
                <div class="rounded-2xl bg-dark-800 border border-border p-8 relative overflow-hidden">
                  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(43,237,237,0.14),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(250,225,39,0.14),transparent_45%)]" />
                  <div class="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px]" />
                  <div class="relative">
                    <p class="font-mono text-sm uppercase tracking-[0.32em] text-secondary mb-4">Shared protocol / human layer</p>
                    <h1 class="text-4xl md:text-6xl font-display font-bold text-text-primary leading-none mb-6">
                      The Base42 <span class="text-gradient">Codex</span>
                    </h1>
                    <p class="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
                      The codex is our social source code: a living agreement about how we explore, collaborate, disagree,
                      maintain the space, and make sure Base42 stays radically useful to the people who walk through its doors.
                    </p>
                    <div class="flex flex-wrap gap-3">
                      <div class="rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-muted font-mono">
                        values.dll
                      </div>
                      <div class="rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-muted font-mono">
                        conduct.sys
                      </div>
                      <div class="rounded-full border border-border bg-dark-700 px-4 py-2 text-sm text-text-muted font-mono">
                        hacker-ethic.md
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-5">
                      <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Icon icon="lucide:cpu" class="text-xl" />
                      </div>
                      <div>
                        <p class="font-display text-text-primary text-xl">Why this exists</p>
                        <p class="text-sm text-text-muted">A shared baseline for a high-trust lab</p>
                      </div>
                    </div>
                    <div class="text-text-secondary leading-relaxed">
                      <p class="mb-4">
                        Great communities do not run on vibes alone. They run on norms people can point to, practice,
                        and defend together.
                      </p>
                      <p>
                        This page is for members, guests, organizers, and collaborators. If you build with us, this is
                        the behavioral interface we expect you to ship against.
                      </p>
                    </div>
                  </div>
                  <div class="mt-8 rounded-2xl bg-dark-800 border border-border p-6">
                    <p class="font-mono text-sm text-primary mb-2">42.mk/codex</p>
                    <p class="text-sm text-text-muted leading-relaxed">
                      Short version: be generous, stay curious, respect people, respect projects, and leave enough order
                      behind that the next person can create immediately.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Core Values"
              subtitle="The principles that shape how Base42 learns, teaches, experiments, and stays welcoming under pressure."
            />
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <For each={coreValues}>
                {(value, index) => (
                  <Reveal delay={index() * 90} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 shrink-0">
                        <Icon icon={value.icon} class="text-xl" />
                      </div>
                      <h3 class="font-display text-2xl text-text-primary mb-3">{value.title}</h3>
                      <p class="text-text-secondary leading-relaxed">{value.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Code of Conduct"
              subtitle="These expectations protect dignity, focus, and the freedom to learn in public without fear of being diminished."
            />
            <div class="grid lg:grid-cols-2 gap-6">
              <For each={codeOfConduct}>
                {(item, index) => (
                  <Reveal delay={index() * 80} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                      <div class="flex items-start gap-4">
                        <div class="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon icon={item.icon} class="text-xl" />
                        </div>
                        <div>
                          <h3 class="font-display text-xl text-text-primary mb-2">{item.title}</h3>
                          <p class="text-text-secondary leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="Space Rules"
              subtitle="Practical habits that keep a shared workshop functional, fair, and ready for the next burst of midnight invention."
            />
            <div class="grid gap-6 items-start lg:grid-cols-2">
              <Reveal>
                <div class="rounded-2xl bg-dark-800 border border-border p-6">
                  <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-5 shrink-0">
                    <Icon icon="lucide:router" class="text-xl" />
                  </div>
                  <h3 class="font-display text-2xl text-text-primary mb-4">Low drama, high signal</h3>
                  <p class="text-text-secondary leading-relaxed mb-6">
                    Shared space only works when basic maintenance is normal, not heroic. These rules are lightweight by
                    design so that trust can stay high and friction can stay low.
                  </p>
                  <div class="rounded-2xl bg-dark-800 border border-border p-6">
                    <p class="font-mono text-sm text-text-muted leading-relaxed">
                      If you're unsure whether something is okay, ask. A thirty-second conversation is cheaper than a
                      broken tool, a damaged project, or a weird community memory.
                    </p>
                  </div>
                </div>
              </Reveal>

              <div class="grid gap-6 sm:grid-cols-2">
                <For each={spaceRules}>
                  {(rule, index) => (
                    <Reveal delay={index() * 70} class="h-full">
                      <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                        <div class="flex items-start gap-4">
                          <span class="min-w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono text-sm">
                            {String(index() + 1).padStart(2, "0")}
                          </span>
                          <p class="text-text-secondary leading-relaxed">{rule}</p>
                        </div>
                      </div>
                    </Reveal>
                  )}
                </For>
              </div>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader
              title="The Hacker Ethic"
              subtitle="Beyond rules, this is the worldview that makes a hackerspace feel like a lab for possibility instead of just another room with Wi-Fi."
            />
            <div class="rounded-2xl bg-dark-800 border border-border p-8 relative overflow-hidden">
              <div class="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(250,225,39,0.08),transparent_60%)]" />
              <div class="relative grid gap-6 items-start lg:grid-cols-2">
                <Reveal>
                  <div>
                    <p class="font-mono text-sm uppercase tracking-[0.3em] text-primary mb-4">Philosophy stack</p>
                    <h3 class="font-display text-3xl md:text-4xl text-text-primary mb-5 leading-tight">
                      Make the system more <span class="text-secondary">understandable</span>, more <span class="text-gradient">shareable</span>, and more humane.
                    </h3>
                    <p class="text-text-secondary leading-relaxed">
                      The hacker ethos is not cynicism, chaos, or cleverness for its own sake. It is the disciplined joy
                      of understanding how things work, improving them, and helping others cross the same bridge.
                    </p>
                  </div>
                </Reveal>

                <div class="space-y-4">
                  <For each={hackerEthic}>
                    {(item, index) => (
                      <Reveal delay={index() * 90}>
                        <div class="rounded-2xl bg-dark-800 border border-border p-6">
                          <div class="flex items-start gap-4">
                            <span class="font-mono text-xs tracking-[0.25em] text-primary bg-primary/10 rounded-full px-3 py-2 shrink-0">
                              {item.label}
                            </span>
                            <div>
                              <h4 class="font-display text-xl text-text-primary mb-2">{item.title}</h4>
                              <p class="text-text-secondary leading-relaxed">{item.text}</p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8">
                <div class="grid gap-6 items-center lg:grid-cols-[1fr_auto]">
                  <div>
                    <p class="font-mono text-sm uppercase tracking-[0.28em] text-secondary mb-4">Need clarification?</p>
                    <h2 class="font-display text-3xl md:text-4xl text-text-primary mb-4">Questions?</h2>
                    <p class="text-text-secondary text-lg leading-relaxed max-w-2xl">
                      If something here feels unclear, situational, or worth discussing, reach out. Good community norms
                      stay strong because people talk about them openly.
                    </p>
                  </div>
                  <a
                    href="mailto:hello@42.mk"
                    class="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-primary hover:bg-primary hover:text-dark-900 transition-colors font-semibold"
                  >
                    <Icon icon="lucide:mail" class="text-xl" />
                    hello@42.mk
                  </a>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
