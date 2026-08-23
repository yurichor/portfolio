"use client";

import { useCallback, useEffect, useState } from "react";
import CardSwap, { Card } from "./CardSwap";

const samples = [
  { no: "01", title: "新闻及公文写作", en: "NEWS & OFFICIAL WRITING", cover: "/images/writing/01-news-official-writing.png" },
  { no: "02", title: "视频脚本", en: "VIDEO SCRIPT", cover: "/images/writing/02-video-script.png" },
  { no: "03", title: "AI影像产品社媒文案构想", en: "AI SOCIAL COPY", cover: "/images/writing/03-ai-social-copy.png" },
  { no: "04", title: "AI影像产品社媒传播简报", en: "AI COMMUNICATION BRIEF", cover: "/images/writing/04-ai-social-brief.png" },
];

const scriptSteps = [
  ["01", "真实场景开场", "用通勤、路口或驾驶情境迅速建立代入感。"],
  ["02", "提出具体问题", "从用户容易忽略的交通行为切入，制造信息缺口。"],
  ["03", "解释规则与风险", "把法规信息转化为简洁、可口播的日常语言。"],
  ["04", "提示与行动收束", "以清晰建议结束，形成可记忆、可执行的提示。"],
];

const kvConcepts = [
  { no: "01", title: "灵感到画面", text: "左侧是手写关键词，右侧生成完整视觉；强调从抽象想法到可见成果。", tag: "EFFICIENCY" },
  { no: "02", title: "一人创意团队", text: "用多窗口呈现风格探索、版式变化和应用场景，突出工作流效率。", tag: "WORKFLOW" },
  { no: "03", title: "想象无需等待", text: "以进度条与成图对比制造速度感，强化低门槛和快速试错。", tag: "CREATIVITY" },
];

function NewsDetail() {
  return (
    <section className="writing-sample sample-news">
      <div className="writing-number">01</div>
      <div className="writing-copy">
        <p className="eyebrow">NEWS & OFFICIAL WRITING · EVENT COMMUNICATION</p>
        <h2>新闻及公文写作</h2>
        <p className="sample-lead">把现场发生了什么，转化为一篇有主题、有节奏、有组织记忆的活动报道。</p>
        <div className="writing-facts">
          <div><span>写作目标</span><p>准确记录活动、呈现学院特色、延续毕业晚会的传播影响。</p></div>
          <div><span>结构设计</span><p>主题导入 → 现场概览 → 节目亮点 → 情感收束 → 组织价值。</p></div>
          <div><span>内容取舍</span><p>保留关键角色和亮点节目，减少流水账式叙述，增强阅读节奏。</p></div>
        </div>
        <div className="sample-link-list">
          <a className="button button-primary" href="https://mp.weixin.qq.com/s/D6My5tkP4RCJhidVHEotVA?from=singlemessage&isappinstalled=0&scene=1&clicktime=1787229343&enterid=1787229343" target="_blank" rel="noreferrer">推文新闻稿 ↗</a>
          <a className="button button-secondary" href="https://tw.zuel.edu.cn/2022/1022/c4353a310251/page.psp" target="_blank" rel="noreferrer">公文通知 Sample ↗</a>
          <a className="button button-secondary" href="/images/cases/gala/news-release.png" target="_blank" rel="noreferrer">查看原始页面图片 ↗</a>
        </div>
      </div>
      <div className="writing-visual editorial-preview-card news-preview-card">
        <div className="preview-card-kicker"><span>WECHAT OFFICIAL ACCOUNT</span><b>NEWS RELEASE · 2025</b></div>
        <div className="preview-card-rule" />
        <p className="preview-card-label">FEATURED WRITING / 01</p>
        <h3>漫影筑梦 · 艺路繁花<br />毕业晚会活动报道</h3>
        <p className="preview-card-summary">围绕毕业晚会的主题、现场流程与代表性节目展开，以编辑式结构提炼活动亮点，并将现场记忆转化为兼具信息价值与情感温度的学院传播内容。</p>
        <div className="preview-tag-groups">
          <div><span>写作目标</span><p>现场记录 · 学院形象 · 传播沉淀</p></div>
          <div><span>内容结构</span><p>主题导入 → 现场概览 → 节目亮点 → 情感收束</p></div>
        </div>
        <a className="preview-original-link" href="/images/cases/gala/news-release.png" target="_blank" rel="noreferrer" aria-label="点击查看毕业晚会新闻稿页面原图">
          <span className="preview-original-thumb"><img src="/images/cases/gala/news-release.png" alt="毕业晚会新闻稿页面缩略图" /></span>
          <span><b>原始推文页面</b><small>VIEW FULL SCREENSHOT ↗</small></span>
        </a>
      </div>
    </section>
  );
}

