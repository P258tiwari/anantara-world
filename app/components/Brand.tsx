import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="ANANTARA WORLD home">
      <img className="brand__logo" src="/brand/anantara-world.svg" alt="" aria-hidden="true" />
    </Link>
  );
}

