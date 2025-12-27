'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';
import HeroCarousel, { CarouselSlide } from '@/components/custom/hero-carousel';
import ModelVideoCard from '@/components/custom/model-video-card';

export default function Home() {
  const [locale] = useState<Locale>('pt-BR');
  const [models, setModels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    loadModels();
    loadCarouselSlides();
  }, []);

  const loadModels = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/models');
      
      if (response.ok) {
        const data = await response.json();
        setModels(data);
      } else {
        setModels([]);
      }
    } catch {
      setModels([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCarouselSlides = async () => {
    try {
      const response = await fetch('/api/carousel');
      if (response.ok) {
        const data = await response.json();
        setCarouselSlides(data);
      }
    } catch {
      setCarouselSlides([
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop',
          title: 'Bem-vindo ao Meu Sugar',
          subtitle: 'Conversas premium com IA personalizada',
          textPosition: 'center',
        },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Carousel */}
      <HeroCarousel slides={carouselSlides} autoPlayInterval={5000} />

      {/* Models Grid */}
      <div id="models" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t('models.title', locale)}
        </h2>

        {models.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <ModelVideoCard
                key={model.id}
                model={model}
                index={index}
                locale={locale.split('-')[0]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">Nenhum modelo disponível no momento.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md py-8 text-center text-white/70">
        <p>© 2024 Meu Sugar. {t('footer.rights', locale)}.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacidade" className="hover:text-white transition-colors">
            {t('footer.privacy', locale)}
          </Link>
          <Link href="/termos" className="hover:text-white transition-colors">
            {t('footer.terms', locale)}
          </Link>
        </div>
      </footer>
    </div>
  );
}
