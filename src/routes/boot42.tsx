import { Meta, Title } from "@solidjs/meta";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import SectionHeader from "~/components/ui/SectionHeader";
import { siteMeta } from "~/data/site";

function LogoPrimary() {
  return (
    <svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md" role="img" aria-labelledby="logo-primary-title">
      <title id="logo-primary-title">Boot42 logo with power symbol</title>
      <defs>
        <linearGradient id="boot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
        <linearGradient id="power-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <g>
        <circle cx="52" cy="60" r="38" fill="none" stroke="url(#power-grad)" stroke-width="5" stroke-dasharray="190" stroke-dashoffset="30" />
        <line x1="52" y1="18" x2="52" y2="48" stroke="url(#power-grad)" stroke-width="5" stroke-linecap="round" />
        <text x="130" y="78" font-family="JetBrains Mono, monospace" font-weight="700" font-size="64" fill="#FFFFFF" letter-spacing="-2">
          boot
        </text>
        <text x="310" y="78" font-family="JetBrains Mono, monospace" font-weight="700" font-size="64" fill="url(#boot-grad)" letter-spacing="-2">
          42
        </text>
      </g>
    </svg>
  );
}

function LogoTerminal() {
  return (
    <svg viewBox="0 0 440 130" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md" role="img" aria-labelledby="logo-terminal-title">
      <title id="logo-terminal-title">Boot42 terminal window logo</title>
      <defs>
        <linearGradient id="term-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="440" height="130" rx="12" fill="#151C1F" stroke="#37464E" stroke-width="2" />
      <circle cx="20" cy="16" r="5" fill="#EF4444" />
      <circle cx="36" cy="16" r="5" fill="#F59E0B" />
      <circle cx="52" cy="16" r="5" fill="#22C55E" />
      <text x="20" y="62" font-family="JetBrains Mono, monospace" font-size="14" fill="#37464E">
        $ podcast --start
      </text>
      <text x="20" y="100" font-family="JetBrains Mono, monospace" font-weight="700" font-size="40" fill="url(#term-grad)">
        &gt; boot42
      </text>
      <rect x="282" y="74" width="3" height="30" fill="#FAE127">
        <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function LogoMinimal() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[120px]" role="img" aria-labelledby="logo-minimal-title">
      <title id="logo-minimal-title">Boot42 app icon</title>
      <defs>
        <linearGradient id="min-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="112" height="112" rx="24" fill="#151C1F" stroke="url(#min-grad)" stroke-width="3" />
      <text x="60" y="56" font-family="JetBrains Mono, monospace" font-weight="700" font-size="18" fill="#2BEDED" text-anchor="middle">
        BOOT
      </text>
      <text x="60" y="84" font-family="JetBrains Mono, monospace" font-weight="700" font-size="32" fill="#FAE127" text-anchor="middle">
        42
      </text>
    </svg>
  );
}

function LogoStacked() {
  return (
    <svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[260px]" role="img" aria-labelledby="logo-stacked-title">
      <title id="logo-stacked-title">Boot42 stacked wordmark</title>
      <defs>
        <linearGradient id="stack-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <text x="130" y="70" font-family="JetBrains Mono, monospace" font-weight="700" font-size="72" fill="#FFFFFF" text-anchor="middle" letter-spacing="-3">
        boot
      </text>
      <text x="130" y="130" font-family="JetBrains Mono, monospace" font-weight="700" font-size="72" fill="url(#stack-grad)" text-anchor="middle" letter-spacing="-3">
        42
      </text>
      <line x1="20" y1="82" x2="240" y2="82" stroke="url(#stack-grad)" stroke-width="2" />
    </svg>
  );
}

function LogoWaveform() {
  return (
    <svg viewBox="0 0 440 120" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md" role="img" aria-labelledby="logo-waveform-title">
      <title id="logo-waveform-title">Boot42 waveform logo</title>
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <g transform="translate(0, 60)">
        {[0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80].map((x, i) => {
          const heights = [12, 28, 20, 40, 32, 44, 36, 24, 16, 30, 10];
          const h = heights[i];
          return <rect x={x + 10} y={-h} width="4" height={h * 2} rx="2" fill="url(#wave-grad)" opacity={0.6 + i * 0.04} />;
        })}
      </g>
      <text x="110" y="76" font-family="JetBrains Mono, monospace" font-weight="700" font-size="56" fill="#FFFFFF" letter-spacing="-2">
        boot
      </text>
      <text x="300" y="76" font-family="JetBrains Mono, monospace" font-weight="700" font-size="56" fill="url(#wave-grad)" letter-spacing="-2">
        42
      </text>
    </svg>
  );
}

