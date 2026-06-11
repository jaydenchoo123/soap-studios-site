import { motion } from "framer-motion";
import { useEffect } from "react";

const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const img = {
  hero:      "/media/project1-hero.jpg",
  narrative: "/media/project1-narrative.jpg",
  detail1:   "/media/project1-detail1.jpg",
  detail2:   "/media/project1-detail2.jpg",
  detail3:   "/media/project1-detail3.jpg",
  detail4:   "/media/project1-detail4.jpg",
  lifestyle: "/media/project1-lifestyle.jpg",
};

function Img({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.2, ease: easeExpo }}
      className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-auto block" />
    </motion.div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1.1, ease: easeExpo }}
      className="text-sm md:text-base leading-[1.85] text-[#a8a29b] max-w-2xl">
      {children}
    </motion.p>
  );
}

export default function SunwayArtessa({ onBack }: { onBack?: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(120,85,60,0.15),transparent_40%),linear-gradient(to_bottom,#0a0a0a,#0f0e0c)] text-[#d6d1cb]">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-7 md:px-12 border-b border-white/[0.06]">
        <button onClick={onBack} className="text-[10px] uppercase tracking-[0.3em] text-[#8c8378] hover:text-[#d6d1cb] transition">
          ← Soap Studios
        </button>
        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8c8378]">Residential · 2024</span>
      </nav>

      {/* Header */}
      <div className="px-6 md:px-12 pt-16 pb-12 max-w-[64rem]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: easeExpo }}>
          <p className="text-[10px] uppercase tracking-[0.36em] text-[#8c8378] mb-6">Sunway Artessa · Kuala Lumpur</p>
          <h1 className="text-4xl md:text-[3.5rem] font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-8">
            Interiors considered<br className="hidden md:block" /> to be lived in.
          </h1>
          <p className="text-sm md:text-base leading-[1.85] text-[#a8a29b] max-w-2xl mb-10">
            Sunway Artessa began with a single question: what does it feel like to come home? The answer — in dark walnut, grey marble, and amber light — is a space that holds its occupants without asking anything of them.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: easeExpo }}
          className="grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8 max-w-md">
          {[["Location", "Kuala Lumpur"], ["Type", "Residential"], ["Year", "2024"]].map(([label, value]) => (
            <div key={label}>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[#8c8378] mb-1.5">{label}</p>
              <p className="text-[13px] text-[#cfc8bf]">{value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero */}
      <div className="px-6 md:px-12 pb-16">
        <Img src={img.hero} alt="Sunway Artessa kitchen" />
      </div>

      {/* Section 1 */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The kitchen island is the heart of the home. A slab of grey marble — veined and alive — anchors the space and doubles as a gathering point. The circular mirrors stacked on the dark wall behind it were chosen not for symmetry, but for the way they fragment the room into something more layered than it really is.
        </Para>
      </div>

      {/* Two col — narrative + detail1 */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Img src={img.narrative} alt="Dining island" />
          <Img src={img.detail1} alt="Marble detail" className="md:mt-16" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The material palette was built around restraint. Dark American walnut cabinetry, warm plaster walls, a linear pendant that reads like a brushstroke above the island. Everything serves the light — and in this space, the light is everything.
        </Para>
      </div>

      {/* Detail 2 — offset */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <Img src={img.detail2} alt="Kitchen mirrors" className="md:col-span-7 md:col-start-4" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="px-6 md:px-12 pb-12 max-w-[64rem]">
        <Para>
          The bedroom was designed for rest above all else. Full-height curtains, a cove of amber light at the ceiling, a low bed that sits close to the floor. The fan overhead — matte black, quietly industrial — is the room's only concession to the practical.
        </Para>
      </div>

      {/* Detail 3 + 4 */}
      <div className="px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Img src={img.detail3} alt="Marble chairs detail" />
          <Img src={img.detail4} alt="Bedroom" className="md:mt-24" />
        </div>
      </div>

      {/* Lifestyle full */}
      <div className="px-6 md:px-12 pb-16">
        <Img src={img.lifestyle} alt="Living space" />
      </div>

      {/* Closing */}
      <div className="px-6 md:px-12 pb-24 max-w-[64rem]">
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ duration: 1.3, ease: easeExpo }}
          className="text-lg md:text-xl leading-[1.75] text-[#cfc8bf] font-light italic">
          "A home that holds its occupants without asking anything of them. Warm, quiet, and entirely their own."
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
