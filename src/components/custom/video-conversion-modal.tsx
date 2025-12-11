'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { Locale, t } from '@/lib/i18n';

interface VideoConversionModalProps {
  imageUrl: string;
  onClose: () => void;
  onConvert: (duration: 5 | 10) => void;
  locale: Locale;
  primaryColor: string;
  secondaryColor: string;
}

export default function VideoConversionModal({
  imageUrl,
  onClose,
  onConvert,
  locale,
  primaryColor,
  secondaryColor,
}: VideoConversionModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-2" style={{ color: primaryColor }}>
            {t('chat.transformToVideo', locale)}
          </h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => onConvert(5)}
            className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            {t('chat.video5s', locale)}
          </button>

          <button
            onClick={() => onConvert(10)}
            className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`,
            }}
          >
            {t('chat.video10s', locale)}
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
          >
            {t('chat.cancel', locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
