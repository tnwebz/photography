import React, { useState } from 'react';
import { useInView, AnimatePresence, motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { Trash2, X } from 'lucide-react';

type ImageGalleryProps = {
  images: string[];
  embedded?: boolean;
  isAdmin?: boolean;
  onDelete?: (url: string) => void;
};

export function ImageGallery({ images, embedded = false, isAdmin, onDelete }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-sm text-zinc-400">No photos uploaded yet.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'relative flex w-full flex-col items-center justify-center px-3 sm:px-4',
          embedded ? 'bg-transparent py-2 sm:py-4' : 'min-h-0 bg-white py-10 sm:min-h-screen sm:py-16',
        )}
      >
        <div className="mx-auto w-full max-w-5xl columns-2 gap-4 space-y-4 sm:gap-6 sm:space-y-6 lg:columns-3">
          {images.map((src, index) => {
            const isPortrait = index % 2 === 0;
            const ratio = isPortrait ? 9 / 16 : 16 / 9;

            return (
              <div key={`${index}-${src}`} className="relative break-inside-avoid">
                <AnimatedImage alt={`Gallery ${index}`} src={src} ratio={ratio} onClick={() => setSelectedImage(src)} />
                {isAdmin && onDelete && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this photo?')) {
                        onDelete(src);
                      }
                    }}
                    className="absolute right-2 top-2 z-20 rounded-full bg-black/60 p-2 text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-[90vh] w-[90vw] items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={selectedImage}
                alt="Fullscreen view"
                className="h-full w-full object-contain select-none pointer-events-none"
                draggable={false}
              />
              {/* Invisible overlay to block long-press/right-click */}
              <div className="absolute inset-0 z-10 bg-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type AnimatedImageProps = {
  alt: string;
  src: string;
  ratio: number;
  onClick: () => void;
};

function AnimatedImage({ alt, src, ratio, onClick }: AnimatedImageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <div 
      className="cursor-zoom-in group relative" 
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      <AspectRatio ref={ref} ratio={ratio} className="relative size-full rounded-lg border border-zinc-200 bg-zinc-100 overflow-hidden">
        <img
          alt={alt}
          src={imgSrc}
          className={cn(
            'size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out group-hover:scale-105 pointer-events-none select-none',
            isInView && !isLoading && 'opacity-100',
          )}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
          onError={() => setImgSrc('/hero.png')}
          draggable={false}
        />
        {/* Anti-download overlay */}
        <div className="absolute inset-0 z-10 bg-transparent" />
      </AspectRatio>
    </div>
  );
}
