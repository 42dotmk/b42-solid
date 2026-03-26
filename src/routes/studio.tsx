import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For, Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta, studioFeatures, studioPackages } from "~/data/site";
import { cn } from "~/lib/utils";

export default function StudioPage() {
  const [selectedPackage, setSelectedPackage] = createSignal<string | null>(null);
  const [formState, setFormState] = createSignal<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = createStore({
    name: "",
    email: "",
    date: "",
    timeSlot: "morning",
    project: "",
    description: "",
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setFormState("loading");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState("success");
  };

  return (
    <>
      <Title>{siteMeta.titleTemplate("Studio")}</Title>
      <Meta
        name="description"
        content="Book the Base42 content creation studio for podcasts, video production, and livestreams in Skopje."
      />

      {formState() === "success" ? (
        <div class="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <Reveal>
            <div class="text-center max-w-md px-4">
              <div class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-6">
                <Icon icon="lucide:check-circle" class="text-4xl" />
              </div>
              <h1 class="text-3xl font-display font-bold text-text-primary mb-4">Booking Submitted!</h1>
              <p class="text-text-secondary mb-8">
                We'll review your studio request and get back to you within 24-48 hours with availability and next steps.
              </p>
              <A href="/">
                <Button size="lg">Back to Home</Button>
              </A>
            </div>
          </Reveal>
        </div>
      ) : (
        <div class="min-h-screen pt-24 pb-16">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
                <Icon icon="lucide:arrow-left" class="text-base" />
                Back to Home
              </A>
            </Reveal>

            <SectionHeader title="Studio" subtitle="A content creation studio for the community" />

            {/* Intro */}
            <Reveal>
              <div class="mb-12 p-6 sm:p-8 rounded-2xl bg-dark-800 border border-border relative overflow-hidden">
                <div class="absolute inset-0 gradient-radial opacity-30 pointer-events-none" />
                <div class="relative">
                  <p class="text-text-secondary leading-relaxed mb-4">
                    We're building a content creation studio at Base42 — a space where community members, meetup organizers,
                    and creators can produce professional-quality podcasts, videos, and livestreams without needing their own gear.
                  </p>
                  <p class="text-text-secondary leading-relaxed">
                    Whether you want to record a tech talk, launch a podcast, film a tutorial, or livestream a community event,
                    the studio is here for you. We handle the equipment and setup — you bring the ideas.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal>
              <div class="grid md:grid-cols-3 gap-6 mb-16">
                <For each={studioFeatures}>
                  {feature => (
                    <div class="p-5 rounded-xl bg-dark-800 border border-border">
                      <div class="flex items-center gap-3 mb-3">
                        <div class="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                          <Icon icon={feature.icon} class="text-lg text-secondary" />
                        </div>
                        <h3 class="font-display font-semibold text-text-primary">{feature.title}</h3>
                      </div>
                      <p class="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>
                  )}
                </For>
              </div>
            </Reveal>

            {/* Package selection */}
            <Reveal>
              <div class="mb-12">
                <h3 class="text-lg font-display font-semibold text-text-primary mb-4">1. Choose a Package</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  <For each={studioPackages}>
                    {pkg => (
                      <button
                        onClick={() => setSelectedPackage(pkg.id)}
                        class={cn(
                          "p-5 rounded-xl border text-left transition-all",
                          selectedPackage() === pkg.id ? "border-primary bg-primary/10" : "border-border bg-dark-700 hover:border-primary/50"
                        )}
                      >
                        <div class="flex items-start gap-3 mb-3">
                          <div
                            class={cn(
                              "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
                              selectedPackage() === pkg.id ? "bg-primary text-dark-900" : "bg-dark-600 text-text-secondary"
                            )}
                          >
                            <Icon icon={pkg.icon} class="text-xl" />
                          </div>
                          <div>
                            <h4 class="font-semibold text-text-primary">{pkg.title}</h4>
                            <p class="text-xs text-text-muted">{pkg.duration}</p>
                          </div>
                        </div>
                        <p class="text-sm text-text-muted mb-3">{pkg.description}</p>
                        <ul class="space-y-1">
                          <For each={pkg.includes}>
                            {item => (
                              <li class="flex items-center gap-2 text-xs text-text-secondary">
                                <Icon icon="lucide:check" class={cn("text-sm shrink-0", selectedPackage() === pkg.id ? "text-primary" : "text-text-muted")} />
                                {item}
                              </li>
                            )}
                          </For>
                        </ul>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Reveal>

            {/* Booking form */}
            <Reveal delay={100}>
              <div class="p-8 rounded-2xl bg-dark-800 border border-border">
                <h3 class="text-lg font-display font-semibold text-text-primary mb-6">2. Book Your Session</h3>

                <form onSubmit={handleSubmit} class="space-y-5">
                  <div class="grid md:grid-cols-2 gap-5">
                    <div>
                      <label for="name" class="block text-sm font-medium text-text-secondary mb-2">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onInput={event => setFormData("name", event.currentTarget.value)}
                        class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label for="email" class="block text-sm font-medium text-text-secondary mb-2">
                        Contact Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onInput={event => setFormData("email", event.currentTarget.value)}
                        class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="[email protected]"
                      />
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-5">
                    <div>
                      <label for="date" class="block text-sm font-medium text-text-secondary mb-2">
                        Preferred Date *
                      </label>
                      <input
                        id="date"
                        type="date"
                        required
                        value={formData.date}
                        onInput={event => setFormData("date", event.currentTarget.value)}
                        class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label for="timeSlot" class="block text-sm font-medium text-text-secondary mb-2">
                        Time Slot *
                      </label>
                      <select
                        id="timeSlot"
                        value={formData.timeSlot}
                        onInput={event => setFormData("timeSlot", event.currentTarget.value)}
                        class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      >
                        <option value="morning">Morning (09:00 - 13:00)</option>
                        <option value="afternoon">Afternoon (13:00 - 17:00)</option>
                        <option value="evening">Evening (17:00 - 22:00)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label for="project" class="block text-sm font-medium text-text-secondary mb-2">
                      Project / Show Name *
                    </label>
                    <input
                      id="project"
                      type="text"
                      required
                      value={formData.project}
                      onInput={event => setFormData("project", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="e.g., The Debug Log Podcast"
                    />
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-text-secondary mb-2">
                      Tell Us About Your Session *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows="4"
                      value={formData.description}
                      onInput={event => setFormData("description", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="What are you recording? How many people will be on camera/mic? Any special requirements (green screen, specific framing, etc.)?"
                    />
                  </div>

                  <div class="p-4 rounded-lg bg-dark-700 border border-border">
                    <p class="text-sm text-text-muted">
                      <strong class="text-text-secondary">Pricing:</strong> Studio access is offered at community-friendly rates.
                      Base42 members and non-profit community groups get priority booking and discounted rates.
                      We'll confirm pricing when we follow up on your request.
                    </p>
                  </div>

                  <Button type="submit" size="lg" class="w-full" disabled={!selectedPackage() || formState() === "loading"}>
                    <Show
                      when={formState() !== "loading"}
                      fallback={
                        <>
                          <span class="animate-spin">◐</span>
                          Submitting...
                        </>
                      }
                    >
                      <Icon icon="lucide:send" class="text-xl" />
                      Submit Studio Booking
                    </Show>
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </>
  );
}
