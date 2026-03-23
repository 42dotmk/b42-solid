import { LoaderCircle } from "lucide-solid";
import { createSignal, For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import type { Event, StrapiMeta } from "~/types";
import EventCard from "./EventCard";

interface PastEventsListProps {
  initialEvents: Event[];
  initialMeta: StrapiMeta;
}

export default function PastEventsList(props: PastEventsListProps) {
  const [events, setEvents] = createSignal(props.initialEvents);
  const [page, setPage] = createSignal(1);
  const [loading, setLoading] = createSignal(false);
  const [hasMore, setHasMore] = createSignal(
    props.initialMeta.pagination.page < props.initialMeta.pagination.pageCount
  );

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page() + 1;

    try {
      const now = new Date().toISOString();
      const response = await fetch(
        `https://cms.42.mk/api/events?populate=*&filters[start][$lt]=${now}&sort[0]=start:desc&pagination[page]=${nextPage}&pagination[pageSize]=6`
      );
      const data = await response.json();
      setEvents(previous => [...previous, ...data.data]);
      setPage(nextPage);
      setHasMore(nextPage < data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Failed to load more events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <For each={events()}>
          {(event, index) => (
            <Reveal delay={index() < 6 ? index() * 100 : 0}>
              <EventCard event={event} />
            </Reveal>
          )}
        </For>
      </div>

      {hasMore() && (
        <div class="mt-12 text-center">
          <Button variant="outline" onClick={loadMore} disabled={loading()}>
            {loading() ? (
              <>
                <LoaderCircle class="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Past Events"
            )}
          </Button>
        </div>
      )}
    </>
  );
}
