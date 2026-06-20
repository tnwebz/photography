import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useGallery(category: string) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!category) return;
    
    const docRef = doc(db, 'galleries', category);
    
    // Subscribe to real-time updates from Firestore
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Since we prepend locally, but Firestore arrayUnion appends, 
        // we keep the data in whatever order it is saved.
        // We ensure data.urls exists and is an array.
        setImages(Array.isArray(data.urls) ? data.urls : []);
      } else {
        setImages([]);
      }
    });

    return () => unsubscribe();
  }, [category]);

  const addImages = useCallback(async (urls: string[]) => {
    if (!category || urls.length === 0) return;
    
    const docRef = doc(db, 'galleries', category);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, update it by prepending new images to existing ones.
      // Firestore's arrayUnion only appends. To prepend, we can just update the whole array.
      const existingUrls = docSnap.data().urls || [];
      const updatedUrls = [...urls, ...existingUrls];
      await updateDoc(docRef, { urls: updatedUrls });
    } else {
      // Document doesn't exist, create it with the URLs.
      await setDoc(docRef, { urls: urls });
    }
  }, [category]);

  const removeImage = useCallback(async (url: string) => {
    if (!category || !url) return;
    
    const docRef = doc(db, 'galleries', category);
    await updateDoc(docRef, {
      urls: arrayRemove(url)
    });
  }, [category]);

  return { images, addImages, removeImage };
}
