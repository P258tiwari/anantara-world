import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="ANANTARA WORLD home">
      <img className="brand__logo" src="/brand/anantara-world-readable.svg" width={417} height={277} alt="" aria-hidden="true" />
    </Link>
  );
}

