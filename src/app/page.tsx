/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import HackathonParade from "@/components/hackathonParade";
import { getBlogPosts, getJSONData } from "@/lib/serverUtils";

import Link from "next/link";
import Image from "next/image";

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

import { Avatar } from "@/components/ui/avatar";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Code2,
  FileText,
  BarChart3,
  BrainCircuit,
  LineChart,
  Wrench,
  Sigma,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

const skillCategories: {
  key: keyof Awaited<ReturnType<typeof getJSONData>>["skills"];
  title: string;
  icon: LucideIcon;
  span: string;
}[] = [
  { key: "programming", title: "Programming", icon: Code2, span: "md:col-span-3" },
  { key: "machineLearning", title: "Machine Learning", icon: BrainCircuit, span: "md:col-span-3" },
  { key: "dataVisualization", title: "Data & Visualization", icon: BarChart3, span: "md:col-span-2" },
  { key: "timeSeriesEconometrics", title: "Time Series Econometrics (R)", icon: LineChart, span: "md:col-span-2" },
  { key: "mathematics", title: "Mathematics", icon: Sigma, span: "md:col-span-2" },
  { key: "tools", title: "Tools & Infrastructure", icon: Wrench, span: "md:col-span-4" },
  { key: "reportsOffice", title: "Reports & Office", icon: FileText, span: "md:col-span-2" },
  { key: "personalStrengths", title: "Personal Strengths", icon: Sparkles, span: "md:col-span-6" },
] as const;

const educationCategories = [
  { key: "degree", title: "Academic Education" },
  { key: "certificate", title: "Certificates" },
  { key: "language", title: "Languages" },
] as const;

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10 space-y-2 md:mb-12">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="max-w-2xl pt-1 text-muted-foreground">{intro}</p>}
    </div>
  );
}

