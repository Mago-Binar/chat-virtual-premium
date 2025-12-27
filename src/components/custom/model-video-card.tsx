'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ModelVideoCardProps {
  model: {
    id: number;
    slug: string;
    name: string;
    age: number;
    nationality: string;
    coverPhoto: string;
    videoUrl?: string;
    colors: {
      primary: string;
      secondary: string;
    };
    tags: string[];
  };
  index: number;
  locale: string;
}

export default function ModelVideoCard({ model, index, locale }: ModelVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (model.videoUrl && videoRef.current) {
      setIsPlaying(true);
      setHasPlayed(true);
      videoRef.current.currentTime = 0;
      videoRef.current.play();

      // Para o vídeo após 5 segundos
      timeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }, 5000);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTouchStart = () => {
    if (model.videoUrl && videoRef.current) {
      if (isPlaying) {
        // Se já está tocando, para
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        // Se não está tocando, inicia
        setIsPlaying(true);
        setHasPlayed(true);
        videoRef.current.currentTime = 0;
        videoRef.current.play();

        // Para o vídeo após 5 segundos
        timeoutRef.current = setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }, 5000);
      }
    }
  };

  const translations = {
    pt: {
      age: 'anos',
      chatWith: 'Conversar com',
    },
    en: {
      age: 'years old',
      chatWith: 'Chat with',
    },
    es: {
      age: 'años',
      chatWith: 'Chatear con',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.pt;

  return (
    <Link
      href={`/modelo/${model.slug}`}
      className="group relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4"
      style={{
        animationDelay: `${index * 150}ms`,
        background: `linear-gradient(135deg, ${model.colors.primary}20, ${model.colors.secondary}20)`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div className="relative aspect-[3/4]">
        {/* Imagem de capa */}
        <Image
          src={model.coverPhoto}
          alt={model.name}
          fill
          className={`object-cover transition-all duration-500 ${
            isPlaying ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
          }`}
          unoptimized
        />

        {/* Vídeo (se disponível) */}
        {model.videoUrl && (
          <video
            ref={videoRef}
            src={model.videoUrl}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            playsInline
            preload={hasPlayed ? 'auto' : 'none'}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">{model.name}</h3>
        <p className="text-lg opacity-90 mb-4">
          {model.age} {t.age} • {model.nationality}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {model.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
          }}
        >
          {t.chatWith} {model.name}
        </div>
      </div>
    </Link>
  );
}
