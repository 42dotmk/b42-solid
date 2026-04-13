import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For, Show, createSignal, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import CountUp from "~/components/common/CountUp";
import Reveal from "~/components/common/Reveal";
import EventCard from "~/components/events/EventCard";
import VideoCard from "~/components/videos/VideoCard";
import VideoModal from "~/components/videos/VideoModal";
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
import type { Event } from "~/types";
import type { YouTubeVideo } from "~/types";
import { getUpcomingEvents } from "~/lib/api";
import { useDiscordCounts } from "~/lib/discord";
import { getChannelVideos } from "~/lib/youtube";

function EventCardSkeleton() {
  return (
    <div class="rounded-xl bg-dark-700 border border-border overflow-hidden animate-pulse">
      <div class="aspect-video skeleton" />
      <div class="p-5 space-y-3">
        <div class="h-4 w-20 skeleton rounded" />
        <div class="h-6 w-3/4 skeleton rounded" />
        <div class="h-4 w-1/2 skeleton rounded" />
      </div>
    </div>
  );
}

function VideoCardSkeleton() {
  return (
    <div class="rounded-xl bg-dark-700 border border-border overflow-hidden animate-pulse">
      <div class="aspect-video skeleton" />
      <div class="p-4 space-y-2">
        <div class="h-5 w-3/4 skeleton rounded" />
        <div class="h-4 w-1/2 skeleton rounded" />
      </div>
    </div>
  );
}

function EventsSkeletonGrid() {
  return (
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  );
}

function VideosSkeletonGrid() {
  return (
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
    </div>
  );
}

function UpcomingEventsSection() {
  const [events, setEvents] = createSignal<Event[] | null>(null);

  onMount(async () => {
    const result = await getUpcomingEvents(3);
    setEvents(result.data);
  });

  return (
    <Show when={events() !== null} fallback={<EventsSkeletonGrid />}>
      <Show
        when={events()!.length > 0}
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
            <For each={events()!}>
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
                  <Icon icon="lucide:arrow-right" class="w-4 h-4" />
                </Button>
              </A>
            </div>
          </Reveal>
        </>
      </Show>
    </Show>
  );
}

