import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

export function EditorialHero() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

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
            <a href="/" className="text-[10px] font-medium uppercase tracking-[0.18em] text-black sm:text-xs sm:tracking-[0.2em]">
              Studio
            </a>
            <a
              href="#contact"
              className="shrink-0 border border-black px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.18em]"
            >
              Get in touch
            </a>
          </div>
          <nav className="flex gap-4 overflow-x-auto pb-1 text-[10px] text-zinc-600 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="shrink-0 whitespace-nowrap hover:text-black">
                {link.label}
              </a>
            ))}
          </nav>
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
