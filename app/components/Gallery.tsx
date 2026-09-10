"use client";

import { useEffect, useRef, useState } from "react";
import { images, imageSrcSet, type ImageKey } from "../data";

const galleryItems: { image: ImageKey; category: string; caption: string }[] = [
  { image: "heroNight", category: "Architecture", caption: "Aerial night view · Artistic impression" },
  { image: "facade", category: "Architecture", caption: "Tower and arrival canopy · Artistic impression" },
  { image: "arrival", category: "Architecture", caption: "Entrance gate at night · Artistic impression" },
  { image: "gardens", category: "Landscape", caption: "Landscaped family recreation area · Artistic impression" },
  { image: "sustainability", category: "Landscape", caption: "Community landscape and towers · Artistic impression" },
  { image: "pool", category: "Amenities", caption: "Pool and deck · Artistic impression" },
  { image: "poolAerial", category: "Amenities", caption: "Pool recreation deck · Artistic impression" },
  { image: "gym", category: "Amenities", caption: "Fitness studio · Artistic impression" },
  { image: "snooker", category: "Amenities", caption: "Indoor games room · Artistic impression" },
  { image: "partyHall", category: "Amenities", caption: "Party hall · Artistic impression" },
  { image: "lounge", category: "Amenities", caption: "Library and social lounge · Artistic impression" },
  { image: "children", category: "Amenities", caption: "Children's crèche · Artistic impression" },
  { image: "living", category: "Interiors", caption: "Residents' lobby · Artistic impression" },
  { image: "bedroom", category: "Interiors", caption: "Tower C reception lobby · Artistic impression" },
  { image: "kitchen", category: "Interiors", caption: "Juice bar · Artistic impression" },
  { image: "bathroom", category: "Interiors", caption: "Yoga and wellness room · Artistic impression" },
  { image: "office", category: "Interiors", caption: "Project office · Artistic impression" },
  { image: "planAGround", category: "Floor plans", caption: "Tower A ground floor plan" },
  { image: "planAEven", category: "Floor plans", caption: "Tower A typical even floor plan" },
  { image: "planAOdd", category: "Floor plans", caption: "Tower A typical odd floor plan" },
  { image: "planBGround", category: "Floor plans", caption: "Tower B ground floor plan" },
  { image: "planBEven", category: "Floor plans", caption: "Tower B typical even floor plan" },
  { image: "planBOdd", category: "Floor plans", caption: "Tower B typical odd floor plan" },
  { image: "planCGround", category: "Floor plans", caption: "Tower C ground floor plan" },
  { image: "planCEven", category: "Floor plans", caption: "Tower C typical even floor plan" },
  { image: "planCOdd", category: "Floor plans", caption: "Tower C typical odd floor plan" },
];
const filters = ["All", "Architecture", "Landscape", "Amenities", "Interiors", "Floor plans"];

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const filtered = galleryItems.filter((item) => filter === "All" || item.category === filter).slice(0, limit);
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
    {!limit && <div className="gallery-filters" role="group" aria-label="Gallery filters">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setActive(null); }}>{item}</button>)}</div>}
    <div className="gallery-grid">{filtered.map((item, index) => <button key={`${filter}-${item.image}`} className="gallery-card" onClick={() => setActive(index)} aria-label={`Open ${item.caption}`}><img src={images[item.image].src} srcSet={imageSrcSet(images[item.image].src)} sizes="(max-width: 768px) 100vw, 42vw" alt={images[item.image].alt} loading="lazy" decoding="async" /><span>{item.category}<small>{item.caption}</small></span></button>)}</div>
    {active !== null && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button ref={closeButtonRef} className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image viewer">Close</button><button className="lightbox__prev" onClick={() => setActive((active - 1 + filtered.length) % filtered.length)} aria-label="Previous image">Previous</button><figure><img src={images[filtered[active].image].src} alt={images[filtered[active].image].alt} /><figcaption>{filtered[active].caption}</figcaption></figure><button className="lightbox__next" onClick={() => setActive((active + 1) % filtered.length)} aria-label="Next image">Next</button></div>}
  </>);
}
