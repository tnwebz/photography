import { motion } from "framer-motion";

const ABOUT_QUOTE =
  "Photography is the story we fail to put into words. Every frame is a quiet promise that the moment mattered — and still does.";

const PHOTOS = [
  {
    src: "/p1.jpeg",
    alt: "Wedding lights",
    className:
      "absolute right-0 top-0 z-10 h-[120px] w-[58%] max-w-[200px] sm:h-[200px] sm:max-w-[300px] sm:w-[300px] md:h-[240px] md:max-w-[360px] md:w-[360px]",
    imgClassName: "object-[center_35%]",
    delay: 0.1,
  },
  {
    src: "/p2.png",
    alt: "Traditional portrait",
    className:
      "absolute left-0 top-[90px] z-20 h-[115px] w-[55%] max-w-[190px] sm:top-[120px] sm:h-[180px] sm:max-w-[280px] sm:w-[280px] md:top-[140px] md:h-[210px] md:max-w-[320px] md:w-[320px]",
    imgClassName: "object-[center_15%]",
    delay: 0.25,
  },
  {
    src: "/p3.jpeg",
    alt: "Couple in field",
    className:
      "absolute right-2 top-[155px] z-30 h-[150px] w-[38%] max-w-[130px] border-2 border-violet-500 sm:right-4 sm:top-[200px] sm:h-[240px] sm:max-w-[160px] sm:w-[160px] md:right-8 md:top-[220px] md:h-[280px] md:max-w-[190px] md:w-[190px]",
    imgClassName: "object-[center_15%]",
    delay: 0.4,
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white px-4 py-16 sm:px-8 sm:py-20 lg:px-14 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            About Us
          </p>
          <h2 className="mt-3 font-serif text-3xl text-black sm:mt-4 sm:text-4xl lg:text-5xl">
            Our Story
          </h2>
          <blockquote className="mt-6 text-base leading-relaxed text-zinc-600 italic sm:mt-8 sm:text-lg">
            “{ABOUT_QUOTE}”
          </blockquote>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-500 sm:mt-6">
            For over fifteen years we have been candid wedding photographers —
            finding beauty in honest moments, unposed laughter, and the quiet
            in-betweens that become your family&apos;s legacy.
          </p>
        </div>

        <div className="relative order-1 mx-auto h-[300px] w-full max-w-[340px] sm:h-[420px] sm:max-w-[520px] md:h-[480px]">
          {PHOTOS.map((photo) => (
            <motion.div
              key={photo.src}
              className={`overflow-hidden shadow-xl ${photo.className}`}
              initial={{ opacity: 0, x: 40, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: photo.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={`h-full w-full object-cover ${photo.imgClassName}`}
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
