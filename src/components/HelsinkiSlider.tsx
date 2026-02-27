import { useEffect, useMemo, useState } from "react";

type Props = {
  images: { src: string; alt: string }[];
  autoPlayMs?: number; // optional
};

export default function HelsinkiSlider({ images, autoPlayMs = 0 }: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((i) => (i + 1) % safeImages.length);

  useEffect(() => {
    if (!autoPlayMs || safeImages.length <= 1) return;
    const id = window.setInterval(next, autoPlayMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayMs, safeImages.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.length]);

  if (safeImages.length === 0) return null;

  return (
    <div className="slider" aria-label="Helsinki Bilder">
      <div className="sliderFrame">
        <img
          key={safeImages[index].src}
          className="sliderImg"
          src={safeImages[index].src}
          alt={safeImages[index].alt}
          loading="lazy"
        />
      </div>

      {safeImages.length > 1 && (
        <>
          <button type="button" className="sliderBtn left" onClick={prev} aria-label="Vorheriges Bild">
            ‹
          </button>
          <button type="button" className="sliderBtn right" onClick={next} aria-label="Nächstes Bild">
            ›
          </button>

          <div className="sliderDots" role="tablist" aria-label="Bilder auswählen">
            {safeImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`sliderDot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Bild ${i + 1}`}
                aria-current={i === index ? "true" : "false"}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}