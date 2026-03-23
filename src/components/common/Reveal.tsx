import { type JSX, createSignal, onCleanup, onMount } from "solid-js";
import { cn } from "~/lib/utils";

interface RevealProps {
  children: JSX.Element;
  class?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
}

export default function Reveal(props: RevealProps) {
  let ref: HTMLDivElement | undefined;
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    if (!ref) return;

    // Immediately check if already in viewport — skip observer round-trip
    const rect = ref.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Use requestAnimationFrame to batch with the next paint
      // rather than waiting for IntersectionObserver's async callback
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: props.threshold ?? 0.1, rootMargin: "50px" }
    );

    observer.observe(ref);
    onCleanup(() => observer.disconnect());
  });

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  };

  return (
    <div
      ref={ref}
      class={cn(
        "transition-all will-change-transform",
        visible() ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionStyles[props.direction ?? "up"]}`,
        props.class
      )}
      style={{
        "transition-duration": `${props.duration ?? 500}ms`,
        "transition-delay": `${props.delay ?? 0}ms`,
      }}
    >
      {props.children}
    </div>
  );
}
