import { images, imageSrcSet, type ImageKey } from "../data";

export function EditorialImage({ image, className = "", priority = false, caption = "Project render" }: { image: ImageKey; className?: string; priority?: boolean; caption?: string }) {
  const item = images[image];
  return (
    <figure className={`editorial-image ${className}`}>
      <img src={item.src} srcSet={imageSrcSet(item.src)} sizes="(max-width: 768px) 100vw, 60vw" alt={item.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
