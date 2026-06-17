import { useState, useEffect, useCallback } from 'react';

export function useGallery(category: string) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Read from local storage
    const stored = localStorage.getItem(`gallery_${category}`);
    if (stored) {
      try {
        setImages(JSON.parse(stored));
      } catch (e) {
        setImages([]);
      }
    } else {
      setImages([]);
    }
  }, [category]);

  const addImages = useCallback((urls: string[]) => {
    setImages((prev) => {
      const updated = [...urls, ...prev];
      localStorage.setItem(`gallery_${category}`, JSON.stringify(updated));
      return updated;
    });
  }, [category]);

  const removeImage = useCallback((url: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img !== url);
      localStorage.setItem(`gallery_${category}`, JSON.stringify(updated));
      return updated;
    });
  }, [category]);

  return { images, addImages, removeImage };
}
