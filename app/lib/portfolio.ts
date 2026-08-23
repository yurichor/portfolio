export type Project = {
  slug: string;
  index: string;
  title: string;
  english: string;
  subtitle: string;
  cover: string;
  period?: string;
  role: string;
  tags: string[];
  summary: string;
  background: string;
  responsibilities: string[];
  execution: string[];
  insights?: Array<{ label: string; title: string; text: string }>;
  outputs: Array<{ value: string; label: string }>;
  deliverables: string[];
  reflection: string;
  images: Array<{ src: string; alt: string; caption: string; portrait?: boolean }>;
  links?: Array<{ label: string; href: string }>;
};

export const projects: Project[] = [
  {
    slug: "sanxia-media",
    index: "01",
    title: "城市形象短视频赛事运营支持",
    english: "City Image Short-video Operations",
    subtitle: "从多平台作品池到传播数据整理",
    cover: "/images/home/case-sanxia.png",
    period: "2024.06 - 2024.09",
    role: "三峡融媒体中心 · 新媒体运营实习生",
    tags: ["短视频脚本", "内容生产", "数据整理", "传播复盘"],
    summary:
      "参与交通安全与城市传播内容生产，并支持“爱上来电宜昌”短视频赛事运营，把分散的多平台作品信息整理成可筛选、可复核的内容资产。",
    background:
      "项目同时包含日常短视频生产与城市形象赛事运营。团队需要在多个平台收集参赛内容、核对作品信息，并依据播放与互动表现支持后续评审；这要求内容生产与数据整理并行推进。",
    responsibilities: [
      "完成5篇交通安全类宣传脚本撰写与优化。",
      "协助拍摄、剪辑10条“丹蕾说交通”短视频。",
      "整理标题、作者、链接、播放量、互动量和平台来源等字段。",
      "建立脱敏Excel筛选表，沉淀高热度作品池。",
      "为作品评审、复核与传播复盘提供分类标记和数据支持。",
    ],
    execution: [
      "内容端：用真实交通场景开场，缩短信息进入时间，再以主持人口播完成规则解释与记忆点收束。",
      "运营端：统一多平台字段口径，清理重复与缺失信息，使参赛作品可以被快速筛选。",
      "复盘端：按来源、播放量与互动量分类标记，帮助团队定位高热度内容并进行后续复核。",
    ],
    outputs: [
      { value: "5", label: "宣传脚本" },
      { value: "10", label: "短视频拍摄/剪辑支持" },
      { value: "1", label: "多平台筛选与复核体系" },
    ],
    deliverables: ["宣传脚本", "短视频内容", "脱敏作品筛选表", "高热度作品池", "评审复核支持"],
    reflection:
      "新媒体运营不仅是内容发布，也包括对传播数据和用户反馈的整理。把分散信息结构化后，团队能更快定位有效内容；我也由此建立了“内容生产 - 平台传播 - 数据复盘”的完整意识。",
    images: [
      { src: "/images/cases/sanxia/video-still-01.jpg", alt: "丹蕾说交通短视频画面", caption: "真实街景切入，降低说教感", portrait: true },
      { src: "/images/cases/sanxia/video-still-02.jpg", alt: "丹蕾说交通街头拍摄画面", caption: "主持人口播与交通场景结合", portrait: true },
      { src: "/images/cases/sanxia/video-still-03.jpg", alt: "融媒体演播室短视频画面", caption: "演播室内容制作支持", portrait: true },
      { src: "/images/cases/sanxia/script-01.png", alt: "脱敏短视频脚本节选", caption: "四段式脚本结构：场景、问题、提示、收束" },
      { src: "/images/cases/sanxia/excel-demo.png", alt: "脱敏赛事作品Excel筛选表", caption: "多平台作品字段整理与分类标记" },
    ],
    links: [
      { label: "观看短视频 01", href: "https://weixin.qq.com/sph/A3WFIqeFFR" },
      { label: "观看短视频 02", href: "https://weixin.qq.com/sph/AcONrkA9xZ" },
      { label: "观看短视频 03", href: "https://weixin.qq.com/sph/AAaXL4QI14" },
    ],
  },
  {
    slug: "hku-research",
    index: "02",
    title: "中日韩创意产业与新媒体传播研究",
    english: "Creative Industries & New Media in China, Japan and Korea",
    subtitle: "从文化内容到商业化传播路径",
    cover: "/images/home/case-hku.png",
    role: "HKU文化管理专题 · 研究助理",
    tags: ["跨文化研究", "文献调研", "英文汇报", "媒体分析"],
    summary:
      "围绕中日韩社会文化发展与创意商业化，研究内容生产、平台传播、用户接受与品牌资产转化的差异。",
    background:
      "研究关注文化内容如何在不同市场中被生产、传播与商业化。在新媒体语境下，文学、影视、游戏与角色IP不再只是作品，也可以通过平台、社群和跨媒介改编成为持续传播的品牌资产。",
    responsibilities: [
      "检索并阅读20+篇创意产业、新媒体传播与跨文化研究文献。",
      "完成Research Proposal和英文汇报。",
      "梳理中日韩内容生产、社交媒体传播与商业化路径。",
      "输出研究框架、三国对比表和案例分析。",
    ],
    execution: [
      "研究问题一：三国创意产业在内容生产与商业化路径上有哪些差异？",
      "研究问题二：社交媒体如何影响文化产品的跨文化传播？",
      "研究问题三：文化内容如何从“作品”转化为“可传播的品牌资产”？",
    ],
    insights: [
      { label: "CHINA", title: "平台规模与快速反馈", text: "依托大型平台、用户反馈和高频迭代，突出商业化与内容运营效率。" },
      { label: "JAPAN", title: "深度IP与长期授权", text: "以角色、故事和世界观积累长期价值，通过跨媒介开发延长内容生命周期。" },
      { label: "KOREA", title: "工业生产与全球包装", text: "以成熟制作体系、社群传播和面向海外市场的包装推动文化内容扩散。" },
    ],
    outputs: [
      { value: "20+", label: "相关文献" },
      { value: "3", label: "国家产业模型" },
      { value: "EN", label: "Proposal与英文汇报" },
    ],
    deliverables: ["Research Proposal", "英文汇报PPT", "研究框架图", "中日韩产业对比表"],
    reflection:
      "研究帮助我建立了跨文化传播与创意产业商业化的分析框架。对品牌传播而言，跨文化不是简单翻译，而是重新理解内容、平台、用户关系与价值表达。",
    images: [
      { src: "/images/cases/hku/proposal-cover.png", alt: "Research Proposal封面", caption: "研究主题、问题与摘要的视觉化呈现" },
      { src: "/images/cases/hku/ppt-slide-01.jpg", alt: "英文答辩PPT研究现状页", caption: "英文汇报：研究现状与不足" },
      { src: "/images/cases/hku/ppt-slide-02.jpg", alt: "英文答辩PPT研究背景页", caption: "英文汇报：背景与研究意义" },
      { src: "/images/cases/hku/research-framework.jpg", alt: "研究框架图", caption: "从理论、案例到传播模型的研究框架" },
      { src: "/images/cases/hku/cjk-comparison-01.png", alt: "中日韩产业模式对比表", caption: "模式、产业与增长基础" },
      { src: "/images/cases/hku/cjk-comparison-02.png", alt: "中日韩传播研究对比表", caption: "传播、商业化与研究启示" },
    ],
  },
  {
    slug: "graduation-gala",
    index: "03",
    title: "毕业晚会活动传播项目",
    english: "Graduation Gala Communication",
    subtitle: "从活动策划到传播沉淀",
    cover: "/images/home/case-gala.png",
    role: "中韩新媒体学院 · 项目负责人 / 总导演",
    tags: ["活动传播", "项目统筹", "推文新闻稿", "跨团队协作"],
    summary:
      "统筹2024届与2025届毕业晚会，从整体排期、节目审核和跨团队协调，到活动预热、现场执行、推文与新闻沉淀。",
    background:
      "学院毕业晚会是面向师生的重要校园活动，涉及节目审核、宣传策划、彩排执行、供应方协调和后续新闻传播。项目周期长、角色多，传播内容必须与现场执行保持同一节奏。",
    responsibilities: [
      "制定整体项目排期并拆解宣传、策划、审核和彩排任务。",
      "协调老师、学生团队与供应方资源。",
      "组织宣传物料、推文与新闻稿制作发布。",
      "完成活动前预热、现场传播和活动后内容沉淀。",
      "统筹现场流程、人员调度与突发问题处理。",
    ],
    execution: [
      "T-30天：确定主题、团队和职责边界。",
      "T-20天：完成节目审核与宣传方案。",
      "T-10天：推进物料制作与推文预热。",
      "T-3天：完成彩排与现场流程确认。",
      "活动当天：统筹现场执行与人员协调。",
      "活动后：发布新闻稿并整理可复用传播素材。",
    ],
    outputs: [
      { value: "2", label: "届毕业晚会统筹" },
      { value: "T-30", label: "完整传播排期" },
      { value: "360°", label: "预热、现场、沉淀" },
    ],
    deliverables: ["活动排期", "节目与人员安排", "推文", "新闻稿", "现场视觉物料", "传播档案"],
    reflection:
      "活动本身只是起点。公关传播更重要的是把主题、流程与参与者体验转化成可持续的内容节奏，让现场影响力在活动结束后继续沉淀。",
    images: [
      { src: "/images/cases/gala/event-01.jpeg", alt: "2024届毕业晚会合影", caption: "2024届毕业晚会现场" },
      { src: "/images/cases/gala/event-02.jpeg", alt: "2025届毕业晚会合影", caption: "2025届毕业晚会现场" },
      { src: "/images/cases/gala/event-03.jpeg", alt: "毕业晚会舞台节目", caption: "舞台内容与灯光呈现" },
      { src: "/images/cases/gala/timeline.png", alt: "毕业晚会项目时间线", caption: "从筹备到发布的任务节奏" },
      { src: "/images/cases/gala/arrangement.png", alt: "毕业晚会人员安排表", caption: "跨团队职责与现场执行安排" },
      { src: "/images/cases/gala/news-release.png", alt: "毕业晚会新闻稿截图", caption: "活动后新闻稿与传播沉淀" },
    ],
    links: [{ label: "查看晚会台本", href: "/downloads/graduation-gala-play-script.pdf" }],
  },
  {
    slug: "internetplus-branding",
    index: "04",
    title: "创业项目品牌包装与路演表达",
    english: "Startup Branding & Pitch Narrative",
    subtitle: "从项目理念到视觉叙事",
    cover: "/images/home/case-internetplus.png",
    role: "中国国际“互联网+”大学生创新创业大赛 · 项目品牌包装",
    tags: ["Logo设计", "项目书优化", "PPT美化", "路演叙事"],
    summary:
      "为两个参赛项目梳理品牌识别、项目书与路演表达，把复杂技术和商业信息转化成更易理解、更有记忆点的视觉叙事。",
    background:
      "创新创业项目往往信息复杂、专业术语密集。展示优化的目标不是单纯“美化”，而是帮助评委在有限时间内理解项目价值、商业逻辑和差异化优势。",
    responsibilities: [
      "负责2个项目的Logo与品牌图形设计。",
      "优化项目书版式、信息层级与阅读体验。",
      "统一路演PPT视觉系统，突出核心信息。",
      "根据答辩场景调整叙事结构与页面节奏。",
      "配合团队校准项目辨识度和展示逻辑。",
    ],
    execution: [
      "提炼：从长篇项目材料中识别目标用户、核心问题与价值主张。",
      "统一：建立Logo、色彩、字体和图形的基础视觉语言。",
      "重组：按照“问题 - 方案 - 优势 - 价值 - 证明”优化路演顺序。",
      "验证：根据答辩阅读距离与时间限制压缩文字，提升关键信息可见度。",
    ],
    outputs: [
      { value: "2", label: "项目品牌包装" },
      { value: "1st", label: "校级一等奖" },
      { value: "3rd", label: "校级三等奖" },
    ],
    deliverables: ["Logo设计", "品牌图形", "项目书优化", "路演PPT", "答辩叙事结构"],
    reflection:
      "品牌传播不只是视觉美化，更重要的是信息提炼。好的表达能够降低理解成本，帮助受众迅速抓住项目价值，并留下清晰记忆点。",
    images: [
      { src: "/images/cases/internetplus/logo-01.png", alt: "猎证先锋项目Logo", caption: "行业知识图谱项目品牌识别" },
      { src: "/images/cases/internetplus/logo-02.png", alt: "谱写未来项目Logo", caption: "知识图谱项目品牌识别" },
      { src: "/images/cases/internetplus/project-book.png", alt: "互联网加项目书页面", caption: "项目书封面与内容层级优化" },
      { src: "/images/cases/internetplus/award-01.jpg", alt: "互联网加校级一等奖证书", caption: "校级一等奖" },
      { src: "/images/cases/internetplus/award-02.jpg", alt: "互联网加校级三等奖证书", caption: "校级三等奖" },
    ],
    links: [{ label: "查看路演页面 PDF", href: "/downloads/internetplus-pitch-slide.pdf" }],
  },
];

export const capabilities = [
  { en: "Content Planning", zh: "内容策划", text: "新闻稿、公众号推文、短视频脚本与活动传播文案。" },
  { en: "Media Operation", zh: "媒体运营", text: "理解微信公众号、短视频与社交媒体的内容传播逻辑。" },
  { en: "Communication Review", zh: "传播复盘", text: "用Excel整理传播数据、作品池与平台反馈。" },
  { en: "Event Communication", zh: "活动传播", text: "从预热、现场执行到新闻稿和素材沉淀。" },
  { en: "Intercultural Communication", zh: "跨文化传播", text: "中韩双学位与UCL背景，理解文化语境中的表达差异。" },
  { en: "Visual Storytelling", zh: "视觉表达", text: "海报、视频剪辑、PPT包装与基础视觉物料制作。" },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
