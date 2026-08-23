import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the professional portfolio home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /付小雨/);
  assert.match(html, /Welcome to/);
  assert.match(html, /my universe/);
  assert.match(html, /YURI&#x27;S PORTFOLIO/);
  assert.match(html, /让品牌内容/);
  assert.match(html, /Case Studies/);
  assert.match(html, /Writing Samples/);
  assert.match(html, /Download Resume/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders all primary portfolio routes", async () => {
  const expectations = [
    ["/case-studies", /四种清晰的项目价值/],
    ["/writing-samples", /AI图像产品社交媒体传播Brief/],
    ["/visual-works", /视觉不是装饰/],
    ["/about", /用跨文化视角理解人/],
    ["/case-studies/sanxia-media", /内容生产 - 平台传播 - 数据复盘/],
    ["/case-studies/hku-research", /三种产业路径，对应三种传播与商业化逻辑/],
    ["/case-studies/graduation-gala", /传播节奏必须和现场执行/],
    ["/case-studies/internetplus-branding", /让评委更快理解价值/],
  ];
  for (const [path, pattern] of expectations) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), pattern, path);
  }
});

test("keeps required downloadable assets and removes starter preview", async () => {
  await Promise.all([
    access(new URL("public/downloads/fu-xiaoyu-resume.pdf", root)),
    access(new URL("public/downloads/fu-xiaoyu-ai-imaging-copywriting-sample.pdf", root)),
    access(new URL("public/downloads/fu-xiaoyu-ai-imaging-social-media-brief.pdf", root)),
    access(new URL("public/downloads/sanshui-storyboard.pdf", root)),
    access(new URL("public/downloads/lujiaoshu-storyboard.pdf", root)),
    access(new URL("public/images/writing/01-news-official-writing.png", root)),
    access(new URL("public/images/writing/02-video-script.png", root)),
    access(new URL("public/og.png", root)),
    access(new URL("public/favicon.png", root)),
  ]);
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)));
  const [layout, packageJson] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.match(layout, /品牌传播与媒体作品集/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("uses production-safe navigation and ships the portfolio experiences", async () => {
  const [shell, home, homeExperience, bento, echo, ballpit, scrollStack, cardSwap, writingShowcase, gallery, visualPage, aboutPage, casePage, caseNarrative, caseIndex, caseShowcase, globals, portfolio] = await Promise.all([
    readFile(new URL("app/components/SiteShell.tsx", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/components/HomeExperience.tsx", root), "utf8"),
    readFile(new URL("app/components/MagicBento.tsx", root), "utf8"),
    readFile(new URL("app/components/EchoText.tsx", root), "utf8"),
    readFile(new URL("app/components/Ballpit.tsx", root), "utf8"),
    readFile(new URL("app/components/ScrollStack.tsx", root), "utf8"),
    readFile(new URL("app/components/CardSwap.tsx", root), "utf8"),
    readFile(new URL("app/components/WritingSamplesShowcase.tsx", root), "utf8"),
    readFile(new URL("app/components/VisualGallery.tsx", root), "utf8"),
    readFile(new URL("app/visual-works/page.tsx", root), "utf8"),
    readFile(new URL("app/about/page.tsx", root), "utf8"),
    readFile(new URL("app/case-studies/[slug]/page.tsx", root), "utf8"),
    readFile(new URL("app/components/CaseStudyNarrative.tsx", root), "utf8"),
    readFile(new URL("app/case-studies/page.tsx", root), "utf8"),
    readFile(new URL("app/components/CaseStudiesShowcase.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/lib/portfolio.ts", root), "utf8"),
  ]);
  assert.doesNotMatch(shell, /from ["']next\/link["']/);
  assert.match(shell, /\["Case Studies", "\/case-studies"\]/);
  assert.match(shell, /\["Writing Samples", "\/writing-samples"\]/);
  assert.match(shell, /yuri-fu-logo\.jpg/);
  assert.match(homeExperience, /href="\/about">Read More/);
  assert.match(home, /<HomeExperience projects=\{projects\} \/>/);
  assert.match(homeExperience, /Hi, I&apos;m Yuri 小雨/);
  assert.doesNotMatch(homeExperience, /Based in/);
  assert.match(homeExperience, /<MagicBento/);
  assert.match(homeExperience, /<ScrollStack projects=\{projects\} \/>/);
  assert.match(homeExperience, /SELECTED CASES/);
  assert.doesNotMatch(homeExperience, /<CaseStudiesShowcase projects=\{projects\} home/);
  assert.match(scrollStack, /scroll-stack-card/);
  assert.match(bento, /from "gsap"/);
  assert.match(echo, /echo-text-copy/);
  assert.match(ballpit, /from "three"/);
  assert.match(homeExperience, /<Ballpit/);
  assert.doesNotMatch(homeExperience, /<Ferrofluid/);
  assert.match(cardSwap, /from "gsap"/);
  assert.match(writingShowcase, /<CardSwap/);
  assert.match(writingShowcase, /activeIndex=\{previewIndex\}/);
  assert.match(writingShowcase, /onMouseEnter=\{\(\) => setPreviewIndex\(index\)\}/);
  assert.match(writingShowcase, /写作不是堆砌信息/);
  assert.match(writingShowcase, /而是设计理解路径/);
  assert.doesNotMatch(writingShowcase, /<h1>写作样本<\/h1>/);
  assert.match(writingShowcase, /news-preview-card/);
  assert.match(writingShowcase, /storyboard-preview-grid/);
  assert.match(writingShowcase, /script-table-preview/);
  assert.match(writingShowcase, /D6My5tkP4RCJhidVHEotVA/);
  assert.match(writingShowcase, /sanshui-storyboard\.pdf/);
  assert.match(writingShowcase, /lujiaoshu-storyboard\.pdf/);
  assert.match(writingShowcase, /fu-xiaoyu-ai-imaging-copywriting-sample\.pdf" target="_blank" rel="noreferrer"/);
  assert.match(writingShowcase, /fu-xiaoyu-ai-imaging-social-media-brief\.pdf" target="_blank" rel="noreferrer"/);
  assert.doesNotMatch(aboutPage, /about-stack-stage|about-card-stack|about-stack-card/);
  assert.match(aboutPage, /className="about-section education-section"/);
  assert.match(aboutPage, /label="Email Me"/);
  assert.doesNotMatch(aboutPage, /className="about-contact"/);
  assert.match(shell, /期待我们的合作/);
  assert.match(shell, /<CopyEmail/);
  assert.match(gallery, /visual-poster-card/);
  assert.match(gallery, /visual-contact-sheet/);
  assert.match(gallery, /visual-experiment-grid/);
  assert.doesNotMatch(gallery, /View Original Work|target="_blank"|aria-modal|masonry-gallery|gallery-toolbar/);
  assert.match(visualPage, /<VisualGallery \/>/);
  assert.doesNotMatch(visualPage, /visualSkills|visual-transfer|visual-archive-section/);
  assert.match(casePage, /PROJECT SNAPSHOT/);
  assert.match(casePage, /<CaseStudyNarrative project=\{project\} \/>/);
  assert.match(casePage, /ROLE/);
  assert.match(casePage, /KEY OUTPUT/);
  assert.match(caseNarrative, /MEDIA OPERATIONS WORKBENCH/);
  assert.match(caseNarrative, /RESEARCH QUESTIONS/);
  assert.match(caseNarrative, /EVENT COMMUNICATION TIMELINE/);
  assert.match(caseNarrative, /PITCH DECK MOCKUP/);
  assert.doesNotMatch(caseNarrative, /View Original Work|before-after-section|BEFORE \/ AFTER/);
  assert.match(caseIndex, /<CaseStudiesShowcase projects=\{projects\} \/>/);
  assert.match(caseShowcase, /case-scan-index/);
  assert.match(caseShowcase, /四种清晰的项目价值/);
  assert.doesNotMatch(caseIndex, /<ProjectCard/);
  assert.match(globals, /position: sticky/);
  assert.match(globals, /\.case-single-line-title/);
  assert.match(portfolio, /查看晚会台本/);
  assert.doesNotMatch(portfolio, /阅读新闻稿|查看活动剧本 PDF/);
});

test("prevents stale HTML from outliving hashed client assets", async () => {
  const [workerSource, assetManifest] = await Promise.all([
    readFile(new URL("worker/index.ts", root), "utf8"),
    readFile(new URL("dist/server/vinext-client-assets.js", root), "utf8"),
  ]);
  assert.match(workerSource, /no-store, max-age=0, must-revalidate/);
  const assetPaths = [...assetManifest.matchAll(/["'](_next\/static\/[^"']+)["']/g)].map((match) => match[1]);
  assert.ok(assetPaths.length > 0);
  await Promise.all([...new Set(assetPaths)].map((assetPath) => access(new URL(`dist/client/${assetPath}`, root))));
});
