/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBlogPosts, getJSONData } from "@/lib/serverUtils";

import Link from "next/link";
import Image from "next/image";

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";

import { Avatar } from "@/components/ui/avatar";
import { Download } from "lucide-react";
import {
  Download,
  Code2,
  FileText,
  BarChart3,
  BrainCircuit,
  LineChart,
  Wrench,
  Sigma,
  Sparkles,
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
  {
    key: "degree",
    title: "Academic Education",
  },
  {
    key: "certificate",
    title: "Certificates",
  },
  {
    key: "language",
    title: "Languages",
  },
] as const;

export default async function Home() {
  const data = await getJSONData();
  const posts = await getBlogPosts();

  return (
    <main>
      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row">
          {/* Profile Image */}
          <div className="mx-auto w-1/2 lg:w-1/3">
            <Image
              src="/assets/profile.jpg"
              width={280}
              height={280}
              alt={`${data.personalInfo.name} profile`}
              className="mx-auto aspect-square overflow-hidden rounded-full object-cover object-center"
              priority
            />
          </div>

          {/* Introduction */}
          <div className="w-full space-y-4 lg:w-2/3">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
                Hey 👋, I&apos;m {data.personalInfo.name}
              </h1>
            </div>

            <p className="max-w-[600px] text-gray-500 dark:text-gray-400 lg:text-lg">
              {data.personalInfo.bio}
            </p>

            {/* Social / CV Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* GitHub */}
              <Link
                href={data.contactInfo.github}
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="secondary" size="icon">
                  <GitHubLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              {/* LinkedIn */}
              <Link
                href={data.contactInfo.linkedin}
                prefetch={false}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Button variant="secondary" size="icon">
                  <LinkedInLogoIcon className="h-4 w-4" />
                </Button>
              </Link>

              {/* Email */}
              <Link
                href={`mailto:${data.contactInfo.email}`}
                aria-label="Email"
              >
                <Button variant="secondary" size="icon">
                  <EnvelopeClosedIcon className="h-4 w-4" />
                </Button>
              </Link>

              {/* CV */}
              <a
                href="/Lebenslauf_Esdras_Shaa_Prombo.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  View CV
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERIENCE SECTION ==================== */}
      <section
        id="experience"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">
          Work Experience
        </h2>

        <div className="relative grid gap-10 pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="relative grid gap-1">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />

              <h4 className="text-xl font-medium">
                {exp.role} @{" "}
                <Link
                  href={exp.companyWebsite}
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exp.company}
                </Link>
              </h4>

              <div className="text-gray-500 dark:text-gray-400">
                {exp.startDate} - {exp.endDate}
              </div>

              <div className="mt-2">
                <h6 className="font-medium">Key Responsibilities:</h6>

                <ul className="list-disc pl-4 text-sm text-gray-500">
                  {exp.keyResponsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PROJECTS SECTION ==================== */}
      <section
        id="projects"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">
          My Projects
        </h2>

        <div className="grid grid-cols-1 gap-4 lg:gap-6">
          {data.projects.map((project) => (
            <Card
              key={project.title}
              className="flex flex-col lg:flex-row"
            >
              {/* Project Image */}
              <div className="flex w-full items-center p-2 lg:w-1/3">
                <Image
                  src={project.cover}
                  alt={`${project.title} project`}
                  height={200}
                  width={300}
                  className="rounded-md object-cover"
                />
              </div>

              {/* Project Information */}
              <div className="w-full lg:w-2/3">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge
                        key={technology}
                        variant="secondary"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription>
                    {project.description}
                  </CardDescription>
                </CardContent>

                <CardFooter>
                  <div className="flex space-x-3">
                    {/* Live Demo
                    <Link
                      href={project.live_url}
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">
                        <GlobeIcon className="mr-2 h-3 w-3" />
                        Live Demo
                      </Button>
                    </Link>
                    */}

                    {/* GitHub Repository */}
                    <Link
                      href={project.code_repo_url}
                      prefetch={false}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        <GitHubLogoIcon className="mr-2 h-3 w-3" />
                        Open Repository
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ==================== EDUCATION SECTION ==================== */}
      <section
        id="education"
        className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">
          Education
        </h2>

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
                <h3 className="mb-6 text-2xl font-semibold">
                  {category.title}
                </h3>

                <div className="relative grid gap-10 pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                  {items.map((education) => (
                    <div
                      key={education.id}
                      className="relative grid gap-1"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-2 z-10 aspect-square w-3 translate-x-[-29.5px] rounded-full bg-gray-900 dark:bg-gray-50" />

                      <h4 className="text-xl font-medium">
                        {education.degree}
                      </h4>

                      <h5 className="font-medium">
                        {education.institution}
                      </h5>

                      <div className="text-gray-500 dark:text-gray-400">
                        {education.startDate} - {education.endDate}
                      </div>

                      {education.description && (
                        <p className="mt-2 text-sm text-gray-500">
                          {education.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== SKILLS SECTION ==================== */}
<section
  id="skills"
  className="container mx-auto max-w-5xl py-12 md:py-16 lg:py-20"
>
  <div className="mb-12 space-y-3">
    <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
      Toolbox
    </span>
    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Skills</h2>
    <p className="max-w-2xl text-muted-foreground">
      The languages, methods and tools I use to turn data into insight.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
    {skillCategories.map(({ key, title, icon: Icon, span }) => {
      const skills = data.skills[key];

      return (
        <Card
          key={key}
          className={`group relative overflow-hidden border-border/60 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${span}`}
        >
          {/* gradient glow on hover */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

          <CardHeader className="relative pb-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {String(skills.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-primary/40 via-border to-transparent" />
          </CardHeader>

          <CardContent className="relative">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full border border-transparent bg-secondary/60 px-3 py-1 text-sm font-normal transition-colors duration-200 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground"
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
