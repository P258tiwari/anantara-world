import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="ANANTARA WORLD home">
      <span className="brand__mark" aria-hidden="true">A</span>
      <span className="brand__words">
        <strong>ANANTARA</strong>
        <small>WORLD</small>
      </span>
    </Link>
  );
}

