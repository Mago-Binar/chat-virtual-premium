'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Send, ImageIcon, X, Coins } from 'lucide-react';
import { fetchModelBySlug, Model } from '@/lib/models-data';
import { t, Locale } from '@/lib/i18n';
import { useTokens } from '@/contexts/tokens-context';
import ImageGrid from '@/components/custom/image-grid';
import VideoConversionModal from '@/components/custom/video-conversion-modal';
import ExitWhatsappModal from '@/components/custom/exit-whatsapp-modal';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  imageUrl?: string;
  timestamp: Date;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const [locale] = useState<Locale>('pt-BR');
  const [model, setModel] = useState<Model | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showImageGrid, setShowImageGrid] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedImageForVideo, setSelectedImageForVideo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { tokens, deductTokens } = useTokens();
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      const modelData = await fetchModelBySlug(slug);
      if (modelData) {
        setModel(modelData);
        
        // Load chat history from localStorage
        const savedHistory = localStorage.getItem(`euana-chat-${slug}`);
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          setMessages(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })));
        } else {
          // Welcome message
          const welcomeMsg: Message = {
            id: Date.now().toString(),
            sender: 'ai',
            text: modelData.welcomeText[locale],
            timestamp: new Date(),
          };
          setMessages([welcomeMsg]);
        }

        // Check for suggested question
        const suggestedQ = searchParams.get('q');
        if (suggestedQ) {
          setTimeout(() => {
            handleSendMessage(suggestedQ);
          }, 500);
        }
      } else {
        router.push('/');
      }
    };
    loadModel();
  }, [slug, locale, router, searchParams]);

  useEffect(() => {
    // Save chat history
    if (messages.length > 0 && model) {
      localStorage.setItem(`euana-chat-${slug}`, JSON.stringify(messages));
    }
  }, [messages, slug, model]);

  useEffect(() => {
    // Auto scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || !model) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(async () => {
      try {
        // Mock response for now
        const mockResponses = [
          'Que interessante! Me conta mais sobre isso...',
          'Adorei saber disso sobre você 💕',
          'Você é muito especial, sabia?',
          'Estou adorando nossa conversa!',
          'Me faz sorrir quando você fala assim...',
        ];

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);

        // If AI sends image, show video modal
        if (aiMessage.imageUrl) {
          setSelectedImageForVideo(aiMessage.imageUrl);
          setShowVideoModal(true);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setIsTyping(false);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleImageClick = (imageUrl: string) => {
    setShowImageGrid(false);
    setSelectedImageForVideo(imageUrl);
    setShowVideoModal(true);
  };

  const handleVideoConversion = (duration: 5 | 10) => {
    const cost = duration === 5 ? 2 : 3;
    
    if (deductTokens(cost)) {
      console.log(`Converting to ${duration}s video (${cost} tokens deducted)`);
      setShowVideoModal(false);
      setSelectedImageForVideo(null);
      alert(`✅ Vídeo de ${duration}s gerado! ${cost} tokens deduzidos.`);
    } else {
      alert('❌ Tokens insuficientes! Compre mais tokens para continuar.');
      router.push('/comprar-tokens');
    }
  };

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#FF1B6D' }}></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div
        className="flex items-center gap-4 p-4 border-b"
        style={{
          backgroundColor: model.colors.primary,
          borderBottomColor: model.colors.secondary,
        }}
      >
        <Link
          href={`/modelo/${model.slug}`}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>

        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-white/10">
          {model.icon ? (
            <span className="text-2xl">{model.icon}</span>
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

        <div className="flex-1">
          <h1 className="text-white font-bold text-lg">{model.name}</h1>
          {isTyping && (
            <p className="text-white/80 text-sm">{t('chat.typing', locale)}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] md:max-w-[60%] ${
                message.sender === 'user'
                  ? 'rounded-3xl px-6 py-4 text-white shadow-lg'
                  : 'rounded-3xl px-6 py-4 bg-white text-gray-800 shadow-md'
              }`}
              style={
                message.sender === 'user'
                  ? {
                      background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
                    }
                  : {}
              }
            >
              {message.imageUrl && (
                <button
                  onClick={() => setSelectedImagePreview(message.imageUrl!)}
                  className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Image
                    src={message.imageUrl}
                    alt="Imagem"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              )}
              <p className="text-base leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-3xl px-6 py-4 shadow-md">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          {model.suggestedImages && model.suggestedImages.length > 0 && (
            <button
              onClick={() => setShowImageGrid(true)}
              className="p-3 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: model.colors.cardBg, color: model.colors.primary }}
            >
              <ImageIcon className="w-6 h-6" />
            </button>
          )}

          <Link
            href="/comprar-tokens"
            className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all hover:scale-110 flex items-center gap-2"
            title="Comprar Tokens"
          >
            <Coins className="w-5 h-5" />
          </Link>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('chat.placeholder', locale)}
            className="flex-1 px-6 py-4 rounded-full border-2 focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder:text-gray-400"
            style={{
              borderColor: model.colors.primary,
              backgroundColor: '#ffffff',
            }}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className="p-4 rounded-full text-white transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: `linear-gradient(135deg, ${model.colors.primary}, ${model.colors.secondary})`,
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Grid Modal */}
      {showImageGrid && model.suggestedImages && (
        <ImageGrid
          images={model.suggestedImages}
          onImageClick={handleImageClick}
          onClose={() => setShowImageGrid(false)}
          primaryColor={model.colors.primary}
          locale={locale}
        />
      )}

      {/* Video Conversion Modal */}
      {showVideoModal && selectedImageForVideo && (
        <VideoConversionModal
          imageUrl={selectedImageForVideo}
          onClose={() => {
            setShowVideoModal(false);
            setSelectedImageForVideo(null);
          }}
          onConvert={handleVideoConversion}
          locale={locale}
          primaryColor={model.colors.primary}
          secondaryColor={model.colors.secondary}
        />
      )}

      {/* Image Preview Modal */}
      {selectedImagePreview && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImagePreview(null)}
        >
          <button
            onClick={() => setSelectedImagePreview(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[3/4]">
            <Image
              src={selectedImagePreview}
              alt="Preview"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}

      {/* Exit WhatsApp Modal */}
      {model.whatsappLink && (
        <ExitWhatsappModal
          whatsappLink={model.whatsappLink}
          locale={locale}
          primaryColor={model.colors.primary}
          secondaryColor={model.colors.secondary}
        />
      )}
    </div>
  );
}
