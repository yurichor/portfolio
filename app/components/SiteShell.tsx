/* eslint-disable @next/next/no-html-link-for-pages */
import { ScrollProgress } from "./ScrollProgress";
import { CopyEmail } from "./CopyEmail";

const navItems = [
  ["Home", "/"],
  ["Case Studies", "/case-studies"],
  ["Writing Samples", "/writing-samples"],
  ["Visual Works", "/visual-works"],
  ["About & Contact", "/about"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="/" className="brand-mark" aria-label="Fu Xiaoyu portfolio home">
        <span className="brand-logo"><img src="/images/profile/yuri-fu-logo.jpg" alt="Yuri Fu个人标志" /></span>
        <span className="brand-copy">
          <strong>付小雨</strong>
          <small>Brand Communication & Media</small>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">LET&apos;S CONNECT</p>
        <h2>期待我们的合作</h2>
      </div>
      <div className="footer-contact">
        <CopyEmail email="fxyu024@163.com" />
        <p><b>CN · EN · KR</b> Cross-cultural Collaboration</p>
        <p>Brand PR · Media Communication · Content Operation</p>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Fu Xiaoyu</span>
        <span>Thank you for viewing my portfolio.</span>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
