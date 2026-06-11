import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const img = {
  hero:     "/media/project2-hero.jpg",
  living:   "/media/project2-narrative.jpg",
  overview: "/media/project2-detail2.jpg",
  marble:   "/media/project2-detail3.jpg",
  entry:    "/media/project2-detail4.jpg",
  bedroom:  "/media/project2-detail1.jpg",
  corridor: "/media/project2-detail5.jpg",
};

const allImages = Object.values(img);

function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [i, setI] = useState(index);
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI(n => (n + 1) % allImages.length);
      if (e.key === "ArrowLeft") setI(n => (n - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <motion.img key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} src={allImages[i]} alt=""
        className="max-h-[90vh] max-w-[88vw] object-contain"
        onClick={e => e.stopPropagation()}
      />
      <button onClick={onClose} className="absolute top-6 right-8 text-white/40 hover:text-white text-[10px] uppercase tracking-[0.22em] transition">Close</button>
      <button onClick={e => { e.stopPropagation(); setI(n => (n - 1 + allImages.length) % allImages.length); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xl transition">←</button>
      <button onClick={e => { e.stopPropagation(); setI(n => (n + 1) % allImages.length); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xl transition">→</button>
    </motion.div>
  );
}

function Img({ src, alt = "", onClick, className = "" }: { src: string; alt?: string; onClick: () => void; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.2, ease: easeExpo }}
      className={`cursor-zoom-in group overflow-hidden ${className}`} onClick={onClick}
    >
      <img src={src} alt={alt} className="w-full h-auto block transition duration-600 group-hover:brightness-[0.88]" />
    </motion.div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1.1, ease: easeExpo }}
      className="text-sm md:text-base leading-[1.85] text-[#a8a29b] max-w-2xl"
    >
      {children}
    </motion.p>
  );
}

export default function AlixResidence({ onBack }: { onBack: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const open = (src: string) => setLightbox(allImages.indexOf(src));

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(120,85,60,0.15),transparent_40%),linear-gradient(to_bottom,#0a0a0a,#0f0e0c)] text-[#d6d1cb]">

      <AnimatePresence>
        {lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-7 md:px-12 border-b border-white/[0.06]">
        <button onClick={onBack} className="text-[10px] uppercase tracking-[0.3em] text-[#8c8378] hover:text-[#d6d1cb] transition">
          ← Soap Studios
        </button>
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8c8378]">Residential · 2025</span>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-16 pb-12 max-w-[64rem]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: easeExpo }}>
          <p className="text-[10px] uppercase tracking-[0.36em] text-[#8c8378] mb-6">Alix Residence · Kuala Lumpur</p>
          <h1 className="text-4xl md:text-[3.5rem] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-8">
            A home shaped by light,<br className="hidden md:block" /> shadow, and desire.
          </h1>
          <p className="text-sm md:text-base leading-[1.85] text-[#a8a29b] max-w-2xl mb-10">
            Alix Residence began not with a brief, but with a conversation about how a family actually lives — the rituals, the rhythms, the things they wanted to feel every time they walked through the door. The result is a home that is deeply personal, carefully considered, and designed to improve with time.
          </p>
        </motion.div>

        {/* Metadata */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: easeExpo }}
          className="grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8 max-w-md"
        >
          {[["Location", "Kuala Lumpur"], ["Type", "Residential"], ["Year", "2025"]].map(([label, value]) => (
            <div key={label}>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#8c8378] mb-1.5">{label}</p>
              <p className="text-[13px] text-[#cfc8bf]">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image — full width */}
      <div className="px-6 md:px-12 pb-16">
        <Img src={img.hero} onClick={() => open(img.hero)} />
      </div>

      {/* Section 1 — The space */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The dining room anchors the entire home. Designed around a single object — a bespoke pendant that hovers above the table like a wing frozen mid-flight — every material decision in the room was made in service of the moment beneath it. The green marble table was chosen not for its colour alone, but for the way it holds light differently at every hour of the day.
        </Para>
      </div>

      {/* Two images — living + overview */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Img src={img.living} onClick={() => open(img.living)} />
          <Img src={img.overview} onClick={() => open(img.overview)} className="md:mt-16" />
        </div>
      </div>

      {/* Section 2 — Materials */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The material palette was kept deliberately narrow. Warm plaster walls, dark timber furniture, a deep olive sofa that reads almost as a landscape element. Nothing competes. The wall sculptures — organic, chrome-polished forms that shift between solid and reflective depending on where you stand — were commissioned specifically for this project. They are the room's only gesture toward the unexpected.
        </Para>
      </div>

      {/* Marble detail — offset right */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Img src={img.marble} onClick={() => open(img.marble)} className="md:col-span-7 md:col-start-4" />
        </div>
      </div>

      {/* Section 3 — Entry */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The entry hall sets the tone for everything that follows. Two large circular mirrors hang at different heights, fragmenting and layering the view of the rooms behind. Amber cove lighting runs the perimeter. The effect, on entering, is of stepping into something that has already been considered — a space that knows itself.
        </Para>
      </div>

      {/* Entry image — full */}
      <div className="px-6 md:px-12 pb-16">
        <Img src={img.entry} onClick={() => open(img.entry)} />
      </div>

      {/* Section 4 — Private spaces */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The private spaces are quieter. The master bedroom reads as a single held breath — a low bed, plaster walls, a single cove of warm light above the headboard. No art. No distraction. The bedroom was designed to feel like the rest of the house exhales into it.
        </Para>
      </div>

      {/* Bedroom + corridor */}
      <div className="px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Img src={img.bedroom} onClick={() => open(img.bedroom)} />
          <Img src={img.corridor} onClick={() => open(img.corridor)} className="md:mt-24" />
        </div>
      </div>

      {/* Closing copy */}
      <div className="px-6 md:px-12 pb-24 max-w-[64rem]">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1.3, ease: easeExpo }}
          className="text-lg md:text-xl leading-[1.75] text-[#cfc8bf] font-light italic"
        >
          "Designed to be felt, not just seen. The home is intended to improve with living — every material, every source of light, chosen for how it behaves over time."
        </motion.p>
      </div>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-6 md:px-12 py-12 flex items-center justify-between">
        <button onClick={onBack} className="text-[10px] uppercase tracking-[0.3em] text-[#8c8378] hover:text-[#d6d1cb] transition">
          ← All projects
        </button>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8c8378]">Soap Studios</p>
      </div>

    </div>
  );
}
