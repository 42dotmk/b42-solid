import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import Reveal from "~/components/common/Reveal";
import VideoGrid from "~/components/videos/VideoGrid";
import { VideoSkeletonGrid } from "~/components/videos/VideoSkeleton";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";
import { getVideosPageData } from "~/lib/queries";

export default function VideosPage() {
  const data = createAsync(() => getVideosPageData());

  return (
    <>
      <Title>{siteMeta.titleTemplate("Videos")}</Title>
      <Meta
        name="description"
        content="Watch recordings of meetups, workshops, talks, and events from Base42 hackerspace in Skopje."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="mb-12">
            <Reveal>
              <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
                <Icon icon="lucide:arrow-left" class="text-base" />
                Back to Home
              </A>
            </Reveal>

            <SectionHeader title="Videos" subtitle="Recordings from our meetups, workshops, and community events" />

            <Reveal delay={200}>
              <div class="flex justify-center mt-6">
                <a href={siteMeta.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    <Icon icon="lucide:youtube" class="text-base" />
                    Subscribe on YouTube
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>

          <Show
            when={data()}
            fallback={<VideoSkeletonGrid count={6} />}
          >
            {pageData => (
              <Show
                when={pageData().videos.length > 0}
                fallback={
                  <Reveal>
                    <div class="text-center py-16 px-4 rounded-2xl bg-dark-800 border border-border">
                      <Icon icon="lucide:youtube" class="text-7xl text-text-muted mx-auto mb-6" />
                      <p class="text-text-secondary text-lg mb-4">No videos available yet</p>
                      <p class="text-text-muted mb-6">
                        Subscribe to our YouTube channel to get notified when we upload new content!
                      </p>
                      <a href={siteMeta.youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                        <Button>
                          <Icon icon="lucide:youtube" class="text-lg" />
                          Visit YouTube Channel
                        </Button>
                      </a>
                    </div>
                  </Reveal>
                }
              >
                <VideoGrid videos={pageData().videos} playlists={pageData().playlists} />
              </Show>
            )}
          </Show>
        </div>
      </div>
    </>
  );
}
