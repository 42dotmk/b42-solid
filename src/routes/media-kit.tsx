import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For, createSignal } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import {
  brandAssets,
  brandColors,
  brandGuidelines,
  brandTermsOfUse,
  brandTypography,
  siteMeta,
} from "~/data/site";

function ColorSwatch(props: { name: string; hex: string; rgb: string; cssVar: string; usage: string }) {
  const [copied, setCopied] = createSignal(false);

  const copyHex = () => {
    navigator.clipboard.writeText(props.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copyHex}
      class="group text-left rounded-xl overflow-hidden bg-dark-800 border border-border hover:border-primary/50 transition-all w-full h-full flex flex-col"
    >
      <div class="h-20 w-full shrink-0" style={{ background: props.hex }} />
      <div class="p-4 flex-1 overflow-hidden">
        <div class="flex items-center justify-between mb-1">
          <span class="font-display font-semibold text-text-primary text-sm">{props.name}</span>
          <span class="text-xs text-text-muted font-mono group-hover:text-primary transition-colors">
            {copied() ? "Copied!" : props.hex}
          </span>
        </div>
        <div class="text-xs text-text-muted font-mono mb-2">rgb({props.rgb})</div>
        <p class="text-xs text-text-secondary leading-relaxed">{props.usage}</p>
      </div>
    </button>
  );
}

function TypographyCard(props: { name: string; role: string; weights: string; sample: string; cssVar: string }) {
  const fontClass = () => {
    if (props.cssVar === "--font-display") return "font-display";
    if (props.cssVar === "--font-mono") return "font-mono";
    return "";
  };

  return (
    <div class="p-6 rounded-xl bg-dark-800 border border-border">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-display font-semibold text-text-primary">{props.name}</h3>
          <span class="text-xs text-text-muted">{props.role}</span>
        </div>
        <span class="text-xs text-text-muted font-mono bg-dark-700 px-2 py-1 rounded">
          {props.cssVar}
        </span>
      </div>
      <p class={`text-2xl text-text-primary mb-3 leading-relaxed ${fontClass()}`}>
        {props.sample}
      </p>
      <div class="text-xs text-text-muted">
        Weights: <span class="text-text-secondary">{props.weights}</span>
      </div>
    </div>
  );
}

