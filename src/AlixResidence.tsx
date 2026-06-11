import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const images = [
  "/media/project2-hero.jpg",
  "/media/project2-narrative.jpg",
  "/media/project2-detail2.jpg",
  "/media/project2-detail3.jpg",
  "/media/project2-detail4.jpg",
  "/media/project2-detail1.jpg",
  "/media/project2-detail5.jpg",
];

function Lightbox({ src, onClose, onPrev, onNext }: { src: string; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
        onClick={onClose}
      >
        <motion.img
          key={src}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: easeExpo }}
          src={src} alt=""
          className="max-h-[92vh] max-w-[92vw] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button onClick={onClose} className="absolute top-6 right-8 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.22em] transition">Close</button>
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.22em] transition">←</button>
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.22em] transition">→</button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AlixResidence({ onBack }: { onBack: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const left = images.filter((_, i) => i % 2 === 0);
  const right = images.filter((_, i) => i % 2 !== 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(120,85,60,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(90,70,50,0.12),transparent_45%),linear-gradient(to_bottom,#0a0a0a,#11100e,#0c0b0a)] text-[#d6d1cb]">

      {lightboxIndex !== null && (
        <Lightbox
          src={images[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-10">
        <button onClick={onBack} className="text-[11px] uppercase tracking-[0.28em] text-[#8c8378] hover:text-[#d6d1cb] transition">
          ← Back
        </button>
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8c8378]">Alix Residence</span>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-10 pt-8 pb-16 max-w-3xl">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: easeExpo }}
          className="text-[10px] uppercase tracking-[0.32em] text-[#8c8378] mb-4">
          Alix Residence · Kuala Lumpur · 2025
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.08, ease: easeExpo }}
          className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
          A home shaped by light,<br className="hidden md:block" /> shadow, and desire.
        </motion.h1>
      </div>

      {/* Masonry grid */}
      <div className="px-6 md:px-10 pb-24">
        <div className="grid grid-cols-2 gap-3 md:gap-4 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-3 md:gap-4">
            {left.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: i * 0.06, ease: easeExpo }}
                className="cursor-zoom-in overflow-hidden group"
                onClick={() => setLightboxIndex(i * 2)}
              >
                <img src={src} alt="" className="w-full h-auto block transition duration-500 group-hover:brightness-[0.85]" />
              </motion.div>
            ))}
          </div>
          {/* Right column — offset slightly */}
          <div className="flex flex-col gap-3 md:gap-4 mt-12">
            {right.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: i * 0.06 + 0.1, ease: easeExpo }}
                className="cursor-zoom-in overflow-hidden group"
                onClick={() => setLightboxIndex(i * 2 + 1)}
              >
                <img src={src} alt="" className="w-full h-auto block transition duration-500 group-hover:brightness-[0.85]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/8 px-6 md:px-10 py-12 flex items-center justify-between">
        <button onClick={onBack} className="text-[11px] uppercase tracking-[0.28em] text-[#8c8378] hover:text-[#d6d1cb] transition">
          ← All projects
        </button>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8c8378]">Soap Studios</p>
      </div>

    </div>
  );
}
