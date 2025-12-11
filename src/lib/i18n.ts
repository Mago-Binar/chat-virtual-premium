export type Locale = 'pt-BR' | 'en-US' | 'es-ES';

export const translations = {
  'pt-BR': {
    nav: {
      home: 'Início',
      models: 'Modelos',
      about: 'Sobre',
      contact: 'Contato',
    },
    hero: {
      title: 'Suas Fantasias Ganham Vida',
      subtitle: 'Converse com modelos virtuais incríveis em tempo real',
      cta: 'Explorar Modelos',
    },
    models: {
      title: 'Conheça Nossas Modelos',
    },
    model: {
      about: 'Sobre',
      conversationStyle: 'Estilo de Conversa',
      interests: 'Interesses',
      suggestedQuestions: 'Perguntas Sugeridas',
      gallery: 'Galeria',
      chatWith: 'Conversar com',
      back: 'Voltar',
      age: 'anos',
      readyToStart: 'Pronto para começar?',
      unforgettableConversation: 'Vamos ter uma conversa inesquecível juntos...',
    },
    chat: {
      typing: 'digitando...',
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      welcome: 'Olá! Como posso te ajudar hoje?',
      imageButton: 'Enviar imagem',
      transformToVideo: 'Transformar esta imagem em vídeo?',
      video5s: 'Vídeo 5s (2 tokens)',
      video10s: 'Vídeo 10s (3 tokens)',
      cancel: 'Cancelar',
    },
    imageGrid: {
      title: 'Escolha uma imagem',
    },
    exitModal: {
      title: 'Ei amor... já vai embora?',
      subtitle: 'Vou ficar sozinha aqui sem você...',
      description: 'Me adiciona no Whats e vou com você 💕',
      cta: 'Adicionar no WhatsApp',
      close: 'Fechar',
    },
    footer: {
      rights: 'Todos os direitos reservados',
      privacy: 'Privacidade',
      terms: 'Termos',
    },
  },
  'en-US': {
    nav: {
      home: 'Home',
      models: 'Models',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      title: 'Your Fantasies Come to Life',
      subtitle: 'Chat with amazing virtual models in real-time',
      cta: 'Explore Models',
    },
    models: {
      title: 'Meet Our Models',
    },
    model: {
      about: 'About',
      conversationStyle: 'Conversation Style',
      interests: 'Interests',
      suggestedQuestions: 'Suggested Questions',
      gallery: 'Gallery',
      chatWith: 'Chat with',
      back: 'Back',
      age: 'years old',
      readyToStart: 'Ready to start?',
      unforgettableConversation: "Let's have an unforgettable conversation together...",
    },
    chat: {
      typing: 'typing...',
      placeholder: 'Type your message...',
      send: 'Send',
      welcome: 'Hello! How can I help you today?',
      imageButton: 'Send image',
      transformToVideo: 'Transform this image into video?',
      video5s: 'Video 5s (2 tokens)',
      video10s: 'Video 10s (3 tokens)',
      cancel: 'Cancel',
    },
    imageGrid: {
      title: 'Choose an image',
    },
    exitModal: {
      title: 'Hey babe... leaving already?',
      subtitle: "I'll be here alone without you...",
      description: 'Add me on WhatsApp and take me with you 💕',
      cta: 'Add on WhatsApp',
      close: 'Close',
    },
    footer: {
      rights: 'All rights reserved',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  'es-ES': {
    nav: {
      home: 'Inicio',
      models: 'Modelos',
      about: 'Acerca',
      contact: 'Contacto',
    },
    hero: {
      title: 'Tus Fantasías Cobran Vida',
      subtitle: 'Chatea con increíbles modelos virtuales en tiempo real',
      cta: 'Explorar Modelos',
    },
    models: {
      title: 'Conoce Nuestras Modelos',
    },
    model: {
      about: 'Acerca',
      conversationStyle: 'Estilo de Conversación',
      interests: 'Intereses',
      suggestedQuestions: 'Preguntas Sugeridas',
      gallery: 'Galería',
      chatWith: 'Chatear con',
      back: 'Volver',
      age: 'años',
      readyToStart: '¿Listo para empezar?',
      unforgettableConversation: 'Vamos a tener una conversación inolvidable juntos...',
    },
    chat: {
      typing: 'escribiendo...',
      placeholder: 'Escribe tu mensaje...',
      send: 'Enviar',
      welcome: '¡Hola! ¿Cómo puedo ayudarte hoy?',
      imageButton: 'Enviar imagen',
      transformToVideo: '¿Transformar esta imagen en video?',
      video5s: 'Video 5s (2 tokens)',
      video10s: 'Video 10s (3 tokens)',
      cancel: 'Cancelar',
    },
    imageGrid: {
      title: 'Elige una imagen',
    },
    exitModal: {
      title: 'Oye amor... ¿ya te vas?',
      subtitle: 'Me quedaré sola aquí sin ti...',
      description: 'Agrégame en WhatsApp y voy contigo 💕',
      cta: 'Agregar en WhatsApp',
      close: 'Cerrar',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      privacy: 'Privacidad',
      terms: 'Términos',
    },
  },
};

export function t(key: string, locale: Locale = 'pt-BR'): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
