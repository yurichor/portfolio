import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { VisualGallery } from "../components/VisualGallery";

export const metadata: Metadata = {
  title: "Visual Works",
  description: "付小雨的电影海报、短片画面、数字绘景、三维与视效作品。",
};

export default function VisualWorksPage() {
  return (
    <PageShell>
      <section className="page-hero visual-hero">
        <p className="eyebrow">VISUAL WORKS · SELECTED ARCHIVE</p>
        <h1><span>视觉不是装饰</span><span>是更快抵达受众的语言</span></h1>
        <p>影视与视效训练让我能从构图、氛围、节奏和叙事一致性判断内容，并把这套能力迁移到品牌与媒体表达中。</p>
      </section>
      <VisualGallery />
    </PageShell>
  );
}
