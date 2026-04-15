import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ThemeMode = "dark" | "light";
const easeExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const project1Hero = "/media/project1-hero.jpg";
const project1Angle = "/media/project1-angle.jpg";
const project1Lifestyle = "/media/project1-lifestyle.jpg";
const project1Detail = "/media/project1-detail.jpg";

const project2Hero = "/media/project2-hero.jpg";
const project2Narrative = "/media/project2-narrative.jpg";
const project2Detail1 = "/media/project2-detail1.jpg";
const project2Detail2 = "/media/project2-detail2.jpg";
const project2Detail3 = "/media/project2-detail3.jpg";

const jaydenPortrait = "/media/jayden-portrait.jpg";

function scrollToId(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function CursorFollower({ theme }: { theme: ThemeMode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.45 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 14);
      y.set(e.clientY - 14);
      const target = e.target as HTMLElement | null;
      setIsPointer(!!target?.closest("a, button"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[70] hidden rounded-full mix-blend-difference md:block"
      style={{ x: smoothX, y: smoothY }}
      animate={{ width: isPointer ? 64 : 28, height: isPointer ? 64 : 28, opacity: isPointer ? 1 : 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div
        className={`h-full w-full rounded-full ${
          theme === "dark"
            ? "border border-[#e7dfd1]/35 bg-[#f3eadc]/5"
            : "border border-black/20 bg-[#f3eee6]/70 shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
        }`}
      />
    </motion.div>
  );
}

function GrainOverlay({ theme }: { theme: ThemeMode }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[65] ${
        theme === "dark"
          ? "opacity-[0.035] bg-[radial-gradient(circle,rgba(200,180,150,0.6)_1px,transparent_1px)]"
          : "opacity-[0.02] bg-[radial-gradient(circle,rgba(120,100,80,0.4)_1px,transparent_1px)]"
      } [background-size:8px_8px]`}
    />
  );
}

function LightShadowField({ theme }: { theme: ThemeMode }) {
  if (theme !== "light") return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,0,0,0.06),transparent_55%)]" />
    </div>
  );
}

function VignetteOverlay({ theme }: { theme: ThemeMode }) {
  if (theme !== "dark") return null;
  return <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_38%,rgba(60,45,30,0.12))]" />;
}

function LightingOverlay({ scrollYProgress, theme }: { scrollYProgress: any; theme: ThemeMode }) {
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "90%"]);
  if (theme !== "dark") return null;
  return (
    <motion.div
      style={{ backgroundPositionX: x }}
      className="pointer-events-none fixed inset-0 z-[3] bg-[radial-gradient(circle_at_20%_30%,rgba(255,220,180,0.08),transparent_50%)] mix-blend-soft-light"
    />
  );
}

function SectionLabel({ children, theme }: { children: React.ReactNode; theme: ThemeMode }) {
  return <p className={`text-[10px] uppercase tracking-[0.38em] ${theme === "dark" ? "text-[#8c8378]" : "text-[#6b645c]"}`}>{children}</p>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.28, margin: "-100px" }}
      transition={{ duration: 1.1, delay, ease: easeExpo }}
    >
      {children}
    </motion.div>
  );
}

function LiquidMetal({ className = "", theme }: { className?: string; theme: ThemeMode }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${theme === "dark" ? "bg-[#9e7651]/12" : "bg-[#cab8a2]/30"} ${className}`}
      animate={{ scale: [1, 1.18, 1], x: [0, 22, -10, 0], y: [0, -24, 10, 0], opacity: [0.25, 0.45, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function MagneticButton({ children, filled = false, theme }: { children: React.ReactNode; filled?: boolean; theme: ThemeMode }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 12 });
  const sy = useSpring(my, { stiffness: 180, damping: 12 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(x * 0.18);
    my.set(y * 0.18);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      style={{ x: sx, y: sy }}
      className={`rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.32em] transition ${
        theme === "dark"
          ? filled
            ? "bg-gradient-to-b from-[#f2ede6] to-[#d6cec2] text-black shadow-[0_0_0_rgba(242,237,230,0)] hover:shadow-[0_0_24px_rgba(242,237,230,0.12)]"
            : "border border-[#e7dfd1]/12 text-[#d6d1cb] bg-[#12110f]/45 shadow-[0_0_0_rgba(231,223,209,0)] hover:shadow-[0_0_18px_rgba(231,223,209,0.08)]"
          : filled
            ? "bg-gradient-to-b from-[#2a2622] to-[#171411] text-[#f3ede3] shadow-[0_10px_26px_rgba(0,0,0,0.18)]"
            : "border border-black/10 bg-[#f3eee6] text-[#181512] shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
      }`}
    >
      {children}
    </motion.button>
  );
}

function PlaceholderBlock({ className = "", theme }: { className?: string; theme: ThemeMode }) {
  const base = theme === "dark"
    ? "border-white/10 bg-white/[0.03]"
    : "border-black/10 bg-[#f3eee6] shadow-[0_20px_60px_rgba(0,0,0,0.12)]";
  const inner = theme === "dark"
    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]"
    : "bg-[linear-gradient(135deg,rgba(255,255,255,0.45),rgba(255,255,255,0.08))]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: easeExpo }}
      className={`overflow-hidden rounded-[1.5rem] border ${base} ${className}`}
    >
      <div className={`h-full w-full ${inner}`} />
    </motion.div>
  );
}

function HeroRail({ theme }: { theme: ThemeMode }) {
  const card = theme === "dark"
    ? "border-white/10 bg-white/[0.02]"
    : "border-black/10 bg-[#f3eee6] shadow-[0_20px_60px_rgba(0,0,0,0.12)]";
  const railRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const detailY = useTransform(scrollYProgress, [0, 1], [16, -16]);

  return (
    <section ref={railRef}>
      <div className="grid gap-4 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -6, scale: 1.01 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: easeExpo }}
          style={{ y: heroY }}
          className={`overflow-hidden rounded-[1.5rem] border md:col-span-7 min-h-[42rem] ${card}`}
        >
          <img src={project1Hero} alt="Project 1 hero" className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.04] hover:brightness-[0.92]" />
        </motion.div>

        <div className="grid gap-3 md:col-span-5">
          {[project1Angle, project1Lifestyle, project1Detail].map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: index * 0.1, ease: easeExpo }}
              style={{ y: detailY }}
              className={`overflow-hidden rounded-[1.5rem] border min-h-[11rem] ${card}`}
            >
              <img src={src} alt={`Project 1 detail ${index + 1}`} className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.04] hover:brightness-[0.92]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectGrid({ theme }: { theme: ThemeMode }) {
  const gridRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const cardY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  const card = theme === "dark"
    ? "border-white/10 bg-white/[0.02]"
    : "border-black/10 bg-[#f3eee6] shadow-[0_20px_60px_rgba(0,0,0,0.12)]";

  const img = "block w-full h-auto transition duration-700 ease-out hover:scale-[1.04] hover:brightness-[0.92]";
  return (
    <section ref={gridRef} className="px-5 pt-12 pb-32 md:px-8 md:pt-16 md:pb-40">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-5 md:grid-cols-12">
         <motion.div style={{ y: heroY }} className={`md:col-span-8 overflow-hidden rounded-[1.5rem] border ${card}`}>
            <img src={project2Hero} alt="Project 2 hero" className={img} />
          </motion.div>

         <motion.div style={{ y: cardY }} className={`md:col-span-4 overflow-hidden rounded-[1.5rem] border ${card}`}>
            <img src={project2Narrative} alt="Project 2 narrative" className={img} />
          </motion.div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-12">
          <motion.div style={{ y: cardY }} className={`md:col-span-4 overflow-hidden rounded-[1.5rem] border min-h-[18rem] ${card}`}>
            <img src={project2Detail1} alt="Project 2 detail 1" className={img} />
          </motion.div>

          <motion.div style={{ y: cardY }} className={`md:col-span-4 overflow-hidden rounded-[1.5rem] border min-h-[18rem] ${card}`}>
            <img src={project2Detail2} alt="Project 2 detail 2" className={img} />
          </motion.div>

          <motion.div style={{ y: cardY }} className={`md:col-span-4 overflow-hidden rounded-[1.5rem] border min-h-[18rem] ${card}`}>
            <img src={project2Detail3} alt="Project 2 detail 3" className={img} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function SoapStudiosWebsite() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0.18]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const titleY = useTransform(heroProgress, [0, 1], [0, -90]);
  const navOpacity = useTransform(scrollYProgress, [0, 0.04], [0.75, 1]);
  const marqueeX = useSpring(useTransform(scrollYProgress, [0, 1], [0, -600]), { stiffness: 30, damping: 20 });

  const [theme, setTheme] = useState<ThemeMode>("dark");
  const isDark = theme === "dark";

  const pageBg = isDark
    ? "bg-[radial-gradient(circle_at_20%_20%,rgba(120,85,60,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(90,70,50,0.12),transparent_45%),linear-gradient(to_bottom,#0a0a0a,#11100e,#0c0b0a)] text-[#d6d1cb]"
    : "bg-[linear-gradient(to_bottom,#f3ede3,#e6ddcf)] text-[#181512]";

  const marqueeTone = isDark
    ? "text-[#d6d1cb]/55 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
    : "text-[#181512]/72 drop-shadow-[0_1px_0_rgba(255,255,255,0.28)]";
  const navText = isDark ? "text-[#d6d1cb]" : "text-[#181512]";
  const subText = isDark ? "text-[#a8a29b]" : "text-[#3e3832]";
  const subTextSoft = isDark ? "text-[#cfc7bc]" : "text-[#3e3832]";
  const subTextFaint = isDark ? "text-[#8c8378]" : "text-[#6b645c]";
  const borderTone = isDark ? "border-white/10" : "border-black/5";
  const navButton = isDark
    ? "border-[#e7dfd1]/12 bg-[#12110f]/55 text-[#d6d1cb] backdrop-blur-md"
    : "border-black/10 bg-[#f3eee6] text-[#181512] shadow-[0_10px_24px_rgba(0,0,0,0.12)]";

  return (
    <div className={pageBg} style={{ scrollBehavior: "smooth" }}>
      <CursorFollower theme={theme} />
      <GrainOverlay theme={theme} />
      <VignetteOverlay theme={theme} />
      <LightShadowField theme={theme} />
      <LightingOverlay scrollYProgress={scrollYProgress} theme={theme} />

      <motion.div
        style={{ opacity: navOpacity }}
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-[10px] uppercase tracking-[0.38em] md:px-8 ${navText} ${isDark ? "mix-blend-difference" : ""}`}
      >
        <div className="flex items-center leading-none">
          <span className="text-[1.9rem] font-semibold tracking-[-0.09em] md:text-[2.4rem]">SOAP</span>
          <span className={`ml-3 pt-2 text-[9px] tracking-[0.42em] ${isDark ? "text-[#b9b1a6]" : "text-[#6b645c]"}`}>STUDIOS</span>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <motion.a
            whileHover={{ y: -2 }}
            href="#sunway-artessa"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("sunway-artessa");
            }}
          >
            Projects
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
          >
            Enquire
          </motion.a>
          <button
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition ${navButton}`}
          >
            Mode
          </button>
        </div>
      </motion.div>

      <section ref={heroRef} className="relative h-[145vh] overflow-hidden">
        <LiquidMetal theme={theme} className="left-[8%] top-[18%] h-56 w-56" />
        <LiquidMetal theme={theme} className="right-[9%] top-[14%] h-80 w-80" />
        <LiquidMetal theme={theme} className="bottom-[18%] left-[32%] h-72 w-72" />

        <motion.div style={{ scale: heroScale, opacity: heroOpacity, y: heroY }} className="absolute inset-0">
          <PlaceholderBlock theme={theme} className="h-full rounded-none border-0" />
          <div className={`absolute inset-0 ${isDark ? "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6)_40%,rgba(0,0,0,0.92))]" : "bg-[linear-gradient(to_bottom,rgba(243,237,227,0.04),rgba(243,237,227,0.16)_42%,rgba(243,237,227,0.78))]"}`} />
        </motion.div>

        <div className="relative z-10 flex h-screen items-center px-5 md:px-8">
          <motion.div style={{ y: titleY }} className="max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: easeExpo }}
              className={`text-[10px] uppercase tracking-[0.44em] ${subTextFaint}`}
            >
              Soap Studios / Kuala Lumpur
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.08, ease: easeExpo }}
              className="mt-6 leading-none"
            >
              <div className="text-[4.8rem] font-semibold tracking-[-0.11em] md:text-[10.5rem] lg:text-[12.5rem]">SOAP</div>
              <div className={`mt-3 pl-1 text-[11px] uppercase tracking-[0.58em] md:mt-4 md:text-[14px] ${isDark ? "text-[#b9b1a6]" : "text-[#3e3832]"}`}>STUDIOS</div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: easeExpo }}
              className={`mt-6 max-w-xl text-sm leading-7 md:text-base ${subTextSoft}`}
            >
              A home, considered with the same care as a hotel.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.3, ease: easeExpo }} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
              >
                <MagneticButton filled theme={theme}>Enquire</MagneticButton>
              </a>
              <a
                href="#sunway-artessa"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("sunway-artessa");
                }}
              >
                <MagneticButton theme={theme}>View Projects</MagneticButton>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div style={{ x: marqueeX }} className={`absolute bottom-8 whitespace-nowrap text-[3.5rem] font-medium tracking-[-0.06em] md:text-[6rem] lg:text-[7rem] ${marqueeTone}`}>
          QUIET SPACES — SOAP STUDIOS —
        </motion.div>
      </section>

      <section id="sunway-artessa" className="px-5 pt-16 pb-24 md:px-8 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <p className={`text-[10px] uppercase tracking-[0.4em] mb-6 ${theme === "dark" ? "text-[#8c8378]" : "text-[#6b645c]"}`}>
            Sunway Artessa / Kuala Lumpur
          </p>
          <Reveal>
            <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-7xl ${isDark ? "text-white" : "text-[#181512]/72 drop-shadow-[0_1px_0_rgba(255,255,255,0.28)]"}`}>
              Interiors, considered to be lived in.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={`mt-6 max-w-2xl text-sm leading-7 md:text-base ${subText}`}>
              From atmosphere to function, every decision is made with care — so the space feels resolved, personal, and easy to live in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-32">
        <div className="mx-auto max-w-[92rem]">
          <HeroRail theme={theme} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[56rem] text-center">
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: easeExpo }}
            className={`text-[11px] uppercase tracking-[0.42em] ${theme === "dark" ? "text-[#8c8378]" : "text-[#6b645c]"}`}
          >
            Design Philosophy
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: easeExpo }}
            className={`mt-6 text-[2rem] leading-[1.02] font-semibold tracking-[-0.04em] md:text-[3.6rem] ${theme === "dark" ? "text-white" : "text-[#181512]"}`}
          >
            Hotel thinking,
            <br className="hidden md:block" />
            brought home.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.16, ease: easeExpo }}
            className={`mx-auto mt-6 max-w-xl text-sm leading-7 md:text-base ${theme === "dark" ? "text-[#a8a29b]" : "text-[#3e3832]"}`}
          >
            Calm, intentional, and made for living.
          </motion.p>
        </div>
      </section>

      <section id="alix-residence" className="px-5 pt-16 pb-12 md:px-8 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-[92rem]">
          <p className={`text-[10px] uppercase tracking-[0.4em] mb-6 ${theme === "dark" ? "text-[#8c8378]" : "text-[#6b645c]"}`}>
            Alix Residence / Kuala Lumpur
          </p>
          <Reveal>
            <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-7xl ${isDark ? "text-white" : "text-[#181512]/72 drop-shadow-[0_1px_0_rgba(255,255,255,0.28)]"}`}>
              A home shaped by light,
              <br className="hidden md:block" />
              shadow, and desire.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={`mt-6 max-w-2xl text-sm leading-7 md:text-base ${subText}`}>
              Designed to be felt, not just seen.
            </p>
          </Reveal>
        </div>
      </section>

      <ProjectGrid theme={theme} />

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[72rem] grid gap-10 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <p className={`text-base md:text-lg leading-8 ${theme === "dark" ? "text-[#cfc7bc]" : "text-[#3e3832]"}`}>
              A boutique studio led by Jayden, working on a limited number of interiors each year.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className={`overflow-hidden rounded-[1.5rem] border min-h-[22rem] ${theme === "dark" ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-[#f3eee6] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"}`}>
              <img
                src={jaydenPortrait}
                alt="Portrait of Jayden"
                className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.03] hover:brightness-[0.96]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={`relative border-t px-5 pt-24 pb-32 md:px-8 md:pt-28 md:pb-40 ${borderTone}`}>
        <LiquidMetal theme={theme} className="right-[10%] top-[16%] h-72 w-72" />
        <div className="mx-auto grid max-w-[92rem] gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel theme={theme}>Contact</SectionLabel>
            <Reveal>
              <h2 className="mt-5 max-w-[90vw] md:max-w-4xl pr-4 md:pr-0 text-5xl sm:text-6xl font-semibold leading-[1] tracking-[-0.03em] md:text-7xl lg:text-8xl">Start.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:pt-6">
            <Reveal delay={0.06}>
              <p className={`max-w-md text-sm leading-7 md:text-base ${subText}`}>
                Projects typically begin with a consultation, where we understand your home, your routines, and what you want your space to feel like.
              </p>
            </Reveal>
            <div className="mt-10">
              <form
                className="grid gap-4 max-w-md"
                action="https://formspree.io/f/mdayoqko"
                method="POST"
              >
                <input type="hidden" name="_subject" value="New Project Enquiry" />
                <input type="hidden" name="_captcha" value="false" />

                <p className={`text-[10px] uppercase tracking-[0.34em] ${isDark ? "text-[#6f6a63]" : "text-[#6b645c]"}`}>
                  We take on a limited number of projects each year.
                </p>

                <input
                  name="name"
                  placeholder="Name"
                  required
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] placeholder:text-[#8c8378] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] placeholder:text-[#6b645c] focus:border-black/20 focus:bg-white"
                  }`}
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] placeholder:text-[#8c8378] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] placeholder:text-[#6b645c] focus:border-black/20 focus:bg-white"
                  }`}
                />

                <select
                  name="projectType"
                  required
                  defaultValue=""
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] focus:border-black/20 focus:bg-white"
                  }`}
                >
                  <option value="" disabled>Project type</option>
                  <option>Home / Condo</option>
                  <option>Rental</option>
                  <option>Commercial / Gym</option>
                  <option>Not sure yet</option>
                </select>

                <select
                  name="budget"
                  required
                  defaultValue=""
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] focus:border-black/20 focus:bg-white"
                  }`}
                >
                  <option value="" disabled>Budget range</option>
                  <option>RM25k – RM50k</option>
                  <option>RM50k – RM100k</option>
                  <option>RM100k+</option>
                  <option>Not sure yet</option>
                </select>

                <select
                  name="begin"
                  required
                  defaultValue=""
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] focus:border-black/20 focus:bg-white"
                  }`}
                >
                  <option value="" disabled>When are you looking to begin?</option>
                  <option>Ready now</option>
                  <option>Within 1–3 months</option>
                  <option>Within 3–6 months</option>
                  <option>Just exploring</option>
                </select>

                <div className="grid gap-2">
                  <p className={`text-[10px] uppercase tracking-[0.3em] ${isDark ? "text-[#8c8378]" : "text-[#6b645c]"}`}>
                    What matters most?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["How it feels", "How it functions", "How I host / live", "Not sure yet"].map((option) => (
                      <label
                        key={option}
                        className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.24em] border cursor-pointer transition ${
                          isDark
                            ? "border-white/10 bg-[#12110f]/55 text-[#d6d1cb]"
                            : "border-black/10 bg-[#f6f0e8] text-[#181512]"
                        }`}
                      >
                        <input type="radio" name="priority" value={option} className="sr-only" required />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  name="details"
                  placeholder="Tell me about your space, or how you want it to feel"
                  rows={4}
                  className={`px-4 py-3 rounded-[1rem] border text-sm outline-none transition resize-none ${
                    isDark
                      ? "border-white/10 bg-[#12110f]/55 text-[#e7dfd1] placeholder:text-[#8c8378] focus:border-[#e7dfd1]/25 focus:bg-[#171512]"
                      : "border-black/10 bg-[#f6f0e8] text-[#181512] placeholder:text-[#6b645c] focus:border-black/20 focus:bg-white"
                  }`}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.32em] transition ${
                      isDark
                        ? "bg-gradient-to-b from-[#f2ede6] to-[#d6cec2] text-black shadow-[0_0_0_rgba(242,237,230,0)] hover:shadow-[0_0_24px_rgba(242,237,230,0.12)]"
                        : "bg-gradient-to-b from-[#2a2622] to-[#171411] text-[#f3ede3] shadow-[0_10px_26px_rgba(0,0,0,0.18)]"
                    }`}
                  >
                    Start a project
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-8">
              <p className={`text-[10px] uppercase tracking-[0.44em] ${isDark ? "text-[#6f6a63]" : "text-[#6b645c]"}`}>SOAP STUDIOS</p>
              <p className={`mt-3 text-[10px] uppercase tracking-[0.34em] ${isDark ? "text-[#6f6a63]" : "text-[#6b645c]"}`}>
                Kuala Lumpur / By Appointment / jaydenchoo.soap@gmail.com
              </p>
              <p className={`mt-3 text-[10px] uppercase tracking-[0.34em] ${isDark ? "text-[#6f6a63]" : "text-[#6b645c]"}`}>
                @soapstudiosmy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
