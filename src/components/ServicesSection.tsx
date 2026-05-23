import { Baby, Camera, Heart, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICE_META, type ServiceSlug } from '@/data/gallery';

const SERVICES: Array<{
  slug: ServiceSlug;
  icon: LucideIcon;
}> = [
  { slug: 'baby', icon: Baby },
  { slug: 'wedding', icon: Camera },
  { slug: 'maternity', icon: Heart },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-black px-4 py-16 sm:px-8 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl text-white sm:text-4xl lg:text-5xl">Our Services</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-zinc-400">
          Timeless photography crafted with care for every chapter of your story.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {SERVICES.map(({ slug, icon: Icon }) => {
            const meta = SERVICE_META[slug];
            return (
              <Link
                key={slug}
                to={`/collections/${slug}`}
                className="group relative block overflow-hidden bg-black transition-transform hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden sm:h-72">
                  <img
                    src={meta.image}
                    alt={meta.title}
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div
                  className="relative -mt-8 bg-white px-6 pb-8 pt-10"
                  style={{ clipPath: 'polygon(0 14%, 100% 0, 100% 100%, 0 100%)' }}
                >
                  <div className="absolute -top-6 right-6 flex h-12 w-12 items-center justify-center bg-orange-500 shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="pr-14 text-xl font-bold text-black">{meta.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{meta.description}</p>
                  <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-orange-500">
                    View collection →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
