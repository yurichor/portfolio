import type { Project } from "../lib/portfolio";

type LinkItem = { label: string; href: string };

function ActionLinks({ links }: { links: LinkItem[] }) {
  return (
    <div className="case-action-links">
      {links.map((link, index) => (
        <a className={index === 0 ? "button button-primary" : "button button-secondary"} href={link.href} target="_blank" rel="noreferrer" key={link.href}>
          {link.label} ↗
        </a>
      ))}
    </div>
  );
}

function OutcomeProof({ project, label }: { project: Project; label: string }) {
  return (
    <section className="case-proof-strip">
      <div><p className="eyebrow">{label}</p><p>{project.reflection}</p></div>
      <div className="case-proof-metrics">
        {project.outputs.map((item) => <span key={item.label}><strong>{item.value}</strong><small>{item.label}</small></span>)}
      </div>
    </section>
  );
}

function SanxiaNarrative({ project }: { project: Project }) {
  const productionSteps = [
    ["01", "选题进入", "从真实交通场景识别用户问题"],
    ["02", "脚本结构", "场景—问题—提示—收束"],
    ["03", "拍摄支持", "口播、街景与演播室协作"],
    ["04", "数据归档", "统一字段、标记热度、支持复核"],
  ];
  return (
    <>
      <section className="case-story-section sanxia-story">
        <div className="case-story-heading">
          <p className="eyebrow">MEDIA OPERATIONS WORKBENCH</p>
          <h2 className="case-two-line-title"><span>让内容生产和赛事资料</span><span>进入同一个运营工作台</span></h2>
          <p>{project.background}</p>
        </div>
        <div className="media-workbench">
          <div className="workbench-topbar"><span><i /><i /><i /></span><b>SANXIA MEDIA · CONTENT DESK</b><small>SYNCED</small></div>
          <div className="workbench-grid">
            <div className="workbench-content-pool">
              <div className="workbench-module-title"><span>CONTENT POOL</span><b>03 SELECTED STILLS</b></div>
              <div className="workbench-video-row">
                {project.images.slice(0, 3).map((image, index) => (
                  <figure key={image.src}><img src={image.src} alt={image.alt} /><figcaption>0{index + 1} · {image.caption}</figcaption></figure>
                ))}
              </div>
            </div>
            <aside className="workbench-data-panel">
              <div className="workbench-stat-grid">
                {project.outputs.map((item) => <span key={item.label}><strong>{item.value}</strong><small>{item.label}</small></span>)}
              </div>
              <div className="workbench-table">
                <div><b>PLATFORM</b><b>CONTENT</b><b>STATUS</b></div>
                <div><span>视频号</span><span>城市影像</span><i>已复核</i></div>
                <div><span>抖音</span><span>赛事作品</span><i>已标记</i></div>
                <div><span>多平台</span><span>高热内容</span><i>可筛选</i></div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="case-story-section sanxia-process-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">CONTENT FLOW</p><h2 className="case-single-line-title">一条从短视频执行到数据复核的工作流</h2></div>
        <div className="operations-flow">
          {productionSteps.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="sanxia-data-card">
          <div>
            <p className="eyebrow">DATA ORGANISATION</p>
            <h3>把分散链接变成可筛选的内容资产</h3>
            <p>按标题、作者、平台、播放量、互动量和内容类型统一字段；清理重复与缺失项，再标记高热度内容，为评审和传播复盘提供可复核依据。</p>
          </div>
          <div className="data-field-cloud">{["标题", "作者", "平台", "链接", "播放量", "互动量", "内容分类", "复核状态"].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <ActionLinks links={project.links ?? []} />
      </section>
      <OutcomeProof project={project} label="CORE VALUE · EXECUTION + DATA" />
    </>
  );
}

function HkuNarrative({ project }: { project: Project }) {
  const comparison = [
    ["CHINA", "平台生态", "高频反馈与快速迭代", "流量 × 商业转化"],
    ["JAPAN", "角色与世界观", "跨媒介长期经营", "授权 × 生命周期"],
    ["KOREA", "工业化制作", "社群扩散与全球包装", "出口 × 全球传播"],
  ];
  return (
    <>
      <section className="case-story-section research-brief-section">
        <div className="research-brief-card">
          <div className="research-brief-intro">
            <p className="eyebrow">RESEARCH BRIEF · CJK CREATIVE INDUSTRIES</p>
            <h2>从资料阅读到可用于传播判断的研究结论</h2>
            <p>{project.background}</p>
            <div className="research-evidence"><span><b>20+</b> RELATED SOURCES</span><span><b>03</b> MARKET MODELS</span><span><b>EN</b> PRESENTATION</span></div>
          </div>
          <div className="proposal-mini-mockup">
            <img src="/images/cases/hku/proposal-cover.png" alt="Research Proposal局部预览" />
            <span>RESEARCH PROPOSAL · ABSTRACT PREVIEW</span>
          </div>
        </div>
        <div className="research-question-list">
          <p className="eyebrow">RESEARCH QUESTIONS</p>
          {project.execution.map((item, index) => <article key={item}><span>RQ{index + 1}</span><p>{item.replace(/^研究问题[一二三]：/, "")}</p></article>)}
        </div>
      </section>

      <section className="case-story-section insight-card-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">CJK INSIGHT CARDS</p><h2>三种产业路径，对应三种传播与商业化逻辑</h2></div>
        <div className="country-insight-grid">
          {(project.insights ?? []).map((insight, index) => <article className={`country-card country-card-${index + 1}`} key={insight.label}><span>0{index + 1} · {insight.label}</span><h3>{insight.title}</h3><p>{insight.text}</p><small>{comparison[index][1]}</small></article>)}
        </div>
        <div className="comparison-matrix" role="table" aria-label="中日韩创意产业对比">
          <div className="comparison-head" role="row"><span>MARKET</span><span>CONTENT ENGINE</span><span>MEDIA LOGIC</span><span>VALUE PATH</span></div>
          {comparison.map((row) => <div role="row" key={row[0]}>{row.map((cell) => <span role="cell" key={cell}>{cell}</span>)}</div>)}
        </div>
      </section>

      <section className="case-story-section research-artifacts-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">RESEARCH ARTIFACTS</p><h2>结论以简报、框架和对比卡沉淀</h2></div>
        <div className="research-preview-grid">
          {project.images.slice(1, 6).map((image, index) => <article key={image.src}><div><img src={image.src} alt={image.alt} /></div><span>0{index + 1}</span><h3>{image.caption}</h3></article>)}
        </div>
      </section>
      <OutcomeProof project={project} label="CORE VALUE · RESEARCH + INSIGHT" />
    </>
  );
}

function GalaNarrative({ project }: { project: Project }) {
  const roles = [
    ["01", "Project Direction", "确定主题、排期和职责边界，让项目有统一节奏。"],
    ["02", "Cross-team Coordination", "协调老师、学生团队与供应方，保持信息一致。"],
    ["03", "Communication Content", "统筹预热物料、推文和活动后新闻稿。"],
    ["04", "Live Delivery", "推进彩排、人员调度与现场突发问题处理。"],
  ];
  return (
    <>
      <section className="case-story-section gala-timeline-section">
        <div className="case-story-heading"><p className="eyebrow">EVENT COMMUNICATION TIMELINE</p><h2>传播节奏必须和现场执行发生在同一条时间线上</h2><p>{project.background}</p></div>
        <div className="event-timeline">
          {project.execution.map((item, index) => {
            const [time, text] = item.split("：");
            return <article key={item}><span>0{index + 1}</span><b>{time}</b><p>{text}</p></article>;
          })}
        </div>
      </section>

      <section className="case-story-section gala-role-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">ROLE & RESPONSIBILITY</p><h2>总导演角色，连接内容、人员与现场</h2></div>
        <div className="gala-role-grid">{roles.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="gala-contact-sheet">
          {project.images.slice(0, 3).map((image, index) => <figure key={image.src}><img src={image.src} alt={image.alt} /><figcaption>SCENE 0{index + 1} · {image.caption}</figcaption></figure>)}
        </div>
      </section>

      <section className="case-story-section gala-archive-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">EVENT ARCHIVE</p><h2>活动结束后，留下可复用的传播资产</h2></div>
        <div className="event-archive-grid">
          {project.images.slice(3).map((image, index) => <article key={image.src}><div><img src={image.src} alt={image.alt} /></div><span>ARCHIVE 0{index + 1}</span><h3>{image.caption}</h3></article>)}
        </div>
        <ActionLinks links={project.links ?? []} />
      </section>
      <OutcomeProof project={project} label="CORE VALUE · EVENT + COORDINATION" />
    </>
  );
}

function InternetPlusNarrative({ project }: { project: Project }) {
  const path = [
    ["01", "提炼问题", "识别目标用户、痛点与价值主张"],
    ["02", "建立识别", "用Logo、色彩与字体形成记忆点"],
    ["03", "重组叙事", "问题—方案—优势—价值—证明"],
    ["04", "适配路演", "压缩文字，强化远距离阅读层级"],
  ];
  return (
    <>
      <section className="case-story-section pitch-deck-section">
        <div className="case-story-heading"><p className="eyebrow">PITCH DECK MOCKUP</p><h2>包装的重点不是“更好看”，而是让评委更快理解价值</h2><p>{project.background}</p></div>
        <div className="pitch-screen">
          <div className="pitch-screen-top"><span>STARTUP PITCH · 16:9</span><small>CORE VALUE / BUSINESS LOGIC / PROOF</small></div>
          <div className="pitch-slide-stage">
            <div className="pitch-slide-copy"><span>01 / PROBLEM</span><h3><b>把复杂信息</b><b>转译为一句价值主张</b></h3><p>从技术描述中提炼受众真正需要理解的项目价值。</p></div>
            <div className="pitch-slide-preview"><img src="/images/cases/internetplus/project-book.png" alt="互联网加项目书局部预览" /></div>
          </div>
        </div>
      </section>

      <section className="case-story-section pitch-path-section">
        <div className="case-story-heading compact-heading"><p className="eyebrow">INFORMATION PATH</p><h2 className="case-single-line-title">四步完成品牌包装与路演信息转译</h2></div>
        <div className="pitch-path-grid">{path.map(([no, title, text]) => <article key={no}><span>{no}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="brand-asset-row">
          {project.images.slice(0, 2).map((image, index) => <article key={image.src}><div><img src={image.src} alt={image.alt} /></div><span>BRAND MARK 0{index + 1}</span><p>{image.caption}</p></article>)}
          <article className="award-proof-card"><span>RESULT PROOF</span><strong>1st + 3rd</strong><p>两套项目包装获得校级一等奖与三等奖</p><div>{project.images.slice(3, 5).map((image) => <span key={image.src}>{image.caption}</span>)}</div></article>
        </div>
        <ActionLinks links={project.links ?? []} />
      </section>
    </>
  );
}

export function CaseStudyNarrative({ project }: { project: Project }) {
  if (project.slug === "sanxia-media") return <SanxiaNarrative project={project} />;
  if (project.slug === "hku-research") return <HkuNarrative project={project} />;
  if (project.slug === "graduation-gala") return <GalaNarrative project={project} />;
  return <InternetPlusNarrative project={project} />;
}
