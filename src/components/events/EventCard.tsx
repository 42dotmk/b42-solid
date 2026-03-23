import { A } from "@solidjs/router";
import { ArrowRight, Calendar, Clock } from "lucide-solid";
import { For, Show } from "solid-js";
import { getImageUrl } from "~/lib/api";
import { formatDate, formatTime, getExcerpt, isEventPast } from "~/lib/utils";
import type { Event } from "~/types";
import { Card, CardContent } from "~/components/ui/Card";
import Tag from "~/components/ui/Tag";

interface EventCardProps {
  event: Event;
}

export default function EventCard(props: EventCardProps) {
  const isPast = () => isEventPast(props.event.start);
  const imageUrl = () => getImageUrl(props.event.promo?.url);

  return (
    <A href={`/events/${props.event.slug}`} class="group block">
      <Card class="h-full">
        <div class="relative aspect-video overflow-hidden bg-dark-600">
          <img src={imageUrl()} alt={props.event.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <Show when={isPast()}>
            <div class="absolute top-3 left-3 px-2 py-1 rounded bg-dark-900/80 text-xs text-text-muted font-medium">
              Past Event
            </div>
          </Show>
        </div>

        <CardContent class="space-y-3">
          <div class="flex items-center gap-4 text-secondary font-mono text-sm">
            <span class="flex items-center gap-1.5">
              <Calendar class="w-3.5 h-3.5" />
              {formatDate(props.event.start, "MMM d")}
            </span>
            <span class="flex items-center gap-1.5">
              <Clock class="w-3.5 h-3.5" />
              {formatTime(props.event.start)}
            </span>
          </div>

          <h3 class="font-display font-semibold text-lg text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {props.event.title}
          </h3>

          <p class="text-sm text-text-muted line-clamp-2">
            {props.event.summary || getExcerpt(props.event.description, 120)}
          </p>

          <Show when={props.event.tags?.length}>
            <div class="flex flex-wrap gap-2 pt-1">
              <For each={props.event.tags.slice(0, 3)}>{tag => <Tag name={tag.tagName} />}</For>
            </div>
          </Show>

          <div class="pt-2">
            <span class="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
              {isPast() ? "View Details" : "Register"}
              <ArrowRight class="w-4 h-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </A>
  );
}
