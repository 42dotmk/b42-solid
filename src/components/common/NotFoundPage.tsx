import { Icon } from "@iconify-icon/solid";
import { A } from "@solidjs/router";
import Button from "~/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div class="min-h-screen flex items-center justify-center px-4">
      <div class="text-center max-w-lg">
        <pre class="text-primary font-mono text-4xl md:text-6xl mb-8 select-none">{`
██╗  ██╗ ██████╗ ██╗  ██╗
██║  ██║██╔═══██╗██║  ██║
███████║██║   ██║███████║
╚════██║██║   ██║╚════██║
     ██║╚██████╔╝     ██║
     ╚═╝ ╚═════╝      ╚═╝
`}</pre>

        <h1 class="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">Page not found</h1>
        <p class="text-text-secondary text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <A href="/">
            <Button size="lg">
              <Icon icon="lucide:arrow-left" class="w-4 h-4" />
              Go Home
            </Button>
          </A>
          <A href="/events">
            <Button variant="outline" size="lg">
              <Icon icon="lucide:calendar" class="w-4 h-4" />
              View Events
            </Button>
          </A>
        </div>
      </div>
    </div>
  );
}
