'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, X } from 'lucide-react';
import { fetchModelBySlug, Model } from '@/lib/models-data';
import { t, Locale } from '@/lib/i18n';

export default function ModelPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [locale] = useState<Locale>('pt-BR');
  const [model, setModel] = useState<Model | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelData = await fetchModelBySlug(slug);
      if (modelData) {
        setModel(modelData);
      } else {
        router.push('/');
      }
    };
    loadModel();
  }, [slug, router]);

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FF1B6D' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: model.colors.pageBg }}>
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={model.coverPhoto}
          alt={model.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-start">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t('model.back', locale)}</span>
            </Link>
          </div>

          {/* Model Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center bg-white/10 backdrop-blur-md">
              {model.icon ? (
                <span className="text-6xl">{model.icon}</span>
              ) : (
                <Image
                  src={model.gallery[0]}
                  alt={model.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-2">{model.name}</h1>
              <p className="text-xl opacity-90">
                {model.age} {t('model.age', locale)} • {model.nationality}
              </p>
            </div>

            <Link
              href={`/chat/${model.slug}`}
              className="px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
              }}
            >
              {t('model.chatWith', locale)} {model.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* About */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: model.colors.primary }}>
            {t('model.about', locale)}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {model.longBio[locale]}
          </p>
        </section>

        {/* Conversation Style */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: model.colors.primary }}>
            {t('model.conversationStyle', locale)}
          </h2>
          <div className="p-8 rounded-3xl" style={{ backgroundColor: model.colors.cardBg }}>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {model.conversationStyle[locale]}
            </p>
            <div className="flex flex-wrap gap-3">
              {model.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-white font-medium"
                  style={{ backgroundColor: model.colors.secondary }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: model.colors.primary }}>
            {t('model.interests', locale)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {model.interests[locale].map((interest, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl text-center font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: model.colors.cardBg,
                  color: model.colors.secondary,
                }}
              >
                {interest}
              </div>
            ))}
          </div>
        </section>

        {/* Suggested Questions */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: model.colors.primary }}>
            {t('model.suggestedQuestions', locale)}
          </h2>
          <div className="space-y-4">
            {model.suggestedQuestions[locale].map((question, index) => (
              <Link
                key={index}
                href={`/chat/${model.slug}?q=${encodeURIComponent(question)}`}
                className="block p-6 rounded-2xl transition-all duration-300 hover:scale-102 hover:shadow-xl"
                style={{ backgroundColor: model.colors.cardBg }}
              >
                <p className="text-lg font-medium" style={{ color: model.colors.primary }}>
                  {question}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-3xl font-bold mb-6" style={{ color: model.colors.primary }}>
            {t('model.gallery', locale)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {model.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Image
                  src={image}
                  alt={`${model.name} - Foto ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center py-16 px-8 rounded-3xl" style={{ backgroundColor: model.colors.cardBg }}>
          <h2 className="text-4xl font-bold mb-4" style={{ color: model.colors.primary }}>
            {t('model.readyToStart', locale)}
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            {t('model.unforgettableConversation', locale)}
          </p>
          <Link
            href={`/chat/${model.slug}`}
            className="inline-block px-12 py-5 rounded-full font-bold text-white text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
            }}
          >
            {t('model.chatWith', locale)} {model.name}
          </Link>
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[3/4]">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
