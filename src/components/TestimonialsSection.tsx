import { motion } from 'framer-motion';

const testimonials = [
  {
    text: 'They captured our wedding with so much heart. Every photo feels alive and honest — we could not have asked for more.',
    image: 'https://i.pravatar.cc/150?img=32',
    name: 'Priya & Arjun',
    role: 'Wedding clients',
  },
  {
    text: 'Our baby shoot was gentle, patient, and beautiful. The team made us feel completely at ease from start to finish.',
    image: 'https://i.pravatar.cc/150?img=45',
    name: 'Meera Shah',
    role: 'New parent',
  },
  {
    text: 'The maternity portraits are stunning — elegant, warm, and deeply personal. A treasure we will keep forever.',
    image: 'https://i.pravatar.cc/150?img=20',
    name: 'Ananya R.',
    role: 'Maternity session',
  },
  {
    text: 'Professional, creative, and wonderfully calm on a busy day. Our families still talk about how natural every shot looks.',
    image: 'https://i.pravatar.cc/150?img=12',
    name: 'Rahul & Divya',
    role: 'Event photography',
  },
  {
    text: 'From the first call to final delivery, everything felt thoughtful. The gallery exceeded every expectation we had.',
    image: 'https://i.pravatar.cc/150?img=28',
    name: 'Kavya M.',
    role: 'Portrait client',
  },
];

type TestimonialsColumnProps = {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
};

function TestimonialsColumn({ className, testimonials: items, duration = 12 }: TestimonialsColumnProps) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((loop) => (
          <div key={loop} className="flex flex-col gap-6">
            {items.map(({ text, image, name, role }, i) => (
              <div
                key={`${loop}-${i}`}
                className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg shadow-black/5 sm:p-8"
              >
                <p className="text-sm leading-relaxed text-zinc-600">{text}</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={image} alt={name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium leading-tight text-black">{name}</p>
                    <p className="text-sm text-zinc-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  const firstCol = testimonials.slice(0, 2);
  const secondCol = testimonials.slice(2, 4);
  const thirdCol = testimonials.slice(4);

  return (
    <section id="reviews" className="overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-20 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-serif text-3xl text-black sm:text-4xl">Customer Reviews</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-zinc-500">
          Kind words from couples and families we have had the honour to photograph.
        </p>

        <div className="relative mt-8 flex h-[420px] justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:mt-12 sm:h-[520px] sm:gap-6">
          <TestimonialsColumn testimonials={firstCol} duration={14} className="w-full max-w-[320px] sm:max-w-xs" />
          <TestimonialsColumn testimonials={secondCol} className="hidden w-full max-w-xs md:block" duration={16} />
          <TestimonialsColumn
            testimonials={thirdCol.length ? thirdCol : firstCol}
            className="hidden w-full max-w-xs lg:block"
            duration={18}
          />
        </div>
      </div>
    </section>
  );
}
