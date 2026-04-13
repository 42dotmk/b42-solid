import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import Reveal from "~/components/common/Reveal";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

const CALENDAR_SRC =
  "https://calendar.google.com/calendar/u/0/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe/Skopje&showTz=1&showCalendars=1&showTabs=1&showPrint=1&showDate=1&showNav=1&showTitle=0&mode=WEEK&src=YmFzZTQybWtAZ21haWwuY29t";

export default function CalendarPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Calendar")}</Title>
      <Meta
        name="description"
        content="View the Base42 hackerspace calendar — upcoming meetups, workshops, talks, and community events in Skopje."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-12">
            <Reveal>
              <A href="/events" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
                <Icon icon="lucide:arrow-left" class="w-4 h-4" />
                Back to Events
              </A>
            </Reveal>

            <SectionHeader title="Calendar" subtitle="Everything happening at Base42, all in one place" />
          </div>

          <Reveal>
            <div class="rounded-2xl border border-border bg-white overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <iframe
                src={CALENDAR_SRC}
                title="Base42 Google Calendar"
                class="w-full border-0"
                style="height: clamp(480px, 70vh, 800px)"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal>
            <p class="text-center text-text-muted text-sm mt-6">
              Want to stay in the loop?{" "}
              <a
                href="https://discord.gg/424xxTZVYX"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:text-primary-hover transition-colors"
              >
                Join our Discord
              </a>{" "}
              for event announcements.
            </p>
          </Reveal>
        </div>
      </div>
    </>
  );
}
