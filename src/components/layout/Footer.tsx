import { Icon } from "@iconify-icon/solid";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import { footerQuickLinks, footerResources, socials } from "~/data/site";

export default function Footer() {
  return (
    <footer class="bg-dark-800 border-t border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div class="md:col-span-1">
            <A href="/" class="inline-block mb-4">
              <img src="/images/logo.svg" alt="Base42" class="h-8 w-auto" />
            </A>
            <p class="text-text-muted text-sm mb-4">A hackerspace for builders and the curious</p>
            <div class="flex items-center gap-2 text-text-muted text-sm">
              <Icon icon="lucide:map-pin" class="text-base text-primary" />
              <span>Rimska 25, Skopje</span>
            </div>
            <div class="flex items-center gap-2 text-text-muted text-sm mt-2">
              <Icon icon="lucide:mail" class="text-base text-primary" />
              <a href="mailto:[email protected]" class="hover:text-primary transition-colors">
                [email protected]
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-display font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <For each={footerQuickLinks}>
                {link => (
                  <li>
                    <a href={link.href} class="text-text-muted hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div>
            <h4 class="font-display font-semibold text-text-primary mb-4">Resources</h4>
            <ul class="space-y-2">
              <For each={footerResources}>
                {link => (
                  <li>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      class="text-text-muted hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div>
            <h4 class="font-display font-semibold text-text-primary mb-4">Connect</h4>
            <div class="flex flex-wrap gap-3">
              <For each={socials}>
                {social => (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center w-9 h-9 rounded-lg bg-dark-700 text-text-muted hover:text-primary hover:bg-dark-600 transition-all"
                    aria-label={social.label}
                  >
                    <Icon icon={social.icon} class="text-xl" />
                  </a>
                )}
              </For>
            </div>

            <div class="mt-6">
              <a
                href="https://discord.gg/424xxTZVYX"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30 transition-colors text-sm font-medium"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </div>

        <div class="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-text-muted text-sm">&copy; 2042 Base42 · Made with &#9829; in Skopje</p>
          <a
            href="https://github.com/base42/website"
            target="_blank"
            rel="noopener noreferrer"
            class="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-2"
          >
            <Icon icon="lucide:github" class="text-base" />
            View Source
          </a>
        </div>
      </div>
    </footer>
  );
}
