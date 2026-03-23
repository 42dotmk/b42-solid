import type { Component } from "solid-js";
import {
  BarChart3,
  Bot,
  Calendar,
  Code,
  Database,
  Facebook,
  Gamepad2,
  Github,
  Globe,
  Handshake,
  Heart,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Maximize,
  MessageSquare,
  Network,
  Printer,
  Projector,
  Server,
  Sofa,
  Terminal,
  Users,
  Wrench,
  Youtube,
} from "lucide-solid";

type IconComponent = Component<{ class?: string }>;

export const siteMeta = {
  defaultTitle: "Base42 | Hackerspace in Skopje for Builders & Curious Minds",
  titleTemplate: (title: string) => `${title} | Base42`,
  description:
    "Base42 is a hackerspace in Skopje, Macedonia. A community space for builders, makers, developers, and curious minds to learn, create, and share knowledge.",
  siteUrl: "https://42.mk",
  youtubeChannelUrl: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || "https://www.youtube.com/@base42mk",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Videos", href: "/videos" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export const externalLinks = [
  { label: "Blog", href: "https://blog.42.mk" },
  { label: "Wiki", href: "https://wiki.42.mk" },
  { label: "Discord", href: "https://discord.gg/424xxTZVYX" },
];

export const footerQuickLinks = [
  { label: "About", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const footerResources = [
  { label: "Blog", href: "https://blog.42.mk", external: true },
  { label: "Wiki", href: "https://wiki.42.mk", external: true },
  { label: "Book Space", href: "/book", external: false },
];

export const socials: { icon: IconComponent; href: string; label: string }[] = [
  { icon: Github, href: "https://github.com/base42", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/base42mk", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/base42mk", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/base42", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@base42mk", label: "YouTube" },
];

export const facilities: { icon: IconComponent; title: string; description: string; image: string }[] = [
  {
    icon: Printer,
    title: "3D Printing",
    description: "Access to 3D printers for prototyping your ideas. From concept to physical object in hours.",
    image: "/images/space-3dprint.jpg",
  },
  {
    icon: Sofa,
    title: "Lounge",
    description: "Comfortable space to relax, network, and have casual conversations with fellow hackers.",
    image: "/images/space-lounge.jpg",
  },
  {
    icon: Calendar,
    title: "Events Hall",
    description: "Host meetups, talks, and presentations. Equipped with projector, sound system, and seating for 50+ people.",
    image: "/images/space-events.jpg",
  },
  {
    icon: Wrench,
    title: "Workshops",
    description: "Hands-on workspace with tools and workbenches for hardware projects, electronics, and making.",
    image: "/images/space-workshop.jpg",
  },
];

export const stats: { icon: IconComponent; value: number; label: string; suffix: string }[] = [
  { icon: Users, value: 1076, label: "Discord Members", suffix: "" },
  { icon: Calendar, value: 50, label: "Events Hosted", suffix: "+" },
  { icon: Handshake, value: 19, label: "Partner Orgs", suffix: "" },
  { icon: Code, value: 4, label: "Active Projects", suffix: "" },
];

export const homeProjects: { icon: IconComponent; title: string; description: string; tags: string[]; github?: string }[] =
  [
    {
      icon: Bot,
      title: "Robotics Simulator",
      description:
        "Building autonomous robot simulations using ROS2 and Gazebo. Exploring machine learning for robot navigation and control.",
      tags: ["Robotics", "ROS2", "ML"],
      github: "https://github.com/base42",
    },
    {
      icon: Code,
      title: "CSX Renderer",
      description:
        "An experimental C# to HTML rendering engine. Write C# code that compiles to interactive web interfaces.",
      tags: ["C#", "Web", "Experimental"],
      github: "https://github.com/base42",
    },
    {
      icon: Server,
      title: "DevOps + Infra",
      description:
        "Cloud-native infrastructure, CI/CD pipelines, and DevOps best practices. Managing Base42's own infrastructure as code.",
      tags: ["DevOps", "Cloud", "IaC"],
      github: "https://github.com/base42",
    },
    {
      icon: Heart,
      title: "FOSS Club",
      description:
        "Promoting Free and Open Source Software. Regular meetups discussing FOSS philosophy, contributing to open source projects.",
      tags: ["FOSS", "Open Source", "Community"],
      github: "https://github.com/base42",
    },
  ];

export const partners = [
  { name: "BeerJS Skopje", logo: null },
  { name: "PyData Macedonia", logo: null },
  { name: "DevEd", logo: null },
  { name: "AWS UG Macedonia", logo: null },
  { name: "Galactic Omnivore", logo: "/images/partners/gg.png" },
  { name: "GG.mk", logo: "/images/partners/gg.png" },
  { name: "MGI.mk", logo: "/images/partners/mgi.png" },
  { name: "Angular Macedonia", logo: null },
  { name: ".NET MK", logo: null },
  { name: "UXplore", logo: null },
  { name: "PHP Skopje", logo: "/images/partners/php.png" },
  { name: "OWASP Skopje", logo: null },
  { name: "R Skopje", logo: null },
  { name: "Japan.net.mk", logo: null },
  { name: "Pagoda", logo: "/images/partners/pagoda.png" },
  { name: "EESTEC LC Skopje", logo: null },
  { name: "DonirajKompjuter", logo: null },
  { name: "BEST Skopje", logo: "/images/partners/best.png" },
  { name: "ProdACT", logo: null },
];

export const aboutValues: { icon: IconComponent; title: string; description: string }[] = [
  {
    icon: Code,
    title: "Open Knowledge",
    description: "We believe knowledge should be shared freely. Everything we learn, we share with the community.",
  },
  {
    icon: Users,
    title: "Peer Learning",
    description: "Learn from each other. Everyone has something to teach and something to learn.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "We build for the community, not for profit. Our space is open to all curious minds.",
  },
  {
    icon: Calendar,
    title: "Regular Events",
    description: "Weekly meetups, workshops, and talks. There's always something happening at Base42.",
  },
];

export const aboutTimeline = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Base42 was founded by a group of developers and makers who wanted a space to hack, learn, and share.",
  },
  {
    year: "2020",
    title: "First Location",
    description: "We opened our first physical space, starting with just a few tables and a lot of enthusiasm.",
  },
  {
    year: "2022",
    title: "Growing Community",
    description: "Our community grew to over 500 members, hosting weekly events and welcoming partner organizations.",
  },
  {
    year: "2024",
    title: "New Space",
    description:
      "Moved to our current location at Rimska 25 with expanded facilities including 3D printing and workshop areas.",
  },
];

