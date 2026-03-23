import { type JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, ["class", "children", "hover"]);

  return (
    <div
      class={cn(
        "rounded-xl border border-border bg-dark-700 overflow-hidden",
        local.hover === false
          ? ""
          : "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(250,225,39,0.1)]",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </div>
  );
}

export function CardContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <div class={cn("p-5", local.class)} {...rest}>
      {local.children}
    </div>
  );
}
