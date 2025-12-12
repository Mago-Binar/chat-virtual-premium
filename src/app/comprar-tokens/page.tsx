'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Coins, CreditCard, Smartphone, Bitcoin } from 'lucide-react';
import { useTokens } from '@/contexts/tokens-context';
import { useLocale } from '@/contexts/locale-context';

interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

const packages: TokenPackage[] = [
  { id: 'starter', tokens: 50, price: 19.90 },
  { id: 'basic', tokens: 100, price: 34.90, bonus: 10 },
  { id: 'popular', tokens: 250, price: 79.90, popular: true, bonus: 50 },
  { id: 'premium', tokens: 500, price: 149.90, bonus: 100 },
  { id: 'ultimate', tokens: 1000, price: 279.90, bonus: 250 },
];

type PaymentMethod = 'pix' | 'card' | 'crypto';

export default function ComprarTokensPage() {
  const router = useRouter();
  const { addTokens } = useTokens();
  const { locale } = useLocale();
  const [selectedPackage, setSelectedPackage] = useState<string>('popular');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  const content = {
    pt: {
      title: 'Comprar Tokens',
      subtitle: 'Escolha o pacote perfeito para você',
      tokens: 'Tokens',
      bonus: 'Bônus',
      popular: 'Mais Popular',
      selectPackage: 'Selecionar',
      selected: 'Selecionado',
      paymentMethod: 'Método de Pagamento',
      pix: 'PIX',
      card: 'Cartão de Crédito',
      crypto: 'Criptomoedas',
      total: 'Total',
      buy: 'Comprar Agora',
      processing: 'Processando...',
      features: [
        'Acesso ilimitado a todas as modelos',
        'Geração de imagens em alta qualidade',
        'Conversão de imagem para vídeo',
        'Suporte prioritário 24/7',
        'Sem anúncios',
      ],
    },
    en: {
      title: 'Buy Tokens',
      subtitle: 'Choose the perfect package for you',
      tokens: 'Tokens',
      bonus: 'Bonus',
      popular: 'Most Popular',
      selectPackage: 'Select',
      selected: 'Selected',
      paymentMethod: 'Payment Method',
      pix: 'PIX',
      card: 'Credit Card',
      crypto: 'Cryptocurrencies',
      total: 'Total',
      buy: 'Buy Now',
      processing: 'Processing...',
      features: [
        'Unlimited access to all models',
        'High-quality image generation',
        'Image to video conversion',
        'Priority support 24/7',
        'No ads',
      ],
    },
    es: {
      title: 'Comprar Tokens',
      subtitle: 'Elige el paquete perfecto para ti',
      tokens: 'Tokens',
      bonus: 'Bonificación',
      popular: 'Más Popular',
      selectPackage: 'Seleccionar',
      selected: 'Seleccionado',
      paymentMethod: 'Método de Pago',
      pix: 'PIX',
      card: 'Tarjeta de Crédito',
      crypto: 'Criptomonedas',
      total: 'Total',
      buy: 'Comprar Ahora',
      processing: 'Procesando...',
      features: [
        'Acceso ilimitado a todos los modelos',
        'Generación de imágenes en alta calidad',
        'Conversión de imagen a video',
        'Soporte prioritario 24/7',
        'Sin anuncios',
      ],
    },
  };

  const t = content[locale];
  const selectedPkg = packages.find(p => p.id === selectedPackage);

  const handlePurchase = async () => {
    if (!selectedPkg) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // In production, this would integrate with Kirvano payment gateway
      const totalTokens = selectedPkg.tokens + (selectedPkg.bonus || 0);
      addTokens(totalTokens);
      
      // Show success and redirect
      alert(`✅ Compra realizada com sucesso! ${totalTokens} tokens adicionados à sua conta.`);
      router.push('/conta');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-white/80">
            {t.subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            const totalTokens = pkg.tokens + (pkg.bonus || 0);

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 scale-105 shadow-2xl'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                } ${pkg.popular ? 'ring-4 ring-pink-500' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {t.popular}
                  </div>
                )}

                <div className="text-center">
                  <Coins className={`w-12 h-12 mx-auto mb-4 ${isSelected ? 'text-white' : 'text-pink-500'}`} />
                  
                  <div className="mb-4">
                    <div className={`text-4xl font-bold ${isSelected ? 'text-white' : 'text-white'}`}>
                      {pkg.tokens}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                      {t.tokens}
                    </div>
                  </div>

                  {pkg.bonus && (
                    <div className={`mb-4 px-3 py-1 rounded-full inline-block ${
                      isSelected ? 'bg-white/20' : 'bg-pink-500/20'
                    }`}>
                      <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-pink-500'}`}>
                        +{pkg.bonus} {t.bonus}
                      </span>
                    </div>
                  )}

                  <div className={`text-3xl font-bold mb-4 ${isSelected ? 'text-white' : 'text-white'}`}>
                    R$ {pkg.price.toFixed(2)}
                  </div>

                  <button
                    className={`w-full py-3 rounded-full font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-purple-600'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105'
                    }`}
                  >
                    {isSelected ? t.selected : t.selectPackage}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Section */}
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{t.paymentMethod}</h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setPaymentMethod('pix')}
              className={`p-6 rounded-2xl transition-all ${
                paymentMethod === 'pix'
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">{t.pix}</div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-6 rounded-2xl transition-all ${
                paymentMethod === 'card'
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <CreditCard className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">{t.card}</div>
            </button>

            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`p-6 rounded-2xl transition-all ${
                paymentMethod === 'crypto'
                  ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Bitcoin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">{t.crypto}</div>
            </button>
          </div>

          {/* Summary */}
          {selectedPkg && (
            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/80">{selectedPkg.tokens} {t.tokens}</span>
                <span className="text-white font-semibold">R$ {selectedPkg.price.toFixed(2)}</span>
              </div>
              {selectedPkg.bonus && (
                <div className="flex justify-between items-center mb-4 text-pink-400">
                  <span>+{selectedPkg.bonus} {t.bonus}</span>
                  <span className="font-semibold">Grátis</span>
                </div>
              )}
              <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                <span className="text-white font-bold text-lg">{t.total}</span>
                <span className="text-white font-bold text-2xl">R$ {selectedPkg.price.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mb-6">
            {t.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white/80 mb-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Buy Button */}
          <button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? t.processing : t.buy}
          </button>

          <p className="text-white/60 text-sm text-center mt-4">
            Pagamento processado com segurança via Kirvano
          </p>
        </div>
      </div>
    </div>
  );
}
