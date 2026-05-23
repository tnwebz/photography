import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { ImageGallery } from '@/components/ImageGallery';
import { CATEGORY_GALLERIES, type GalleryCategory } from '@/data/gallery';

const CATEGORIES: Array<{ key: GalleryCategory; label: string; image: string }> = [
  { key: 'outdoor', label: 'Outdoor', image: '/p1.png' },
  { key: 'candid', label: 'Candid', image: '/p2.png' },
  { key: 'events', label: 'Events', image: '/p3.png' },
  { key: 'others', label: 'Others', image: '/hero.png' },
];

export function GallerySection() {
  const [expanded, setExpanded] = useState<GalleryCategory | null>(null);

  const handleCategoryClick = (key: GalleryCategory) => {
    setExpanded((current) => (current === key ? null : key));
  };

  const activeLabel = CATEGORIES.find((c) => c.key === expanded)?.label;

  return (
    <section
      id="gallery"
      className="relative z-20 rounded-t-2xl bg-zinc-50 px-4 pb-16 pt-12 sm:-mt-[22vh] sm:rounded-t-[2rem] sm:px-8 sm:pb-20 sm:pt-16 sm:shadow-[0_-24px_48px_rgba(0,0,0,0.12)] lg:-mt-[32vh] lg:px-14 lg:pt-20"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Portfolio</p>
        <h2 className="mt-3 font-serif text-3xl text-black sm:text-4xl lg:text-5xl">Our Gallery</h2>
        <p className="mt-3 max-w-xl text-zinc-600">Discover Captivating Gallery Display</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const isActive = expanded === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryClick(cat.key)}
                className={`group relative h-48 overflow-hidden text-left transition-shadow sm:h-56 md:h-64 ${
                  isActive ? 'ring-2 ring-orange-500 shadow-lg' : 'ring-1 ring-transparent'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 transition-colors ${
                    isActive ? 'bg-black/55' : 'bg-black/45'
                  }`}
                />

                <div className="absolute bottom-3 left-3 flex items-stretch sm:bottom-4 sm:left-4">
                  <div className="bg-white px-3 py-3 sm:px-5 sm:py-4">
                    <p className="text-base font-bold text-black sm:text-lg">{cat.label}</p>
                    <p className="text-xs text-zinc-500">{isActive ? 'Close gallery' : 'View More'}</p>
                  </div>
                  <div className="flex w-11 items-center justify-center bg-orange-500 sm:w-14">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white sm:h-9 sm:w-9">
                      {isActive ? (
                        <X className="h-4 w-4 text-white" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-white" />
                      )}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              key={expanded}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10 border-t border-zinc-200 pt-10">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-black sm:text-3xl">{activeLabel} Gallery</h3>
                  <button
                    type="button"
                    onClick={() => setExpanded(null)}
                    className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-black"
                  >
                    Close
                  </button>
                </div>
                <ImageGallery images={CATEGORY_GALLERIES[expanded]} embedded />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
