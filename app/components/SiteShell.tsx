import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children, overlay = false, compactFooter = false }: { children: React.ReactNode; overlay?: boolean; compactFooter?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header overlay={overlay} />
      <main id="main">{children}</main>
      {!compactFooter && <Footer />}
      <a className="mobile-enquire" href="/contact#enquire">Enquire now</a>
    </>
  );
}

