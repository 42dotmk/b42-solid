import { Icon } from "@iconify-icon/solid";
import { Component, onMount, onCleanup, createEffect, Show } from "solid-js";
import { Portal, isServer } from "solid-js/web";
import type { YouTubeVideo } from "~/types";
import LiteYouTubeEmbed from "./LiteYouTubeEmbed";

interface VideoModalProps {
  video: YouTubeVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * VideoModal - Modal overlay for video playback using LiteYouTubeEmbed
 *
 * Features:
 * - Backdrop blur overlay with click-to-close
 * - Focus trap for accessibility
 * - Keyboard navigation (Escape to close)
 * - Focus restoration on close
 * - SSR-safe via ClientOnly in LiteYouTubeEmbed
 *
 * Success Criteria:
 * - One-click play on desktop (thumbnail → video)
 * - Two-tap on mobile (tap to play, then lite-youtube handles the rest)
 * - Modal closes and stops playback when dismissed
 * - Focus returns to triggering element on close
 */
const VideoModal: Component<VideoModalProps> = props => {
  // Refs for focus management
  let closeButtonRef: HTMLButtonElement | undefined;
  let modalRef: HTMLDivElement | undefined;
  let previousActiveElement: Element | null = null;

  /**
   * Store previous focus when modal opens
   * Restore focus when modal closes
   * (Client-side only)
   */
  createEffect(() => {
    if (isServer) return;

    if (props.isOpen) {
      // Store the currently focused element before we move focus
      previousActiveElement = document.activeElement;

      // Focus the close button when modal opens
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        closeButtonRef?.focus();
      }, 0);

      // Prevent body scroll while modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus to the previously focused element
      if (previousActiveElement instanceof HTMLElement) {
        setTimeout(() => {
          previousActiveElement?.focus();
        }, 0);
      }

      // Restore body scroll
      document.body.style.overflow = "";
    }
  });

  /**
   * Handle keyboard events for accessibility
   * - Escape: close modal
   * - Tab: trap focus within modal
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!props.isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      props.onClose();
      return;
    }

    // Tab focus trapping
    if (event.key === "Tab") {
      const focusableElements = modalRef?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab on first element → move to last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab on last element → move to first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Set up global keyboard listener (client-side only)
  onMount(() => {
    if (!isServer) {
      document.addEventListener("keydown", handleKeyDown);
    }
  });

  onCleanup(() => {
    if (!isServer) {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore body scroll on cleanup
      document.body.style.overflow = "";
    }
  });

  /**
   * Handle backdrop click - close modal unless clicking on content
   */
  const handleBackdropClick = (event: MouseEvent) => {
    // Only close if clicking directly on the backdrop, not content
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen && props.video}>
      <Portal>
        {/* Modal backdrop with blur */}
        <div
          ref={modalRef}
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/95 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          {/* Modal content container */}
          <div
            class="relative w-full max-w-5xl"
            onClick={event => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={props.onClose}
              class="absolute -top-16 right-4 z-10 p-3 bg-dark-800/90 hover:bg-dark-700 text-text-muted hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-900 rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center"
              aria-label="Close video player"
            >
              <Icon icon="lucide:x" width={24} height={24} class="text-text-primary" />
            </button>

            {/* Video player container */}
            <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-dark-800 shadow-2xl flex items-center justify-center">
              {props.video && (
                <LiteYouTubeEmbed
                  videoId={props.video.id}
                  title={props.video.title}
                  poster="medium"
                  class="w-full h-full"
                />
              )}
            </div>

            {/* Video title below player */}
            {props.video && (
              <div class="mt-4">
                <h3
                  id="video-modal-title"
                  class="font-display font-semibold text-xl text-text-primary"
                >
                  {props.video.title}
                </h3>
                <Show when={props.video.viewCount}>
                  <p class="text-text-muted text-sm mt-1">{props.video.viewCount}</p>
                </Show>
              </div>
            )}
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default VideoModal;