function ScriptDetail() {
  return (
    <section className="writing-sample sample-script">
      <div className="writing-number">02</div>
      <div className="writing-copy">
        <p className="eyebrow">VIDEO SCRIPT · STORYBOARD</p>
        <h2>视频脚本</h2>
        <p className="sample-lead">将交通规则改写成30—60秒可理解、可拍摄、可记忆的移动端内容。</p>
        <div className="script-flow">
          {scriptSteps.map(([no, title, text]) => (
            <article key={no}><span>{no}</span><div><h3>{title}</h3><p>{text}</p></div></article>
          ))}
        </div>
        <p className="reflection-note"><b>写作复盘</b>：规则类内容的难点不是“说完整”，而是用具体情境建立关联，再在有限时间里给出可信且清晰的行动建议。</p>
        <div className="sample-link-list">
          <a className="button button-primary" href="/images/writing/huaguo-niumo-script.png" target="_blank" rel="noreferrer">花果牛魔王探店脚本 ↗</a>
          <a className="button button-secondary" href="/downloads/sanshui-storyboard.pdf" target="_blank" rel="noreferrer">《三水印象》分镜 PDF ↗</a>
          <a className="button button-secondary" href="/downloads/lujiaoshu-storyboard.pdf" target="_blank" rel="noreferrer">《鹿角树》分镜 PDF ↗</a>
        </div>
      </div>
      <div className="writing-visual editorial-preview-card script-preview-card">
        <div className="preview-card-kicker"><span>STORYBOARD + SCRIPT PREVIEW</span><b>VIDEO · 30—60 SEC</b></div>
        <div className="preview-card-rule" />
        <p className="preview-card-label">SCRIPT SAMPLE / 02</p>
        <h3>《广电+花果牛魔王》<br />拍摄探店示例脚本</h3>
        <div className="storyboard-preview-grid" aria-label="四个分镜结构卡片">
          <article><span>01</span><div aria-hidden="true"><i /><i /></div><b>建立场景</b><small>门店外景</small></article>
          <article><span>02</span><div aria-hidden="true"><i /><i /></div><b>人物出场</b><small>主持人口播</small></article>
          <article><span>03</span><div aria-hidden="true"><i /><i /></div><b>核心体验</b><small>产品与细节</small></article>
          <article><span>04</span><div aria-hidden="true"><i /><i /></div><b>行动收束</b><small>信息与互动</small></article>
        </div>
        <div className="script-table-preview" aria-label="三行局部脚本表格预览">
          <div className="script-table-head"><span>镜号</span><span>画面与口播</span><span>节奏</span></div>
          <div><span>01</span><p>门店外景推进，主持人建立探店任务</p><b>3s</b></div>
          <div><span>02</span><p>人物进入画面，介绍主题与核心看点</p><b>6s</b></div>
          <div><span>03</span><p>特写切换，展示互动与体验细节</p><b>8s</b></div>
        </div>
        <a className="preview-original-link script-original-link" href="/images/writing/huaguo-niumo-script.png" target="_blank" rel="noreferrer" aria-label="点击查看广电加花果牛魔王拍摄探店示例脚本原图">
          <span className="preview-original-thumb"><img src="/images/writing/huaguo-niumo-script.png" alt="探店脚本表格缩略图" /></span>
          <span><b>完整脚本表格</b><small>VIEW ORIGINAL ↗</small></span>
        </a>
        <div className="storyboard-pdf-grid compact-pdf-grid">
          <a href="/downloads/sanshui-storyboard.pdf" target="_blank" rel="noreferrer"><b>《三水印象》</b><span>Storyboard PDF ↗</span></a>
          <a href="/downloads/lujiaoshu-storyboard.pdf" target="_blank" rel="noreferrer"><b>《鹿角树》</b><span>Storyboard PDF ↗</span></a>
        </div>
      </div>
    </section>
  );
}

