import type { Metadata } from "next";
import { CaseStudiesShowcase } from "../components/CaseStudiesShowcase";
import { PageShell } from "../components/SiteShell";
import { projects } from "../lib/portfolio";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "付小雨的品牌传播、媒体运营、活动传播与跨文化研究案例。",
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CaseStudiesShowcase projects={projects} />
    </PageShell>
  );
}
