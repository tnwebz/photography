export type ServiceSlug = 'baby' | 'wedding' | 'maternity';

export type GalleryCategory = 'outdoor' | 'candid' | 'events' | 'others';

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
