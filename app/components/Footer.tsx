import { brochure } from "../brochure-data";
import Link from "next/link";
import { Brand } from "./Brand";
import { contact } from "../data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow">A new address in Kanpur</p>
        <h2>Discover the world being created for you.</h2>
        <div className="button-row">
          <Link className="button button--light" href="/contact#visit">Schedule a private presentation</Link>
          <a className="button button--ghost-light" href={brochure.downloadUrl} download>Download the brochure</a>
        </div>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><Brand /><p className="footer-tagline">Premium living.<br />Timeless value.</p></div>
        <div><p className="footer-label">Explore</p><Link href="/anantara-world">The project</Link><Link href="/residences">Residences</Link><Link href="/amenities">Amenities</Link><Link href="/gallery">Gallery</Link></div>
        <div><p className="footer-label">Information</p><Link href="/downloads">Downloads</Link><Link href="/legal-rera">Legal & RERA</Link><Link href="/privacy-policy">Privacy</Link></div>
        <div><p className="footer-label">Contact</p>{contact.phones.map((phone) => <a key={phone.href} href={`tel:${phone.href}`} style={{ display: "block" }}>{phone.label}</a>)}<a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.address}</p></div>
      </div>
      <div className="footer-developer">
        <div>
          <p className="footer-developer__label">A development by</p>
          <p className="footer-developer__name">Mahadev Developers</p>
        </div>
        <p className="footer-developer__project">The developers behind Anantara World, Kanpur.</p>
      </div>
      <div className="footer-base"><p>© {new Date().getFullYear()} Mahadev Developers. All rights reserved.</p><p>Project visuals are artistic impressions. Final details may vary.</p></div>
    </footer>
  );
}