export default function MediaKit() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Media Kit")}</Title>
      <Meta
        name="description"
        content="Base42 brand guidelines, logos, colors, and typography. Download official assets and learn how to use the Base42 brand."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
              <Icon icon="lucide:arrow-left" class="text-base" />
              Back to Home
            </A>
          </Reveal>

          <section class="mb-20">
            <Reveal>
              <div>
                <h1 class="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
                  Media <span class="text-gradient">Kit</span>
                </h1>
                <p class="text-xl text-text-secondary max-w-3xl leading-relaxed">
                  Everything you need to represent Base42 accurately. Download our logos, reference our color palette,
                  and follow the guidelines below when using the Base42 brand in your materials.
                </p>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Logo" subtitle="Our marks in vector format, ready to use" />
            <div class="grid sm:grid-cols-2 gap-6">
              <For each={brandAssets}>
                {(asset, index) => (
                  <Reveal delay={index() * 100} class="h-full">
                    <div class="rounded-2xl bg-dark-800 border border-border overflow-hidden h-full flex flex-col">
                      <div class={`flex items-center justify-center p-12 border-b border-border min-h-[180px] ${asset.previewBg}`}>
                        <img
                          src={asset.path}
                          alt={asset.name}
                          class="max-h-20 w-auto"
                        />
                      </div>
                      <div class="p-5 flex flex-col flex-1">
                        <div class="flex items-start gap-3 mb-3">
                          <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
                            <Icon icon={asset.icon} class="text-lg" />
                          </div>
                          <div>
                            <h3 class="font-display font-semibold text-text-primary text-sm">{asset.name}</h3>
                            <span class="text-xs text-text-muted font-mono">{asset.format}</span>
                          </div>
                        </div>
                        <p class="text-sm text-text-secondary mb-4 flex-1">{asset.description}</p>
                        <a href={asset.path} download={asset.name}>
                          <Button variant="outline" size="sm" class="w-full">
                            <Icon icon="lucide:download" class="text-base" />
                            Download {asset.format}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Colors" subtitle="The full Base42 palette with usage context" />
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <For each={brandColors}>
                {(color, index) => (
                  <Reveal delay={index() * 75} class="h-52">
                    <ColorSwatch {...color} />
                  </Reveal>
                )}
              </For>
            </div>
            <Reveal>
              <p class="text-sm text-text-muted text-center mt-6">
                Click any swatch to copy its hex value.
              </p>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Typography" subtitle="Three fonts, each with a distinct role" />
            <div class="space-y-4">
              <For each={brandTypography}>
                {(font, index) => (
                  <Reveal delay={index() * 100}>
                    <TypographyCard {...font} />
                  </Reveal>
                )}
              </For>
            </div>
            <Reveal>
              <div class="mt-6 p-4 rounded-lg bg-dark-700 border border-border">
                <p class="text-sm text-text-secondary">
                  All three fonts are served via{" "}
                  <a
                    href="https://fonts.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary hover:text-primary-hover transition-colors underline underline-offset-2"
                  >
                    Google Fonts
                  </a>{" "}
                  and are free to use under the SIL Open Font License.
                </p>
              </div>
            </Reveal>
          </section>

          <section class="mb-20">
            <SectionHeader title="Usage Guidelines" subtitle="How to use the Base42 brand correctly" />
            <div class="grid md:grid-cols-2 gap-6">
              <Reveal>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                  <div class="flex items-center gap-3 mb-5">
                    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10 text-success shrink-0">
                      <Icon icon="lucide:check" class="text-xl" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary text-lg">Do</h3>
                  </div>
                  <ul class="space-y-3">
                    <For each={brandGuidelines.dos}>
                      {item => (
                        <li class="flex items-start gap-3 text-sm text-text-secondary">
                          <Icon icon="lucide:check" class="text-success text-base shrink-0 mt-0.5" />
                          {item}
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div class="rounded-2xl bg-dark-800 border border-border p-6 h-full">
                  <div class="flex items-center gap-3 mb-5">
                    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10 text-error shrink-0">
                      <Icon icon="lucide:x" class="text-xl" />
                    </div>
                    <h3 class="font-display font-semibold text-text-primary text-lg">Don't</h3>
                  </div>
                  <ul class="space-y-3">
                    <For each={brandGuidelines.donts}>
                      {item => (
                        <li class="flex items-start gap-3 text-sm text-text-secondary">
                          <Icon icon="lucide:x" class="text-error text-base shrink-0 mt-0.5" />
                          {item}
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          <section class="mb-20">
            <SectionHeader title="Terms of Use" subtitle="Please respect these when using our brand" />
            <Reveal>
              <div class="rounded-2xl bg-dark-800 border border-border p-8">
                <ul class="space-y-4">
                  <For each={brandTermsOfUse}>
                    {(term, index) => (
                      <li class="flex items-start gap-4 text-text-secondary">
                        <span class="font-mono text-xs text-primary bg-primary/10 rounded px-2 py-1 shrink-0 mt-0.5">
                          {String(index() + 1).padStart(2, "0")}
                        </span>
                        <span class="leading-relaxed">{term}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Reveal>
          </section>

          <section>
            <Reveal>
              <div class="bg-dark-800 rounded-2xl p-8 md:p-12 border border-border text-center">
                <h2 class="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">
                  Need something specific?
                </h2>
                <p class="text-text-secondary max-w-xl mx-auto mb-8">
                  If you need assets in a different format, higher resolution files, or have questions
                  about brand usage, get in touch and we'll sort it out.
                </p>
                <a href="mailto:[email protected]">
                  <Button size="lg">
                    <Icon icon="lucide:mail" class="text-xl" />
                    Contact Us
                  </Button>
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
