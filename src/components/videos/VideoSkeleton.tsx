import { Card, CardContent } from "~/components/ui/Card";

interface VideoSkeletonProps {
  /** Delay class for staggering animation */
  delay?: "delay-75" | "delay-150" | "delay-225" | "delay-300";
}

/**
 * Single video skeleton card that matches VideoCard dimensions exactly.
 * Uses Tailwind's animate-pulse for the loading animation.
 */
export function VideoSkeleton(props: VideoSkeletonProps) {
  return (
    <Card class="h-full flex flex-col" hover={false}>
      {/* Thumbnail placeholder - matches aspect-video from VideoCard */}
      <div
        class={`relative aspect-video overflow-hidden bg-dark-600 flex-shrink-0 animate-pulse ${props.delay || ""}`}
      />

      {/* Content area - matches VideoCard CardContent structure */}
      <CardContent class="flex-grow flex flex-col space-y-3">
        {/* Title placeholder */}
        <div class="h-5 w-3/4 bg-dark-600 rounded animate-pulse" />

        {/* Description placeholder - line-clamp-2 height (2 lines * ~1.5rem = ~3rem) */}
        <div class="space-y-2">
          <div class="h-4 w-full bg-dark-600 rounded animate-pulse" />
          <div class="h-4 w-5/6 bg-dark-600 rounded animate-pulse" />
        </div>

        {/* Meta row - date and views placeholders */}
        <div class="flex items-center gap-4 pt-1">
          <div class="h-4 w-24 bg-dark-600 rounded animate-pulse" />
          <div class="h-4 w-20 bg-dark-600 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

interface VideoSkeletonGridProps {
  /** Number of skeleton cards to render (default: 6) */
  count?: number;
}

/**
 * Grid of video skeleton cards for Suspense fallback.
 * Renders skeleton cards with staggered animation delays.
 */
export function VideoSkeletonGrid(props: VideoSkeletonGridProps) {
  const count = () => props.count ?? 6;

  const delayClasses: Array<"delay-75" | "delay-150" | "delay-225" | "delay-300"> = [
    "delay-75",
    "delay-150",
    "delay-225",
    "delay-300",
  ];

  return (
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count() }, (_, i) => (
        <VideoSkeleton delay={delayClasses[i % delayClasses.length]} />
      ))}
    </div>
  );
}

export default VideoSkeletonGrid;
