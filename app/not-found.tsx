/* eslint-disable @next/next/no-html-link-for-pages */
import { PageShell } from "./components/SiteShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>这一页暂时没有内容。</h1>
        <a className="button button-primary" href="/">返回首页</a>
      </section>
    </PageShell>
  );
}
