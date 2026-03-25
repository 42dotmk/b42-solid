import { Icon } from "@iconify-icon/solid";
import { For, Show, createMemo, createSignal } from "solid-js";
import type { YouTubePlaylist, YouTubeVideo } from "~/types";
import Reveal from "~/components/common/Reveal";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

interface VideoGridProps {
  videos: YouTubeVideo[];
  playlists: YouTubePlaylist[];
}

export default function VideoGrid(props: VideoGridProps) {
  const [activeFilter, setActiveFilter] = createSignal("all");
  const [selectedVideo, setSelectedVideo] = createSignal<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = createSignal("");

  const filterOptions = createMemo(() => [
    { id: "all", name: "All Videos" },
    ...props.playlists.map(playlist => ({ id: playlist.id, name: playlist.title })),
  ]);

  const filteredVideos = createMemo(() =>
    props.videos.filter(video => {
      const matchesFilter =
        activeFilter() === "all" || video.playlistId === activeFilter() || video.playlistIds?.includes(activeFilter());
      const query = searchQuery().trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    })
  );

  return (
    <>
      <div class="mb-8 space-y-4">
        <Reveal>
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div class="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery()}
                onInput={event => setSearchQuery(event.currentTarget.value)}
                class="w-full px-4 py-2 rounded-lg bg-dark-800 border border-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Show when={searchQuery()}>
                <button
                  onClick={() => setSearchQuery("")}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                >
                  <Icon icon="lucide:x" class="w-4 h-4" />
                </button>
              </Show>
            </div>

            <p class="text-text-muted text-sm">
              {filteredVideos().length} video{filteredVideos().length !== 1 ? "s" : ""}
            </p>
          </div>
        </Reveal>

        <Show when={filterOptions().length > 1}>
          <Reveal delay={100}>
            <div class="flex flex-wrap gap-2">
              <For each={filterOptions()}>
                {option => (
                  <button
                    onClick={() => setActiveFilter(option.id)}
                    class={
                      activeFilter() === option.id
                        ? "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border bg-primary text-dark-900 border-primary"
                        : "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border bg-dark-800 text-text-secondary border-border hover:border-primary hover:text-primary"
                    }
                  >
                    {option.name}
                  </button>
                )}
              </For>
            </div>
          </Reveal>
        </Show>
      </div>

      <Show
        when={filteredVideos().length > 0}
        fallback={
          <Reveal>
            <div class="text-center py-16 px-4 rounded-2xl bg-dark-800 border border-border">
              <p class="text-text-secondary text-lg mb-2">No videos found</p>
              <p class="text-text-muted">{searchQuery() ? "Try a different search term" : "Check back soon for new content!"}</p>
            </div>
          </Reveal>
        }
      >
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={filteredVideos()}>
            {(video, index) => (
              <Reveal delay={index() * 75} class="h-full">
                <VideoCard video={video} onPlay={setSelectedVideo} />
              </Reveal>
            )}
          </For>
        </div>
      </Show>

      <VideoModal
        video={selectedVideo()!}
        isOpen={!!selectedVideo()}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