function LogoBrackets() {
  return (
    <svg viewBox="0 0 420 100" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md" role="img" aria-labelledby="logo-brackets-title">
      <title id="logo-brackets-title">Boot42 brackets logo</title>
      <defs>
        <linearGradient id="brack-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2BEDED" />
          <stop offset="100%" stop-color="#FAE127" />
        </linearGradient>
      </defs>
      <text x="10" y="70" font-family="JetBrains Mono, monospace" font-weight="400" font-size="56" fill="#2BEDED">
        [
      </text>
      <text x="40" y="70" font-family="JetBrains Mono, monospace" font-weight="700" font-size="56" fill="#FFFFFF" letter-spacing="-2">
        boot
      </text>
      <text x="230" y="70" font-family="JetBrains Mono, monospace" font-weight="700" font-size="56" fill="url(#brack-grad)" letter-spacing="-2">
        42
      </text>
      <text x="340" y="70" font-family="JetBrains Mono, monospace" font-weight="400" font-size="56" fill="#FAE127">
        ]
      </text>
      <text x="370" y="40" font-family="JetBrains Mono, monospace" font-weight="400" font-size="14" fill="#37464E">
        .mk
      </text>
    </svg>
  );
}

const colors = [
  { name: "Circuit", hex: "#2BEDED", role: "Primary — inherited from Base42" },
  { name: "Volt", hex: "#FAE127", role: "Accent — inherited from Base42" },
  { name: "Void", hex: "#151C1F", role: "Background — shared with Base42" },
  { name: "Terminal Green", hex: "#22C55E", role: "Active / live indicator" },
  { name: "Signal White", hex: "#FFFFFF", role: "Text and foreground" },
  { name: "Slate", hex: "#37464E", role: "Muted UI, secondary borders" },
];

const concepts = [
  {
    label: "Power Symbol",
    component: LogoPrimary,
    desc: "IEC 5009 power icon paired with the wordmark. Reads as 'booting up' — a machine coming alive. Strong, immediately recognizable at any size.",
  },
  {
    label: "Terminal Window",
    component: LogoTerminal,
    desc: "A terminal prompt executing the podcast. The blinking cursor says 'we're live.' Works great as a video intro frame or stream overlay.",
  },
  {
    label: "App Icon",
    component: LogoMinimal,
    desc: "Square mark for podcast platforms, favicons, and social avatars. BOOT in Circuit, 42 in Volt — stacked inside a rounded square.",
  },
  {
    label: "Stacked Wordmark",
    component: LogoStacked,
    desc: "Vertical lockup with a gradient divider. Works for cover art, merch, and anywhere you need a taller format.",
  },
  {
    label: "Waveform",
    component: LogoWaveform,
    desc: "Audio waveform bars leading into the wordmark. Immediately says 'podcast' without a mic cliche. Gradient bars flow from Circuit to Volt.",
  },
  {
    label: "Brackets",
    component: LogoBrackets,
    desc: "Code brackets wrapping the name — [boot42].mk — nods to the developer audience. The .mk top-level domain becomes part of the identity.",
  },
];

