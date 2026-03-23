import { createSignal, onCleanup, onMount } from "solid-js";
import { cn } from "~/lib/utils";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  class?: string;
}

export default function CountUp(props: CountUpProps) {
  let ref: HTMLSpanElement | undefined;
  const [count, setCount] = createSignal(0);
  const [started, setStarted] = createSignal(false);

  onMount(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting && !started()) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref);
    onCleanup(() => observer.disconnect());
  });

  onMount(() => {
    let frame = 0;

    const start = () => {
      if (!started()) {
        frame = requestAnimationFrame(start);
        return;
      }

      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / (props.duration ?? 2000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(props.end * eased));

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(start);
    onCleanup(() => cancelAnimationFrame(frame));
  });

  return (
    <span ref={ref} class={cn("tabular-nums", props.class)}>
      {props.prefix ?? ""}
      {count().toLocaleString()}
      {props.suffix ?? ""}
    </span>
  );
}
