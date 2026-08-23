"use client";

import { useEffect, useRef } from "react";
import type { Project } from "../lib/portfolio";
import Ballpit from "./Ballpit";
import { EchoText } from "./EchoText";
import { MagicBento, type BentoAbility } from "./MagicBento";
import { ScrollStack } from "./ScrollStack";

const abilities: BentoAbility[] = [
  { index: "01", english: "CONTENT PLANNING", chinese: "内容策划", description: "具备新闻稿、公众号推文、短视频脚本、活动传播文案撰写经验。" },
  { index: "02", english: "MEDIA OPERATION", chinese: "媒体运营", description: "熟悉微信公众号、短视频平台及社交媒体内容传播逻辑。" },
  { index: "03", english: "COMMUNICATION REVIEW", chinese: "传播复盘", description: "具备Excel数据整理、作品筛选、平台传播反馈分析经验。" },
  { index: "04", english: "EVENT COMMUNICATION", chinese: "活动传播", description: "曾统筹校园大型活动传播，参与活动预热、现场执行与后续内容沉淀。" },
  { index: "05", english: "INTERCULTURAL COMMUNICATION", chinese: "跨文化传播", description: "拥有中韩双学位与UCL跨文化传播背景，关注不同文化语境下的品牌表达。" },
  { index: "06", english: "VISUAL STORYTELLING", chinese: "视觉表达", description: "具备海报设计、视频剪辑、PPT包装与视觉物料制作能力。" },
];

export function HomeExperience({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = [...root.querySelectorAll<HTMLElement>(".home-screen")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: .16 });
    panels.forEach((panel) => observer.observe(panel)); return () => observer.disconnect();
  }, []);

  return (
    <div className="home-four-screens" ref={rootRef}>
      <section className="home-screen universe-opening" id="welcome">
        <Ballpit className="ballpit-canvas" count={64} gravity={.34} friction={.992} wallBounce={.9} minSize={.34} maxSize={.78} colors={[0xc8d9df, 0xdce7dc, 0xeadcd3, 0xc7c1d2, 0xe7dfc7]} />
        <div className="universe-wash" aria-hidden="true" />
        <div className="echo-title-wrap">
          <EchoText text="Welcome to" direction="right" className="echo-title-script" echoes={7} offset={15} blur={1.2} tint="#aebfc5" />
          <EchoText text="my universe" direction="left" className="echo-title-display" echoes={7} offset={15} blur={1.2} tint="#b9aeb3" />
        </div>
        <p className="universe-subtitle">YURI&apos;S PORTFOLIO</p>
        <a className="scroll-cue" href="#meet-yuri"><span>SCROLL DOWN</span><b>↓</b></a>
      </section>

      <section className="home-screen introduction-panel" id="meet-yuri">
        <div className="intro-fold-card">
          <span className="fold-corner" aria-hidden="true" />
          <div className="intro-collage">
            <div className="collage-note"><span>ABOUT</span><strong>ME</strong></div>
            <figure className="collage-main"><img src="/images/profile/home-hero-photo-01.jpeg" alt="付小雨在地中海城市旅行的照片" /></figure>
            <figure className="collage-small collage-small-one"><img src="/images/profile/home-hero-photo-05.jpeg" alt="付小雨在城堡前的照片" /></figure>
            <figure className="collage-small collage-small-two"><img src="/images/profile/home-hero-photo-03.jpeg" alt="付小雨在湖畔的照片" /></figure>
            <figure className="collage-small collage-small-three"><img src="/images/profile/home-hero-photo-07.jpeg" alt="付小雨在玫瑰花丛中的照片" /></figure>
            <span className="collage-orbit orbit-one" aria-hidden="true" /><span className="collage-orbit orbit-two" aria-hidden="true" /><span className="collage-flower" aria-hidden="true">✦</span>
            <p className="collage-caption">BRAND · MEDIA · CULTURE</p>
          </div>
          <div className="intro-fold-copy">
            <p className="eyebrow">FU XIAOYU · PORTFOLIO 2026</p>
            <h2><span>让品牌内容</span><span>被理解，也被记住</span></h2>
            <div className="yuri-signoff"><strong>Hi, I&apos;m Yuri 小雨。</strong><span>UCL · Intercultural Communication</span></div>
            <p className="intro-card-lead">跨文化传播背景的品牌公关与内容传播候选人，关注品牌、文化与用户之间的连接，擅长内容策划、活动传播、视觉表达与传播数据整理。</p>
            <p className="intro-card-en">A cross-cultural communication student focusing on brand communication, media content, event communication and visual storytelling.</p>
            <div className="button-row">
              <a className="button button-primary" href="/about">Read More</a>
              <a className="button button-secondary" href="/writing-samples">View Writing</a>
              <a className="button button-quiet" href="/downloads/fu-xiaoyu-resume.pdf" download>Download Resume ↓</a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-screen what-i-do-panel" id="what-i-do">
        <div className="what-i-do-heading">
          <p className="eyebrow">WHAT I DO</p>
          <h2>六项能力，连接内容、品牌与用户</h2>
          <p>从写作、运营到活动与视觉表达，每一项能力都来自真实项目实践。</p>
        </div>
        <MagicBento items={abilities} />
      </section>

      <section className="home-screen selected-cases-screen" id="selected-cases">
        <div className="selected-cases-heading">
          <p className="eyebrow">SELECTED CASES</p>
          <h2>四个案例，一条完整的传播链路</h2>
          <p>内容生产、项目统筹、跨文化研究与品牌包装，均按背景、角色、行动、产出和复盘展开。</p>
        </div>
        <ScrollStack projects={projects} />
      </section>
    </div>
  );
}