export default function Boot42Branding() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Boot42 Branding")}</Title>
      <Meta name="robots" content="noindex" />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <section class="mb-20">
            <Reveal>
              <div>
                <h1 class="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
                  <span class="text-gradient">Boot42</span> Branding
                </h1>
                <p class="text-xl text-text-secondary max-w-3xl leading-relaxed mb-2">
                  Logo concepts and brand identity for the Base42 podcast.
                </p>
                <p class="text-sm text-text-muted font-mono">boot.mk</p>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Logo Concepts" subtitle="Six directions, pick your favorite" />
            <div class="space-y-8">
              <For each={concepts}>
                {(concept, index) => (
                  <Reveal delay={index() * 75}>
                    <div class="rounded-2xl bg-dark-800 border border-border overflow-hidden">
                      <div class="flex items-center justify-center p-12 bg-dark-900 border-b border-border min-h-[200px]">
                        <concept.component />
                      </div>
                      <div class="p-6">
                        <h3 class="font-display font-bold text-text-primary text-lg mb-2">{concept.label}</h3>
                        <p class="text-sm text-text-secondary leading-relaxed">{concept.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Palette" subtitle="Inherits Base42's DNA with one addition" />
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <For each={colors}>
                {(color, index) => (
                  <Reveal delay={index() * 75} class="h-52">
                    <div class="rounded-xl overflow-hidden bg-dark-800 border border-border h-full flex flex-col">
                      <div class="h-20 w-full shrink-0" style={{ background: color.hex }} />
                      <div class="p-4 flex-1 overflow-hidden">
                        <div class="flex items-center justify-between mb-1">
                          <span class="font-display font-semibold text-text-primary text-sm">{color.name}</span>
                          <span class="text-xs text-text-muted font-mono">{color.hex}</span>
                        </div>
                        <p class="text-xs text-text-secondary leading-relaxed">{color.role}</p>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Typography" subtitle="One font, no exceptions" />
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8">
                <div class="flex items-start justify-between mb-6">
                  <div>
                    <h3 class="font-display font-bold text-text-primary text-xl">JetBrains Mono</h3>
                    <span class="text-sm text-text-muted">Monospace everywhere — headings, body, UI</span>
                  </div>
                  <span class="text-xs text-text-muted font-mono bg-dark-700 px-2 py-1 rounded">400 · 500 · 700</span>
                </div>
                <div class="space-y-4 font-mono">
                  <p class="text-3xl text-text-primary font-bold">BOOT42 — A Base42 Podcast</p>
                  <p class="text-lg text-text-secondary">Tech, open source, and the people who build things.</p>
                  <p class="text-sm text-text-muted">Episode 14 · 2025-03-21 · 47 min · guest: @hacker</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Voice & Tone" subtitle="How Boot42 sounds in writing" />
            <div class="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                  <h3 class="font-display font-bold text-text-primary mb-4">The Pitch</h3>
                  <p class="text-text-secondary leading-relaxed text-sm">
                    Boot42 is the podcast from Base42 — Skopje's hackerspace. Each episode boots up a conversation
                    with builders, hackers, and curious minds about the things they make, break, and learn.
                    No corporate polish. No sponsor reads. Just the terminal output of real conversations.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                  <h3 class="font-display font-bold text-text-primary mb-4">Tone Keywords</h3>
                  <div class="flex flex-wrap gap-2">
                    <For each={["Direct", "Technical but accessible", "Curious", "No fluff", "Dry humor", "Community-first", "Open source mindset", "Skopje-rooted"]}>
                      {tag => (
                        <span class="px-3 py-1.5 rounded-lg bg-dark-700 border border-border text-xs text-text-secondary font-mono">
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section>
            <SectionHeader title="Usage Examples" subtitle="How it could look in the wild" />
            <div class="space-y-6">
              <Reveal>
                <div class="rounded-2xl bg-dark-900 border border-border p-8 text-center">
                  <p class="text-xs text-text-muted font-mono mb-6 uppercase tracking-widest">Podcast Cover Art</p>
                  <div class="inline-block bg-dark-800 border border-border rounded-2xl p-10 shadow-xl">
                    <div class="w-64 h-64 flex flex-col items-center justify-center gap-4 relative">
                      <div class="absolute inset-0 rounded-xl overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10" />
                        <div class="absolute inset-0" style={{ "background-image": "linear-gradient(rgba(43,237,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(43,237,237,0.03) 1px, transparent 1px)", "background-size": "20px 20px" }} />
                      </div>
                      <div class="relative">
                        <LogoStacked />
                      </div>
                      <p class="relative text-xs text-text-muted font-mono tracking-wider">A BASE42 PODCAST</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div class="rounded-2xl bg-dark-900 border border-border p-8">
                  <p class="text-xs text-text-muted font-mono mb-6 uppercase tracking-widest text-center">Episode Card</p>
                  <div class="max-w-lg mx-auto bg-dark-800 border border-border rounded-xl overflow-hidden">
                    <div class="h-2 w-full" style={{ background: "linear-gradient(90deg, #2BEDED, #FAE127)" }} />
                    <div class="p-6">
                      <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10">
                          <LogoMinimal />
                        </div>
                        <div>
                          <p class="text-xs text-text-muted font-mono">Boot42 · Episode 14</p>
                          <h4 class="font-display font-bold text-text-primary">"Why We Build in the Open"</h4>
                        </div>
                      </div>
                      <p class="text-sm text-text-secondary mb-4">
                        A conversation about open source culture, why sharing your work matters, and how a small
                        hackerspace in Skopje became a community of 1,000+ builders.
                      </p>
                      <div class="flex items-center gap-4 text-xs text-text-muted font-mono">
                        <span>47 min</span>
                        <span class="h-3 w-px bg-border" />
                        <span>2025-03-21</span>
                        <span class="h-3 w-px bg-border" />
                        <span class="text-secondary">guest: @dzenana</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div class="rounded-2xl bg-dark-900 border border-border p-8">
                  <p class="text-xs text-text-muted font-mono mb-6 uppercase tracking-widest text-center">Social Banner</p>
                  <div class="max-w-2xl mx-auto rounded-xl overflow-hidden border border-border" style={{ background: "linear-gradient(135deg, #151C1F 0%, #1C2428 100%)" }}>
                    <div class="p-10 flex items-center justify-between">
                      <div>
                        <LogoPrimary />
                        <p class="text-text-muted text-sm font-mono mt-4 ml-1">Tech conversations from Skopje's hackerspace</p>
                      </div>
                    </div>
                    <div class="h-1 w-full" style={{ background: "linear-gradient(90deg, #2BEDED, #FAE127)" }} />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
