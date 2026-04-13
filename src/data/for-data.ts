// ── "Who Is It For" persona data ──────────────────────────────────────
// Each persona maps to /for/[slug] and drives the landing page cards.

export interface PersonaFAQ {
  question: string;
  answer: string;
}

export interface PersonaBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface PersonaActivity {
  title: string;
  description: string;
}

export interface Persona {
  slug: string;
  icon: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  accent: "primary" | "secondary";
  benefits: PersonaBenefit[];
  activities: PersonaActivity[];
  quote?: { text: string; author: string };
  faqs: PersonaFAQ[];
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

// ── Persona definitions ───────────────────────────────────────────────

export const personas: Persona[] = [
  // ── 1. Tech Communities ─────────────────────────────────────────────
  {
    slug: "communities",
    icon: "lucide:users",
    title: "Tech Communities",
    shortTitle: "Communities",
    tagline: "Your meetup deserves a home, not a conference room.",
    description:
      "BeerJS, PyData, MK.NET, ProdACT, Angular Macedonia, PHP Skopje, OWASP — they all host at Base42. We provide the venue, the gear, and the reach. You bring the community.",
    heroImage: "/images/space-events.jpg",
    accent: "primary",
    benefits: [
      {
        icon: "lucide:projector",
        title: "Full A/V Setup",
        description:
          "Projectors, microphones, mixer, PA system, and a stage — ready to go. No need to haul your own equipment or troubleshoot cables at 6:55 PM.",
      },
      {
        icon: "lucide:megaphone",
        title: "Marketing & Reach",
        description:
          "We promote your events across our channels — Discord (1000+ members), social media, and newsletter. Your meetup gets seen by the right people.",
      },
      {
        icon: "lucide:video",
        title: "Recording & Livestream",
        description:
          "Multi-camera recording setup with OBS, capture cards, and a dedicated streaming PC. Record talks for YouTube or livestream to any platform.",
      },
      {
        icon: "lucide:calendar-check",
        title: "Event Organization Support",
        description:
          "We help with logistics, scheduling, and coordination. Need a recurring monthly slot? Done. Need help finding speakers? We've got a network.",
      },
      {
        icon: "lucide:coffee",
        title: "Hospitality",
        description:
          "Coffee machine, kitchen access, fridge for drinks. Some communities do pizza runs; others bring beer. We provide the space to make it feel natural.",
      },
      {
        icon: "lucide:handshake",
        title: "Cross-Community Exposure",
        description:
          "When 19+ partner organizations share a venue, audiences overlap. Your Python meetup attendees discover the .NET group. New connections happen by default.",
      },
    ],
    activities: [
      {
        title: "Monthly Meetups",
        description:
          "Book a recurring slot for your community. BeerJS runs the last Thursday of every month. PyData takes the second Wednesday. Pick your cadence.",
      },
      {
        title: "Lightning Talks",
        description:
          "Short-format sessions where community members present 5–10 minute talks on anything they're working on. Low pressure, high engagement.",
      },
      {
        title: "Workshops & Hands-On Sessions",
        description:
          "Need tables instead of chairs? We reconfigure. Run live coding sessions, pair programming workshops, or tool deep-dives.",
      },
      {
        title: "Joint Events",
        description:
          "Collaborate with other communities in the Base42 network. Cross-pollinate audiences and host events that span multiple tech domains.",
      },
    ],
    quote: {
      text: "We used to scramble for a venue every month. Now we just show up, plug in, and focus on the community. Base42 handles the rest.",
      author: "BeerJS Skopje organizer",
    },
    faqs: [
      {
        question: "How do I book Base42 for my community meetup?",
        answer:
          "Email hello@42.mk or reach out on Discord. Tell us about your community, how often you meet, and your typical audience size. We'll find a slot that works.",
      },
      {
        question: "Is there a cost for community events?",
        answer:
          "Community meetups are free. Base42 exists to support the local tech ecosystem. For recurring events, we ask that your community helps promote the space and credits Base42 as a venue partner.",
      },
      {
        question: "What's the capacity?",
        answer:
          "Standard seating fits 50–80 people. Using both projectors and the L-shaped room layout, we can accommodate up to 120. For workshops with tables, expect around 40.",
      },
      {
        question: "Can we record our talks?",
        answer:
          "Yes. We have a full recording setup with cameras, capture cards, and OBS. We can either operate the gear for you or let your team handle it. Recordings end up on your channel or ours — your choice.",
      },
      {
        question: "What communities already host here?",
        answer:
          "BeerJS Skopje, PyData Macedonia, MK.NET, ProdACT, Angular Macedonia, PHP Skopje, OWASP Skopje, AWS UG Macedonia, UXplore, R Skopje, and more. You'll be in good company.",
      },
    ],
    cta: {
      primary: { label: "Book for Your Community", href: "/book" },
      secondary: { label: "See Upcoming Events", href: "/events" },
    },
  },

  // ── 2. Conferences ──────────────────────────────────────────────────
  {
    slug: "conferences",
    icon: "lucide:presentation",
    title: "Conferences & Large Events",
    shortTitle: "Conferences",
    tagline: "Run a full-day conference without the full-day overhead.",
    description:
      "Base42 has hosted product launches, community conferences, and multi-track tech days. We handle the venue, A/V, and streaming. You handle the program and the people.",
    heroImage: "/images/main-area.jpeg",
    accent: "secondary",
    benefits: [
      {
        icon: "lucide:maximize",
        title: "120-Person Capacity",
        description:
          "The main hall fits up to 120 people in a flexible L-shaped layout. Use both projectors for a dual-screen setup, or split the room for multi-track sessions.",
      },
      {
        icon: "lucide:mic-2",
        title: "Professional Stage & Sound",
        description:
          "Full PA system, wireless microphones, stage lighting, and a mixer. Your speakers walk up, clip on a mic, and present. No sound checks at the last minute.",
      },
      {
        icon: "lucide:clapperboard",
        title: "Livestream & Recording",
        description:
          "Multi-camera capture, OBS-powered livestream, and dedicated streaming hardware. Broadcast to YouTube, Twitch, or your own platform. Archive every session.",
      },
      {
        icon: "lucide:layout-grid",
        title: "Flexible Layout",
        description:
          "Theater-style for keynotes, classroom for workshops, open floor for networking. We reconfigure chairs, tables, and equipment to match your event format.",
      },
      {
        icon: "lucide:megaphone",
        title: "Marketing Partnership",
        description:
          "Co-promotion through Base42's channels, partner community networks, and social media. Reach developers, designers, students, and professionals across Macedonia.",
      },
      {
        icon: "lucide:cooking-pot",
        title: "Catering & Logistics",
        description:
          "Kitchen access for catering partners, fridge space for drinks, and a living room area for breaks and networking between sessions.",
      },
    ],
    activities: [
      {
        title: "Full-Day Conferences",
        description:
          "Multi-session events with keynotes, panels, and networking breaks. Use the living room as a chill zone between talks.",
      },
      {
        title: "Multi-Track Events",
        description:
          "Split the venue into separate zones for parallel sessions. One track in the main hall, another in the workshop area.",
      },
      {
        title: "Hackathons",
        description:
          "24-hour or weekend hackathons with power, WiFi, coffee, and everything teams need to build, present, and compete.",
      },
      {
        title: "Product Launches & Demos",
        description:
          "Present your product to a live audience with professional A/V, demo stations, and networking space for post-launch conversations.",
      },
    ],
    quote: {
      text: "We ran a 100-person conference at Base42 and the setup was better than venues that charge five times more. The team made it effortless.",
      author: "Conference organizer",
    },
    faqs: [
      {
        question: "How far in advance should we book?",
        answer:
          "For large conferences, 4–8 weeks is ideal. This gives us time to coordinate scheduling with recurring community events and ensure full availability.",
      },
      {
        question: "What's included in the venue?",
        answer:
          "Projectors, sound system, wireless microphones, stage lighting, WiFi, tables, chairs, kitchen access, and coffee machine. Recording equipment is available on request.",
      },
      {
        question: "Can you help with promotion?",
        answer:
          "Yes. We co-promote through our Discord, newsletter, social media, and partner communities. If the event is open to the public, we'll amplify it across our channels.",
      },
      {
        question: "What about catering?",
        answer:
          "We don't provide catering directly, but we have kitchen facilities and can recommend local catering partners. Many organizers do pizza + drinks, which works perfectly with our setup.",
      },
      {
        question: "Is there parking nearby?",
        answer:
          "Street parking is available around Rimska 25. The space is also well-connected by public transport and within walking distance from the city center.",
      },
    ],
    cta: {
      primary: { label: "Plan Your Conference", href: "/book" },
      secondary: { label: "See Past Events", href: "/conferences" },
    },
  },

  // ── 3. Students ─────────────────────────────────────────────────────
  {
    slug: "students",
    icon: "lucide:graduation-cap",
    title: "Students",
    shortTitle: "Students",
    tagline: "Study, build, and meet the people already working in your field.",
    description:
      "Base42 is where students come to study outside of lecture halls, attend industry events, and meet professionals who share their interests. No application, no interview — just show up.",
    heroImage: "/images/IMG_3191.jpg",
    accent: "primary",
    benefits: [
      {
        icon: "lucide:book-open",
        title: "Quiet Study Space",
        description:
          "Tables, WiFi, power outlets, and a coffee machine. The living room and workshop area are available for studying when no events are running.",
      },
      {
        icon: "lucide:calendar",
        title: "Free Access to All Events",
        description:
          "Every meetup, workshop, and talk at Base42 is open to students. Learn React from a senior developer. See how companies build products. It's all happening here.",
      },
      {
        icon: "lucide:ticket-percent",
        title: "Conference Discounts",
        description:
          "Student members get exclusive discounts on all Base42-affiliated conferences and partner events. Professional-grade events at student-friendly prices.",
      },
      {
        icon: "lucide:wrench",
        title: "Tools & Facilities",
        description:
          "3D printers, electronics workshop, soldering stations, server infrastructure. Work on class projects or personal experiments with real hardware.",
      },
      {
        icon: "lucide:users",
        title: "Mentorship & Networking",
        description:
          "Base42's community includes working professionals across software, hardware, design, and data. Conversations here turn into internships, collaborations, and friendships.",
      },
      {
        icon: "lucide:code",
        title: "Open Source Projects",
        description:
          "Contribute to community-driven projects like Colosseum, SlowStore, or Hed. Real codebases, real collaboration, real portfolio material.",
      },
      {
        icon: "lucide:hand-helping",
        title: "Volunteer & Earn Your Membership",
        description:
          "Help run events, operate A/V gear, maintain the space, or contribute to open source projects. Regular volunteers get free membership, merch, speaker opportunities, reference letters, and a pathway to university internship credits.",
      },
    ],
    activities: [
      {
        title: "Study Sessions",
        description:
          "Come in with your laptop and a textbook. The space is open for quiet work during the day. Grab a coffee, plug in, and focus.",
      },
      {
        title: "Workshops & Tutorials",
        description:
          "Hands-on sessions covering everything from web development to electronics. Learn by doing, with people who do it professionally.",
      },
      {
        title: "Hackathons",
        description:
          "Join weekend hackathons to build something from scratch. Great for portfolio projects and meeting teammates for future collaborations.",
      },
      {
        title: "Career & Industry Talks",
        description:
          "Hear from professionals about what they do, how they got there, and what skills actually matter. Ask questions you can't ask in a lecture.",
      },
      {
        title: "Volunteering",
        description:
          "Set up chairs, run the livestream, greet attendees, or fix something in the space. Start casual — a few hours a month — and grow into a regular role with real perks and responsibilities.",
      },
    ],
    quote: {
      text: "I walked into Base42 as a second-year CS student who only knew Java. Within a month I was contributing to an open source project and had met my first internship mentor.",
      author: "Student member",
    },
    faqs: [
      {
        question: "Do I need any experience to join?",
        answer:
          "None. Base42 welcomes complete beginners. If you're curious about technology, making, or just want a good place to study — that's enough.",
      },
      {
        question: "Is there a student membership price?",
        answer:
          "The Supporter tier starts at ~€5/month. Full Member access with 24/7 key fob, tools, and discounts is ~€15/month. Both are designed to be accessible.",
      },
      {
        question: "Can I use the space to study for exams?",
        answer:
          "Yes. When no events are scheduled, the tables and living room are available for quiet work. Many students use Base42 as their go-to study spot.",
      },
      {
        question: "Are events free for students?",
        answer:
          "Community meetups at Base42 are free for everyone. Conferences and special events may have a fee, but student members always get a discount.",
      },
      {
        question: "I'm not a CS student. Can I still join?",
        answer:
          "Absolutely. We have members studying electrical engineering, design, data science, physics, and more. If you're curious and want to build things, you belong here.",
      },
      {
        question: "How does volunteering work?",
        answer:
          "Join the Discord and say you want to help. Start casual — a few hours at an event — and see if it fits. Regular volunteers get free membership, Base42 merch, and priority access to equipment. Dedicated volunteers can earn university internship credits, speaker opportunities, and reference letters.",
      },
    ],
    cta: {
      primary: { label: "Become a Member", href: "/membership" },
      secondary: { label: "Volunteer", href: "/volunteering" },
    },
  },

  // ── 4. IT Professionals & Companies ─────────────────────────────────
  {
    slug: "professionals",
    icon: "lucide:briefcase",
    title: "IT Professionals & Companies",
    shortTitle: "Professionals",
    tagline: "Host, organize, and connect — outside the office walls.",
    description:
      "Whether you're a freelance developer looking for community or a company organizing an internal event, Base42 gives you a space that feels more human than a meeting room and more capable than a coffee shop.",
    heroImage: "/images/IMG_3440.jpeg",
    accent: "secondary",
    benefits: [
      {
        icon: "lucide:building-2",
        title: "Private Event Hosting",
        description:
          "Book the space for your team. Off-sites, planning sessions, retrospectives, or product demos in a venue that breaks the office routine.",
      },
      {
        icon: "lucide:mic-2",
        title: "Tech Talks & Presentations",
        description:
          "Share what your team has learned with the community. Full stage, A/V, and an audience of developers, designers, and tech professionals who care about the craft.",
      },
      {
        icon: "lucide:network",
        title: "Knowledge Exchange",
        description:
          "Base42's network includes 1000+ developers, designers, and engineers. Share your expertise, learn from others, and build genuine relationships through knowledge — not job pitches.",
      },
      {
        icon: "lucide:server",
        title: "Infrastructure Access",
        description:
          "Members get access to on-site server racks for experimentation, self-hosting, and learning. Real infrastructure, not just cloud credits.",
      },
      {
        icon: "lucide:badge-check",
        title: "Priority Booking",
        description:
          "Member companies get priority scheduling for private events and can book recurring slots for team activities or meetups.",
      },
      {
        icon: "lucide:globe",
        title: "Give Back to the Ecosystem",
        description:
          "Companies that share knowledge earn respect organically. Host a workshop, sponsor a meetup, or open-source a tool — the community remembers who showed up to teach, not to sell.",
      },
    ],
    activities: [
      {
        title: "Team Off-Sites",
        description:
          "Get your team out of the office for a day. Use the space for planning, brainstorming, or just bonding in an environment designed for collaboration.",
      },
      {
        title: "Product Demos & Launches",
        description:
          "Present your product to an engaged tech audience. Use the full A/V setup, demo stations, and networking space for meaningful post-demo conversations.",
      },
      {
        title: "Sponsored Meetups",
        description:
          "Sponsor an existing community meetup — cover pizza and drinks so organizers can focus on content. No sales pitches, no recruiter slides. Knowledge sharing only.",
      },
      {
        title: "Corporate Workshops",
        description:
          "Internal training, tech deep-dives, or knowledge-sharing sessions. Classroom layout, projectors, and whiteboards ready to go.",
      },
    ],
    faqs: [
      {
        question: "Can we book the space for a private company event?",
        answer:
          "Yes. Email hello@42.mk with your date, expected headcount, and event type. We'll confirm availability and help you plan the setup.",
      },
      {
        question: "Is there a corporate membership?",
        answer:
          "We don't have a formal corporate tier, but companies can support Base42 through sponsorships, recurring event partnerships, or by encouraging employees to become individual members.",
      },
      {
        question: "Can we use events at Base42 for recruiting?",
        answer:
          "At community events — no. Base42 has a strict no-recruitment policy for community meetups, talks, and workshops. No hiring pitches, no recruiter slides, no \"we're hiring\" segments. The stage is for learning, not job ads. However, if you book the full space for a private event, there are no restrictions — it's your time, your agenda. Use it however you want.",
      },
      {
        question: "What about NDAs and confidentiality for private events?",
        answer:
          "When you book the full space for a private event, it's exclusively yours. We don't record private events unless requested. Standard venue confidentiality applies.",
      },
    ],
    cta: {
      primary: { label: "Book for Your Team", href: "/book" },
      secondary: { label: "Explore Membership", href: "/membership" },
    },
  },

  // ── 5. Gamers ───────────────────────────────────────────────────────
  {
    slug: "gamers",
    icon: "lucide:gamepad-2",
    title: "Gamers & Board Game Enthusiasts",
    shortTitle: "Gamers",
    tagline: "Roll dice, push buttons, and stay up way too late.",
    description:
      "Base42 has a jacuzzi full of retro consoles, a 4K TV with game controllers, and a community that takes game nights seriously. Board games, video games, LAN parties — all welcome.",
    heroImage: "/images/jacuzzi.jpg",
    accent: "primary",
    benefits: [
      {
        icon: "lucide:joystick",
        title: "Retro Gaming Lounge",
        description:
          "A jacuzzi (yes, really) filled with retro consoles, a CRT TV, and an SNES. The most unconventional gaming setup in Skopje.",
      },
      {
        icon: "lucide:tv",
        title: "4K Gaming Setup",
        description:
          "A 4K TV in the living room with modern game consoles, controllers, and comfortable seating. Bean bags and sofa included.",
      },
      {
        icon: "lucide:dice-5",
        title: "Board Game Collection",
        description:
          "A growing collection of board games and card games. Bring your own favorites or discover new ones from the community stash.",
      },
      {
        icon: "lucide:users",
        title: "Community Game Nights",
        description:
          "Regular game nights organized by community members. Show up solo and leave with a gaming group. Strangers become regulars fast.",
      },
      {
        icon: "lucide:maximize",
        title: "Space for Large Events",
        description:
          "The main hall can host tournaments, LAN parties, and full-day gaming events. Tables, power, WiFi, and enough space for dozens of players.",
      },
      {
        icon: "lucide:pizza",
        title: "Food & Drinks",
        description:
          "Kitchen access, fridge for drinks, and a coffee machine. Most game nights involve pizza orders, snacks, and the occasional beer from the fridge.",
      },
    ],
    activities: [
      {
        title: "Board Game Nights",
        description:
          "Weekly or monthly gatherings where members bring games and play for hours. Strategy games, party games, RPGs — whatever the group wants.",
      },
      {
        title: "Retro Gaming Sessions",
        description:
          "Fire up the SNES in the jacuzzi or plug into the living room setup. Casual drop-in sessions where anyone can grab a controller.",
      },
      {
        title: "Tournaments",
        description:
          "Organized competitive events — from Super Smash Bros to Settlers of Catan. Bring your A-game and something to snack on.",
      },
      {
        title: "Full-Day Gaming Events",
        description:
          "LAN parties, marathon board game sessions, or themed gaming days. Book the space and play from noon until you can't keep your eyes open.",
      },
    ],
    quote: {
      text: "Where else can you play Mario Kart in a jacuzzi, then walk over and join a Catan tournament? Base42 is the weirdest and best gaming venue in the country.",
      author: "Regular game night attendee",
    },
    faqs: [
      {
        question: "Do I need to bring my own games?",
        answer:
          "Not necessarily. The space has a growing collection of board games and retro consoles. But bringing your favorites is always encouraged — it expands the options for everyone.",
      },
      {
        question: "Can I organize a game night?",
        answer:
          "Yes. Post in the Discord and coordinate with the community. If you want to book the full space for a dedicated event, email hello@42.mk.",
      },
      {
        question: "Is there a regular gaming schedule?",
        answer:
          "Game nights are organized ad-hoc by community members through Discord. Some become recurring. Check the #events channel for the next one.",
      },
      {
        question: "Can I host a LAN party here?",
        answer:
          "Absolutely. The main hall has power, WiFi, and enough space for a proper LAN setup. Bring your rigs or laptops and we'll sort the rest.",
      },
      {
        question: "Wait, there's really a jacuzzi?",
        answer:
          "Yes. It doesn't have water in it. It has an SNES, a retro TV, and more controllers than you'd expect. It's the most Base42 thing in the entire space.",
      },
    ],
    cta: {
      primary: { label: "Join the Community", href: "/membership" },
      secondary: { label: "See the Space", href: "/space" },
    },
  },

  // ── 6. Cultural Organizations & NGOs ────────────────────────────────
  {
    slug: "organizations",
    icon: "lucide:heart",
    title: "Cultural Organizations & NGOs",
    shortTitle: "NGOs & Culture",
    tagline: "A venue for organizations that build communities, not products.",
    description:
      "Pagoda, DonirajKompjuter, EESTEC, BEST Skopje, and other non-profits and cultural groups use Base42 to host events, workshops, and community programs. If your mission is social impact, you're welcome here.",
    heroImage: "/images/20241024_182322.jpg",
    accent: "secondary",
    benefits: [
      {
        icon: "lucide:home",
        title: "Affordable Venue",
        description:
          "Base42 supports mission-driven organizations with free or reduced-cost venue access. No budget shouldn't mean no event.",
      },
      {
        icon: "lucide:megaphone",
        title: "Community Reach",
        description:
          "Promote your events to 1000+ community members through Discord, social media, and our newsletter. Reach people who care about what you do.",
      },
      {
        icon: "lucide:projector",
        title: "Full Equipment Access",
        description:
          "Projectors, sound system, microphones, recording gear — the same setup available to tech conferences is available to your workshop or cultural event.",
      },
      {
        icon: "lucide:handshake",
        title: "Partner Network",
        description:
          "Connect with 19+ organizations already in the Base42 ecosystem. Cross-promote, co-organize, and build relationships across communities.",
      },
      {
        icon: "lucide:pen-tool",
        title: "Workshop-Friendly Space",
        description:
          "Tables for hands-on activities, an electronics workshop for making, and a living room for informal sessions. The space adapts to your format.",
      },
      {
        icon: "lucide:sparkles",
        title: "Flexible Event Formats",
        description:
          "Panel discussions, film screenings, art exhibitions, volunteer coordination meetings, fundraiser events — if it brings people together, we can host it.",
      },
    ],
    activities: [
      {
        title: "Community Workshops",
        description:
          "Interactive sessions — from digital literacy workshops to cultural exchange programs. Hands-on format with tables, materials, and a welcoming atmosphere.",
      },
      {
        title: "Panel Discussions & Talks",
        description:
          "Invite speakers, moderate panels, and engage your community on topics that matter. Full A/V and recording available.",
      },
      {
        title: "Fundraiser & Awareness Events",
        description:
          "Host events that raise money, awareness, or both. The space, equipment, and community support are there to amplify your cause.",
      },
      {
        title: "Cultural Events & Exhibitions",
        description:
          "Art shows, film nights, cultural exchange evenings, or heritage preservation projects. The space is flexible enough to host creative formats.",
      },
    ],
    quote: {
      text: "Base42 gave us a place to host workshops when no one else would. They didn't just offer the space — they helped us fill it with the right people.",
      author: "NGO partner organizer",
    },
    faqs: [
      {
        question: "Is the venue free for non-profits?",
        answer:
          "Community-focused and non-profit events are typically hosted for free. We evaluate on a case-by-case basis. Reach out and tell us about your organization and what you need.",
      },
      {
        question: "Can we host recurring programs?",
        answer:
          "Yes. If you run a regular workshop series or monthly meetup, we can set up a recurring slot. Consistency helps build your audience and ours.",
      },
      {
        question: "Do you help with event promotion?",
        answer:
          "Yes. We share your events through our channels and cross-promote with partner communities. The more relevant your event is to the community, the harder we push it.",
      },
      {
        question: "What kind of organizations use Base42?",
        answer:
          "Pagoda (Japanese cultural exchange), DonirajKompjuter (tech recycling), EESTEC and BEST Skopje (student engineering), and other NGOs focused on education, culture, and social impact.",
      },
      {
        question: "Can we partner with Base42 long-term?",
        answer:
          "Absolutely. We have ongoing partnerships with several organizations. If your mission aligns with knowledge-sharing and community-building, let's talk.",
      },
    ],
    cta: {
      primary: { label: "Get in Touch", href: "mailto:hello@42.mk" },
      secondary: { label: "See Our Partners", href: "/about" },
    },
  },

  // ── 7. Private Events ───────────────────────────────────────────────
  {
    slug: "private-events",
    icon: "lucide:party-popper",
    title: "Private Events",
    shortTitle: "Private Events",
    tagline: "Your event, your rules, our space.",
    description:
      "Birthday parties, team celebrations, watch parties, creative workshops, or something we haven't thought of yet — Base42 is available for private bookings. If it brings people together, we're in.",
    heroImage: "/images/living-room.jpg",
    accent: "primary",
    benefits: [
      {
        icon: "lucide:lock",
        title: "Exclusive Access",
        description:
          "When you book privately, the space is exclusively yours. No overlapping events, no random walk-ins. Just your people and your program.",
      },
      {
        icon: "lucide:layout-grid",
        title: "Flexible Layout",
        description:
          "Rearrange tables for a workshop, clear the floor for a party, or set up theater-style for a screening. The space adapts to what you need.",
      },
      {
        icon: "lucide:projector",
        title: "Full Equipment Included",
        description:
          "Projectors, sound system, microphones, 4K TV, and a coffee machine. Everything in the space is available for your event.",
      },
      {
        icon: "lucide:cooking-pot",
        title: "Kitchen & Amenities",
        description:
          "Full kitchen access with fridge, microwave, kettle, and counter space. Bring your own catering or order delivery — the setup supports either.",
      },
      {
        icon: "lucide:sofa",
        title: "Lounge & Chill Areas",
        description:
          "Bean bags, sofa, 4K TV, game consoles, and the infamous retro gaming jacuzzi. Built-in entertainment for when the main event winds down.",
      },
      {
        icon: "lucide:shield-check",
        title: "Hassle-Free Booking",
        description:
          "Email us with your date, headcount, and what you're planning. We'll confirm availability, walk you through the setup, and handle logistics.",
      },
    ],
    activities: [
      {
        title: "Birthday & Celebration Parties",
        description:
          "Host your birthday, anniversary, or milestone celebration in a space with a projector, sound system, and a jacuzzi full of retro consoles.",
      },
      {
        title: "Watch Parties",
        description:
          "Game finals, movie premieres, conference keynotes — watch on the big screen with projector and sound, or on the 4K TV in the living room.",
      },
      {
        title: "Creative Workshops",
        description:
          "Art classes, DIY sessions, craft nights, or any hands-on activity. Tables, power, and a workshop area with tools and supplies.",
      },
      {
        title: "Networking & Social Mixers",
        description:
          "Informal events where the goal is just bringing people together. The living room setup makes mingling feel natural.",
      },
    ],
    faqs: [
      {
        question: "How much does a private booking cost?",
        answer:
          "Pricing depends on duration, day of the week, and the type of event. Reach out at hello@42.mk and we'll give you a quote. Community members get preferential rates.",
      },
      {
        question: "How many people can the space hold?",
        answer:
          "Comfortably 50–80 for most setups. Up to 120 for standing/theater-style events. For smaller gatherings, the living room alone works beautifully for 15–20 people.",
      },
      {
        question: "Can I bring food and drinks?",
        answer:
          "Yes. Bring your own catering, order delivery, or use the kitchen to prepare. The fridge can store drinks in advance if you coordinate with us.",
      },
      {
        question: "Is there music / sound system available?",
        answer:
          "Yes. The PA system, mixer, and speakers are available for your event. Plug in a laptop or phone and you've got DJ-level sound for a party.",
      },
      {
        question: "Can I decorate the space?",
        answer:
          "Yes, with reasonable limits. No permanent modifications or wall damage, but banners, balloons, table setups, and themed decorations are welcome. Just clean up after.",
      },
    ],
    cta: {
      primary: { label: "Book the Space", href: "/book" },
      secondary: { label: "Explore the Venue", href: "/space" },
    },
  },
];

// ── Lookup helper ─────────────────────────────────────────────────────

export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find(p => p.slug === slug);
}