export const bookSpaceOptions: { id: string; icon: IconComponent; title: string; capacity: string; description: string }[] =
  [
    {
      id: "events-hall",
      icon: Projector,
      title: "Events Hall",
      capacity: "Up to 50 people",
      description: "Projector, sound system, microphones. Ideal for meetups, talks, and presentations.",
    },
    {
      id: "workshop",
      icon: Wrench,
      title: "Workshop Area",
      capacity: "Up to 20 people",
      description:
        "Workbenches, tools, electronics stations. Ideal for hands-on workshops and hardware projects.",
    },
    {
      id: "full-space",
      icon: Maximize,
      title: "Full Space",
      capacity: "Up to 80 people",
      description: "Everything included. Ideal for large events, hackathons, and conferences.",
    },
  ];

export const fullProjects: { [key: string]: any }[] = [
  {
    name: "Colosseum",
    slug: "colosseum",
    description:
      "A competitive programming arena where bots battle it out. Build your AI agent and pit it against others in real-time matches. Perfect for learning game theory, algorithms, and competitive coding.",
    longDescription:
      "Colosseum is our flagship project for competitive AI development. Players write bots that compete in various game scenarios, from simple grid-based games to complex strategy simulations. The platform handles matchmaking, scoring, and provides detailed analytics of your bot's performance.",
    icon: Gamepad2,
    language: "TypeScript",
    stars: 1,
    status: "active",
    difficulty: "Intermediate",
    tags: ["AI", "Gaming", "Algorithms", "TypeScript"],
    lookingFor: ["Frontend developers", "Game designers", "AI enthusiasts"],
    github: "https://github.com/42dotmk/colosseum",
  },
  {
    name: "SlowStore",
    slug: "slowstore",
    description:
      "An educational database implementation built from scratch. Learn how databases really work by building one yourself—from B-trees to query parsing.",
    longDescription:
      "SlowStore is intentionally 'slow' because it prioritizes readability and learning over performance. Every line of code is documented, every algorithm explained. It's the perfect project if you've ever wondered what happens when you write a SQL query.",
    icon: Database,
    language: "Python",
    stars: 10,
    status: "active",
    difficulty: "Advanced",
    tags: ["Database", "Python", "Education", "Systems"],
    lookingFor: ["Python developers", "Database enthusiasts", "Technical writers"],
    github: "https://github.com/42dotmk/slowstore",
  },
  {
    name: "Hed",
    slug: "hed",
    description:
      "A minimal text editor written in C. No dependencies, no bloat—just pure text editing. Learn systems programming by understanding every byte.",
    longDescription:
      "Hed (Hackerspace EDitor) is our take on building a text editor from absolute scratch. No ncurses, no external libraries—just raw terminal manipulation. It's a fantastic project for anyone wanting to understand how terminal applications work at a low level.",
    icon: Terminal,
    language: "C",
    stars: 2,
    status: "active",
    difficulty: "Advanced",
    tags: ["C", "Systems", "Terminal", "Editor"],
    lookingFor: ["C developers", "Systems programmers", "Vim/Emacs enthusiasts"],
    github: "https://github.com/42dotmk/hed",
  },
  {
    name: "Base42 Web",
    slug: "web",
    description:
      "The website you're looking at right now. Built with Next.js, Tailwind CSS, and powered by Strapi CMS. A modern, open source website for the community.",
    longDescription:
      "This very website is open source! We believe in practicing what we preach. If you want to learn modern web development with Next.js, Tailwind, and headless CMS integration, this is a great place to start.",
    icon: Globe,
    language: "TypeScript",
    stars: 0,
    status: "active",
    difficulty: "Beginner",
    tags: ["Next.js", "React", "Tailwind", "Web"],
    lookingFor: ["Frontend developers", "Designers", "Content writers"],
    github: "https://github.com/42dotmk/web",
  },
  {
    name: "AoC Visualizer",
    slug: "aoc-visualizer",
    description:
      "Visualize Advent of Code solutions in beautiful, interactive animations. See algorithms come to life as they solve puzzles.",
    longDescription:
      "Every December, programmers around the world tackle Advent of Code challenges. This project turns those solutions into mesmerizing visualizations, making it easier to understand complex algorithms and share your solutions with others.",
    icon: BarChart3,
    language: "TypeScript",
    stars: 1,
    status: "seasonal",
    difficulty: "Intermediate",
    tags: ["Visualization", "Algorithms", "Advent of Code", "Animation"],
    lookingFor: ["Creative coders", "Data visualization experts", "AoC enthusiasts"],
    github: "https://github.com/42dotmk/AoC-Visualizer",
  },
  {
    name: "Marvin",
    slug: "marvin",
    description:
      "Our community Discord bot. Manages events, welcomes newcomers, and provides helpful utilities for the Base42 Discord server.",
    longDescription:
      "Named after the paranoid android from Hitchhiker's Guide, Marvin handles everything from event reminders to fun community interactions. It's a great project for learning Discord bot development and community automation.",
    icon: Bot,
    language: "TypeScript",
    stars: 0,
    status: "active",
    difficulty: "Beginner",
    tags: ["Discord", "Bot", "TypeScript", "Community"],
    lookingFor: ["Bot developers", "Community managers", "Feature designers"],
    github: "https://github.com/42dotmk/marvin",
  },
  {
    name: "HTNet",
    slug: "htnet",
    description:
      "A .NET library for building HTTP clients with ease. Simplified networking for C# developers who want clean, testable HTTP code.",
    longDescription:
      "HTNet provides a fluent API for making HTTP requests in .NET applications. It emphasizes testability, clean code, and developer experience. If you're tired of boilerplate HTTP code in C#, this project is for you.",
    icon: Network,
    language: "C#",
    stars: 1,
    status: "active",
    difficulty: "Intermediate",
    tags: ["C#", ".NET", "HTTP", "Library"],
    lookingFor: [".NET developers", "API designers", "Documentation writers"],
    github: "https://github.com/42dotmk/htnet",
  },
  {
    name: "Crudex",
    slug: "crudex",
    description:
      "Generate CRUD UIs and APIs instantly from your Go models. Stop writing boilerplate—start building features.",
    longDescription:
      "Crudex takes your Gin + GORM models and generates complete admin interfaces and REST APIs automatically. It's perfect for rapid prototyping or when you need a quick admin panel without the overhead of a full framework.",
    icon: Layers,
    language: "Go",
    stars: 0,
    status: "active",
    difficulty: "Intermediate",
    tags: ["Go", "Gin", "GORM", "CRUD", "Code Generation"],
    lookingFor: ["Go developers", "Backend engineers", "DevOps enthusiasts"],
    github: "https://github.com/42dotmk/crudex",
  },
];

export const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  C: "bg-gray-500",
  "C#": "bg-purple-500",
  Go: "bg-cyan-500",
  CSS: "bg-pink-500",
};

export const difficultyColors: Record<string, string> = {
  Beginner: "text-green-400",
  Intermediate: "text-yellow-400",
  Advanced: "text-red-400",
};

export const communityActions = [
  {
    title: "Discord",
    href: "https://discord.gg/424xxTZVYX",
    description: "The fastest way to meet the community and hear about events.",
    icon: MessageSquare,
  },
  {
    title: "Email",
    href: "mailto:[email protected]",
    description: "Use email for partnerships, space booking, and community outreach.",
    icon: Mail,
  },
  {
    title: "Visit",
    href: "https://maps.app.goo.gl/LxWU9nPBg3zS4H1U6",
    description: "Drop by the space at Rimska 25, Skopje, North Macedonia.",
    icon: MapPin,
  },
];
