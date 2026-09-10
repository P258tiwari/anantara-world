export type ImageKey = keyof typeof images;

export const imageSrcSet = (src: string) => src;

export const images = {
  heroOverview: { src: "/project-images/hero-ai-extended.webp", alt: "Wide aerial render showing the complete ANANTARA WORLD development, all three towers and landscaped grounds" },
  heroNight: { src: "/project-images/hero-night.webp", alt: "Aerial night render of ANANTARA WORLD towers and landscaped grounds" },
  facade: { src: "/project-images/facade.webp", alt: "Night render of an ANANTARA WORLD residential tower and arrival canopy" },
  arrival: { src: "/project-images/arrival.webp", alt: "Illuminated entrance gate render for ANANTARA WORLD" },
  lobby: { src: "/project-images/lobby.webp", alt: "ANANTARA WORLD Tower B entrance lobby render" },
  gardens: { src: "/project-images/gardens.webp", alt: "Landscaped family recreation area at ANANTARA WORLD" },
  pool: { src: "/project-images/pool.webp", alt: "Pool and deck render at ANANTARA WORLD" },
  gym: { src: "/project-images/gym.webp", alt: "Fitness studio render at ANANTARA WORLD" },
  sports: { src: "/project-images/sports.webp", alt: "Aerial render of landscaped sports and recreation facilities" },
  children: { src: "/project-images/children.webp", alt: "Children's crèche render at ANANTARA WORLD" },
  family: { src: "/project-images/gardens.webp", alt: "Family recreation landscape render at ANANTARA WORLD" },
  seniors: { src: "/project-images/sustainability.webp", alt: "Landscaped pedestrian grounds at ANANTARA WORLD" },
  lounge: { src: "/project-images/library.webp", alt: "Library and social lounge render at ANANTARA WORLD" },
  living: { src: "/project-images/living.webp", alt: "Refined residents' lobby interior render at ANANTARA WORLD" },
  bedroom: { src: "/project-images/residence.webp", alt: "Tower C reception and residents' lobby render at ANANTARA WORLD" },
  kitchen: { src: "/project-images/juice-bar.webp", alt: "Residents' juice bar render at ANANTARA WORLD" },
  bathroom: { src: "/project-images/yoga.webp", alt: "Yoga and wellness room render at ANANTARA WORLD" },
  balcony: { src: "/project-images/balcony.webp", alt: "Close tower elevation showing balconies and the arrival canopy" },
  sustainability: { src: "/project-images/sustainability.webp", alt: "Aerial render of ANANTARA WORLD landscape and towers" },
  kanpur: { src: "/project-images/site-aerial.webp", alt: "Aerial render showing the ANANTARA WORLD site in its neighbourhood" },
  partyHall: { src: "/project-images/party-hall.webp", alt: "Party hall render at ANANTARA WORLD" },
  snooker: { src: "/project-images/snooker.webp", alt: "Indoor games and snooker room render at ANANTARA WORLD" },
  office: { src: "/project-images/office.webp", alt: "Project office interior render at ANANTARA WORLD" },
  poolAerial: { src: "/project-images/pool-aerial.webp", alt: "Aerial pool and recreation deck render at ANANTARA WORLD" },
  planA: { src: "/project-images/tower-a-even.webp", alt: "ANANTARA WORLD Tower A typical even floor plan" },
  planB: { src: "/project-images/tower-b-even.webp", alt: "ANANTARA WORLD Tower B typical even floor plan" },
  planC: { src: "/project-images/tower-c-even.webp", alt: "ANANTARA WORLD Tower C typical even floor plan" },
  planAGround: { src: "/project-images/tower-a-ground.webp", alt: "ANANTARA WORLD Tower A ground floor plan" },
  planAEven: { src: "/project-images/tower-a-even.webp", alt: "ANANTARA WORLD Tower A typical even floor plan" },
  planAOdd: { src: "/project-images/tower-a-odd.webp", alt: "ANANTARA WORLD Tower A typical odd floor plan" },
  planBGround: { src: "/project-images/tower-b-ground.webp", alt: "ANANTARA WORLD Tower B ground floor plan" },
  planBEven: { src: "/project-images/tower-b-even.webp", alt: "ANANTARA WORLD Tower B typical even floor plan" },
  planBOdd: { src: "/project-images/tower-b-odd.webp", alt: "ANANTARA WORLD Tower B typical odd floor plan" },
  planCGround: { src: "/project-images/tower-c-ground.webp", alt: "ANANTARA WORLD Tower C ground floor plan" },
  planCEven: { src: "/project-images/tower-c-even.webp", alt: "ANANTARA WORLD Tower C typical even floor plan" },
  planCOdd: { src: "/project-images/tower-c-odd.webp", alt: "ANANTARA WORLD Tower C typical odd floor plan" },
} as const;

