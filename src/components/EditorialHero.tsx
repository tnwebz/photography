import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Shield, Menu, X } from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";

const desktopImages = [1, 2, 7, 10];
const mobileImages = [1, 2, 7, 8];

const HERO_SLIDES = desktopImages.map((dNum, i) => {
  const mNum = mobileImages[i % mobileImages.length];
  return {
    desktopSrc: `/her1 (${dNum}).${dNum === 2 ? "png" : "jpeg"}`,
    mobileSrc: `/mer (${mNum}).png`,
    alt: `Photography showcase ${i + 1}`,
  };
});

const SLIDE_DURATION = 5000; // 5 seconds per slide

const SUBTEXT =
  "There is no such thing as a perfect love story or a perfect wedding.  For exactly this reason, we love doing what we do.";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

function useTypewriter(text: string, speed = 26) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        setDone(true);
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

function CaptureYourHeadline() {
  return (
    <motion.h1
      className="font-serif text-[clamp(2.25rem,11vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 1, 1, 0.4, 1],
        y: [20, 0, 0, 0, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      Capture your
    </motion.h1>
  );
}

function MemoriesHeadline() {
  return (
    <motion.span
      className="font-serif text-[clamp(2rem,9vw,4.75rem)] font-normal leading-[0.9] tracking-tight text-white"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: [0, 1, 1, 0.4, 1],
        y: [16, 0, 0, 0, 0],
      }}
      transition={{
        duration: 5,
        delay: 0.35,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      memories
    </motion.span>
  );
}

function TypewriterBlock() {
  const { displayed, done } = useTypewriter(SUBTEXT, 26);

  return (
    <div className="mt-5 flex flex-col gap-4 sm:mt-6 md:mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10">
      <p className="max-w-full text-sm leading-relaxed text-zinc-200 sm:max-w-md sm:text-[15px]">
        {displayed}
        <span
          className={`ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-zinc-400 ${
            done ? "animate-blink" : ""
          }`}
          aria-hidden="true"
        />
      </p>
      <div className="lg:pt-[0.2em]">
        <MemoriesHeadline />
      </div>
    </div>
  );
}

// No ScaledImageGallery needed — hero background now auto-slides

/* ── Shield Admin Gate ── */
function ShieldAdminButton({ className }: { className?: string }) {
  const { isAdmin, login, logout } = useAdmin();
  const clickCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleShieldClick = useCallback(() => {
    if (isAdmin) {
      logout();
      return;
    }

    clickCountRef.current += 1;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setShowPasswordInput(true);
    } else {
      timerRef.current = window.setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }
  }, [isAdmin, logout]);

  const handlePasswordSubmit = () => {
    const success = login(password);
    if (success) {
      setShowPasswordInput(false);
      setPassword("");
    } else {
      alert("Wrong password!");
      setPassword("");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShieldClick}
        className={`group relative transition-all ${className ?? ""}`}
        title={isAdmin ? "Admin active — click to logout" : ""}
      >
        <Shield
          className={`h-4 w-4 transition-colors ${
            isAdmin ? "text-orange-500" : "text-zinc-400 hover:text-zinc-600"
          }`}
        />
        {isAdmin && (
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500" />
        )}
      </button>

      {/* Password modal */}
      <AnimatePresence>
        {showPasswordInput && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowPasswordInput(false);
              setPassword("");
            }}
          >
            <motion.div
              className="mx-4 w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center gap-3">
                <Shield className="h-5 w-5 text-orange-500" />
                <h3 className="font-serif text-lg text-black">Admin Access</h3>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                placeholder="Enter password"
                className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword("");
                  }}
                  className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-600 transition-colors hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePasswordSubmit}
                  className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-orange-600"
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function EditorialHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* ── Auto-sliding Background Carousel ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile Image */}
          <img
            src={HERO_SLIDES[currentSlide].mobileSrc}
            alt={HERO_SLIDES[currentSlide].alt}
            className="block h-full w-full object-cover object-center sm:hidden"
            draggable={false}
          />
          {/* Desktop Image */}
          <img
            src={HERO_SLIDES[currentSlide].desktopSrc}
            alt={HERO_SLIDES[currentSlide].alt}
            className="hidden h-full w-full object-cover object-center sm:block"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        {/* ── Sticky White Navbar ── */}
        <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 shadow-sm backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-8 sm:py-2 lg:px-14">
            <div className="flex items-center gap-3">
              {/* Shield — left corner, desktop only */}
              <div className="hidden md:block">
                <ShieldAdminButton />
              </div>
              {/* Brand: Logo & Text */}
              <a href="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Sathya Studio's Logo"
                className="h-10 sm:h-10 w-auto object-contain mix-blend-multiply scale-[1.4] sm:scale-[2.0] origin-left"
                draggable={false}
              />
              {/* Mobile-only styled red text */}
              <span className="ml-6 font-serif text-lg font-extrabold tracking-wide text-red-600 drop-shadow-sm sm:hidden">
                sathya studios
              </span>
              </a>
            </div>

            {/* Desktop nav links — centered */}
            <nav className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.15em] text-zinc-600 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-black"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop: Get in touch */}
            <div className="hidden items-center gap-3 md:flex">
              <a
                href="#contact"
                className="shrink-0 rounded-full bg-black px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-zinc-800 sm:text-xs"
              >
                Get in touch
              </a>
            </div>

            {/* Mobile: Hamburger toggle */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-zinc-700" />
              ) : (
                <Menu className="h-5 w-5 text-zinc-700" />
              )}
            </button>
          </div>

          {/* Mobile slide-down menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-zinc-100 bg-white/98 backdrop-blur-lg md:hidden"
              >
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    className="mt-2 rounded-full bg-black px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get in touch
                  </a>
                  {/* Shield icon — hidden admin trigger */}
                  <div className="mt-2 border-t border-zinc-200 pt-3">
                    <div className="flex items-center gap-2 px-3">
                      <ShieldAdminButton />
                    </div>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-8 px-4 py-12 sm:gap-10 sm:px-8 sm:py-16 lg:px-14 lg:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <CaptureYourHeadline />
            <TypewriterBlock />
          </div>
        </div>

        <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 pb-6 sm:px-8 lg:px-14">
          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === currentSlide
                    ? "w-8 bg-white"
                    : "w-3 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="text-[10px] leading-relaxed text-zinc-400 sm:text-[11px]">
              <p>{today}</p>
              <p className="mt-1 text-white">Creative direction</p>
            </div>
            <div className="flex gap-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:gap-6 sm:text-[11px] sm:tracking-[0.15em]">
              <a
                href="https://www.facebook.com/share/1BFHcGftHD/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-60"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-60"
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
