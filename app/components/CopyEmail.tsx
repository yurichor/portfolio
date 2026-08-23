"use client";

import { useEffect, useRef, useState } from "react";

type CopyEmailProps = {
  email: string;
  label?: string;
  className?: string;
};

export function CopyEmail({ email, label, className = "copy-email" }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);
  const copy = async () => {
    let succeeded = false;
    try { await navigator.clipboard.writeText(email); succeeded = true; } catch { succeeded = false; }
    if (!succeeded) { const input = document.createElement("textarea"); input.value = email; document.body.appendChild(input); input.select(); succeeded = document.execCommand("copy"); input.remove(); }
    if (!succeeded) return;
    setCopied(true); if (timerRef.current) window.clearTimeout(timerRef.current); timerRef.current = window.setTimeout(() => setCopied(false), 1800);
  };
  return <button className={className} type="button" onClick={copy} aria-live="polite"><span>{copied ? "Copied!" : (label ?? email)}</span><b>{copied ? "✓" : "Copy"}</b></button>;
}
