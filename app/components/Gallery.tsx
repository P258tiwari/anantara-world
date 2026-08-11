"use client";

import { useEffect, useState } from "react";
import { images, imageSrcSet, type ImageKey } from "../data";

const galleryItems: { image: ImageKey; category: string; caption: string }[] = [
  { image: "heroNight", category: "Architecture", caption: "Night architecture — artistic reference image" },
  { image: "facade", category: "Architecture", caption: "Contemporary facade — artistic reference image" },
  { image: "gardens", category: "Landscape", caption: "Garden path — landscape reference image" },
  { image: "pool", category: "Amenities", caption: "Pool setting — amenity reference image" },
  { image: "gym", category: "Amenities", caption: "Fitness studio — amenity reference image" },
  { image: "living", category: "Residences", caption: "Living room — interior reference image" },
  { image: "bedroom", category: "Residences", caption: "Bedroom — interior reference image" },
  { image: "family", category: "Lifestyle", caption: "Family life — lifestyle reference image" },
  { image: "arrival", category: "Construction", caption: "Arrival experience — artistic reference image" },
  { image: "balcony", category: "Video", caption: "Project film placeholder — reference image" },
];
const filters = ["All", "Architecture", "Landscape", "Amenities", "Residences", "Lifestyle", "Construction", "Video"];

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const filtered = galleryItems.filter((item) => filter === "All" || item.category === filter).slice(0, limit);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % filtered.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered.length]);

  return (
    <>
      {!limit && <div className="gallery-filters" role="group" aria-label="Gallery filters">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => { setFilter(item); setActive(null); }}>{item}</button>)}</div>}
      <div className="gallery-grid">{filtered.map((item, index) => <button key={`${filter}-${item.image}`} className="gallery-card" onClick={() => setActive(index)} aria-label={`Open ${item.caption}`}><img src={images[item.image].src} srcSet={imageSrcSet(images[item.image].src)} sizes="(max-width: 768px) 100vw, 42vw" alt={images[item.image].alt} loading="lazy" decoding="async" /><span>{item.category}<small>{item.caption}</small></span></button>)}</div>
      {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><button className="lightbox__close" onClick={() => setActive(null)} aria-label="Close image viewer">Close</button><button className="lightbox__prev" onClick={() => setActive((active - 1 + filtered.length) % filtered.length)} aria-label="Previous image">Previous</button><figure><img src={images[filtered[active].image].src} alt={images[filtered[active].image].alt} /><figcaption>{filtered[active].caption}</figcaption></figure><button className="lightbox__next" onClick={() => setActive((active + 1) % filtered.length)} aria-label="Next image">Next</button></div>}
    </>
  );
}
