import { Meta, Title } from "@solidjs/meta";
import { createAsync, useParams } from "@solidjs/router";
import { A } from "@solidjs/router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Facebook,
  MapPin,
  Share2,
  Twitter,
} from "lucide-solid";
import { For, Show } from "solid-js";
import NotFoundPage from "~/components/common/NotFoundPage";
import Reveal from "~/components/common/Reveal";
import EventCard from "~/components/events/EventCard";
import ShareButton from "~/components/events/ShareButton";
import Button from "~/components/ui/Button";
import Tag from "~/components/ui/Tag";
import { siteMeta } from "~/data/site";
import { getImageUrl } from "~/lib/api";
import { getEventPageData } from "~/lib/queries";
import { createGoogleCalendarUrl, formatDate, formatTime, getShareUrls, isEventPast } from "~/lib/utils";

export default function EventPage() {
  const params = useParams();
  const data = createAsync(() => getEventPageData(params.slug));

  return (
    <>
      <Show when={data()?.event} fallback={<Title>{siteMeta.titleTemplate("Event Not Found")}</Title>}>
        {event => (
          <>
            <Title>{siteMeta.titleTemplate(event().title)}</Title>
            <Meta name="description" content={event().summary || event().description.slice(0, 160)} />
          </>
        )}
      </Show>

      <Show when={data()} fallback={<div class="min-h-screen pt-24" />}>
        {pageData => {
          const details = pageData();
          if (!details) return <NotFoundPage />;

          const shareUrls = getShareUrls(details.event.title, `${siteMeta.siteUrl}/events/${details.event.slug}`);
          const isPast = isEventPast(details.event.start);
          const imageUrl = getImageUrl(details.event.promo?.url);
          const calendarUrl =
            details.event.calendarUrl ||
            createGoogleCalendarUrl(details.event.title, details.event.start, details.event.description);

          return (
            <div class="min-h-screen pt-20">
              <div class="relative aspect-[21/9] max-h-[400px] w-full overflow-hidden bg-dark-800">
                <img src={imageUrl} alt={details.event.title} class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
              </div>

              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <Reveal>
                  <A href="/events" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6">
                    <ArrowLeft class="w-4 h-4" />
                    Back to Events
                  </A>
                </Reveal>

                <div class="grid lg:grid-cols-3 gap-8">
                  <div class="lg:col-span-2">
                    <Reveal>
                      <div class="bg-dark-800 rounded-2xl p-8 border border-border">
                        <Show when={details.event.tags?.length}>
                          <div class="flex flex-wrap gap-2 mb-4">
                            <For each={details.event.tags}>{tag => <Tag name={tag.tagName} size="md" />}</For>
                          </div>
                        </Show>

                        <h1 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-6">
                          {details.event.title}
                        </h1>

                        <div class="prose max-w-none" innerHTML={details.event.description} />
                      </div>
                    </Reveal>

                    <Show when={details.event.photos?.length}>
                      <Reveal delay={200}>
                        <div class="mt-8">
                          <h2 class="text-xl font-display font-semibold text-text-primary mb-4">Photos</h2>
                          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <For each={details.event.photos}>
                              {photo => (
                                <div class="relative aspect-video rounded-lg overflow-hidden bg-dark-700">
                                  <img
                                    src={getImageUrl(photo.url)}
                                    alt={photo.alternativeText || details.event.title}
                                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              )}
                            </For>
                          </div>
                        </div>
                      </Reveal>
                    </Show>
                  </div>

                  <div class="lg:col-span-1">
                    <Reveal delay={100}>
                      <div class="sticky top-24 bg-dark-800 rounded-2xl p-6 border border-border space-y-6">
                        <div class="space-y-4">
                          <div class="flex items-center gap-3 text-text-primary">
                            <div class="p-2 rounded-lg bg-primary/10 text-primary">
                              <Calendar class="w-5 h-5" />
                            </div>
                            <div>
                              <div class="font-semibold">{formatDate(details.event.start, "EEEE, MMMM d, yyyy")}</div>
                              {isPast && <div class="text-sm text-text-muted">This event has ended</div>}
                            </div>
                          </div>

                          <div class="flex items-center gap-3 text-text-primary">
                            <div class="p-2 rounded-lg bg-primary/10 text-primary">
                              <Clock class="w-5 h-5" />
                            </div>
                            <div class="font-semibold">{formatTime(details.event.start)}</div>
                          </div>

                          <div class="flex items-center gap-3 text-text-primary">
                            <div class="p-2 rounded-lg bg-primary/10 text-primary">
                              <MapPin class="w-5 h-5" />
                            </div>
                            <div>
                              <div class="font-semibold">Base42</div>
                              <div class="text-sm text-text-muted">Rimska 25, Skopje</div>
                            </div>
                          </div>
                        </div>

                        <Show when={details.event.registerLink && !isPast}>
                          <a href={details.event.registerLink!} target="_blank" rel="noopener noreferrer" class="block">
                            <Button size="lg" class="w-full">
                              Register Now
                              <ExternalLink class="w-4 h-4" />
                            </Button>
                          </a>
                        </Show>

                        <Show when={!isPast}>
                          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" class="block">
                            <Button variant="outline" size="lg" class="w-full">
                              <Calendar class="w-4 h-4" />
                              Add to Calendar
                            </Button>
                          </a>
                        </Show>

                        <div>
                          <div class="flex items-center gap-2 text-sm text-text-muted mb-3">
                            <Share2 class="w-4 h-4" />
                            Share this event
                          </div>
                          <div class="flex gap-2">
                            <a
                              href={shareUrls.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="p-2 rounded-lg bg-dark-700 text-text-secondary hover:text-primary hover:bg-dark-600 transition-colors"
                              aria-label="Share on Twitter"
                            >
                              <Twitter class="w-5 h-5" />
                            </a>
                            <a
                              href={shareUrls.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="p-2 rounded-lg bg-dark-700 text-text-secondary hover:text-primary hover:bg-dark-600 transition-colors"
                              aria-label="Share on Facebook"
                            >
                              <Facebook class="w-5 h-5" />
                            </a>
                            <ShareButton url={`${siteMeta.siteUrl}/events/${details.event.slug}`} />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                <Show when={details.relatedEvents.length > 0}>
                  <section class="mt-16 pb-16">
                    <Reveal>
                      <h2 class="text-2xl font-display font-semibold text-text-primary mb-8">Related Events</h2>
                    </Reveal>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <For each={details.relatedEvents}>
                        {(event, index) => (
                          <Reveal delay={index() * 100}>
                            <EventCard event={event} />
                          </Reveal>
                        )}
                      </For>
                    </div>
                  </section>
                </Show>
              </div>
            </div>
          );
        }}
      </Show>
    </>
  );
}
