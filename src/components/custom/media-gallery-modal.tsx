'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Play, Loader2, Sparkles } from 'lucide-react';
import { useTokens } from '@/contexts/tokens-context';

interface MediaItem {
  id: string;
  imageUrl: string;
  videoUrl?: string;
  title?: string;
  tokenCost: number;
}

interface MediaGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelSlug: string;
}

export default function MediaGalleryModal({ isOpen, onClose, modelSlug }: MediaGalleryModalProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { tokens, setTokens } = useTokens();

  // Carregar galeria de mídia
  useState(() => {
    if (isOpen) {
      loadMediaGallery();
    }
  });

  const loadMediaGallery = async () => {
    try {
      const response = await fetch(`/api/media-gallery?modelSlug=${modelSlug}`);
      if (response.ok) {
        const data = await response.json();
        setMediaItems(data);
      }
    } catch (error) {
      console.error('Erro ao carregar galeria:', error);
    }
  };

  const handleGenerateVideo = async (item: MediaItem) => {
    if (tokens < item.tokenCost) {
      alert('Tokens insuficientes! Compre mais tokens para continuar.');
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: item.imageUrl,
          mediaId: item.id,
          modelSlug,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Atualizar tokens
        setTokens(tokens - item.tokenCost);
        
        // Atualizar item com vídeo gerado
        setMediaItems((prev) =>
          prev.map((media) =>
            media.id === item.id ? { ...media, videoUrl: data.videoUrl } : media
          )
        );
        
        // Mostrar vídeo
        setSelectedItem({ ...item, videoUrl: data.videoUrl });
        setShowVideo(true);
        
        alert('Vídeo gerado com sucesso!');
      } else {
        alert('Erro ao gerar vídeo. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar vídeo:', error);
      alert('Erro ao gerar vídeo. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-pink-500" />
            Galeria de Mídia
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {selectedItem ? (
            // Visualização detalhada
            <div className="space-y-6">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setShowVideo(false);
                }}
                className="text-white/60 hover:text-white transition-colors"
              >
                ← Voltar para galeria
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                {showVideo && selectedItem.videoUrl ? (
                  <video
                    src={selectedItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title || 'Mídia'}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                )}
              </div>

              {!showVideo && !selectedItem.videoUrl && (
                <button
                  onClick={() => handleGenerateVideo(selectedItem)}
                  disabled={isGenerating}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Gerando vídeo...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Transformar em vídeo ({selectedItem.tokenCost} tokens)
                    </>
                  )}
                </button>
              )}

              {!showVideo && selectedItem.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Assistir vídeo
                </button>
              )}
            </div>
          ) : (
            // Grid de galeria
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title || 'Mídia'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.videoUrl && (
                    <div className="absolute top-2 right-2 p-2 rounded-full bg-pink-500">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {mediaItems.length === 0 && !selectedItem && (
            <div className="text-center py-20">
              <p className="text-white/60">Nenhuma mídia disponível</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
