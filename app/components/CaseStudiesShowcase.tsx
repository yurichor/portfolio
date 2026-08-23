import type { Project } from "../lib/portfolio";

const caseScan: Record<string, { type: string; core: string; proof: string }> = {
  "sanxia-media": {
    type: "MEDIA OPERATIONS",
    core: "新媒体执行 × 数据整理",
    proof: "10条短视频支持 · 多平台作品筛选与复核",
  },
  "hku-research": {
    type: "CROSS-CULTURAL RESEARCH",
    core: "跨文化研究 × 洞察提炼",
    proof: "20+篇文献 · 中日韩三国对比 · 英文汇报",
  },
  "graduation-gala": {
    type: "EVENT COMMUNICATION",
    core: "活动传播 × 项目统筹",
    proof: "2届毕业晚会 · T-30传播时间线 · 活动档案",
  },
  "internetplus-branding": {
    type: "BRANDING & PITCH",
    core: "品牌包装 × 信息转译",
    proof: "2套品牌方案 · Pitch Deck · 校级一等奖/三等奖",
  },
};

export function CaseStudiesShowcase({ projects, home = false }: { projects: Project[]; home?: boolean }) {
  const title = <>四个案例，<br />四种清晰的项目价值。</>;

  return (
    <div className={`case-studies-showcase${home ? " case-studies-showcase-home" : ""}`}>
      <section className="page-hero page-hero-cases">
        <p className="eyebrow">CASE STUDIES · 01—04</p>
        {home ? <h2 className="case-showcase-title">{title}</h2> : <h1 className="case-showcase-title">{title}</h1>}
        <p>从媒体运营、跨文化研究、活动传播到品牌路演，每页只聚焦一项核心能力，让角色、方法与结果可以被快速判断。</p>
      </section>
      <section className="section case-scan-index" aria-label="案例快速索引">
        {projects.map((project) => {
          const scan = caseScan[project.slug];
          return (
            <article className={`case-scan-card case-scan-${project.slug}`} key={project.slug}>
              <a className="case-scan-cover" href={`/case-studies/${project.slug}`} aria-label={`查看案例：${project.title}`}>
                <img src={project.cover} alt="" />
                <span>{project.index}</span>
              </a>
              <div className="case-scan-copy">
                <p className="eyebrow">{project.index} · {scan.type}</p>
                <h3><a href={`/case-studies/${project.slug}`}>{project.title}</a></h3>
                <strong>{scan.core}</strong>
                <p>{scan.proof}</p>
                <a className="case-scan-link" href={`/case-studies/${project.slug}`}>View Case Study <span>↗</span></a>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
