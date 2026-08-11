// TEMPORARY REFERENCE IMAGES ONLY.
// Replace these centralized Unsplash URLs with approved ANANTARA WORLD renders before launch.
const unsplash = (id: string, width = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;

export type ImageKey = keyof typeof images;

export const imageSrcSet = (src: string) => [480, 800, 1200, 1800]
  .map((width) => `${src.replace(/&w=\d+/, `&w=${width}`)} ${width}w`)
  .join(", ");

export const images = {
  heroNight: {
    src: unsplash("photo-1486406146926-c627a92ad1ab", 2200),
    alt: "Contemporary residential architecture illuminated at night — temporary reference image",
  },
  facade: {
    src: unsplash("photo-1518005020951-eccb494ad742"),
    alt: "Contemporary tower facade — temporary reference image",
  },
  arrival: {
    src: unsplash("photo-1600566753190-17f0baa2a6c3"),
    alt: "Refined residential arrival — temporary reference image",
  },
  lobby: {
    src: unsplash("photo-1600607688969-a5bfcd646154"),
    alt: "Warm modern lobby — temporary reference image",
  },
  gardens: {
    src: unsplash("photo-1585320806297-9794b3e4eeae"),
    alt: "Lush landscaped garden path — temporary reference image",
  },
  pool: {
    src: unsplash("photo-1576013551627-0cc20b96c2a7"),
    alt: "Calm outdoor swimming pool — temporary reference image",
  },
  gym: {
    src: unsplash("photo-1534438327276-14e5300c3a48"),
    alt: "Contemporary fitness studio — temporary reference image",
  },
  sports: {
    src: unsplash("photo-1546519638-68e109498ffc"),
    alt: "Outdoor sport and movement — temporary reference image",
  },
  children: {
    src: unsplash("photo-1503454537195-1dcabb73ffb9"),
    alt: "Child enjoying time outdoors — temporary reference image",
  },
  family: {
    src: unsplash("photo-1511895426328-dc8714191300"),
    alt: "Family spending meaningful time together — temporary reference image",
  },
  seniors: {
    src: unsplash("photo-1544005313-94ddf0286df2"),
    alt: "Senior couple in a calm setting — temporary reference image",
  },
  lounge: {
    src: unsplash("photo-1600210492486-724fe5c67fb0"),
    alt: "Elegant social lounge — temporary reference image",
  },
  living: {
    src: unsplash("photo-1600607687939-ce8a6c25118c"),
    alt: "Light-filled premium living room — temporary reference image",
  },
  bedroom: {
    src: unsplash("photo-1616486338812-3dadae4b4ace"),
    alt: "Quiet contemporary bedroom — temporary reference image",
  },
  kitchen: {
    src: unsplash("photo-1600585154340-be6161a56a0c"),
    alt: "Refined contemporary kitchen — temporary reference image",
  },
  bathroom: {
    src: unsplash("photo-1600566753086-00f18fb6b3ea"),
    alt: "Calm modern bathroom — temporary reference image",
  },
  balcony: {
    src: unsplash("photo-1600607687920-4e2a09cf159d"),
    alt: "Private balcony overlooking greenery — temporary reference image",
  },
  sustainability: {
    src: unsplash("photo-1542601906990-b4d3fb778b09"),
    alt: "Green leaves in natural light symbolising thoughtful sustainability — temporary reference image",
  },
  kanpur: {
    src: unsplash("photo-1599661046289-e31897846e41"),
    alt: "Urban India at dusk — temporary location reference image",
  },
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
