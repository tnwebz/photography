export type ServiceSlug = 'baby' | 'wedding' | 'maternity';

export type GalleryCategory = 'outdoor' | 'candid' | 'events' | 'others';

export const SERVICE_GALLERIES: Record<ServiceSlug, string[]> = {
  baby: buildGallerySet('/b1.png', 'baby'),
  wedding: buildGallerySet('/w1.png', 'wedding'),
  maternity: buildGallerySet('/m1.png', 'maternity'),
};

export const CATEGORY_GALLERIES: Record<GalleryCategory, string[]> = {
  outdoor: buildGallerySet('/p1.png', 'outdoor'),
  candid: buildGallerySet('/p2.png', 'candid'),
  events: buildGallerySet('/p3.png', 'events'),
  others: buildGallerySet('/hero.png', 'others'),
};

export const MAIN_GALLERY_IMAGES = [
  '/p1.png',
  '/p2.png',
  '/p3.png',
  '/w1.png',
  '/b1.png',
  '/m1.png',
  '/h1.png',
  '/h2.png',
];

function buildGallerySet(base: string, seed: string): string[] {
  const pool = ['/p1.png', '/p2.png', '/p3.png', '/b1.png', '/w1.png', '/m1.png', '/h1.png', '/h2.png', '/h3.png', '/hero.png'];
  const ordered = [base, ...pool.filter((img) => img !== base)];
  return Array.from({ length: 30 }, (_, i) => ordered[i % ordered.length] ?? `${base}?v=${seed}-${i}`);
}

export const SERVICE_META: Record<
  ServiceSlug,
  { title: string; description: string; image: string }
> = {
  baby: {
    title: 'Baby Photoshoot',
    description:
      'We provide a professional baby portrait photography service and have many years of experience capturing tender early moments.',
    image: '/b1.png',
  },
  wedding: {
    title: 'Wedding Photography',
    description:
      'We believe wedding photography should be unscripted, fun, and timeless.',
    image: '/w1.png',
  },
  maternity: {
    title: 'Maternity Photography',
    description:
      'Celebrate the beauty of motherhood with elegant, heartfelt portraits in a relaxed and comfortable session.',
    image: '/m1.png',
  },
};
