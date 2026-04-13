import { Icon } from "@iconify-icon/solid";
import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Reveal from "~/components/common/Reveal";
import Button from "~/components/ui/Button";
import SectionHeader from "~/components/ui/SectionHeader";
import Tag from "~/components/ui/Tag";
import { difficultyColors, fullProjects, languageColors, siteMeta } from "~/data/site";

export default function ProjectsPage() {
  return (
    <>
      <Title>{siteMeta.titleTemplate("Projects")}</Title>
      <Meta
        name="description"
        content="Open source projects built by the Base42 community. All projects are free to join and contribute to."
      />

      <div class="min-h-screen pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <A href="/" class="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8">
              <Icon icon="lucide:arrow-left" class="w-4 h-4" />
              Back to Home
            </A>
          </Reveal>

          <section class="mb-16">
            <Reveal>
              <h1 class="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
                Open Source <span class="text-gradient">Projects</span>
              </h1>
              <p class="text-xl text-text-secondary max-w-3xl leading-relaxed mb-8">
                Everything we build at Base42 is open source. These projects are built by the community, for the community.
                Pick one that interests you and start contributing today.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="https://github.com/42dotmk" target="_blank" rel="noopener noreferrer">
                  <Button>
                    <Icon icon="lucide:github" class="w-4 h-4" />
                    View All on GitHub
                  </Button>
                </a>
                <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <Icon icon="lucide:message-square" class="w-4 h-4" />
                    Join Discord to Contribute
                  </Button>
                </a>
              </div>
            </Reveal>
          </section>

          <section class="mb-16">
            <Reveal>
              <div class="bg-dark-800 rounded-2xl p-8 border border-border">
                <h2 class="text-2xl font-display font-bold text-text-primary mb-6">How to Get Involved</h2>
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 class="font-semibold text-text-primary mb-1">Pick a Project</h3>
                      <p class="text-sm text-text-muted">
                        Browse the projects below and find one that matches your interests and skill level.
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 class="font-semibold text-text-primary mb-1">Join the Discussion</h3>
                      <p class="text-sm text-text-muted">
                        Head to our Discord and introduce yourself in the projects channels. We'll help you get started.
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-4">
                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 class="font-semibold text-text-primary mb-1">Start Contributing</h3>
                      <p class="text-sm text-text-muted">
                        Fork the repo, pick an issue, and submit your first PR. No contribution is too small.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section>
            <SectionHeader title="Active Projects" subtitle="Choose your adventure" />
            <div class="space-y-8">
              <For each={fullProjects}>
                {(project, index) => (
                  <Reveal delay={index() * 50}>
                    <div class="group bg-dark-800 rounded-2xl border border-border hover:border-primary/50 transition-all overflow-hidden">
                      <div class="p-6 md:p-8">
                        <div class="flex flex-col lg:flex-row lg:items-start gap-6">
                          <div class="flex items-start gap-4 lg:w-1/3">
                            <div class="p-4 rounded-xl bg-dark-700 text-primary group-hover:bg-primary/10 transition-colors">
                              <Icon icon={project.icon} class="w-8 h-8" />
                            </div>
                            <div class="flex-1">
                              <div class="flex items-center gap-2 mb-1">
                                <h3 class="text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                                  {project.name}
                                </h3>
                                {project.status === "seasonal" && (
                                  <span class="px-2 py-0.5 rounded text-xs bg-secondary/20 text-secondary">Seasonal</span>
                                )}
                              </div>
                              <div class="flex items-center gap-3 text-sm text-text-muted mb-3">
                                <span class="flex items-center gap-1">
                                  <span class={`w-3 h-3 rounded-full ${languageColors[project.language] || "bg-gray-500"}`} />
                                  {project.language}
                                </span>
                                <span class="flex items-center gap-1">
                                  <Icon icon="lucide:star" class="w-3.5 h-3.5" />
                                  {project.stars}
                                </span>
                                <span class={difficultyColors[project.difficulty] || "text-text-muted"}>{project.difficulty}</span>
                              </div>
                              <div class="flex flex-wrap gap-1.5">
                                <For each={project.tags.slice(0, 4)}>{tag => <Tag name={tag} size="sm" />}</For>
                              </div>
                            </div>
                          </div>

                          <div class="lg:w-1/3">
                            <p class="text-text-secondary mb-3">{project.description}</p>
                            <p class="text-sm text-text-muted">{project.longDescription}</p>
                          </div>

                          <div class="lg:w-1/3 lg:text-right">
                            <div class="mb-4">
                              <h4 class="text-sm font-semibold text-text-primary mb-2 lg:text-right">Looking for:</h4>
                              <div class="flex flex-wrap gap-2 lg:justify-end">
                                <For each={project.lookingFor}>
                                  {role => <span class="px-2 py-1 rounded-lg bg-dark-700 text-xs text-text-muted">{role}</span>}
                                </For>
                              </div>
                            </div>
                            <div class="flex gap-2 lg:justify-end">
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm">
                                  <Icon icon="lucide:github" class="w-4 h-4" />
                                  View Code
                                </Button>
                              </a>
                              <a href={`${project.github}/issues`} target="_blank" rel="noopener noreferrer">
                                <Button size="sm">
                                  <Icon icon="lucide:code" class="w-4 h-4" />
                                  Issues
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )}
              </For>
            </div>
          </section>

          <section class="mt-20">
            <Reveal>
              <div class="relative rounded-2xl overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-secondary/20 via-dark-800 to-primary/20" />
                <div class="relative p-8 md:p-12 text-center">
                  <h2 class="text-3xl font-display font-bold text-text-primary mb-4">Have a Project Idea?</h2>
                  <p class="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
                    We're always looking for new projects to tackle. If you have an idea for an open source project that
                    would benefit the community, we'd love to hear about it.
                  </p>
                  <div class="flex flex-wrap justify-center gap-4">
                    <a href="https://discord.gg/424xxTZVYX" target="_blank" rel="noopener noreferrer">
                      <Button size="lg">
                        <Icon icon="lucide:message-square" class="w-5 h-5" />
                        Pitch Your Idea on Discord
                      </Button>
                    </a>
                    <a href="mailto:[email protected]">
                      <Button variant="outline" size="lg">
                        Email Us
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </>
  );
}
