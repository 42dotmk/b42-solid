import { cn } from "~/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  class?: string;
  align?: "left" | "center";
}

export default function SectionHeader(props: SectionHeaderProps) {
  return (
    <div class={cn("mb-12", props.align === "center" || !props.align ? "text-center" : "", props.class)}>
      <div class={cn("flex items-center gap-4 mb-4", props.align === "left" ? "justify-start" : "justify-center")}>
        <span class="h-px w-8 bg-primary/50" />
        <h2 class="text-3xl md:text-4xl font-bold font-display text-text-primary uppercase tracking-wide">
          {props.title}
        </h2>
        <span class="h-px w-8 bg-primary/50" />
      </div>
      {props.subtitle && <p class="text-text-secondary text-lg max-w-2xl mx-auto">{props.subtitle}</p>}
    </div>
  );
}
