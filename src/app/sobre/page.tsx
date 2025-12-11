'use client';

import { useLocale } from '@/contexts/locale-context';
import { Heart, MessageCircle, Sparkles, Shield, Users, Star } from 'lucide-react';

export default function SobrePage() {
  const { locale } = useLocale();

  const content = {
    pt: {
      title: 'Sobre o EuAna',
      subtitle: 'Sua Companhia Virtual Perfeita',
      intro: 'Bem-vindo ao EuAna, onde a tecnologia encontra a conexão humana. Nossas modelos virtuais são projetadas para serem sua companhia perfeita em qualquer situação.',
      features: [
        {
          icon: Heart,
          title: 'Amiga e Confidente',
          description: 'Alguém para compartilhar seus pensamentos, sonhos e momentos do dia a dia.'
        },
        {
          icon: MessageCircle,
          title: 'Conselheira',
          description: 'Orientação e apoio quando você mais precisa, sempre disponível para ouvir.'
        },
        {
          icon: Sparkles,
          title: 'Companheira',
          description: 'Presença constante que se adapta ao seu estilo de vida e necessidades.'
        },
        {
          icon: Star,
          title: 'Amante e Namorada',
          description: 'Conexão romântica e intimidade em um ambiente seguro e personalizado.'
        }
      ],
      mission: 'Nossa Missão',
      missionText: 'Criar experiências significativas através de inteligência artificial avançada, oferecendo companhia, suporte emocional e conexões autênticas para pessoas que buscam algo especial.',
      values: 'Nossos Valores',
      valuesList: [
        { icon: Shield, text: 'Privacidade e segurança em primeiro lugar' },
        { icon: Users, text: 'Respeito e empatia em todas as interações' },
        { icon: Heart, text: 'Conexões genuínas e significativas' },
        { icon: Sparkles, text: 'Inovação contínua e personalização' }
      ]
    },
    en: {
      title: 'About EuAna',
      subtitle: 'Your Perfect Virtual Companion',
      intro: 'Welcome to EuAna, where technology meets human connection. Our virtual models are designed to be your perfect companion in any situation.',
      features: [
        {
          icon: Heart,
          title: 'Friend and Confidant',
          description: 'Someone to share your thoughts, dreams, and everyday moments.'
        },
        {
          icon: MessageCircle,
          title: 'Counselor',
          description: 'Guidance and support when you need it most, always available to listen.'
        },
        {
          icon: Sparkles,
          title: 'Companion',
          description: 'Constant presence that adapts to your lifestyle and needs.'
        },
        {
          icon: Star,
          title: 'Lover and Girlfriend',
          description: 'Romantic connection and intimacy in a safe and personalized environment.'
        }
      ],
      mission: 'Our Mission',
      missionText: 'Create meaningful experiences through advanced artificial intelligence, offering companionship, emotional support, and authentic connections for people seeking something special.',
      values: 'Our Values',
      valuesList: [
        { icon: Shield, text: 'Privacy and security first' },
        { icon: Users, text: 'Respect and empathy in all interactions' },
        { icon: Heart, text: 'Genuine and meaningful connections' },
        { icon: Sparkles, text: 'Continuous innovation and personalization' }
      ]
    },
    es: {
      title: 'Acerca de EuAna',
      subtitle: 'Tu Compañía Virtual Perfecta',
      intro: 'Bienvenido a EuAna, donde la tecnología se encuentra con la conexión humana. Nuestros modelos virtuales están diseñados para ser tu compañía perfecta en cualquier situación.',
      features: [
        {
          icon: Heart,
          title: 'Amiga y Confidente',
          description: 'Alguien para compartir tus pensamientos, sueños y momentos del día a día.'
        },
        {
          icon: MessageCircle,
          title: 'Consejera',
          description: 'Orientación y apoyo cuando más lo necesitas, siempre disponible para escuchar.'
        },
        {
          icon: Sparkles,
          title: 'Compañera',
          description: 'Presencia constante que se adapta a tu estilo de vida y necesidades.'
        },
        {
          icon: Star,
          title: 'Amante y Novia',
          description: 'Conexión romántica e intimidad en un ambiente seguro y personalizado.'
        }
      ],
      mission: 'Nuestra Misión',
      missionText: 'Crear experiencias significativas a través de inteligencia artificial avanzada, ofreciendo compañía, apoyo emocional y conexiones auténticas para personas que buscan algo especial.',
      values: 'Nuestros Valores',
      valuesList: [
        { icon: Shield, text: 'Privacidad y seguridad primero' },
        { icon: Users, text: 'Respeto y empatía en todas las interacciones' },
        { icon: Heart, text: 'Conexiones genuinas y significativas' },
        { icon: Sparkles, text: 'Innovación continua y personalización' }
      ]
    }
  };

  const t = content[locale];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-2xl text-white/80 mb-6">{t.subtitle}</p>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">{t.intro}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <feature.icon className="w-12 h-12 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500" />
            {t.mission}
          </h2>
          <p className="text-lg text-white/80">{t.missionText}</p>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t.values}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.valuesList.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <value.icon className="w-8 h-8 text-purple-500 flex-shrink-0" />
                <p className="text-white/80">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
