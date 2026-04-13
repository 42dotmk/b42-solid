import { Meta, Title } from "@solidjs/meta";
import { For } from "solid-js";
import { siteMeta } from "~/data/site";

const gradients = [
  {
    name: "Volt → Circuit",
    css: "linear-gradient(135deg, #FAE127 0%, #2BEDED 100%)",
    desc: "Brand primary to brand secondary (current)",
  },
  {
    name: "Neon Horizon",
    css: "linear-gradient(135deg, #FAE127 0%, #FF6B6B 50%, #C850C0 100%)",
    desc: "Volt through coral into magenta",
  },
  {
    name: "Cyberpunk",
    css: "linear-gradient(135deg, #FAE127 0%, #FF2D95 100%)",
    desc: "Volt into hot pink",
  },
  {
    name: "Acid",
    css: "linear-gradient(135deg, #FAE127 0%, #39FF14 100%)",
    desc: "Volt into electric green",
  },
  {
    name: "Forge",
    css: "linear-gradient(135deg, #FAE127 0%, #FF4500 100%)",
    desc: "Volt into deep orange-red",
  },
  {
    name: "Aurora",
    css: "linear-gradient(135deg, #2BEDED 0%, #FAE127 50%, #FF6B6B 100%)",
    desc: "Circuit through Volt into coral",
  },
  {
    name: "Plasma",
    css: "linear-gradient(135deg, #FAE127 0%, #A855F7 100%)",
    desc: "Volt into purple",
  },
  {
    name: "Reactor",
    css: "linear-gradient(135deg, #2BEDED 0%, #6366F1 100%)",
    desc: "Circuit into indigo",
  },
  {
    name: "Voltage",
    css: "linear-gradient(135deg, #FAE127 0%, #FAE127 40%, #2BEDED 100%)",
    desc: "Holds Volt then snaps to Circuit",
  },
  {
    name: "Sunset Wire",
    css: "linear-gradient(135deg, #FAE127 0%, #F97316 50%, #EF4444 100%)",
    desc: "Volt through orange into red",
  },
  {
    name: "Hologram",
    css: "linear-gradient(135deg, #2BEDED 0%, #A855F7 50%, #FAE127 100%)",
    desc: "Circuit through purple back to Volt",
  },
  {
    name: "Molten",
    css: "linear-gradient(135deg, #FAE127 0%, #D97706 100%)",
    desc: "Volt into deep amber",
  },
  {
    name: "Ice & Fire",
    css: "linear-gradient(135deg, #2BEDED 0%, #FAE127 100%)",
    desc: "Circuit into Volt (reversed brand)",
  },
  {
    name: "Toxic",
    css: "linear-gradient(135deg, #39FF14 0%, #FAE127 50%, #FF2D95 100%)",
    desc: "Neon green through Volt into pink",
  },
  {
    name: "Copper Wire",
    css: "linear-gradient(135deg, #FAE127 0%, #B45309 100%)",
    desc: "Volt into burnt copper",
  },
  {
    name: "Void Fade",
    css: "linear-gradient(135deg, #FAE127 0%, #151C1F 100%)",
    desc: "Volt dissolving into Void",
  },
];

export default function GradientSamples() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Gradient Samples")}</Title>
      <Meta name="robots" content="noindex" />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-4xl font-display font-bold text-text-primary mb-2">Gradient Samples</h1>
          <p class="text-text-secondary mb-12">Pick your favorite. Each shown as a surface, as text, and on a heading.</p>

          <div class="space-y-16">
            <For each={gradients}>
              {(g) => (
                <div class="rounded-2xl bg-dark-800 border border-border p-6 md:p-8">
                  <div class="flex items-baseline gap-3 mb-1">
                    <h2 class="text-xl font-display font-bold text-text-primary">{g.name}</h2>
                    <span class="text-xs text-text-muted">{g.desc}</span>
                  </div>
                  <p class="text-xs text-text-muted font-mono mb-6">{g.css}</p>

                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <div class="h-20 rounded-xl" style={{ background: g.css }} />

                      <div class="h-20 rounded-xl flex items-center justify-center" style={{ background: g.css }}>
                        <span class="text-dark-900 font-display font-bold text-2xl">Base42</span>
                      </div>

                      <div class="h-16 rounded-xl border border-border bg-dark-900 flex items-center justify-center px-4">
                        <span
                          class="font-display font-bold text-3xl"
                          style={{
                            background: g.css,
                            "-webkit-background-clip": "text",
                            "-webkit-text-fill-color": "transparent",
                            "background-clip": "text",
                          }}
                        >
                          The Answer to Everything
                        </span>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <div class="rounded-xl border border-border bg-dark-900 p-5">
                        <h3
                          class="text-2xl font-display font-bold mb-2"
                          style={{
                            background: g.css,
                            "-webkit-background-clip": "text",
                            "-webkit-text-fill-color": "transparent",
                            "background-clip": "text",
                          }}
                        >
                          Upcoming Events
                        </h3>
                        <p class="text-text-secondary text-sm">See how the gradient reads as a section header on the dark surface.</p>
                      </div>

                      <div class="rounded-xl border border-border bg-dark-900 p-5">
                        <p class="text-text-secondary text-sm leading-relaxed">
                          Base42 is a hackerspace for{" "}
                          <span
                            class="font-semibold"
                            style={{
                              background: g.css,
                              "-webkit-background-clip": "text",
                              "-webkit-text-fill-color": "transparent",
                              "background-clip": "text",
                            }}
                          >
                            builders
                          </span>{" "}
                          and the{" "}
                          <span
                            class="font-semibold"
                            style={{
                              background: g.css,
                              "-webkit-background-clip": "text",
                              "-webkit-text-fill-color": "transparent",
                              "background-clip": "text",
                            }}
                          >
                            curious
                          </span>
                          . A place to learn, create, and share knowledge.
                        </p>
                      </div>

                      <div class="flex gap-3">
                        <button
                          type="button"
                          class="px-5 py-2.5 rounded-lg font-semibold text-dark-900 text-sm"
                          style={{ background: g.css }}
                        >
                          Primary Button
                        </button>
                        <button
                          type="button"
                          class="px-5 py-2.5 rounded-lg font-semibold text-sm border"
                          style={{
                            "border-image": `${g.css} 1`,
                            background: "transparent",
                            color: "#FAE127",
                          }}
                        >
                          Outline Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}
