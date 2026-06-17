import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

const CAROUSEL_IMAGES = [
  { src: '/h1.png', alt: 'Wedding portrait 1' },
  { src: '/h2.png', alt: 'Wedding portrait 2' },
  { src: '/h3.png', alt: 'Wedding portrait 3' },
] as const;

const IMAGE_SIZES = [
  'h-[200px] w-[118px] sm:h-[300px] sm:w-[175px] lg:h-[420px] lg:w-[250px]',
  'h-[158px] w-[92px] sm:h-[240px] sm:w-[138px] lg:h-[330px] lg:w-[190px]',
  'h-[122px] w-[72px] sm:h-[188px] sm:w-[108px] lg:h-[260px] lg:w-[145px]',
] as const;

const SUBTEXT =
  "There is no such thing as a perfect love story or a perfect wedding.  For exactly this reason, we love doing what we do.";

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

function useTypewriter(text: string, speed = 26) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
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
      className="font-serif text-[clamp(2.25rem,11vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 1, 1, 0.4, 1],
        y: [20, 0, 0, 0, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'easeInOut',
      }}
    >
      Capture your
    </motion.h1>
  );
}

function MemoriesHeadline() {
  return (
    <motion.span
      className="font-serif text-[clamp(2rem,9vw,4.75rem)] font-normal leading-[0.9] tracking-tight text-black"
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
        ease: 'easeInOut',
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
      <p className="max-w-full text-sm leading-relaxed text-zinc-600 sm:max-w-md sm:text-[15px]">
        {displayed}
        <span
          className={`ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-zinc-400 ${
            done ? 'animate-blink' : ''
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

function ScaledImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex w-full max-w-full items-end justify-center gap-2 sm:items-center sm:gap-3 md:gap-4 lg:gap-5">
      {CAROUSEL_IMAGES.map((image, index) => (
        <motion.button
          key={image.src}
          type="button"
          onClick={() => setActiveIndex(index)}
          className={`relative shrink-0 overflow-hidden transition-shadow ${IMAGE_SIZES[index]} ${
            activeIndex === index
              ? 'ring-2 ring-black/30 ring-offset-1 ring-offset-transparent sm:ring-offset-2'
              : 'ring-1 ring-black/10'
          }`}
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`View ${image.alt}`}
          aria-pressed={activeIndex === index}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.button>
      ))}
    </div>
  );
}

/* ── Shield Admin Gate ── */
function ShieldAdminButton({ className }: { className?: string }) {
  const { isAdmin, login, logout } = useAdmin();
  const clickCountRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

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
      setPassword('');
    } else {
      alert('Wrong password!');
      setPassword('');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleShieldClick}
        className={`group relative transition-all ${className ?? ''}`}
        title={isAdmin ? 'Admin active — click to logout' : ''}
      >
        <Shield
          className={`h-4 w-4 transition-colors ${
            isAdmin ? 'text-orange-500' : 'text-zinc-400 hover:text-zinc-600'
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
              setPassword('');
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
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Enter password"
                className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-zinc-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword('');
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
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isLargeScreen ? 'fixed' : 'scroll',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/45" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100dvh] flex-col px-4 py-5 sm:px-8 sm:py-6 lg:px-14">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            {/* Desktop: Shield icon top-left */}
            <div className="hidden items-center gap-3 md:flex">
              <ShieldAdminButton />
              <a href="/" className="text-[10px] font-medium uppercase tracking-[0.18em] text-black sm:text-xs sm:tracking-[0.2em]">
                Studio
              </a>
            </div>

            {/* Mobile: Studio text only */}
            <a href="/" className="text-[10px] font-medium uppercase tracking-[0.18em] text-black sm:text-xs sm:tracking-[0.2em] md:hidden">
              Studio
            </a>

            {/* Desktop: Get in touch */}
            <a
              href="#contact"
              className="hidden shrink-0 border border-black px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.18em] md:inline-block"
            >
              Get in touch
            </a>

            {/* Mobile: Hamburger toggle */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 bg-white/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <Menu className="h-5 w-5 text-black" />
              )}
            </button>
          </div>

          {/* Mobile slide-down menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-1 rounded-xl border border-black/5 bg-white/80 px-5 py-4 backdrop-blur-md">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/5 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
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

          {/* Desktop nav */}
          <nav className="hidden items-center justify-center gap-8 text-xs text-zinc-600 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-black">
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-1 flex-col gap-8 py-6 sm:gap-10 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-16">
          <div className="flex w-full flex-col justify-center lg:max-w-[48%]">
            <CaptureYourHeadline />
            <TypewriterBlock />
          </div>

          <div className="flex w-full flex-1 items-center justify-center lg:justify-end">
            <ScaledImageGallery />
          </div>
        </div>

        <footer className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="text-[10px] leading-relaxed text-zinc-500 sm:text-[11px]">
            <p>{today}</p>
            <p className="mt-1 text-black">Creative direction</p>
          </div>
          <div className="flex gap-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black sm:gap-6 sm:text-[11px] sm:tracking-[0.15em]">
            <a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:opacity-60">
              Behance
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60">
              Instagram
            </a>
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
