"use client";

import { useEffect, useRef, useState } from "react";
import { images, imageSrcSet, type ImageKey } from "../data";

const galleryItems: { image: ImageKey; category: string; caption: string }[] = [
  { image: "heroNight", category: "Architecture", caption: "Towers at twilight" },
  { image: "facade", category: "Architecture", caption: "Residential towers in daylight" },
  { image: "arrival", category: "Architecture", caption: "Entrance and arrival canopy" },
  { image: "gardens", category: "Landscape", caption: "Garden walks" },
  { image: "sustainability", category: "Landscape", caption: "Community lawns" },
  { image: "pool", category: "Amenities", caption: "Swimming pool and leisure deck" },
  { image: "poolAerial", category: "Amenities", caption: "Pool-facing residence" },
  { image: "gym", category: "Amenities", caption: "Fitness studio" },
  { image: "snooker", category: "Amenities", caption: "Billiards and indoor recreation" },
  { image: "partyHall", category: "Amenities", caption: "Banquet and celebration hall" },
  { image: "lounge", category: "Amenities", caption: "Library and reading lounge" },
  { image: "children", category: "Amenities", caption: "Children’s activity room" },
  { image: "living", category: "Interiors", caption: "Residence living room" },
  { image: "bedroom", category: "Interiors", caption: "Residence bedroom" },
  { image: "kitchen", category: "Interiors", caption: "Residence kitchen" },
  { image: "bathroom", category: "Interiors", caption: "Residence bathroom" },
  { image: "office", category: "Interiors", caption: "Entertainment area and entrance" },
  { image: "teenagers", category: "Amenities", caption: "Teenagers’ games area" },
  { image: "outdoorPlay", category: "Amenities", caption: "Outdoor children’s play" },
  { image: "yoga", category: "Amenities", caption: "Yoga and mindfulness" },
  { image: "cards", category: "Amenities", caption: "Cards room" },
  { image: "family", category: "Amenities", caption: "Fitness and wellbeing" },
  { image: "seniors", category: "Landscape", caption: "Gardens for every generation" },
  { image: "sports", category: "Amenities", caption: "Outdoor sports courts" },
  { image: "balcony", category: "Interiors", caption: "Balcony overlooking the grounds" },
  { image: "lobby", category: "Interiors", caption: "Reception and social lounge" },
  { image: "interiorLiving", category: "Interiors", caption: "Living area" },
  { image: "interiorBedroom", category: "Interiors", caption: "Bedroom retreat" },
  { image: "dining", category: "Interiors", caption: "Dining area" },
  { image: "interiorBalcony", category: "Interiors", caption: "Private balcony seating" },
  { image: "reception", category: "Interiors", caption: "Reception interior" },
  { image: "kanpur", category: "Architecture", caption: "The development and its surroundings" },
];
const filters = ["All", "Architecture", "Landscape", "Amenities", "Interiors"];
const homeGalleryItems: typeof galleryItems = [
  { image: "homeLibrary", category: "Interiors", caption: "Library and reading lounge" },
  { image: "homeReception", category: "Interiors", caption: "Reception and social lounge" },
  { image: "homeLiving", category: "Interiors", caption: "Residence living room" },
  { image: "homeFoyer", category: "Interiors", caption: "Residence foyer" },
  { image: "homePool", category: "Amenities", caption: "Pool-facing lounge" },
  { image: "homeGreen", category: "Landscape", caption: "Landscaped garden walks" },
  { image: "homeSports", category: "Amenities", caption: "Outdoor sports courts" },
];

const residenceGalleryItems: typeof galleryItems = [
  { image: "interiorLiving", category: "01", caption: "Living room" },
  { image: "interiorBedroom", category: "02", caption: "Bedroom" },
  { image: "dining", category: "03", caption: "Dining area" },
  { image: "office", category: "04", caption: "Entertainment & entrance" },
  { image: "kitchen", category: "05", caption: "Kitchen" },
  { image: "interiorBalcony", category: "06", caption: "Balcony seating" },
];

export function GalleryGrid({ limit, home = false, residence = false }: { limit?: number; home?: boolean; residence?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const filtered = (residence ? residenceGalleryItems : home ? homeGalleryItems : galleryItems).filter((item) => filter === "All" || item.category === filter).slice(0, limit);
  useEffect(() => {
    if (active === null) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % filtered.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + filtered.length) % filtered.length);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [active, filtered.length]);
  return (<>
    {!limit && !home && !residence && <div className="gallery-filters" role="group" aria-label="Gallery filters">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setActive(null); }}>{item}</button>)}</div>}
    <div className="gallery-grid">{filtered.map((item, index) => <button key={`${filter}-${item.image}`} className="gallery-card" onClick={() => setActive(index)} aria-label={`Open ${item.caption}`}><img src={images[item.image].src} srcSet={imageSrcSet(images[item.image].src)} sizes="(max-width: 768px) 100vw, 42vw" alt={images[item.image].alt} loading="lazy" decoding="async" /><span>{item.category}<small>{item.caption}</small></span></button>)}</div>
    {active !== null && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button ref={closeButtonRef} className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image viewer">Close</button><button className="lightbox__prev" onClick={() => setActive((active - 1 + filtered.length) % filtered.length)} aria-label="Previous image">Previous</button><figure><img src={images[filtered[active].image].src} alt={images[filtered[active].image].alt} /><figcaption>{filtered[active].caption}</figcaption></figure><button className="lightbox__next" onClick={() => setActive((active + 1) % filtered.length)} aria-label="Next image">Next</button></div>}
  </>);
}