function AiCopyDetail() {
  return (
    <section className="writing-sample sample-ai-copy">
      <div className="writing-number">03</div>
      <div className="writing-copy wide-copy">
        <p className="eyebrow">AI PRODUCT · SOCIAL COPYWRITING CONCEPT</p>
        <h2>AI图像产品社交媒体文案概念</h2>
        <p className="sample-lead">以“让灵感，不再停在想象里”为核心命题，把功能语言转换成用户能感知的创作价值。</p>
        <blockquote><strong>让灵感，不再停在想象里。</strong><span>Turn your ideas into visuals, faster.</span></blockquote>
        <div className="kv-grid">
          {kvConcepts.map((item) => <article key={item.no}><span>{item.no} · {item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
        <div className="social-copy-grid">
          <div><span>小红书标题方向</span><ul><li>脑海里的画面，终于能被看见了</li><li>不会画画，也能完成一张属于自己的视觉</li><li>灵感很多，但总来不及做？试试把第一版交给AI</li><li>从一句话到一张图，我的创意工作流变了</li></ul></div>
          <div><span>30秒短视频结构</span><p>0—3s 痛点钩子 · 4—10s 输入灵感 · 11—20s 快速生成与迭代 · 21—26s 应用展示 · 27—30s 品牌收束。</p></div>
        </div>
        <div className="button-row"><a className="button button-primary" href="/downloads/fu-xiaoyu-ai-imaging-copywriting-sample.pdf" target="_blank" rel="noreferrer">View Full Copywriting Sample PDF ↗</a></div>
        <p className="reflection-note"><b>创作说明</b>：这是一份面向AI图像产品的模拟传播样本，用于展示我对用户痛点、平台语气和多内容形态拆解的理解。</p>
      </div>
    </section>
  );
}

function BriefDetail() {
  return (
    <section className="writing-sample sample-brief">
      <div className="writing-number">04</div>
      <div className="writing-copy wide-copy">
        <p className="eyebrow">COMMUNICATION BRIEF · AI IMAGING</p>
        <h2>AI图像产品社交媒体传播Brief</h2>
        <p className="sample-lead">从用户疑问出发，建立平台分工、内容主题与衡量指标，让创意方向可以被团队执行和复盘。</p>
        <div className="concern-row" aria-label="User concerns">{["效率", "自然度", "易用性", "审美", "版权与隐私"].map((item, index) => <span key={item}>0{index + 1} {item}</span>)}</div>
        <div className="platform-grid">
          <article><span>XIAOHONGSHU</span><h3>经验与审美</h3><p>工作流、前后对比、模板思路与真实创作体验。</p></article>
          <article><span>DOUYIN / VIDEO</span><h3>速度与结果</h3><p>前三秒痛点、生成过程、视觉反差和明确行动提示。</p></article>
          <article><span>BILIBILI</span><h3>深度与可信</h3><p>完整教程、横向测评、创作挑战和边界讨论。</p></article>
          <article><span>WECHAT</span><h3>信息与沉淀</h3><p>产品更新、案例拆解、方法文章和社群承接。</p></article>
        </div>
        <div className="strategy-list"><h3>五项传播策略</h3><ol>
          <li><b>场景优先</b><span>从海报、提案、社交配图等真实任务切入。</span></li><li><b>结果可见</b><span>用前后对比和迭代过程建立直观说服力。</span></li><li><b>低门槛表达</b><span>减少模型术语，强调一句话即可开始。</span></li><li><b>可信边界</b><span>主动回应版权、隐私与审美一致性问题。</span></li><li><b>反馈闭环</b><span>追踪停留、收藏、评论问题和试用转化。</span></li>
        </ol></div>
        <div className="topic-strip"><span>TOPIC STARTERS</span><p>一张图生成三种风格 · AI修图前后对比 · 内容运营人的AI工具箱 · 从0到1做一张社媒封面 · AI影像如何进入品牌工作流</p></div>
        <div className="brief-metrics"><span>REACH<br /><b>曝光 / 播放</b></span><span>INTEREST<br /><b>停留 / 收藏</b></span><span>TRUST<br /><b>评论质量 / 分享</b></span><span>ACTION<br /><b>点击 / 试用</b></span></div>
        <div className="button-row"><a className="button button-primary" href="/downloads/fu-xiaoyu-ai-imaging-social-media-brief.pdf" target="_blank" rel="noreferrer">View Full Report PDF ↗</a></div>
        <p className="reflection-note"><b>策略复盘</b>：传播Brief的价值，是把“想表达什么”进一步翻译为“对谁、在哪个平台、用什么证据、如何判断有效”。</p>
      </div>
    </section>
  );
}

const details = [<NewsDetail key="news" />, <ScriptDetail key="script" />, <AiCopyDetail key="copy" />, <BriefDetail key="brief" />];

export function WritingSamplesShowcase() {
  const [active, setActive] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openSample = useCallback((index: number) => {
    setActive(index);
    window.history.pushState(null, "", `#sample-0${index + 1}`);
  }, []);
  const closeSample = useCallback(() => {
    setActive(null);
    window.history.pushState(null, "", window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const syncHash = () => {
      const match = window.location.hash.match(/^#sample-0([1-4])$/);
      setActive(match ? Number(match[1]) - 1 : null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") closeSample(); };
    window.addEventListener("keydown", escape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", escape); };
  }, [active, closeSample]);

  return (
    <>
      <section className="writing-samples-single">
        <div className="writing-showcase-copy">
          <p className="eyebrow">WRITING SAMPLES · 01—04</p>
          <h1 className="writing-philosophy"><span>写作不是堆砌信息</span><span>而是设计理解路径</span></h1>
          <nav className="writing-sample-index" aria-label="Writing sample index">
            {samples.map((sample, index) => (
              <a
                key={sample.no}
                href={`#sample-0${index + 1}`}
                className={previewIndex === index ? "is-preview-active" : ""}
                aria-current={previewIndex === index ? "true" : undefined}
                onMouseEnter={() => setPreviewIndex(index)}
                onFocus={() => setPreviewIndex(index)}
                onClick={(event) => { event.preventDefault(); openSample(index); }}
              >
                <span>{sample.no}</span><strong>{sample.title}</strong><small>{sample.en}</small><b>↗</b>
              </a>
            ))}
          </nav>
        </div>
        <div className="writing-showcase-preview">
          <div className="writing-preview-meta"><span>PROJECT TITLE</span><span>PREVIEW · CLICK TO OPEN</span></div>
          <CardSwap width={660} height={495} cardDistance={42} verticalDistance={48} delay={2600} easing="linear" activeIndex={previewIndex} onActiveIndexChange={setPreviewIndex} pauseOnHover onCardClick={openSample}>
            {samples.map((sample) => (
              <Card key={sample.no} aria-label={`打开 ${sample.title}`}>
                <img src={sample.cover} alt={`${sample.title}作品封面`} />
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      {details.map((detail, index) => (
        <div key={samples[index].no} id={`sample-0${index + 1}`} className="writing-detail-overlay" hidden={active !== index}>
          <button className="writing-detail-backdrop" type="button" onClick={closeSample} aria-label="关闭案例详情" />
          <article className="writing-detail-panel" role="dialog" aria-modal="true" aria-label={samples[index].title}>
            <header><span>{samples[index].no} / 04 · {samples[index].en}</span><button type="button" onClick={closeSample} aria-label="关闭案例">Close <b>×</b></button></header>
            {detail}
          </article>
        </div>
      ))}
    </>
  );
}
