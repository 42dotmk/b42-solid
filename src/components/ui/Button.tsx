import { type JSX, splitProps } from "solid-js";
import { cn } from "~/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"]);

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-dark-900 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-primary-glow)]",
    secondary:
      "bg-secondary text-dark-900 hover:bg-secondary-hover hover:scale-[1.02] hover:shadow-[0_0_20px_var(--color-secondary-glow)]",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary-muted",
    ghost: "text-text-secondary hover:text-primary bg-transparent",
  };

  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-5 text-sm rounded-lg",
    lg: "h-12 px-8 text-base rounded-lg",
  };

  return (
    <button
      class={cn(baseStyles, variants[local.variant ?? "primary"], sizes[local.size ?? "md"], local.class)}
      {...rest}
    >
      {local.children}
    </button>
  );
}
