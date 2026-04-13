import { Icon } from "@iconify-icon/solid";
import { createSignal, For, Show } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import type { Event, StrapiMeta } from "~/types";
import { getAllEvents } from "~/lib/api";
import EventCard from "./EventCard";

interface PastEventsListProps {
  initialEvents: Event[];
  initialMeta: StrapiMeta;
}

export default function PastEventsList(props: PastEventsListProps) {
  let sectionRef: HTMLDivElement | undefined;

  const [events, setEvents] = createSignal(props.initialEvents);
  const [page, setPage] = createSignal(1);
  const [pageCount, setPageCount] = createSignal(props.initialMeta.pagination.pageCount);
  const [loading, setLoading] = createSignal(false);

  const goToPage = async (target: number) => {
    if (target < 1 || target > pageCount() || target === page()) return;

    setLoading(true);
    try {
      const response = await getAllEvents(target, 6, false);
      setEvents(response.data);
      setPage(target);
      setPageCount(response.meta.pagination.pageCount);
      sectionRef?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };

  const pageNumbers = () => {
    const total = pageCount();
    const current = page();

    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    if (current <= 3) return [1, 2, 3, 4, 5, -1, total];
    if (current >= total - 2) return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
    return [1, -1, current - 1, current, current + 1, -2, total];
  };

  return (
    <div ref={sectionRef} class="scroll-mt-24">
      <div
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200"
        classList={{ "opacity-50 pointer-events-none": loading() }}
      >
        <For each={events()}>
          {(event, index) => (
            <Reveal delay={index() * 100}>
              <EventCard event={event} />
            </Reveal>
          )}
        </For>
      </div>

      <Show when={pageCount() > 1}>
        <div class="mt-12 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page() - 1)}
            disabled={page() === 1 || loading()}
          >
            <Icon icon="lucide:chevron-left" class="w-4 h-4" />
            <span class="hidden sm:inline">Previous</span>
          </Button>

          <div class="flex items-center gap-1">
            <For each={pageNumbers()}>
              {(num) => (
                <Show
                  when={num > 0}
                  fallback={
                    <span class="w-10 h-10 flex items-center justify-center text-text-muted">
                      &hellip;
                    </span>
                  }
                >
                  <button
                    type="button"
                    onClick={() => goToPage(num)}
                    disabled={loading()}
                    class={`w-10 h-10 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:cursor-default ${
                      num === page()
                        ? "bg-primary text-dark-900"
                        : "bg-dark-700 text-text-muted hover:bg-dark-600 hover:text-text-primary"
                    }`}
                  >
                    {num}
                  </button>
                </Show>
              )}
            </For>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page() + 1)}
            disabled={page() === pageCount() || loading()}
          >
            <span class="hidden sm:inline">Next</span>
            <Icon icon="lucide:chevron-right" class="w-4 h-4" />
          </Button>
        </div>
      </Show>
    </div>
  );
}
