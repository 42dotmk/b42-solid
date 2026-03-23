import { Meta, Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { A } from "@solidjs/router";
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  CalendarPlus,
  CheckCircle,
  ExternalLink,
  Mail,
  MapPin,
  Projector,
  Send,
  Users,
  Wrench,
  Youtube,
} from "lucide-solid";
import { For, Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import CountUp from "~/components/common/CountUp";
import Reveal from "~/components/common/Reveal";
import EventCard from "~/components/events/EventCard";
import VideoCard from "~/components/videos/VideoCard";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import Tag from "~/components/ui/Tag";
import {
  facilities,
  homeProjects,
  partners,
  siteMeta,
  stats,
} from "~/data/site";
import { getHomePageData } from "~/lib/queries";

export default function Home() {
  const data = createAsync(() => getHomePageData());
  const [formState, setFormState] = createSignal<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = createStore({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setFormState("loading");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState("success");
    setFormData({ name: "", email: "", message: "" });
    window.setTimeout(() => setFormState("idle"), 5000);
  };

  return (
    <>
      <Title>{siteMeta.defaultTitle}</Title>
      <Meta name="description" content={siteMeta.description} />

      <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-dark-900">
          <div class="absolute inset-0 bg-grid opacity-50" />
          <div class="absolute inset-0 gradient-radial opacity-30" />
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
          </div>
        </div>

        <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal duration={800}>
            <div class="mb-8 inline-block">
              <img
                src="/images/logo.svg"
                alt="Base42"
                class="w-64 sm:w-80 md:w-96 h-auto drop-shadow-[0_0_25px_rgba(250,225,39,0.4)] hover:drop-shadow-[0_0_35px_rgba(43,237,237,0.5)] transition-all duration-500"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-4">
              A place for <span class="text-gradient">builders</span>,<br />
              and the <span class="text-secondary">curious</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p class="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">Hackerspace in Skopje, Macedonia</p>
          </Reveal>

          <Reveal delay={600}>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join Discord
                </Button>
              </a>
              <A href="/events">
                <Button size="lg" variant="outline">
                  Upcoming Events
                  <ExternalLink class="w-4 h-4" />
                </Button>
              </A>
            </div>
          </Reveal>

          <Reveal delay={800}>
            <div class="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-border text-sm text-text-muted">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>217 online</span>
              <span class="text-border">·</span>
              <span>1,076 members</span>
            </div>
          </Reveal>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown class="w-6 h-6 text-text-muted" />
        </div>

        <div class="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-primary/50 animate-float" style={{ "animation-delay": "0s" }} />
        <div class="absolute top-1/3 right-20 w-1.5 h-1.5 rounded-full bg-secondary/50 animate-float" style={{ "animation-delay": "1s" }} />
        <div class="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-primary/30 animate-float" style={{ "animation-delay": "2s" }} />
        <div class="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-secondary/30 animate-float" style={{ "animation-delay": "3s" }} />
      </section>

      <section id="about" class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="About Us" />
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div class="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                <img src="/images/hero-space.jpg" alt="Base42 Hackerspace" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                <div class="absolute bottom-6 left-6 right-6">
                  <p class="text-primary font-mono text-sm">// Rimska 25, Skopje</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div class="space-y-6">
                <blockquote class="text-2xl md:text-3xl font-display font-semibold text-text-primary leading-tight">
                  "We believe knowledge should be <span class="text-primary">proliferated</span> as much as possible."
                </blockquote>
                <p class="text-text-secondary text-lg leading-relaxed">
                  Base42 is a hackerspace, not a coworking space. We're about open learning, peer collaboration,
                  and sharing knowledge freely.
                </p>
                <p class="text-text-secondary text-lg leading-relaxed">
                  Founded in Skopje, we provide a space where builders, makers, developers, and curious minds gather to
                  learn, create, and grow together.
                </p>
                <div class="p-4 rounded-lg bg-dark-700 border-l-4 border-primary">
                  <p class="text-text-primary font-mono text-sm">"You go to an office to work, you come to a hackerspace to hack."</p>
                </div>
                <A href="/about">
                  <Button variant="ghost" class="group mt-4">
                    Learn more about us
                    <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </A>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="facilities" class="py-24 bg-dark-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Space" subtitle="Everything you need to build, learn, and connect" />
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <For each={facilities}>
              {(facility, index) => (
                <Reveal delay={index() * 100}>
                  <div class="group relative rounded-xl overflow-hidden bg-dark-700 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                    <div class="relative aspect-[4/3] overflow-hidden">
                      <img src={facility.image} alt={facility.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-5">
                      <div class="flex items-center gap-3 mb-2">
                        <div class="p-2 rounded-lg bg-primary/10 text-primary">
                          <facility.icon class="w-5 h-5" />
                        </div>
                        <h3 class="font-display font-semibold text-text-primary">{facility.title}</h3>
                      </div>
                      <p class="text-sm text-text-muted">{facility.description}</p>
                    </div>
                  </div>
                </Reveal>
              )}
            </For>
          </div>
        </div>
      </section>

      <section class="py-16 bg-dark-800 border-y border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <For each={stats}>
                {(stat, index) => (
                  <div class="text-center" style={{ "transition-delay": `${index() * 100}ms` }}>
                    <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                      <stat.icon class="w-6 h-6" />
                    </div>
                    <div class="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div class="text-sm text-text-muted">{stat.label}</div>
                  </div>
                )}
              </For>
            </div>
          </Reveal>
        </div>
      </section>

      <section class="py-20 bg-dark-900 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <div class="rounded-2xl border border-primary/30 bg-dark-800/50 p-8 md:p-12 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                <CalendarPlus class="w-8 h-8" />
              </div>
              <h2 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">Host Your Event at Base42</h2>
              <p class="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                Looking for a space for your meetup, workshop, or hackathon? Our venue is free for community tech events.
              </p>
              <div class="flex flex-wrap justify-center gap-6 mb-8">
                <div class="flex items-center gap-2 text-text-muted">
                  <Users class="w-5 h-5 text-primary" />
                  <span>Up to 80 people</span>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Projector class="w-5 h-5 text-primary" />
                  <span>A/V Equipment</span>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Wrench class="w-5 h-5 text-primary" />
                  <span>Workshop Tools</span>
                </div>
              </div>
              <A href="/book">
                <Button size="lg">
                  <CalendarPlus class="w-5 h-5" />
                  Book the Space
                </Button>
              </A>
            </div>
          </Reveal>
        </div>
      </section>

      <section class="py-24 bg-dark-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Upcoming Events" subtitle="Where builders, hackers, and curious minds gather" />
          <Show when={data()}>
            {pageData => (
              <Show
                when={pageData().upcomingEvents.length > 0}
                fallback={
                  <Reveal>
                    <div class="text-center py-16 px-4 rounded-2xl bg-dark-800 border border-border">
                      <p class="text-text-secondary text-lg mb-4">No upcoming events scheduled at the moment.</p>
                      <p class="text-text-muted mb-6">Check back soon or join our Discord for announcements!</p>
                      <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                        <Button>Join Discord</Button>
                      </a>
                    </div>
                  </Reveal>
                }
              >
                <>
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <For each={pageData().upcomingEvents}>
                      {(event, index) => (
                        <Reveal delay={index() * 100}>
                          <EventCard event={event} />
                        </Reveal>
                      )}
                    </For>
                  </div>
                  <Reveal delay={400}>
                    <div class="mt-12 text-center">
                      <A href="/events">
                        <Button variant="outline" size="lg">
                          View All Events
                          <ArrowRight class="w-4 h-4" />
                        </Button>
                      </A>
                    </div>
                  </Reveal>
                </>
              </Show>
            )}
          </Show>
        </div>
      </section>

      <section class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Videos" subtitle="Catch up on recordings from our community events" />
          <Show when={data()}>
            {pageData => (
              <Show
                when={pageData().latestVideos.length > 0}
                fallback={
                  <Reveal>
                    <div class="text-center py-16 px-4 rounded-2xl bg-dark-900 border border-border">
                      <Youtube class="w-12 h-12 text-text-muted mx-auto mb-4" />
                      <p class="text-text-secondary text-lg mb-4">No videos available yet.</p>
                      <p class="text-text-muted mb-6">Subscribe to our YouTube channel for updates!</p>
                      <a href={siteMeta.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                          <Youtube class="w-4 h-4" />
                          Subscribe on YouTube
                        </Button>
                      </a>
                    </div>
                  </Reveal>
                }
              >
                <>
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <For each={pageData().latestVideos}>
                      {(video, index) => (
                        <Reveal delay={index() * 100}>
                          <VideoCard video={video} />
                        </Reveal>
                      )}
                    </For>
                  </div>
                  <Reveal delay={400}>
                    <div class="mt-12 text-center">
                      <A href="/videos">
                        <Button variant="outline" size="lg">
                          View All Videos
                          <ArrowRight class="w-4 h-4" />
                        </Button>
                      </A>
                    </div>
                  </Reveal>
                </>
              </Show>
            )}
          </Show>
        </div>
      </section>

      <section id="projects" class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Projects" subtitle="Open source initiatives and working groups" />
          <div class="grid md:grid-cols-2 gap-6">
            <For each={homeProjects}>
              {(project, index) => (
                <Reveal delay={index() * 100}>
                  <div class="p-6 rounded-xl bg-dark-700 border border-border hover:border-primary/50 transition-all duration-300 group">
                    <div class="flex items-start gap-4">
                      <div class="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                        <project.icon class="w-6 h-6" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="font-display font-semibold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p class="text-text-muted text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                          <For each={project.tags}>{tag => <Tag name={tag} />}</For>
                        </div>
                        <Show when={project.github}>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors"
                          >
                            View on GitHub
                          </a>
                        </Show>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </For>
          </div>
        </div>
      </section>

      <section class="py-24 bg-dark-900 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Community Partners" subtitle="Organizations we collaborate with" />
          <Reveal>
            <div class="relative">
              <div class="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-10" />
              <div class="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-10" />
              <div class="overflow-hidden">
                <div class="flex gap-8 animate-marquee hover:[animation-play-state:paused]">
                  <For each={[...partners, ...partners]}>
                    {(partner, index) => (
                      <div
                        class="flex-shrink-0 px-6 py-4 rounded-xl bg-dark-800 border border-border hover:border-primary/30 transition-colors group"
                        data-index={index()}
                      >
                        {partner.logo ? (
                          <div class="relative w-24 h-12 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            <img src={partner.logo} alt={partner.name} class="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <span class="text-sm font-medium text-text-muted group-hover:text-text-primary transition-colors whitespace-nowrap">
                            {partner.name}
                          </span>
                        )}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Contact" subtitle="Get in touch or visit us" />
          <div class="grid lg:grid-cols-2 gap-12">
            <Reveal direction="left">
              <div class="p-8 rounded-2xl bg-dark-700 border border-border">
                <h3 class="text-xl font-display font-semibold text-text-primary mb-6">Send us a message</h3>
                <form onSubmit={handleSubmit} class="space-y-5">
                  <div>
                    <label for="name" class="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onInput={event => setFormData("name", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onInput={event => setFormData("email", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="[email protected]"
                    />
                  </div>
                  <div>
                    <label for="message" class="block text-sm font-medium text-text-secondary mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows="5"
                      value={formData.message}
                      onInput={event => setFormData("message", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                  <Button type="submit" size="lg" class="w-full" disabled={formState() === "loading" || formState() === "success"}>
                    {formState() === "loading" ? (
                      <>
                        <span class="animate-spin">◐</span>
                        Sending...
                      </>
                    ) : formState() === "success" ? (
                      <>
                        <CheckCircle class="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send class="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                  <Show when={formState() === "error"}>
                    <div class="flex items-center gap-2 text-error text-sm">
                      <AlertCircle class="w-4 h-4" />
                      Something went wrong. Please try again.
                    </div>
                  </Show>
                </form>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div class="space-y-6">
                <div class="relative aspect-video rounded-2xl overflow-hidden bg-dark-700 border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.145!2d21.4310!3d41.9970!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDU5JzQ5LjIiTiAyMcKwMjUnNTEuNiJF!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: "0", filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Base42 Location"
                  />
                </div>

                <div class="p-6 rounded-xl bg-dark-700 border border-border space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="p-2 rounded-lg bg-primary/10 text-primary">
                      <MapPin class="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-text-primary">Location</h4>
                      <p class="text-text-muted">Rimska 25, Skopje, North Macedonia</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="p-2 rounded-lg bg-primary/10 text-primary">
                      <Mail class="w-5 h-5" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-text-primary">Email</h4>
                      <a href="mailto:[email protected]" class="text-text-muted hover:text-primary transition-colors">
                        [email protected]
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="https://discord.gg/424xxTZVYX"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] hover:bg-[#5865F2]/30 transition-colors"
                >
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <span class="font-semibold">Join our Discord Community</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
