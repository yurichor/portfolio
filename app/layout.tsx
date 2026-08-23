import type { Metadata } from "next";
import { headers } from "next/headers";
import "@fontsource/berkshire-swash/400.css";
import "@fontsource/mountains-of-christmas/700.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProtocol || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "付小雨｜品牌传播与媒体作品集",
      template: "%s｜付小雨",
    },
    description:
      "付小雨的品牌传播与媒体作品集：内容策划、媒体运营、活动传播、跨文化研究与视觉表达。",
    openGraph: {
      title: "Fu Xiaoyu | Brand Communication & Media Portfolio",
      description: "Brand communication, media content, event communication and visual storytelling.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Fu Xiaoyu brand communication and media portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fu Xiaoyu | Brand Communication & Media Portfolio",
      description: "Brand communication, media content, event communication and visual storytelling.",
      images: [`${origin}/og.png`],
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
