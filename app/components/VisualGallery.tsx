type VisualItem = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

const posters: VisualItem[] = [
  { src: "/images/visual/poster/april-flight-poster-01.jpg", alt: "飞往四月天电影海报方案一", label: "POSTER 01", caption: "人物、空间与离别情绪的主视觉提炼" },
  { src: "/images/visual/poster/april-flight-poster-02.jpg", alt: "飞往四月天电影海报方案二", label: "POSTER 02", caption: "以留白与色彩建立影片识别" },
];

const stills: VisualItem[] = [
  { src: "/images/visual/stills/still-01.jpg", alt: "短片室内人物画面", label: "SCENE 01", caption: "人物关系与空间" },
  { src: "/images/visual/stills/still-02.jpg", alt: "短片人物近景画面", label: "SCENE 02", caption: "情绪近景" },
  { src: "/images/visual/stills/still-03.jpg", alt: "短片夜间画面", label: "SCENE 03", caption: "夜景氛围" },
  { src: "/images/visual/stills/still-04.jpg", alt: "短片双人场景画面", label: "SCENE 04", caption: "双人调度" },
  { src: "/images/visual/stills/still-05.jpg", alt: "短片室外环境画面", label: "SCENE 05", caption: "环境叙事" },
  { src: "/images/visual/stills/still-06.jpg", alt: "短片自然光人物画面", label: "SCENE 06", caption: "自然光表达" },
];

const experiments: VisualItem[] = [
  { src: "/images/visual/matte/matte-01.jpg", alt: "山水数字绘景作品", label: "MATTE 01", caption: "环境合成" },
  { src: "/images/visual/matte/matte-02.jpg", alt: "城市环境数字绘景作品", label: "MATTE 02", caption: "空间气氛" },
  { src: "/images/visual/modeling/model-01.jpg", alt: "三维室内场景作品", label: "3D 01", caption: "室内空间" },
  { src: "/images/visual/modeling/model-02.jpg", alt: "三维建筑场景作品", label: "3D 02", caption: "建筑结构" },
  { src: "/images/visual/modeling/model-03.jpg", alt: "三维物件建模作品", label: "3D 03", caption: "物件与材质" },
  { src: "/images/visual/modeling/model-04.jpg", alt: "三维机械造型作品", label: "3D 04", caption: "造型研究" },
  { src: "/images/visual/modeling/model-05.jpg", alt: "三维空间灯光作品", label: "3D 05", caption: "灯光与空间" },
  { src: "/images/visual/vfx/vfx-01.jpg", alt: "视效合成实验一", label: "VFX 01", caption: "合成实验" },
  { src: "/images/visual/vfx/vfx-02.jpg", alt: "视效合成实验二", label: "VFX 02", caption: "镜头效果" },
  { src: "/images/visual/vfx/vfx-03.jpg", alt: "虚拟场景实验三", label: "VFX 03", caption: "虚拟场景" },
];

export function VisualGallery() {
  return (
    <div className="visual-work-chapters">
      <section className="visual-work-card visual-poster-card">
        <header className="visual-card-heading">
          <div><p className="eyebrow">01 · FILM POSTER DESIGN</p><h2>《飞往四月天》影片海报</h2></div>
          <p>将短片的人物关系、空间感与离别情绪压缩为两套可识别的主视觉，负责概念提炼、构图、图像处理与标题排版。</p>
        </header>
        <div className="visual-poster-grid">
          {posters.map((item) => (
            <figure key={item.src}>
              <div className="visual-preview-frame"><img src={item.src} alt={item.alt} loading="lazy" /></div>
              <figcaption><span><b>{item.label}</b>{item.caption}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="visual-recognition">RECOGNITION · Incheon International Film Festival — Best Student Short Film</p>
      </section>

      <section className="visual-work-card visual-stills-card">
        <header className="visual-card-heading">
          <div><p className="eyebrow">02 · SHORT FILM STILLS</p><h2>短片视觉片段</h2></div>
          <p>以 contact sheet 呈现镜头之间的节奏、人物距离与光线变化，让画面作为一组叙事证据被快速阅读。</p>
        </header>
        <div className="visual-contact-sheet">
          {stills.map((item) => (
            <figure key={item.src}>
              <div className="visual-preview-frame"><img src={item.src} alt={item.alt} loading="lazy" /></div>
              <figcaption><b>{item.label}</b><span>{item.caption}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="visual-work-card visual-experiments-card">
        <header className="visual-card-heading">
          <div><p className="eyebrow">03 · VISUAL EXPERIMENTS</p><h2>数字绘景 / 3D / VFX</h2></div>
          <p>通过小型实验卡片展示对空间、材质、光线与合成的理解；重点是视觉判断，而不是大面积铺陈制作截图。</p>
        </header>
        <div className="visual-experiment-grid">
          {experiments.map((item) => (
            <article key={item.src}>
              <div className="visual-preview-frame"><img src={item.src} alt={item.alt} loading="lazy" /></div>
              <div><span><b>{item.label}</b>{item.caption}</span></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
