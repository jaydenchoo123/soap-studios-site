import { motion } from "framer-motion";

const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const images = [
  { src: "/media/project2-hero.jpg", caption: "Dining room — travertine table, linen drape" },
  { src: "/media/project2-narrative.jpg", caption: "Living room — layered neutrals, low furniture" },
  { src: "/media/project2-detail1.jpg", caption: "Primary bedroom — warm oak, sheer curtains" },
  { src: "/media/project2-detail2.jpg", caption: "Overview — open plan with natural light" },
  { src: "/media/project2-detail3.jpg", caption: "Detail — honed marble, brushed brass" },
  { src: "/media/project2-detail4.jpg", caption: "Entry — smoked mirror, fluted panel" },
  { src: "/media/project2-detail5.jpg", caption: "Corridor — reeded joinery, recessed lighting" },
];

export default function AlixResidence({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#0c0b0a] text-[#d6d1cb]">

      {/* Nav */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
        <span className="text-[1.9rem] font-semibold tracking-[-0.09em]">SOAP</span>
        <button
          onClick={onBack}
          className="text-[10px] uppercase tracking-[0.38em] text-[#8c8378] hover:text-[#d6d1cb] transition"
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <div className="px-5 pt-36 pb-16 md:px-8 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-[72rem]">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="text-[10px] uppercase tracking-[0.44em] text-[#8c8378]"
          >
            Alix Residence · Kuala Lumpur · 2024
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.06, ease: easeExpo }}
            className="mt-6 text-4xl font-semibold tracking-[-0.04em] leading-[1.05] md:text-6xl lg:text-7xl"
          >
            A home shaped by light,
            <br /> shadow, and desire.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.14, ease: easeExpo }}
            className="mt-8 max-w-lg text-sm leading-7 text-[#8c8378] md:text-base"
          >
            Designed to be felt, not just seen. A private residence in Kuala Lumpur completed with a focus on material honesty, considered proportion, and quiet luxury.
          </motion.p>
        </div>
      </div>

      {/* Gallery */}
      <div className="pb-40">
        {images.map(({ src, caption }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.3, ease: easeExpo }}
            className="mb-3 md:mb-4"
          >
            <img
              src={src}
              alt={caption}
              className="w-full h-auto block"
            />
            <div className="px-5 pt-4 pb-12 md:px-8 md:pb-16">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#6f6a63]">{caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-16 md:px-8 border-t border-white/10">
        <div className="mx-auto max-w-[72rem] flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.38em] text-[#6f6a63]">Soap Studios · Kuala Lumpur</p>
          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.38em] text-[#8c8378] hover:text-[#d6d1cb] transition"
          >
            ← Back to home
          </button>
        </div>
      </div>

    </div>
  );
}
