import { Icon } from "@iconify-icon/solid";
import { For, Show } from "solid-js";
import { getYouTubeThumbnail, getYouTubeWatchUrl } from "~/lib/youtube";
import { formatDate } from "~/lib/utils";
import type { YouTubeVideo } from "~/types";
import { Card, CardContent } from "~/components/ui/Card";
import Tag from "~/components/ui/Tag";

interface VideoCardProps {
  video: YouTubeVideo;
  onPlay?: (video: YouTubeVideo) => void;
}

export default function VideoCard(props: VideoCardProps) {
  const thumbnailUrl = () => props.video.thumbnail || getYouTubeThumbnail(props.video.id);

  const handleClick = () => {
    if (props.onPlay) {
      props.onPlay(props.video);
      return;
    }

    window.open(getYouTubeWatchUrl(props.video.id), "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Play video: ${props.video.title}`}
      class="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 rounded-xl"
    >
      <Card class="h-full flex flex-col">
        <div class="relative aspect-video overflow-hidden bg-dark-600 flex-shrink-0">
          <img src={thumbnailUrl()} alt={props.video.title} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105" />

          <div class="absolute inset-0 flex items-center justify-center bg-dark-900/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
            <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform scale-90 group-hover:scale-100 group-focus-visible:scale-100 transition-transform duration-300">
              <Icon icon="lucide:play" class="w-7 h-7 text-dark-900" />
            </div>
          </div>

          <Show when={props.video.duration}>
            <div class="absolute bottom-2 right-2 px-2 py-1 rounded bg-dark-900/90 text-xs text-text-primary font-mono">
              {props.video.duration}
            </div>
          </Show>

          <Show when={(props.video.playlistTitles?.length || 0) > 0 || props.video.playlistTitle}>
            <div class="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
              <For each={(props.video.playlistTitles || (props.video.playlistTitle ? [props.video.playlistTitle] : [])).slice(0, 2)}>
                {title => <Tag name={title} size="sm" />}
              </For>
              <Show when={(props.video.playlistTitles?.length || 0) > 2}>
                <span class="px-2 py-0.5 text-xs rounded-full bg-dark-900/80 text-text-muted">
                  +{(props.video.playlistTitles?.length || 0) - 2}
                </span>
              </Show>
            </div>
          </Show>
        </div>

        <CardContent class="flex-grow flex flex-col space-y-3">
          <h3 class="font-display font-semibold text-lg text-text-primary group-hover:text-primary transition-colors line-clamp-2">
            {props.video.title}
          </h3>
          <p class="text-sm text-text-muted line-clamp-2 flex-grow">{props.video.description}</p>
          <div class="flex items-center gap-4 text-text-muted text-xs">
            <span class="flex items-center gap-1.5">
              <Icon icon="lucide:calendar" class="w-3.5 h-3.5" />
              {formatDate(props.video.publishedAt, "MMM d, yyyy")}
            </span>
            <Show when={props.video.viewCount}>
              <span class="flex items-center gap-1.5">
                <Icon icon="lucide:eye" class="w-3.5 h-3.5" />
                {props.video.viewCount}
              </span>
            </Show>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}