function LatestVideosSection() {
  const [videos, setVideos] = createSignal<YouTubeVideo[] | null>(null);
  const [selectedVideo, setSelectedVideo] = createSignal<YouTubeVideo | null>(null);

  onMount(async () => {
    const allVideos = await getChannelVideos();
    setVideos(allVideos.slice(0, 3));
  });

  return (
    <Show when={videos() !== null} fallback={<VideosSkeletonGrid />}>
      <Show
        when={videos()!.length > 0}
        fallback={
          <Reveal>
            <div class="text-center py-16 px-4 rounded-2xl bg-dark-900 border border-border">
              <Icon icon="lucide:youtube" class="text-6xl text-text-muted mx-auto mb-6" />
              <p class="text-text-secondary text-lg mb-4">No videos available yet.</p>
              <p class="text-text-muted mb-6">Subscribe to our YouTube channel for updates!</p>
              <a href={siteMeta.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <Icon icon="lucide:youtube" class="text-lg" />
                  Subscribe on YouTube
                </Button>
              </a>
            </div>
          </Reveal>
        }
      >
        <>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <For each={videos()!}>
              {(video, index) => (
                <Reveal delay={index() * 100}>
                  <VideoCard video={video} onPlay={setSelectedVideo} />
                </Reveal>
              )}
            </For>
          </div>
          <Reveal delay={400}>
            <div class="mt-12 text-center">
              <A href="/videos">
                <Button variant="outline" size="lg">
                  View All Videos
                  <Icon icon="lucide:arrow-right" class="w-4 h-4" />
                </Button>
              </A>
            </div>
          </Reveal>
          <VideoModal
            video={selectedVideo()}
            isOpen={!!selectedVideo()}
            onClose={() => setSelectedVideo(null)}
          />
        </>
      </Show>
    </Show>
  );
}

export default function Home() {
  const hackWords = ["hack", "build", "ship", "break", "make", "code", "fork", "debug", "explore", "create", "tinker", "teach"];
  const [hackIndex, setHackIndex] = createSignal(0);
  const hackInterval = setInterval(() => setHackIndex(i => (i + 1) % hackWords.length), 250);
  onCleanup(() => clearInterval(hackInterval));

  const [selectedFacility, setSelectedFacility] = createSignal(0);

  const { online: discordOnline, members: discordMembers } = useDiscordCounts();

  const liveStats = () =>
    stats.map(s =>
      s.label === "Discord Members" && discordMembers() !== null
        ? { ...s, value: discordMembers()! }
        : s,
    );

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


      <section class="relative min-h-screen flex flex-col overflow-hidden">
        <div class="absolute inset-0 bg-dark-900">
          <div class="absolute inset-0 bg-grid opacity-50" />
          <div class="absolute inset-0 gradient-radial opacity-30" />
          <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" />
          </div>
          <div class="hidden lg:block absolute inset-y-0 right-0 w-1/2">
            <img src="/images/IMG_3440.jpeg" alt="" class="w-full h-full object-cover object-center" />
            <div class="absolute inset-0" style={{ background: "linear-gradient(to right, var(--color-dark-900) 0%, rgba(250, 225, 39, 0.25) 15%, rgba(250, 225, 39, 0.12) 40%, transparent 70%)" }} />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
          </div>
        </div>

        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          <div class="grid lg:grid-cols-2 flex-1 items-center">
            <div class="text-left py-12">
              <Reveal delay={200}>
                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-4">
                  The <span class="text-primary">Community</span><br /> of <span class="text-secondary">Communities</span>
                </h1>
              </Reveal>

              <Reveal delay={400}>
                <p class="text-lg sm:text-xl text-text-secondary max-w-xl mb-6">IT, geek culture and beyond!</p>
              </Reveal>

              <Reveal delay={600}>
                <div class="flex flex-col sm:flex-row items-start gap-4 mb-6">
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
                      Event Calendar
                      <Icon icon="lucide:external-link" class="w-4 h-4" />
                    </Button>
                  </A>
                </div>
              </Reveal>

              <Reveal delay={800}>
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/50 border border-border text-sm text-text-muted">
                  <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{discordOnline() ?? 207} online</span>
                  <span class="text-border">·</span>
                  <span>{(discordMembers() ?? 1122).toLocaleString()} members</span>
                </div>
              </Reveal>
            </div>

            <div class="hidden lg:block" />
          </div>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon icon="lucide:arrow-down" class="w-6 h-6 text-text-muted" />
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
                    <Icon icon="lucide:arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </A>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="facilities" class="py-20 bg-dark-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our Space" subtitle="Everything you need to build, learn, and connect" />

          <Reveal>
            <div class="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-border bg-dark-800 mb-4">
              <For each={facilities}>
                {(facility, i) => (
                  <img
                    src={facility.image}
                    alt={facility.title}
                    class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i() === selectedFacility() ? "opacity-100" : "opacity-0"}`}
                  />
                )}
              </For>
              <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div class="flex items-center gap-3 mb-1">
                  <div class="p-2 rounded-lg bg-primary/10 text-primary backdrop-blur-sm">
                    <Icon icon={facilities[selectedFacility()].icon} class="text-xl" />
                  </div>
                  <h3 class="text-xl md:text-2xl font-display font-semibold text-text-primary">
                    {facilities[selectedFacility()].title}
                  </h3>
                </div>
                <p class="text-text-secondary max-w-lg text-sm md:text-base">
                  {facilities[selectedFacility()].description}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
              <For each={facilities}>
                {(facility, index) => (
                  <button
                    type="button"
                    onClick={() => setSelectedFacility(index())}
                    class={`group relative rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${index() === selectedFacility()
                      ? "border-primary ring-1 ring-primary/50"
                      : "border-border hover:border-primary/30"
                      }`}
                  >
                    <div class="aspect-[4/3] relative">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        class="w-full h-full object-cover"
                      />
                      <div class={`absolute inset-0 transition-opacity duration-200 ${index() === selectedFacility() ? "bg-primary/10" : "bg-dark-900/40 group-hover:bg-dark-900/20"}`} />
                    </div>
                    <div class={`px-2 py-1.5 text-center ${index() === selectedFacility() ? "bg-primary/10" : "bg-dark-800"}`}>
                      <span class={`font-display font-semibold text-xs truncate block ${index() === selectedFacility() ? "text-primary" : "text-text-muted"}`}>
                        {facility.title}
                      </span>
                    </div>
                  </button>
                )}
              </For>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div class="mt-6 text-center">
              <A href="/space">
                <Button variant="outline" size="lg">
                  Explore the Full Space
                  <Icon icon="lucide:arrow-right" class="w-4 h-4" />
                </Button>
              </A>
            </div>
          </Reveal>
        </div>
      </section>

      <section class="py-16 bg-dark-800 border-y border-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
              <For each={liveStats()}>
                {(stat, index) => (
                  <div class="text-center" style={{ "transition-delay": `${index() * 100}ms` }}>
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon icon={stat.icon} class="text-4xl" />
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
        <div class="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5" />
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Reveal>
            <div class="rounded-2xl border border-primary/30 bg-dark-800/50 p-8 md:p-12 text-center">

              <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
                <Icon icon="lucide:calendar-plus" class="text-5xl" />
              </div>

              <h2 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">Host Your Event at Base42</h2>
              <p class="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                Looking for a space for your meetup, workshop, or hackathon? Our venue is free for community tech events.
              </p>
              <div class="flex flex-wrap justify-center gap-6 mb-8">
                <div class="flex items-center gap-2 text-text-muted">
                  <Icon icon="lucide:users" class="text-xl text-primary" />
                  <span>Up to 120 people</span>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Icon icon="lucide:projector" class="text-xl text-primary" />
                  <span>Full Stage & A/V</span>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Icon icon="lucide:wrench" class="text-xl text-primary" />
                  <span>Workshop & Maker Tools</span>
                </div>
                <div class="flex items-center gap-2 text-text-muted">
                  <Icon icon="lucide:server" class="text-xl text-primary" />
                  <span>On-site Server Rack</span>
                </div>
              </div>
              <A href="/book">
                <Button size="lg">
                  <Icon icon="lucide:calendar-plus" class="text-xl" />
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
          <UpcomingEventsSection />
        </div>
      </section>

      <section class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Latest Videos" subtitle="Catch up on recordings from our community events" />
          <LatestVideosSection />
        </div>
      </section>

      <section id="projects" class="py-24 bg-dark-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Projects" subtitle="Open source initiatives and working groups" />

          <div class="text-center pb-24">
            <Reveal delay={500}>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary">
                Come and{" "}
                <span class={`underline underline-offset-4 decoration-2 transition-colors ${hackIndex() % 2 === 0 ? "text-primary decoration-primary" : "text-secondary decoration-secondary"}`}>
                  {hackWords[hackIndex()]}
                </span>{" "}
                Base42 with us!
              </h2>
            </Reveal>
          </div>
          <div class="grid md:grid-cols-2 gap-6">
            <For each={homeProjects}>
              {(project, index) => (
                <Reveal delay={index() * 100}>
                  <div class="p-6 rounded-xl bg-dark-700 border border-border hover:border-primary/50 transition-all duration-300 group">
                    <div class="flex items-start gap-4">
                      <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon icon={project.icon} class="text-2xl" />
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
                        <Icon icon="lucide:check-circle" class="text-xl" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Icon icon="lucide:send" class="text-xl" />
                        Send Message
                      </>
                    )}
                  </Button>
                  <Show when={formState() === "error"}>
                    <div class="flex items-center gap-2 text-error text-sm">
                      <Icon icon="lucide:alert-circle" class="w-4 h-4" />
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
                    allowfullscreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Base42 Location"
                  />
                </div>

                <div class="p-6 rounded-xl bg-dark-700 border border-border space-y-4">
                  <div class="flex items-start gap-4">
                    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon icon="lucide:map-pin" class="text-xl" />
                    </div>
                    <div>
                      <h4 class="font-semibold text-text-primary">Location</h4>
                      <p class="text-text-muted">Rimska 25, Skopje, North Macedonia</p>
                    </div>
                  </div>

                  <div class="flex items-start gap-4">
                    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon icon="lucide:mail" class="text-xl" />
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
