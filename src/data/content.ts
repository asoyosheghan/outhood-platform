import type {
  OuthoodEvent,
  Campaign,
  BlogPost,
  PortfolioItem,
  Testimonial,
  FaqItem,
  TeamMember,
  ImpactStat,
  Resource,
} from "@/types";

export const impactStats: ImpactStat[] = [
  { label: "Members across Kenya", value: 20, suffix: "+" },
  { label: "Children's homes supported", value: 1 },
  { label: "Road trips completed", value: 0 },
  { label: "Raised for community causes", value: 50, prefix: "KES ", suffix: "K" },
];

export const upcomingEvents: OuthoodEvent[] = [
  {
    id: "evt-1",
    slug: "kanunga-waterfalls-trip",
    title: "Kanunga Waterfalls Trip",
    category: "ROAD_TRIP",
    summary: "A refreshing day trip to the stunning Kanunga Waterfalls — swimming, nature walks, and good vibes.",
    description:
      "Join the Outhood crew for a day out at Kanunga Waterfalls. We'll hike through lush scenery, swim in the falls, and soak in the natural beauty of one of Kenya's hidden gems. Transport, guide, and a packed lunch included. Limited spots — book early.",
    coverImage: "",
    location: "Kanunga Waterfalls, Kenya",
    startDate: "2026-08-29",
    priceKes: 2500,
    capacity: 30,
    registered: 0,
    featured: true,
  },
  {
    id: "evt-2",
    slug: "karura-forest-walk",
    title: "Karura Forest Walk",
    category: "ROAD_TRIP",
    summary: "A peaceful morning walk through Nairobi's Karura Forest — trails, waterfalls, and fresh air.",
    description:
      "Escape the city for a morning in Karura Forest. We'll walk the scenic trails, visit the cave waterfall, and enjoy a relaxed picnic. Perfect for all fitness levels. Entry and guide included.",
    coverImage: "",
    location: "Karura Forest, Nairobi",
    startDate: "2026-09-13",
    priceKes: 800,
    capacity: 40,
    registered: 0,
    featured: true,
  },
  {
    id: "evt-3",
    slug: "mt-longonot-day-hike",
    title: "Mt Longonot Day Hike",
    category: "ROAD_TRIP",
    summary: "A challenging but rewarding crater-rim hike with the Outhood adventure crew.",
    description:
      "An early start, a steep climb, and one of the best crater views in the Rift Valley. Suitable for first-time hikers with a reasonable fitness level. Guides, transport, and lunch included.",
    coverImage: "",
    location: "Mt Longonot National Park",
    startDate: "2026-10-04",
    priceKes: 3000,
    capacity: 30,
    registered: 0,
  },
];

export const campaigns: Campaign[] = [
  {
    id: "camp-1",
    slug: "outhood-first-community-fund",
    title: "Outhood First Community Fund",
    summary: "Our first charity drive — helping us show up for a vulnerable community in our first year.",
    coverImage: "",
    goalKes: 100000,
    raisedKes: 50000,
    status: "ACTIVE",
    beneficiary: "Outhood Community Fund",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "why-we-built-outhood",
    title: "Why We Built Outhood",
    excerpt: "On turning a shared passion for adventure into a community with real impact.",
    coverImage: "",
    category: "Our Story",
    author: { name: "Samuel Saoke", avatarUrl: "", role: "Co-Founder" },
    readingTimeMinutes: 5,
    publishedAt: "2026-06-01",
  },
  {
    id: "post-2",
    slug: "planning-your-first-road-trip",
    title: "Planning Your First Outhood Road Trip",
    excerpt: "A practical packing list, safety checklist, and budget guide for first-timers.",
    coverImage: "",
    category: "Travel Guides",
    author: { name: "Sheghan Omondi Tevin", avatarUrl: "", role: "Co-Founder" },
    readingTimeMinutes: 4,
    publishedAt: "2026-06-15",
  },
];

export const portfolioItems: PortfolioItem[] = [
  { id: "p1", title: "Kanunga Waterfalls", category: "ROAD_TRIPS", image: "", location: "Kenya", year: "2026" },
  { id: "p2", title: "Community Fund Launch", category: "CHARITY", image: "", location: "Nairobi", year: "2026" },
  { id: "p3", title: "Founders Meetup", category: "COMMUNITY", image: "", location: "Nairobi", year: "2026" },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "An Outhood Member",
    role: "Early member",
    avatarUrl: "",
    quote:
      "I joined for the adventure and stayed for the community. Outhood is just getting started and I already feel the energy.",
  },
];

export const faqs: FaqItem[] = [
  { id: "f1", category: "Membership", question: "How much does Outhood membership cost?", answer: "Membership is free to join. Specific events, road trips, and experiences carry their own ticket price, which covers logistics, transport, and a portion that goes directly to our charity fund." },
  { id: "f2", category: "Membership", question: "Who can join Outhood?", answer: "Anyone aged 18 and above based in Kenya, or visiting, is welcome. We're a youth-focused community, so most members are between 18 and 35." },
  { id: "f3", category: "Events", question: "How do I register for a road trip or event?", answer: "Browse upcoming events on the Services or Home page, select an event, and complete the registration form. You'll receive a confirmation email with payment instructions and a packing or prep checklist where relevant." },
  { id: "f4", category: "Events", question: "What's your cancellation and refund policy?", answer: "Cancellations made at least 7 days before an event are refunded in full, minus a small processing fee. Cancellations within 7 days are refunded at 50%, except where noted on the specific event page." },
  { id: "f5", category: "Volunteering", question: "Do I need experience to volunteer?", answer: "No experience required. We run an orientation session before every volunteer activity, and our coordinators are with you throughout." },
  { id: "f6", category: "Donations", question: "How do I know my donation reaches the cause?", answer: "Every campaign has a public funding tracker, and we publish a short impact report once a campaign closes, including receipts and photos from the partner home or organization." },
  { id: "f7", category: "Donations", question: "Can my company sponsor an Outhood event or campaign?", answer: "Yes. We work with corporate partners on event sponsorships, matched-giving campaigns, and dedicated CSR road trips. Reach out via the Contact page and our partnerships team will follow up." },
  { id: "f8", category: "Account", question: "I forgot my password. How do I reset it?", answer: "Use the 'Forgot password' link on the login page. You'll receive a secure reset link by email, valid for 30 minutes." },
];

export const teamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Samuel Saoke",
    role: "Co-Founder",
    bio: "Passionate about building communities that matter. Samuel drives the vision and strategy behind Outhood, turning big ideas into real experiences.",
    avatarUrl: "",
  },
  {
    id: "tm2",
    name: "Sheghan Omondi Tevin",
    role: "Co-Founder",
    bio: "Creative at heart and community-driven by nature. Sheghan leads the experience design and day-to-day operations that bring Outhood to life.",
    avatarUrl: "",
  },
];

export const resources: Resource[] = [
  { id: "r1", title: "First-Time Road Tripper's Checklist", description: "Everything to pack and prepare before your first Outhood trip.", type: "PDF", fileSizeKb: 820, category: "Road Trips" },
  { id: "r2", title: "Volunteer Orientation Guide", description: "What to expect, code of conduct, and safety guidelines for volunteers.", type: "GUIDE", fileSizeKb: 1240, category: "Volunteering" },
  { id: "r3", title: "Campaign Fundraising Toolkit", description: "Templates for members who want to start their own mini fundraising drive.", type: "TEMPLATE", fileSizeKb: 640, category: "Fundraising" },
];
