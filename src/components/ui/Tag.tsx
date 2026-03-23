import { cn, getTagColor } from "~/lib/utils";

interface TagProps {
  name: string;
  class?: string;
  size?: "sm" | "md";
}

export default function Tag(props: TagProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span class={cn("inline-flex items-center rounded-full border font-medium", sizeStyles[props.size ?? "sm"], getTagColor(props.name), props.class)}>
      {props.name}
    </span>
  );
}
