import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import { bookSpaceOptions, siteMeta } from "~/data/site";
import { cn } from "~/lib/utils";

export default function BookPage() {
  const [selectedSpace, setSelectedSpace] = createSignal<string | null>(null);
  const [formState, setFormState] = createSignal<"idle" | "loading" | "success">("idle");
  const [formData, setFormData] = createStore({
    organization: "",
    email: "",
    date: "",
    timeSlot: "evening",
    attendees: "",
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
      <Title>{siteMeta.titleTemplate("Book the Space")}</Title>
      <Meta
        name="description"
        content="Book Base42 for community meetups, workshops, presentations, and hackathons in Skopje."
      />

      {formState() === "success" ? (
        <div class="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <Reveal>
            <div class="text-center max-w-md px-4">
              <div class="w-16 h-16 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-6">
                <Icon icon="lucide:check-circle" class="text-4xl" />
              </div>
              <h1 class="text-3xl font-display font-bold text-text-primary mb-4">Request Submitted!</h1>
              <p class="text-text-secondary mb-8">
                Your booking request has been submitted. We'll review it and get back to you within 24-48 hours.
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

            <SectionHeader title="Book the Space" subtitle="Host your meetup, workshop, or event at Base42" />

            <Reveal>
              <div class="mb-12">
                <h3 class="text-lg font-display font-semibold text-text-primary mb-4">1. Select a Space</h3>
                <div class="grid md:grid-cols-3 gap-4">
                  {bookSpaceOptions.map(space => (
                    <button
                      onClick={() => setSelectedSpace(space.id)}
                      class={cn(
                        "p-5 rounded-xl border text-left transition-all",
                        selectedSpace() === space.id ? "border-primary bg-primary/10" : "border-border bg-dark-700 hover:border-primary/50"
                      )}
                    >
                      <div class="flex items-start gap-3 mb-3">
                        <div
                          class={cn(
                            "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
                            selectedSpace() === space.id ? "bg-primary text-dark-900" : "bg-dark-600 text-text-secondary"
                          )}
                        >
                          <Icon icon={space.icon} class="text-xl" />
                        </div>
                        <div>
                          <h4 class="font-semibold text-text-primary">{space.title}</h4>
                          <p class="text-xs text-text-muted">{space.capacity}</p>
                        </div>
                      </div>
                      <p class="text-sm text-text-muted">{space.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div class="p-8 rounded-2xl bg-dark-800 border border-border">
                <h3 class="text-lg font-display font-semibold text-text-primary mb-6">2. Fill in the Details</h3>

                <form onSubmit={handleSubmit} class="space-y-5">
                  <div class="grid md:grid-cols-2 gap-5">
                    <div>
                      <label for="organization" class="block text-sm font-medium text-text-secondary mb-2">
                        Organization / Group Name *
                      </label>
                      <input
                        id="organization"
                        type="text"
                        required
                        value={formData.organization}
                        onInput={event => setFormData("organization", event.currentTarget.value)}
                        class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        placeholder="e.g., BeerJS Skopje"
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

                  <div class="grid md:grid-cols-3 gap-5">
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
                        <option value="full-day">Full Day</option>
                      </select>
                    </div>

                    <div>
                      <label for="attendees" class="block text-sm font-medium text-text-secondary mb-2">
                        Expected Attendees *
                      </label>
                      <div class="relative">
                        <Icon icon="lucide:users" class="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
                        <input
                          id="attendees"
                          type="number"
                          required
                          min="1"
                          max="100"
                          value={formData.attendees}
                          onInput={event => setFormData("attendees", event.currentTarget.value)}
                          class="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="25"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label for="description" class="block text-sm font-medium text-text-secondary mb-2">
                      Event Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows="4"
                      value={formData.description}
                      onInput={event => setFormData("description", event.currentTarget.value)}
                      class="w-full px-4 py-3 rounded-lg bg-dark-600 border border-border text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                      placeholder="Tell us about your event, its purpose, and any specific requirements..."
                    />
                  </div>

                  <div class="p-4 rounded-lg bg-dark-700 border border-border">
                    <p class="text-sm text-text-muted">
                      <strong class="text-text-secondary">Note:</strong> Base42 is a community space. Bookings are typically free
                      for community events and tech meetups.
                    </p>
                  </div>

                  <Button type="submit" size="lg" class="w-full" disabled={!selectedSpace() || formState() === "loading"}>
                    {formState() === "loading" ? (
                      <>
                        <span class="animate-spin">◐</span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Icon icon="lucide:send" class="text-xl" />
                        Submit Booking Request
                      </>
                    )}
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
