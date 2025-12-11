'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllModels, Model } from '@/lib/models-data';
import { t, Locale } from '@/lib/i18n';

export default function Home() {
  const [locale] = useState<Locale>('pt-BR');
  const [models, setModels] = useState<Model[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const loadModels = async () => {
      const data = await fetchAllModels();
      setModels(data);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (models.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % models.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [models.length]);

  const currentModel = models[currentHeroIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {currentModel && (
          <>
            <Image
              src={currentModel.coverPhoto}
              alt={currentModel.name}
              fill
              className="object-cover transition-opacity duration-1000"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </>
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t('hero.title', locale)}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            {t('hero.subtitle', locale)}
          </p>
          <a
            href="#models"
            className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
          >
            {t('hero.cta', locale)}
          </a>
        </div>

        {/* Hero Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {models.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div id="models" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t('models.title', locale)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <Link
              key={model.id}
              href={`/modelo/${model.slug}`}
              className="group relative rounded-3xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4"
              style={{
                animationDelay: `${index * 150}ms`,
                background: `linear-gradient(135deg, ${model.colors.primary}20, ${model.colors.secondary}20)`,
              }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={model.coverPhoto}
                  alt={model.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{model.name}</h3>
                <p className="text-lg opacity-90 mb-4">
                  {model.age} {t('model.age', locale)} • {model.nationality}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.tags.slice(0, 3).map((tag, tagIndex) => (
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
                  {t('model.chatWith', locale)} {model.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md py-8 text-center text-white/70">
        <p>© 2024 EuAna. {t('footer.rights', locale)}.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white transition-colors">
            {t('footer.privacy', locale)}
          </a>
          <a href="#" className="hover:text-white transition-colors">
            {t('footer.terms', locale)}
          </a>
        </div>
      </footer>
    </div>
  );
}
