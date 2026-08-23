import type { Metadata } from "next";
import { PageShell } from "./components/SiteShell";
import { HomeExperience } from "./components/HomeExperience";
import { projects } from "./lib/portfolio";

export const metadata: Metadata = {
  title: "品牌传播与媒体作品集",
};

export default function Home() {
  return (
    <PageShell>
      <HomeExperience projects={projects} />
    </PageShell>
  );
}
