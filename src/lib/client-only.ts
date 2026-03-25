import { Component, createSignal, onMount, JSX, Show } from "solid-js";
import { isServer } from "solid-js/web";

/**
 * clientOnly - A Solid.js utility for SSR-safe client-only rendering
 * 
 * Wraps components to ensure they only render on the client-side,
 * preventing hydration mismatches with web components that expect
 * browser APIs (like lite-youtube-embed which uses custom elements).
 * 
 * Usage:
 * ```tsx
 * const ClientOnlyVideo = clientOnly(() => import("./VideoPlayer"));
 * 
 * <ClientOnlyVideo videoId="abc123" />
 * ```
 * 
 * @param importFn - Dynamic import function returning the component
 * @param options - Optional configuration
 * @returns Wrapped component that renders null on SSR, loads on client
 */
export interface ClientOnlyOptions {
  /** Element to render while loading or during SSR */
  fallback?: JSX.Element;
  /** Delay in ms before showing loading state */
  loadingDelay?: number;
}

/**
 * Wraps a dynamically imported component for client-only rendering.
 * Returns null on server, renders fallback while loading on client.
 */
export function clientOnly<T extends Record<string, any>>(
  importFn: () => Promise<{ default: Component<T> }>,
  options: ClientOnlyOptions = {}
): Component<T> {
  const { fallback = null } = options;

  return (props: T) => {
    const [Component, setComponent] = createSignal<Component<T> | null>(null);
    const [isLoading, setIsLoading] = createSignal(!isServer);

    onMount(async () => {
      try {
        const module = await importFn();
        setComponent(() => module.default);
      } catch (error) {
        console.error("[clientOnly] Failed to load component:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return (
      <Show when={!isServer && !isLoading()} fallback={isServer ? null : fallback}>
        {Component() && <Component() {...props} />}
      </Show>
    );
  };
}

/**
 * Alternative: Simple client-only wrapper using children pattern
 * 
 * Use when you want to wrap JSX elements directly rather than dynamic imports.
 * 
 * Usage:
 * ```tsx
 * <ClientOnly fallback={<div>Loading...</div>}>
 *   <LiteYouTubeEmbed videoId="abc123" />
 * </ClientOnly>
 * ```
 */
export interface ClientOnlyProps {
  children: JSX.Element;
  fallback?: JSX.Element;
}

/**
 * Simple client-only wrapper for JSX children.
 * Renders null during SSR, renders children on client.
 */
export function ClientOnly(props: ClientOnlyProps): JSX.Element {
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setIsClient(true);
  });

  return (
    <Show when={isClient()} fallback={props.fallback ?? null}>
      {props.children}
    </Show>
  );
}

export default clientOnly;
