import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const images = [
  { src: "/media/project2-hero.jpg", alt: "Alix Residence dining" },
  { src: "/media/project2-narrative.jpg", alt: "Alix Residence living" },
  { src: "/media/project2-detail1.jpg", alt: "Alix Residence bedroom" },
  { src: "/media/project2-detail2.jpg", alt: "Alix Residence overview" },
  { src: "/media/project2-detail3.jpg", alt: "Alix Residence marble" },
  { src: "/media/project2-detail4.jpg", alt: "Alix Residence entry" },
  { src: "/media/project2-detail5.jpg", alt: "Alix Residence corridor" },
];

export default function AlixResidence() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#0a0a0a,#11100e)] text-[#d6d1cb]">
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-[10px] uppercase tracking-[0.38em]">
        <Link to="/" className="text-[1.9rem] font-semibold tracking-[-0.09em]">SOAP</Link>
        <Link to="/" className="text-[10px] uppercase tracking-[0.38em] text-[#8c8378] hover:text-[#d6d1cb] transition">← Back</Link>
      </div>

      <div className="px-5 pt-40 pb-20 md:px-8">
        <div className="mx-auto max-w-[92rem]">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeExpo }}
            className="text-[10px] uppercase tracking-[0.44em] text-[#8c8378]"
          >
            Alix Residence / Kuala Lumpur
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.06, ease: easeExpo }}
            className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-7xl"
          >
            A home shaped by light,
            <br className="hidden md:block" /> shadow, and desire.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: easeExpo }}
            className="mt-6 max-w-xl text-sm leading-7 text-[#a8a29b] md:text-base"
          >
            Designed to be felt, not just seen.
          </motion.p>
        </div>
      </div>

      <div className="px-5 pb-32 md:px-8">
        <div className="mx-auto max-w-[92rem] flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: easeExpo }}
            className="overflow-hidden rounded-[1.5rem] border border-white/10"
          >
            <img src={images[0].src} alt={images[0].alt} className="w-full h-auto object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.05, ease: easeExpo }}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 md:col-span-8"
            >
              <img src={images[1].src} alt={images[1].alt} className="w-full h-auto object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.12, ease: easeExpo }}
              className="overflow-hidden rounded-[1.5rem] border border-white/10 md:col-span-4"
            >
              <img src={images[2].src} alt={images[2].alt} className="w-full h-auto object-cover" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: easeExpo }}
            className="overflow-hidden rounded-[1.5rem] border border-white/10"
          >
            <img src={images[3].src} alt={images[3].alt} className="w-full h-auto object-cover" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {images.slice(4).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.08, ease: easeExpo }}
                className="overflow-hidden rounded-[1.5rem] border border-white/10"
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
