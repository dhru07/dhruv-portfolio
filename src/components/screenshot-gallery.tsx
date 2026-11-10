"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectAsset } from "@/types/portfolio";
import { Reveal } from "@/components/motion";

export function ScreenshotGallery({
  title,
  screenshots,
  emptyMessage = "No screenshots available for this project yet.",
  assetDirectory = "public/images/projects/analytics/",
}: {
  title: string;
  screenshots?: ProjectAsset[];
  emptyMessage?: string;
  assetDirectory?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [activeIndex]);

  if (!screenshots?.length) {
    return (
      <div className="gallery-placeholder" role="note">
        <div className="placeholder-mark" aria-hidden="true">▧</div>
        <p>{emptyMessage}</p>
        <span>Assets belong in {assetDirectory}.</span>
      </div>
    );
  }

  const activeScreenshot = activeIndex === null ? null : screenshots[activeIndex];

  return (
    <>
      <div className="screenshot-grid">
        {screenshots.map((screenshot, index) => (
          <Reveal className="gallery-thumb-reveal" delay={index * 0.045} key={screenshot.src}>
          <button
          aria-label={`Open screenshot: ${screenshot.alt}`}
            className="screenshot-thumb"
            onClick={(event) => { returnFocusRef.current = event.currentTarget; setActiveIndex(index); }}
            type="button"
          >
            <span className="screenshot-image-wrap">
              <Image alt={screenshot.alt} fill sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1216px) 50vw, 37rem" src={withBasePath(screenshot.src)} />
            </span>
            {screenshot.caption ? <span className="screenshot-caption">{screenshot.caption}</span> : <span className="screenshot-caption">{screenshot.alt}</span>}
          </button>
          </Reveal>
        ))}
      </div>
      {activeScreenshot ? (
        <div
          aria-labelledby="lightbox-title"
          aria-modal="true"
          className="lightbox-backdrop"
          onClick={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }}
          role="dialog"
        >
          <div className="lightbox-panel">
            <div className="lightbox-heading">
              <p id="lightbox-title">{title} <span>·</span> {activeScreenshot.caption ?? activeScreenshot.alt}</p>
              <button aria-label="Close screenshot viewer" className="icon-button" onClick={() => setActiveIndex(null)} ref={closeButtonRef} type="button"><X aria-hidden="true" size={20} /></button>
            </div>
            <div className="lightbox-image-wrap">
              <Image alt={activeScreenshot.alt} fill loading="eager" sizes="(max-width: 1184px) 100vw, 1184px" src={withBasePath(activeScreenshot.src)} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
