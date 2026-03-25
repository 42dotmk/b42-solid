import { Icon } from "@iconify-icon/solid";
import { A, useLocation } from "@solidjs/router";
import { For, Show, createSignal, onCleanup, onMount } from "solid-js";
import { externalLinks, navLinks } from "~/data/site";
import { cn } from "~/lib/utils";
import Button from "~/components/ui/Button";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const closeMenu = () => setIsOpen(false);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", closeMenu);
    onCleanup(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", closeMenu);
    });
  });

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.includes("#")) return false;
    return location.pathname.startsWith(href);
  };

  return (
    <header
      class={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled() ? "bg-dark-900/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
      )}
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <A href="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="/images/logo.svg" alt="Base42" class="h-10 w-auto" />
          </A>

          <div class="hidden md:flex items-center gap-8">
            <For each={navLinks}>
              {link => (
                <a
                  href={link.href}
                  class={cn(
                    "relative text-sm font-medium transition-colors group",
                    isActive(link.href) ? "text-primary" : "text-text-secondary hover:text-primary"
                  )}
                >
                  {link.label}
                  <span class={cn("absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300", isActive(link.href) ? "w-full" : "w-0 group-hover:w-full")} />
                </a>
              )}
            </For>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <A href="/book">
              <Button size="sm" variant="outline">
                <Icon icon="lucide:calendar-plus" class="text-sm" />
                Book Space
              </Button>
            </A>
            <a href="https://wts.sh" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                GET TIX
                <Icon icon="lucide:external-link" class="text-xs" />
              </Button>
            </a>
          </div>

          <button
            class="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen())}
            aria-label={isOpen() ? "Close menu" : "Open menu"}
          >
            <Show when={isOpen()} fallback={<Icon icon="lucide:menu" class="text-2xl" />}>
              <Icon icon="lucide:x" class="text-2xl" />
            </Show>
          </button>
        </div>

        <div
          class={cn(
            "md:hidden fixed inset-0 top-16 bg-dark-900/98 backdrop-blur-xl transition-all duration-300",
            isOpen() ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          )}
        >
          <div class="flex flex-col items-center justify-center h-full gap-8 pb-20">
            <For each={navLinks}>
              {link => (
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  class="text-2xl font-display font-semibold text-text-primary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )}
            </For>

            <div class="h-px w-20 bg-border my-4" />

            <For each={externalLinks}>
              {link => (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  class="text-lg text-text-secondary hover:text-primary transition-colors flex items-center gap-2"
                >
                  {link.label}
                  <Icon icon="lucide:external-link" class="text-base" />
                </a>
              )}
            </For>

            <div class="flex flex-col gap-3 mt-4">
              <A href="/book" onClick={() => setIsOpen(false)}>
                <Button size="lg" variant="outline" class="w-full">
                  <Icon icon="lucide:calendar-plus" class="text-base" />
                  Book Space
                </Button>
              </A>
              <a href="https://wts.sh" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                <Button size="lg" class="w-full">
                  GET TIX
                  <Icon icon="lucide:external-link" class="text-base" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
