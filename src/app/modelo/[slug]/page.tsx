'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { getModels, StoredModel } from '@/lib/storage';
import { fetchModelBySlug } from '@/lib/models-data';

export default function ModelPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModel();

    // Sincronização em tempo real
    const handleModelsUpdate = () => {
      loadModel();
    };

    window.addEventListener('models-updated', handleModelsUpdate);
    
    return () => {
      window.removeEventListener('models-updated', handleModelsUpdate);
    };
  }, [slug]);

  const loadModel = async () => {
    setLoading(true);
    
    // Tentar pegar do storage primeiro
    const storedModels = getModels();
    const storedModel = storedModels.find((m: StoredModel) => m.slug === slug);
    
    if (storedModel) {
      // Converter para formato compatível
      setModel({
        id: parseInt(storedModel.id),
        slug: storedModel.slug,
        name: storedModel.name,
        age: storedModel.age,
        nationality: storedModel.nationality,
        coverPhoto: storedModel.coverPhoto,
        colors: {
          primary: storedModel.colors.primary,
          secondary: storedModel.colors.secondary,
        },
        tags: storedModel.tags,
        shortBio: storedModel.shortBio,
        longBio: storedModel.longBio,
        conversationStyle: storedModel.conversationStyle,
        interests: storedModel.interests,
        gallery: storedModel.gallery,
      });
    } else {
      // Se não encontrar no storage, buscar nos dados padrão
      const defaultModel = await fetchModelBySlug(slug);
      if (defaultModel) {
        setModel(defaultModel);
      } else {
        router.push('/');
      }
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!model) {
    return null;
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, #000000, ${model.colors.primary}20, #000000)`,
      }}
    >
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        {/* Model Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{model.name}</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6">
              {model.age} anos • {model.nationality}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {model.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Heart className="w-8 h-8" style={{ color: model.colors.primary }} />
                Sobre Mim
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {model.longBio}
              </p>
            </div>

            {/* Conversation Style */}
            {model.conversationStyle && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8" style={{ color: model.colors.primary }} />
                  Meu Estilo
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {model.conversationStyle}
                </p>
              </div>
            )}

            {/* Gallery */}
            {model.gallery && model.gallery.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h2 className="text-3xl font-bold text-white mb-6">Galeria</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {model.gallery.map((photo: string, index: number) => (
                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group">
                      <Image
                        src={photo}
                        alt={`${model.name} - Foto ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div 
              className="rounded-3xl p-8 text-white"
              style={{
                background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
              }}
            >
              <Sparkles className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Conversar com {model.name}</h3>
              <p className="mb-6 opacity-90">
                Comece uma conversa exclusiva e personalizada agora mesmo!
              </p>
              <Link
                href={`/chat/${model.slug}`}
                className="block w-full py-4 bg-white text-center font-bold rounded-xl hover:scale-105 transition-all"
                style={{ color: model.colors.primary }}
              >
                Iniciar Chat
              </Link>
            </div>

            {/* Interests */}
            {model.interests && model.interests.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Interesses</h3>
                <div className="flex flex-wrap gap-2">
                  {model.interests.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-white/10 text-white"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Conversas</span>
                  <span className="text-white font-bold">1.2k+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Avaliação</span>
                  <span className="text-white font-bold">⭐ 4.9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Resposta</span>
                  <span className="text-white font-bold">Instantânea</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
