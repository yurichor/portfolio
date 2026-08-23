import type { Metadata } from "next";
import { PageShell } from "../components/SiteShell";
import { CopyEmail } from "../components/CopyEmail";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "关于付小雨：跨文化传播、品牌公关、媒体内容与视觉表达背景。",
};

const skillGroups = [
  { title: "Content & PR", items: "新闻稿 · 推文 · 短视频脚本 · 活动传播 · 信息提炼" },
  { title: "Media & Research", items: "媒体运营 · Excel数据整理 · 文献研究 · 跨文化分析" },
  { title: "Visual & Tools", items: "Photoshop · Premiere · PPT · Word · Excel · XMind" },
  { title: "Languages", items: "中文（母语） · English（IELTS 6.5） · 한국어（日常沟通）" },
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="about-hero">
        <div className="about-photo">
          <img src="/images/profile/fu-xiaoyu-about.jpg" alt="付小雨个人生活照" />
          <span>FU XIAOYU · 付小雨</span>
        </div>
        <div className="about-intro">
          <p className="eyebrow">ABOUT ME</p>
          <h1>用跨文化视角理解人<br />用内容与视觉建立连接</h1>
          <p className="about-lead">
            我目前就读于伦敦大学学院跨文化传播硕士项目，本科阶段在中南财经政法大学与韩国东西大学完成影视相关双学位学习。
            研究训练让我关注文化语境与受众差异，影视训练让我理解视觉、叙事和团队协作；公关与媒体实践，则让我学会把这些能力落到真实交付。
          </p>
          <p>
            我希望加入重视内容质量、用户理解和长期品牌价值的团队，参与品牌公关、媒体传播、内容运营、海外传播或社交媒体运营工作。
          </p>
          <div className="button-row">
            <CopyEmail email="fxyu024@163.com" label="Email Me" className="button button-primary about-email-copy" />
            <a className="button button-secondary" href="/downloads/fu-xiaoyu-resume.pdf" download>Download Resume ↓</a>
          </div>
        </div>
      </section>

      <section className="about-section education-section">
        <div className="about-section-title"><p className="eyebrow">EDUCATION</p><h2><span>跨文化研究</span><span className="stack-title-cross">×</span><span>影视与视觉训练</span></h2></div>
        <div className="timeline-list">
          <article><span>2025.09—2026.12 · EXPECTED</span><h3>University College London</h3><p>MA Intercultural Communication · 跨文化传播硕士</p><small>Intercultural Communication · Creative Industries · Media & Culture</small></article>
          <article><span>2021.09—2025.06</span><h3>ZUEL × Dongseo University</h3><p>BA Film Studies / Film & VFX · 中韩双学位</p><small>New Media Planning · Visual Communication · Editing · Digital Media Production</small></article>
        </div>
      </section>

      <section className="about-section experience-section">
        <div className="about-section-title"><p className="eyebrow">SELECTED EXPERIENCE</p><h2><span>从内容执行</span><span>到项目统筹</span></h2></div>
        <div className="experience-list">
          <article><span>2024.06—09</span><div><h3>三峡融媒体中心 · 新媒体运营实习生</h3><p>交通安全短视频脚本与拍摄剪辑支持；赛事多平台作品、数据与高热度内容池整理。</p></div></article>
          <article><span>2023.06—09</span><div><h3>湖北宜化集团 · 企业宣传实习</h3><p>企业网站新闻、文化活动宣传物料与媒体资料归档，理解组织传播的准确性和一致性。</p></div></article>
          <article><span>2022.06—08</span><div><h3>宜昌高新区综合执法局 · 沟通与资料支持</h3><p>访客及劳动咨询接待、材料整理和记录维护，训练清晰沟通、耐心与信息核对。</p></div></article>
        </div>
      </section>

      <section className="about-section skills-section">
        <div className="about-section-title"><p className="eyebrow">SKILLS</p><h2><span>能力</span><span>与工具</span></h2></div>
        <div className="skill-group-grid">
          {skillGroups.map((group) => <article key={group.title}><span>{group.title}</span><p>{group.items}</p></article>)}
        </div>
      </section>

      <section className="about-section recognition-section">
        <div className="about-section-title"><p className="eyebrow">RECOGNITION</p><h2><span>校园经历</span><span>与荣誉</span></h2></div>
        <div className="recognition-row"><span>优秀共青团干部</span><span>“希贤杯”校辩一等奖</span><span>希贤学堂优秀学员</span><span>湖北省运动会亚军</span><span>演出经纪人员资格</span></div>
      </section>
    </PageShell>
  );
}
