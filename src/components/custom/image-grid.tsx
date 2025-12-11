'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { t, Locale } from '@/lib/i18n';

interface ImageGridProps {
  images: string[];
  onImageClick: (imageUrl: string) => void;
  onClose: () => void;
  primaryColor: string;
  locale: Locale;
}

export default function ImageGrid({ images, onImageClick, onClose, primaryColor, locale }: ImageGridProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
          {t('imageGrid.title', locale)}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageClick(image)}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src={image}
                alt={`Sugestão ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
