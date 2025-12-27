'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { t, Locale } from '@/lib/i18n';
import HeroCarousel, { CarouselSlide } from '@/components/custom/hero-carousel';
import ModelVideoCard from '@/components/custom/model-video-card';

// Dados mock como fallback
const MOCK_MODELS = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 25,
    nationality: 'Brasileira',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    tags: ['Conversadora', 'Divertida', 'Inteligente'],
    slug: 'ana-silva',
    shortBio: 'Adoro conversar sobre tudo!',
    longBio: 'Sou uma pessoa extrovertida que adora conhecer pessoas novas e ter conversas interessantes sobre diversos assuntos.',
    conversationStyle: 'Amigável e descontraída',
    interests: ['Música', 'Viagens', 'Gastronomia'],
    gallery: [],
    colors: {
      primary: '#FF1B6D',
      secondary: '#FF6B9D',
    },
  },
  {
    id: '2',
    name: 'Beatriz Costa',
    age: 23,
    nationality: 'Portuguesa',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    tags: ['Carinhosa', 'Atenciosa', 'Romântica'],
    slug: 'beatriz-costa',
    shortBio: 'Sempre pronta para uma boa conversa',
    longBio: 'Gosto de criar conexões verdadeiras e ter conversas profundas sobre a vida.',
    conversationStyle: 'Carinhosa e atenciosa',
    interests: ['Literatura', 'Cinema', 'Arte'],
    gallery: [],
    colors: {
      primary: '#9333EA',
      secondary: '#C084FC',
    },
  },
  {
    id: '3',
    name: 'Carolina Mendes',
    age: 27,
    nationality: 'Brasileira',
    coverPhoto: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
    tags: ['Sofisticada', 'Elegante', 'Culta'],
    slug: 'carolina-mendes',
    shortBio: 'Conversas inteligentes e envolventes',
    longBio: 'Aprecio boas conversas sobre cultura, negócios e experiências de vida.',
    conversationStyle: 'Sofisticada e envolvente',
    interests: ['Negócios', 'Moda', 'Vinhos'],
    gallery: [],
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
    },
  },
];

const DEFAULT_CAROUSEL = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop',
    title: 'Bem-vindo ao Meu Sugar',
    subtitle: 'Conversas premium com IA personalizada',
    textPosition: 'center' as const,
  },
];

// Função auxiliar para retry com exponential backoff
async function fetchWithRetry(url: string, options: RequestInit = {}, maxRetries = 2): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        cache: 'no-store',
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Não fazer retry em caso de abort
      if (lastError.name === 'AbortError') {
        throw lastError;
      }
      
      // Aguardar antes de tentar novamente (exponential backoff)
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  throw lastError;
}

export default function Home() {
  const [locale] = useState<Locale>('pt-BR');
  const [models, setModels] = useState<any[]>(MOCK_MODELS);
  const [isLoading, setIsLoading] = useState(false);
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>(DEFAULT_CAROUSEL);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // Prevenir múltiplas chamadas
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    loadModels();
    loadCarouselSlides();
  }, []);

  const loadModels = async () => {
    try {
      setIsLoading(true);
      const response = await fetchWithRetry('/api/models');
      
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          setModels(data);
        }
      }
    } catch (error) {
      // Silenciosamente usar dados mock em caso de erro
      // Não logar erros de rede para evitar poluir o console
    } finally {
      setIsLoading(false);
    }
  };

  const loadCarouselSlides = async () => {
    try {
      const response = await fetchWithRetry('/api/carousel');

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data) && data.length > 0) {
          setCarouselSlides(data);
        }
      }
    } catch (error) {
      // Silenciosamente usar carousel padrão em caso de erro
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Carousel */}
      <HeroCarousel slides={carouselSlides} autoPlayInterval={5000} />

      {/* Models Grid */}
      <div id="models" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t('models.title', locale)}
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : models.length > 0 ? (
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
          <Link href="/privacidade" className="hover:text-white transition-colors" prefetch={false}>
            {t('footer.privacy', locale)}
          </Link>
          <Link href="/termos" className="hover:text-white transition-colors" prefetch={false}>
            {t('footer.terms', locale)}
          </Link>
        </div>
      </footer>
    </div>
  );
}
