import { useState, useRef } from 'react';

type CloudinaryUploadProps = {
  onUploadSuccess: (urls: string[]) => void;
};

export function CloudinaryUpload({ onUploadSuccess }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const files = Array.from(fileInputRef.current?.files || []);
    if (files.length === 0) return;

    if (files.length > 5) {
      alert('You can only upload a maximum of 5 images at a time!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const hasLargeFile = files.some((file) => file.size > 4 * 1024 * 1024);
    if (hasLargeFile) {
      alert('One or more files exceed the 4MB limit!');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        const response = await fetch('https://api.cloudinary.com/v1_1/dtsh613l2/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.secure_url) {
          return data.secure_url as string;
        } else {
          throw new Error(data.error?.message || 'Unknown error');
        }
      });

      const urls = await Promise.all(uploadPromises);
      setPreviews(urls);
      onUploadSuccess(urls);
      alert('Upload successful!');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
      <h3 className="font-serif text-lg text-black">Upload New Photos (Max 5)</h3>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="w-full max-w-sm rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-orange-500 focus:outline-none"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="rounded bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Photos'}
      </button>

      {previews.length > 0 && (
        <div className="mt-4 flex flex-col items-center w-full">
          <p className="mb-2 text-xs text-zinc-500">Previews:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {previews.map((preview, i) => (
              <img key={i} src={preview} alt="Uploaded preview" className="h-16 w-16 sm:h-20 sm:w-20 rounded object-cover shadow" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