export default async function Home() {
  const data = await getJSONData();
  const posts = await getBlogPosts();
  const firstName = data.personalInfo.name.split(" ")[0];

  return (
    <main>
      {/* ==================== HACKATHON PHOTO PARADE ==================== */}
      {data.hackathons?.length > 0 && (
        <HackathonParade hackathons={data.hackathons} />
      )}

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="container mx-auto max-w-5xl pb-16 pt-10 md:pb-20"
      >
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
          {/* Profile Image */}
          <div className="relative mx-auto w-40 md:w-44">
            <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-primary to-primary/20 opacity-70 blur-md" />
            <Image
              src="/assets/profile.jpg"
              width={280}
              height={280}
              alt={`${data.personalInfo.name} profile`}
              className="relative aspect-square rounded-[1.75rem] object-cover object-center"
              priority
            />
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Hey, I&apos;m{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                {firstName}
              </span>
              .
            </h1>

            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{data.personalInfo.title}</span>
              <span>{data.personalInfo.location}</span>
            </div>

            <p className="max-w-[60ch] text-muted-foreground lg:text-lg">
              {data.personalInfo.bio}
            </p>

            {/* Social / CV Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="/Lebenslauf_Esdras_Shaa_Prombo.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 rounded-xl">
                  <Download className="h-4 w-4" />
                  View CV
                </Button>
              </a>

              <a href="#hackathons">
                <Button variant="outline" className="gap-2 rounded-xl">
                  <ArrowDown className="h-4 w-4" />
                  My hackathons
                </Button>
              </a>

              <Link href={data.contactInfo.github} prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              <Link href={data.contactInfo.linkedin} prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <LinkedInLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              <Link href={`mailto:${data.contactInfo.email}`} aria-label="Email">
                <Button variant="outline" size="icon" className="rounded-xl">
                  <EnvelopeClosedIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HACKATHONS SECTION ==================== */}
      {data.hackathons?.length > 0 && (
        <section id="hackathons" className="section">
          <div className="container mx-auto max-w-5xl">
            <SectionHeader
              eyebrow="Hackathons"
              title="Building AI with real companies"
              intro="Two challenges at the Futury Build Days in Frankfurt, each set by an industry partner with a real problem and real documents."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {data.hackathons.map((event) => (
                <article key={event.id} className="surface group flex flex-col overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={event.cover}
                      alt={`${event.shortTitle}: ${event.title}`}
                      fill
                      sizes="(min-width: 768px) 500px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3.5 top-3.5 flex items-center gap-1.5 rounded-lg bg-black/70 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white backdrop-blur">
                      {/^\d/.test(event.result) && <Trophy className="h-3.5 w-3.5" />}
                      {event.date} · {event.result}
                    </span>
                  </div>

                  <div className="grid gap-4 p-6">
                    <span className="font-mono text-xs tracking-wide text-primary">{event.host}</span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{event.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>

                    <div className="grid grid-cols-3 gap-2.5">
                      {event.facts.map((fact) => (
                        <div key={fact.label} className="rounded-xl bg-muted p-3">
                          <b className="block font-display text-xl tabular-nums">{fact.value}</b>
                          <span className="block text-xs leading-snug text-muted-foreground">{fact.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {event.technologies.map((t) => (
                        <span key={t} className="pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section id="experience" className="section">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader eyebrow="Experience" title="Work Experience" />

          <div className="grid gap-4">
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="surface grid gap-2 p-6 md:grid-cols-[170px_1fr] md:gap-6">
                <div className="pt-1 font-mono text-sm text-muted-foreground">
                  {exp.startDate} – {exp.endDate}
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">
                    {exp.role} @{" "}
                    <Link href={exp.companyWebsite} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {exp.company}
                    </Link>
                  </h3>

                  <ul className="mt-3 grid list-disc gap-1 pl-4 text-sm text-muted-foreground">
                    {exp.keyResponsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section id="projects" className="section">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader eyebrow="Projects" title="My Projects" />

          <div className="grid gap-5 md:grid-cols-2">
            {data.projects.map((project) => {
              const hasRepo = project.code_repo_url && project.code_repo_url !== "#!";
              return (
                <article
                  key={project.title}
                  className="surface group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={project.cover}
                      alt={`${project.title} project`}
                      fill
                      sizes="(min-width: 768px) 500px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <span key={technology} className="pill">{technology}</span>
                      ))}
                    </div>

                    {hasRepo && (
                      <Link
                        href={project.code_repo_url}
                        prefetch={false}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-primary"
                      >
                        <GitHubLogoIcon className="h-4 w-4" />
                        Open repository
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== EDUCATION SECTION ==================== */}
      <section id="education" className="section">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader eyebrow="Education" title="Education" />

          <div className="grid gap-12">
            {educationCategories.map((category) => {
              const items = data.education.filter(
                (education) => education.category === category.key
              );

              if (items.length === 0) {
                return null;
              }

              return (
                <div key={category.key}>
                  <h3 className="mb-5 font-display text-2xl font-semibold">{category.title}</h3>

                  <div className="grid gap-4">
                    {items.map((education) => (
                      <div key={education.id} className="surface grid gap-2 p-6 md:grid-cols-[170px_1fr] md:gap-6">
                        <div className="pt-1 font-mono text-sm text-muted-foreground">
                          {education.startDate} – {education.endDate}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display text-lg font-semibold">{education.degree}</h4>
                          <p className="font-medium text-primary">{education.institution}</p>
                          {education.description && (
                            <p className="mt-2 text-sm text-muted-foreground">{education.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
      <section id="skills" className="section">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Toolbox"
            title="Skills"
            intro="The languages, methods and tools I use to turn data into insight."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {skillCategories.map(({ key, title, icon: Icon, span }) => {
              const skills = data.skills[key];

              return (
                <Card
                  key={key}
                  className={`group relative overflow-hidden rounded-2xl border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${span}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="font-display text-lg">{title}</CardTitle>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-muted-foreground">
                        {String(skills.length).padStart(2, "0")}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full px-3 py-1 text-sm font-normal transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}

      {/* 
      <section
        id="testimonials"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">
          Testimonials
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data.testimonials.map((testimonial) => (
            <Card
              className="p-6 text-left"
              key={testimonial.id}
            >
              <blockquote className="font-medium lg:text-lg">
                &ldquo;{testimonial.feedback}.&rdquo;
              </blockquote>

              <div className="mt-4 flex items-center gap-3">
                <Avatar>
                  <Image
                    height={50}
                    width={50}
                    alt={`${testimonial.name} avatar`}
                    src={testimonial.avatar}
                  />
                </Avatar>

                <div>
                  <div className="font-semibold">
                    {testimonial.name}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.title} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      */}

      {/* ==================== BLOGS ==================== */}

      {/*
      <section
        id="blogs"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">
          Blogs
        </h2>

        <div className="flex flex-col space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
            >
              <h3 className="text-xl font-semibold md:text-3xl">
                {post.title}
              </h3>

              <p className="font-light md:text-lg">
                {post.description}
              </p>

              <p className="mt-2 text-sm font-medium text-gray-500">
                Published at: {post.publishDate}
              </p>
            </Link>
          ))}
        </div>
      </section>
      */}
    </main>
  );
}
