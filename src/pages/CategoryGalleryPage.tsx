import { Link, useParams } from 'react-router-dom';
import { ImageGallery } from '@/components/ImageGallery';
import { SERVICE_META, type ServiceSlug } from '@/data/gallery';
import { useAdmin } from '@/hooks/useAdmin';
import { useGallery } from '@/hooks/useGallery';
import { CloudinaryUpload } from '@/components/CloudinaryUpload';

const SLUGS: ServiceSlug[] = ['baby', 'wedding', 'maternity'];

export function CategoryGalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const validSlug = SLUGS.includes(slug as ServiceSlug) ? (slug as ServiceSlug) : 'wedding';
  const meta = SERVICE_META[validSlug];
  
  const { isAdmin } = useAdmin();
  const { images, addImages, removeImage } = useGallery(validSlug);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-8 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link
            to="/"
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-black sm:text-xs sm:tracking-[0.2em]"
          >
            ← Back
          </Link>
          <h1 className="truncate text-center font-serif text-lg text-black sm:text-2xl">{meta.title}</h1>
          <span className="w-12 shrink-0 sm:w-20" />
        </div>
      </header>

      <div className="px-4 pb-4 pt-8 text-center sm:px-8 sm:pt-10">
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-500">{meta.description}</p>
      </div>

      {isAdmin && (
        <div className="mx-auto mt-4 max-w-lg px-4">
          <CloudinaryUpload onUploadSuccess={addImages} />
        </div>
      )}

      <ImageGallery images={images} isAdmin={isAdmin} onDelete={removeImage} />
    </div>
  );
}
