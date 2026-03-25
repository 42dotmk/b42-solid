import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import CountUp from "~/components/common/CountUp";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { aboutTimeline, aboutValues, siteMeta } from "~/data/site";

export default function About() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("About")}</Title>
      <Meta
        name="description"
        content="Learn about Base42, a hackerspace in Skopje dedicated to builders, makers, and curious minds."
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
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div>
                  <h1 class="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
                    A Place for <span class="text-gradient">Builders</span> and the <span class="text-secondary">Curious</span>
                  </h1>
                  <p class="text-xl text-text-secondary mb-6 leading-relaxed">
                    Base42 is a hackerspace in Skopje, Macedonia. We're not a coworking space. We're a community
                    of makers, developers, and curious minds who believe in the power of open knowledge.
                  </p>
                  <blockquote class="border-l-4 border-primary pl-4 text-lg text-text-primary italic">
                    "You go to an office to work, you come to a hackerspace to hack."
                  </blockquote>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div class="relative">
                  <div class="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img src="/images/hero-space.jpg" alt="Base42 Hackerspace" class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute -bottom-6 -left-6 bg-dark-800 border border-border rounded-xl p-4 shadow-xl">
                    <div class="flex items-center gap-4">
                      <div class="text-center">
                        <div class="text-2xl font-display font-bold text-primary">
                          <CountUp end={1076} />
                        </div>
                        <div class="text-xs text-text-muted">Members</div>
                      </div>
                      <div class="h-10 w-px bg-border" />
                      <div class="text-center">
                        <div class="text-2xl font-display font-bold text-secondary">
                          <CountUp end={50} suffix="+" />
                        </div>
                        <div class="text-xs text-text-muted">Events</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="bg-dark-800 rounded-2xl p-8 md:p-12 border border-border">
                <h2 class="text-3xl font-display font-bold text-text-primary mb-6 text-center">Our Mission</h2>
                <p class="text-xl text-text-secondary text-center max-w-3xl mx-auto leading-relaxed">
                  We believe <span class="text-primary font-semibold">knowledge should be proliferated as much as possible</span>.
                  Base42 exists to provide a space where anyone can learn, create, and share free from proprietary
                  interests.
                </p>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Our Story" subtitle="How a garage became a movement" />
            <div class="space-y-16">
              <Reveal>
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span class="text-primary font-mono text-sm">Chapter 01</span>
                    <h3 class="text-2xl font-display font-bold text-text-primary mt-2 mb-4">It Started With a Question</h3>
                    <div class="space-y-4 text-text-secondary leading-relaxed">
                      <p>
                        In 2019, a small group of developers in Skopje found themselves asking the same question:
                        <em class="text-text-primary"> "Where do we go to learn, experiment, and build things together?"</em>
                      </p>
                      <p>
                        The coffee shops were too noisy. The offices were too corporate. The universities were too
                        formal. What they needed was something different: a space that felt like home but buzzed
                        with the energy of creation.
                      </p>
                      <p>
                        They called it Base42, a nod to Douglas Adams' "Answer to the Ultimate Question of Life, the Universe,
                        and Everything."
                      </p>
                    </div>
                  </div>
                  <div class="relative aspect-video rounded-2xl overflow-hidden bg-dark-700">
                    <img src="/images/space-lounge.jpg" alt="Early days at Base42" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                    <div class="absolute bottom-4 left-4 text-sm text-text-muted font-mono">// where it all began</div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <div class="order-2 md:order-1 relative aspect-video rounded-2xl overflow-hidden bg-dark-700">
                    <img src="/images/space-events.jpg" alt="Community gathering at Base42" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                    <div class="absolute bottom-4 left-4 text-sm text-text-muted font-mono">// the community grows</div>
                  </div>
                  <div class="order-1 md:order-2">
                    <span class="text-primary font-mono text-sm">Chapter 02</span>
                    <h3 class="text-2xl font-display font-bold text-text-primary mt-2 mb-4">From Garage to Community</h3>
                    <div class="space-y-4 text-text-secondary leading-relaxed">
                      <p>
                        What started as a handful of friends meeting in a cramped room quickly grew into something bigger.
                        Word spread. Developers, designers, students, and hobbyists started showing up.
                      </p>
                      <p>
                        They came for the free WiFi and stayed for the conversations. The magic of Base42 wasn't the space.
                        It was the <span class="text-primary">collisions</span>.
                      </p>
                      <p>
                        Knowledge started flowing in every direction: frontend developers learning hardware, students
                        learning from seniors, and newcomers teaching old-timers about the latest tools.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span class="text-primary font-mono text-sm">Chapter 03</span>
                    <h3 class="text-2xl font-display font-bold text-text-primary mt-2 mb-4">Not a Coworking Space</h3>
                    <div class="space-y-4 text-text-secondary leading-relaxed">
                      <p>People often ask if Base42 is like a coworking space. No. It's the opposite.</p>
                      <p>
                        Coworking spaces are about productivity and profit. Base42 is about curiosity and sharing.
                        You don't come here to answer emails. You come here to take apart a robot or learn how to solder.
                      </p>
                      <p>
                        We have one rule: <span class="text-primary font-semibold">if you learn something, teach it to someone else</span>.
                      </p>
                    </div>
                  </div>
                  <div class="relative aspect-video rounded-2xl overflow-hidden bg-dark-700">
                    <img src="/images/space-workshop.jpg" alt="Hands-on workshop at Base42" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                    <div class="absolute bottom-4 left-4 text-sm text-text-muted font-mono">// learn by doing</div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div class="grid md:grid-cols-2 gap-8 items-center">
                  <div class="order-2 md:order-1 relative aspect-video rounded-2xl overflow-hidden bg-dark-700">
                    <img src="/images/space-3dprint.jpg" alt="3D printing and making at Base42" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                    <div class="absolute bottom-4 left-4 text-sm text-text-muted font-mono">// building the future</div>
                  </div>
                  <div class="order-1 md:order-2">
                    <span class="text-primary font-mono text-sm">Chapter 04</span>
                    <h3 class="text-2xl font-display font-bold text-text-primary mt-2 mb-4">Where We're Going</h3>
                    <div class="space-y-4 text-text-secondary leading-relaxed">
                      <p>
                        Today, Base42 is home to over 1,000 community members. We host 50+ events per year and collaborate
                        with partner organizations across Macedonia.
                      </p>
                      <p>
                        But we're just getting started. Our vision is to make Base42 a blueprint for community-driven
                        learning spaces that anyone can adapt.
                      </p>
                      <p>
                        Because we don't just believe in open source software. We believe in <span class="text-secondary">open source everything</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <Reveal>
              <div class="relative py-12">
                <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl" />
                <blockquote class="relative text-center px-8">
                  <span class="text-6xl text-primary/20 font-serif absolute top-0 left-8">"</span>
                  <p class="text-2xl md:text-3xl font-display text-text-primary max-w-4xl mx-auto leading-relaxed">
                    The best thing about Base42 isn't the 3D printers or the event space. It's walking in as a stranger
                    and leaving as part of a community that genuinely wants to see you succeed.
                  </p>
                  <footer class="mt-6 text-text-muted">- A Base42 community member</footer>
                </blockquote>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Our Values" subtitle="What drives us every day" />
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <For each={aboutValues}>
                {(value, index) => (
                  <Reveal delay={index() * 100}>
                    <div class="p-6 rounded-xl bg-dark-700 border border-border hover:border-primary/50 transition-colors h-full">
                      <div class="flex items-center justify-center rounded-lg bg-primary/10 text-primary w-12 h-12 mb-4 shrink-0">
                        <Icon icon={value.icon} class="text-2xl" />
                      </div>
                      <h3 class="font-display font-semibold text-text-primary mb-2">{value.title}</h3>
                      <p class="text-sm text-text-muted">{value.description}</p>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Our Space" subtitle="Where the magic happens" />
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Reveal>
                <div class="aspect-square rounded-xl overflow-hidden col-span-2 row-span-2">
                  <img src="/images/space-events.jpg" alt="Events Hall" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div class="aspect-square rounded-xl overflow-hidden">
                  <img src="/images/space-3dprint.jpg" alt="3D Printing Area" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
              <Reveal delay={150}>
                <div class="aspect-square rounded-xl overflow-hidden">
                  <img src="/images/space-lounge.jpg" alt="Lounge" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div class="aspect-square rounded-xl overflow-hidden col-span-2">
                  <img src="/images/space-workshop.jpg" alt="Workshop" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Our Journey" subtitle="How we got here" />
            <div class="relative">
              <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
              <div class="space-y-12">
                <For each={aboutTimeline}>
                  {(item, index) => (
                    <Reveal delay={index() * 100}>
                      <div class={`relative flex flex-col md:flex-row gap-8 ${index() % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                        <div class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-1" />
                        <div class={`flex-1 pl-12 md:pl-0 ${index() % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                          <span class="text-primary font-mono text-sm">{item.year}</span>
                          <h3 class="text-xl font-display font-semibold text-text-primary mt-1 mb-2">{item.title}</h3>
                          <p class="text-text-muted">{item.description}</p>
                        </div>
                        <div class="hidden md:block flex-1" />
                      </div>
                    </Reveal>
                  )}
                </For>
              </div>
            </div>
          </section>

          <section>
            <SectionHeader title="Visit Us" subtitle="Come say hello" />
            <div class="grid md:grid-cols-2 gap-8">
              <Reveal>
                <div class="aspect-video rounded-2xl overflow-hidden bg-dark-700">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.145!2d21.4310!3d41.9970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU5JzQ5LjIiTiAyMcKwMjUnNTEuNiJF!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: "0", filter: "invert(90%) hue-rotate(180deg)" }}
                    allowfullscreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Base42 Location"
                  />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div class="bg-dark-800 rounded-2xl p-8 border border-border h-full flex flex-col justify-center">
                  <h3 class="text-2xl font-display font-semibold text-text-primary mb-6">Get in Touch</h3>
                  <div class="space-y-4 mb-8">
                    <div class="flex items-start gap-4">
                      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon icon="lucide:map-pin" class="text-xl" />
                      </div>
                      <div>
                        <div class="font-semibold text-text-primary">Location</div>
                        <div class="text-text-muted">Rimska 25, Skopje, North Macedonia</div>
                      </div>
                    </div>
                    <div class="flex items-start gap-4">
                      <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon icon="lucide:mail" class="text-xl" />
                      </div>
                      <div>
                        <div class="font-semibold text-text-primary">Email</div>
                        <a href="mailto:[email protected]" class="text-text-muted hover:text-primary transition-colors">
                          [email protected]
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-3">
                    <A href="/book" class="flex-1">
                      <Button class="w-full">Book the Space</Button>
                    </A>
                    <a href="/#contact" class="flex-1">
                      <Button variant="outline" class="w-full">
                        Contact Us
                      </Button>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
