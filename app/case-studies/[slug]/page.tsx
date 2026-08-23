import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyNarrative } from "../../components/CaseStudyNarrative";
import { PageShell } from "../../components/SiteShell";
import { getProject, projects } from "../../lib/portfolio";

const caseProfiles: Record<string, {
  time: string;
  projectType: string;
  keyOutput: string;
  skills: string;
  core: string;
}> = {
  "sanxia-media": {
    time: "2024.06—09",
    projectType: "New Media Operations",
    keyOutput: "10条短视频支持 + 多平台作品筛选体系",
    skills: "脚本写作 · 拍摄支持 · Excel数据整理",
    core: "新媒体执行 × 数据整理",
  },
  "hku-research": {
    time: "Academic Research",
    projectType: "Cross-cultural Research",
    keyOutput: "Research Proposal + 英文汇报 + 三国对比",
    skills: "文献研究 · 跨文化分析 · 洞察可视化",
    core: "跨文化研究 × 洞察提炼",
  },
  "graduation-gala": {
    time: "2024—2025",
    projectType: "Event Communication",
    keyOutput: "2届毕业晚会 + 推文新闻稿 + 活动档案",
    skills: "项目排期 · 跨团队协作 · 现场执行",
    core: "活动传播 × 项目统筹",
  },
  "internetplus-branding": {
    time: "Competition Project",
    projectType: "Branding & Pitch",
    keyOutput: "2套品牌识别 + Pitch Deck",
    skills: "Logo设计 · PPT优化 · 项目叙事",
    core: "品牌包装 × 信息转译",
  },
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const profile = caseProfiles[project.slug];
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <PageShell>
      <article className={`case-detail case-${project.slug}`}>
        <header className="case-detail-hero case-narrative-hero">
          <div className="case-detail-copy">
            <p className="eyebrow">CASE STUDY {project.index} · {profile.projectType}</p>
            <h1>{project.title}</h1>
            <p className="case-english">{project.english}</p>
            <p className="case-summary">{project.summary}</p>
            <p className="case-core-line">{profile.core}</p>
          </div>
          <div className={`case-cover-preview case-cover-${project.slug}`}>
            <div><span>PROJECT COVER · {project.index}</span><small>{profile.core}</small></div>
            <img src={project.cover} alt={`${project.title}项目封面`} />
          </div>
        </header>

        <section className="project-snapshot" aria-label="Project Snapshot">
          <header><p className="eyebrow">PROJECT SNAPSHOT</p><span>30-SECOND VIEW</span></header>
          <dl>
            <div><dt>ROLE</dt><dd>{project.role}</dd></div>
            <div><dt>TIME</dt><dd>{profile.time}</dd></div>
            <div><dt>PROJECT TYPE</dt><dd>{profile.projectType}</dd></div>
            <div><dt>KEY OUTPUT</dt><dd>{profile.keyOutput}</dd></div>
            <div><dt>SKILLS</dt><dd>{profile.skills}</dd></div>
          </dl>
        </section>

        <CaseStudyNarrative project={project} />

        <nav className="next-case" aria-label="Next case study">
          <span>NEXT CASE · {nextProject.index}</span>
          <a href={`/case-studies/${nextProject.slug}`}>{nextProject.title} <b>↗</b></a>
        </nav>
      </article>
    </PageShell>
  );
}
