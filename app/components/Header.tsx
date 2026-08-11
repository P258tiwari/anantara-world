"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { navItems } from "../data";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`site-header ${overlay ? "site-header--overlay" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <Brand compact />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(1, 8).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="text-link desktop-only" href="/downloads">Brochure</Link>
          <Link className="button button--small" href="/contact#enquire">Enquire</Link>
          <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <span /> <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <Brand compact />
          <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu">Close</button>
        </div>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href], index) => (
            <Link key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <p>Premium living. Timeless value.</p>
          <Link className="button button--light" href="/contact#visit" onClick={() => setOpen(false)}>Schedule a visit</Link>
        </div>
      </div>
    </>
  );
}

