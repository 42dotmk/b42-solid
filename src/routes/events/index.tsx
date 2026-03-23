import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import Reveal from "~/components/common/Reveal";
import EventCard from "~/components/events/EventCard";
import PastEventsList from "~/components/events/PastEventsList";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";
import { getEventsPageData } from "~/lib/queries";

export default function EventsPage() {
  const data = createAsync(() => getEventsPageData());

  return (
    <>
      <Title>{siteMeta.titleTemplate("Events")}</Title>
      <Meta
        name="description"
        content="Upcoming meetups, workshops, talks, and events at Base42 hackerspace in Skopje."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-12">
            <Reveal>
              <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
                <Icon icon="lucide:arrow-left" class="w-4 h-4" />
                Back to Home
              </A>
            </Reveal>

            <SectionHeader title="Events" subtitle="Where builders, hackers, and curious minds gather" />
          </div>

          <Show when={data()}>
            {pageData => (
              <>
                <section class="mb-20">
                  <Reveal>
                    <h2 class="text-2xl font-display font-semibold text-text-primary mb-8">Upcoming Events</h2>
                  </Reveal>

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
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pageData().upcomingEvents.map((event, index) => (
                        <Reveal delay={index * 100}>
                          <EventCard event={event} />
                        </Reveal>
                      ))}
                    </div>
                  </Show>
                </section>

                <Show when={pageData().pastEvents.length > 0}>
                  <section>
                    <Reveal>
                      <h2 class="text-2xl font-display font-semibold text-text-primary mb-8">Past Events</h2>
                    </Reveal>
                    <PastEventsList initialEvents={pageData().pastEvents} initialMeta={pageData().pastMeta} />
                  </section>
                </Show>
              </>
            )}
          </Show>
        </div>
      </div>
    </>
  );
}
