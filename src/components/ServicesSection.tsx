import { useRef, useState, useEffect, useCallback } from 'react';
import { Baby, Camera, Heart, Gift, Home, Star, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { SERVICE_META, type ServiceSlug } from '@/data/gallery';

const SERVICES: Array<{
  slug: ServiceSlug;
  icon: LucideIcon;
}> = [
  { slug: 'birthday', icon: Gift },
  { slug: 'hindu_wedding', icon: Camera },
  { slug: 'christian_wedding', icon: Heart },
  { slug: 'bhramin_wedding', icon: Camera },
  { slug: 'engagement', icon: Heart },
  { slug: 'housewarming', icon: Home },
  { slug: 'puberty', icon: Star },
  { slug: 'sastiyathapoorthi', icon: Star },
  { slug: 'upanayanam', icon: Star },
  { slug: 'maternity', icon: Baby },
];

const GAP = 24;

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(340);
  const [visibleCards, setVisibleCards] = useState(3);
  const x = useMotionValue(0);

  const totalCards = SERVICES.length;
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // Responsive: measure container and compute card width + visible count
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;

      let cols: number;
      if (w >= 1024) cols = 3;
      else if (w >= 640) cols = 2;
      else cols = 1;

      const computedCard = (w - GAP * (cols - 1)) / cols;
      setVisibleCards(cols);
      setCardWidth(computedCard);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const getOffset = useCallback(
    (index: number) => -(index * (cardWidth + GAP)),
    [cardWidth],
  );

  const animateTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
      animate(x, getOffset(clamped), {
        type: 'spring',
        stiffness: 300,
        damping: 35,
      });
    },
    [maxIndex, x, getOffset],
  );

  // Re-snap when cardWidth changes (e.g. on resize)
  useEffect(() => {
    const clamped = Math.max(0, Math.min(currentIndex, maxIndex));
    if (clamped !== currentIndex) setCurrentIndex(clamped);
    x.set(getOffset(clamped));
  }, [cardWidth, maxIndex, currentIndex, getOffset, x]);

  const handlePrev = () => animateTo(currentIndex - 1);
  const handleNext = () => animateTo(currentIndex + 1);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const step = cardWidth + GAP;
    const currentOffset = x.get();
    const projected = currentOffset + info.velocity.x * 0.3;
    const rawIndex = Math.round(-projected / step);
    animateTo(rawIndex);
  };

  const stripWidth = totalCards * cardWidth + (totalCards - 1) * GAP;
  const containerW = containerRef.current?.offsetWidth ?? 0;
  const dragLeft = -(stripWidth - containerW);

  return (
    <section id="services" className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* Header with nav arrows */}
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="mt-4 max-w-xl text-sm text-zinc-400">
              Timeless photography crafted with care for every chapter of your story.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500 bg-orange-500 text-white transition-all hover:bg-orange-600 hover:border-orange-600 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
              aria-label="Previous services"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500 bg-orange-500 text-white transition-all hover:bg-orange-600 hover:border-orange-600 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
              aria-label="Next services"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel track — full bleed so cards sit edge-to-edge */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        <div ref={containerRef} className="relative mt-14 overflow-hidden">
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: dragLeft, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
          >
            {SERVICES.map(({ slug, icon: Icon }) => {
              const meta = SERVICE_META[slug];
              return (
                <motion.div
                  key={slug}
                  className="shrink-0"
                  style={{ width: cardWidth }}
                >
                  <Link
                    to={`/collections/${slug}`}
                    className="group relative block overflow-hidden bg-black transition-transform duration-300 hover:-translate-y-1"
                    draggable={false}
                  >
                    <div className="h-56 overflow-hidden sm:h-64 lg:h-72">
                      <img
                        src={meta.image}
                        alt={meta.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        draggable={false}
                      />
                    </div>

                    <div
                      className="relative -mt-8 bg-white px-5 pb-6 pt-10 sm:px-6 sm:pb-8"
                      style={{ clipPath: 'polygon(0 14%, 100% 0, 100% 100%, 0 100%)' }}
                    >
                      <div className="absolute -top-6 right-5 flex h-11 w-11 items-center justify-center bg-orange-500 shadow-lg sm:right-6 sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="pr-14 text-lg font-bold text-black sm:text-xl">{meta.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 sm:mt-3">{meta.description}</p>
                      <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-orange-500 sm:mt-4">
                        View collection →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => animateTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-orange-500'
                  : 'w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
