import { Component, onMount, createSignal } from "solid-js";
import { ClientOnly } from "~/lib/client-only";

// Import lite-youtube-embed CSS
// This is safe because the component is wrapped with ClientOnly
// and only renders on the client side
import "lite-youtube-embed/src/lite-yt-embed.css";

/**
 * LiteYouTubeEmbed - Fast-loading YouTube video embed using lite-youtube-embed
 * 
 * Renders a thumbnail facade that loads instantly, then switches to the
 * actual YouTube iframe only when the user clicks to play. This provides
 * ~77% faster initial load compared to standard iframe embeds.
 * 
 * IMPORTANT: Known Issues with lite-youtube-embed v0.3.4
 * - Mobile double-tap issue: On touch devices, users may need to tap twice
 *   to start playback. This is due to UA sniffing in the library that
 *   attempts to work around iOS restrictions but affects other mobile browsers.
 *   Issue: https://github.com/paulirish/lite-youtube-embed/issues/xxx
 *   Workaround: Component still functional, just requires extra tap on mobile.
 * 
 * SSR Safety:
 * This component MUST be wrapped with ClientOnly to prevent hydration mismatches.
 * The lite-youtube-embed library registers a custom element that expects
 * browser APIs (customElements, window, etc.) which are not available during SSR.
 * 
 * @example
 * ```tsx
 * <LiteYouTubeEmbed
 *   videoId="dQw4w9WgXcQ"
 *   title="Never Gonna Give You Up"
 *   poster="high"
 * />
 * ```
 */

export interface LiteYouTubeEmbedProps {
  /** YouTube video ID (e.g., "dQw4w9WgXcQ") */
  videoId: string;
  /** Video title for accessibility */
  title?: string;
  /** Thumbnail quality to display before play */
  poster?: "maxres" | "high" | "medium" | "default";
  /** Additional CSS class for styling container */
  class?: string;
}

/**
 * Type augmentation for lite-youtube custom element
 * The lite-youtube-embed library registers this custom element globally
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lite-youtube": {
        videoid: string;
        playlabel?: string;
        title?: string;
        poster?: string;
        params?: string;
        style?: string;
        class?: string;
      };
    }
  }
}

/**
 * Thumbnail quality mapping to YouTube thumbnail URLs
 * maxresdefault may not exist for all videos (fallback to high)
 */
const POSTER_QUALITY_MAP: Record<string, string> = {
  maxres: "maxresdefault",
  high: "hqdefault",
  medium: "mqdefault",
  default: "default",
};

/**
 * Fallback loader while lite-youtube-embed script loads
 */
const LoadingFallback: Component<{ title?: string }> = props => {
  return (
    <div class="relative aspect-video bg-dark-800 rounded-lg overflow-hidden animate-pulse flex items-center justify-center">
      <div class="text-center">
        <svg
          class="w-12 h-12 mx-auto text-text-muted mb-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
        {props.title && <p class="text-text-muted text-sm">{props.title}</p>}
      </div>
    </div>
  );
};

/**
 * Inner component that actually renders the lite-youtube element
 * Handles dynamic import of the web component and CSS
 */
const LiteYouTubeInner: Component<LiteYouTubeEmbedProps> = props => {
  const [isLoaded, setIsLoaded] = createSignal(false);

  onMount(async () => {
    // Dynamically import the lite-youtube-embed library
    // This ensures it only runs on the client
    try {
      await import("lite-youtube-embed/src/lite-yt-embed.js");
      setIsLoaded(true);
    } catch (error) {
      console.error("[LiteYouTubeEmbed] Failed to load lite-youtube-embed:", error);
    }
  });

  const posterQuality = () => POSTER_QUALITY_MAP[props.poster ?? "high"] ?? "hqdefault";

  return (
    <div class={`relative aspect-video ${props.class ?? ""}`}>
      {!isLoaded() && <LoadingFallback title={props.title} />}
      {/* 
        lite-youtube custom element attributes:
        - videoid: YouTube video ID (required)
        - playlabel: Accessible label for play button
        - title: Video title (optional, for a11y)
        - poster: Thumbnail quality (maxresdefault, hqdefault, mqdefault, default)
        - params: Additional YouTube player parameters
      */}
      <lite-youtube
        videoid={props.videoId}
        playlabel={props.title ? `Play: ${props.title}` : "Play video"}
        title={props.title}
        poster={posterQuality()}
        class={isLoaded() ? "rounded-lg overflow-hidden" : "hidden"}
        style="width: 100%; height: 100%;"
      />
    </div>
  );
};

/**
 * LiteYouTubeEmbed - Public component with SSR protection
 * 
 * Wraps the actual implementation with ClientOnly to ensure it only
 * renders on the client, preventing hydration mismatches and
 * allowing the web component to register safely.
 */
const LiteYouTubeEmbed: Component<LiteYouTubeEmbedProps> = props => {
  return (
    <ClientOnly fallback={<LoadingFallback title={props.title} />}>
      <LiteYouTubeInner {...props} />
    </ClientOnly>
  );
};

export default LiteYouTubeEmbed;