export const navItems = [
  ["Home", "/"],
  ["The Project", "/anantara-world"],
  ["Residences", "/residences"],
  ["Lifestyle", "/amenities"],
  ["Location", "/location"],
  ["Gallery", "/gallery"],
  ["Updates", "/construction-updates"],
  ["About", "/about-us"],
  ["Contact", "/contact"],
] as const;

export const projectFacts = [
  ["Approx. 3.03", "acres of considered planning"],
  ["Three", "residential towers"],
  ["3 & 4 bedroom", "premium residences"],
  ["Planned 27.21%", "landscaped green area*"],
] as const;

export const amenityGroups = [
  {
    title: "Wellness & water",
    copy: "Places to restore the body and quiet the mind, woven into the rhythm of home.",
    items: ["Swimming experience", "Fitness studio", "Yoga and mindful movement", "Rest and recovery zones"],
    image: "pool" as ImageKey,
    benefit: "Everyday wellbeing, without leaving the community.",
  },
  {
    title: "Sport & movement",
    copy: "A varied setting for active mornings, spirited evenings and routines that last.",
    items: ["Outdoor play", "Indoor games", "Walking routes", "Multi-generational movement"],
    image: "sports" as ImageKey,
    benefit: "More ways for every generation to stay active.",
  },
  {
    title: "Children & family",
    copy: "Spaces imagined for curiosity, confidence and the small adventures of growing up.",
    items: ["Children’s outdoor areas", "Family lawns", "Supervised social zones", "Flexible activity spaces"],
    image: "children" as ImageKey,
    benefit: "A fuller childhood, closer to home.",
  },
  {
    title: "Community & celebration",
    copy: "Warm, adaptable settings for neighbours to meet and families to celebrate.",
    items: ["Social lounge", "Celebration spaces", "Community gatherings", "Quiet conversation corners"],
    image: "lounge" as ImageKey,
    benefit: "Belonging that grows naturally over time.",
  },
  {
    title: "Landscape & outdoor living",
    copy: "Green spaces designed as part of daily life, not simply scenery.",
    items: ["Garden walks", "Outdoor seating", "Senior-friendly movement", "Pedestrian-oriented planning"],
    image: "gardens" as ImageKey,
    benefit: "A calmer setting for unhurried everyday moments.",
  },
  {
    title: "Convenience & support",
    copy: "The practical layer of a well-run address, planned with care and discretion.",
    items: ["Basement-led parking", "Arrival management", "Security planning", "Service support areas"],
    image: "arrival" as ImageKey,
    benefit: "Comfort supported by considered organisation.",
  },
] as const;

export const contact = {
  phone: "+91 98394 25522",
  phoneHref: "+919839425522",
  email: "info@anantara.world",
  address: "Building No. 125/19-A, Block U, Govind Nagar Road, Kanpur, Uttar Pradesh – 208006",
  site: "Ambedkar Puram Yojna, Awas Vikas, Kanpur, Uttar Pradesh",
};

export const demoUpdates = [
  {
    slug: "project-planning-note",
    type: "Construction update",
    date: "Sample content · Awaiting publication date",
    title: "Project planning note",
    summary: "A placeholder for verified on-site progress, imagery and downloadable reports.",
    image: "facade" as ImageKey,
  },
  {
    slug: "community-design-preview",
    type: "News",
    date: "Demo content · Awaiting approval",
    title: "A first look at the community vision",
    summary: "A sample editorial entry prepared for approved project news and announcements.",
    image: "gardens" as ImageKey,
  },
  {
    slug: "private-presentation",
    type: "Event",
    date: "Placeholder · Date to be announced",
    title: "Private project presentation",
    summary: "A sample event entry. Final venue, schedule and access details will be published after approval.",
    image: "lobby" as ImageKey,
  },
  {
    slug: "project-announcement-note",
    type: "Press release",
    date: "Demo content · Awaiting approval",
    title: "Approved announcement placeholder",
    summary: "A sample press-release entry ready for reviewed company and project information.",
    image: "arrival" as ImageKey,
  },
] as const;
