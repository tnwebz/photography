import React from 'react';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

type ImageGalleryProps = {
  images: string[];
  embedded?: boolean;
};

export function ImageGallery({ images, embedded = false }: ImageGalleryProps) {
  const columns = [
    images.filter((_, i) => i % 3 === 0),
    images.filter((_, i) => i % 3 === 1),
    images.filter((_, i) => i % 3 === 2),
  ];

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center px-3 sm:px-4',
        embedded ? 'bg-transparent py-2 sm:py-4' : 'min-h-0 bg-white py-10 sm:min-h-screen sm:py-16',
      )}
    >
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {columns.map((column, col) => (
          <div key={col} className="grid gap-6">
            {column.map((src, index) => {
              const isPortrait = (col + index) % 2 === 0;
              const ratio = isPortrait ? 9 / 16 : 16 / 9;

              return (
                <AnimatedImage
                  key={`${col}-${index}-${src}`}
                  alt={`Gallery ${col}-${index}`}
                  src={src}
                  ratio={ratio}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

type AnimatedImageProps = {
  alt: string;
  src: string;
  ratio: number;
};

function AnimatedImage({ alt, src, ratio }: AnimatedImageProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isLoading, setIsLoading] = React.useState(true);
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <AspectRatio ref={ref} ratio={ratio} className="relative size-full rounded-lg border border-zinc-200 bg-zinc-100">
      <img
        alt={alt}
        src={imgSrc}
        className={cn(
          'size-full rounded-lg object-cover opacity-0 transition-all duration-1000 ease-in-out',
          isInView && !isLoading && 'opacity-100',
        )}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        onError={() => setImgSrc('/hero.png')}
      />
    </AspectRatio>
  );
}
