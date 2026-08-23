import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { WritingSamplesShowcase } from "../components/WritingSamplesShowcase";

export const metadata: Metadata = {
  title: "Writing Samples",
  description: "付小雨的新闻及公文写作、视频脚本、社交媒体文案与传播策略样本。",
};

export default function WritingSamplesPage() {
  return <PageShell><WritingSamplesShowcase /></PageShell>;
}
