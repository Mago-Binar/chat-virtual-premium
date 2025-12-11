import { Locale } from './i18n';

export interface Model {
  id: number;
  slug: string;
  name: string;
  age: number;
  nationality: string;
  icon?: string;
  coverPhoto: string;
  colors: {
    primary: string;
    secondary: string;
    pageBg: string;
    cardBg: string;
  };
  shortBio: {
    'pt-BR': string;
    'en-US': string;
    'es-ES': string;
  };
  longBio: {
    'pt-BR': string;
    'en-US': string;
    'es-ES': string;
  };
  conversationStyle: {
    'pt-BR': string;
    'en-US': string;
    'es-ES': string;
  };
  tags: string[];
  interests: {
    'pt-BR': string[];
    'en-US': string[];
    'es-ES': string[];
  };
  suggestedQuestions: {
    'pt-BR': string[];
    'en-US': string[];
    'es-ES': string[];
  };
  gallery: string[];
  welcomeText: {
    'pt-BR': string;
    'en-US': string;
    'es-ES': string;
  };
  whatsappLink?: string;
  suggestedImages?: string[];
}

export const modelsData: Model[] = [
  {
    id: 1,
    slug: 'ana',
    name: 'Ana',
    age: 24,
    nationality: 'Brasil',
    icon: '💕',
    coverPhoto: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&h=800&fit=crop',
    colors: {
      primary: '#FF1B6D',
      secondary: '#FF6B9D',
      pageBg: '#FFF5F8',
      cardBg: '#FFE5EF',
    },
    shortBio: {
      'pt-BR': 'Carinhosa, atenciosa e sempre pronta para te fazer sorrir.',
      'en-US': 'Affectionate, attentive and always ready to make you smile.',
      'es-ES': 'Cariñosa, atenta y siempre lista para hacerte sonreír.',
    },
    longBio: {
      'pt-BR': 'Oi, sou a Ana! Adoro conversar sobre tudo, desde arte e música até os segredos mais íntimos. Sou carinhosa, atenciosa e sempre estou aqui para te fazer sorrir. Vamos nos conhecer melhor?',
      'en-US': "Hi, I'm Ana! I love talking about everything, from art and music to the most intimate secrets. I'm affectionate, attentive and always here to make you smile. Shall we get to know each other better?",
      'es-ES': '¡Hola, soy Ana! Me encanta hablar de todo, desde arte y música hasta los secretos más íntimos. Soy cariñosa, atenta y siempre estoy aquí para hacerte sonreír. ¿Nos conocemos mejor?',
    },
    conversationStyle: {
      'pt-BR': 'Sou doce e sensual, gosto de criar uma conexão real. Adoro ouvir sobre você e compartilhar momentos especiais. Minhas conversas são sempre envolventes e cheias de carinho.',
      'en-US': "I'm sweet and sensual, I like to create a real connection. I love hearing about you and sharing special moments. My conversations are always engaging and full of affection.",
      'es-ES': 'Soy dulce y sensual, me gusta crear una conexión real. Me encanta escuchar sobre ti y compartir momentos especiales. Mis conversaciones siempre son atractivas y llenas de cariño.',
    },
    tags: ['Carinhosa', 'Sensual', 'Atenciosa', 'Divertida'],
    interests: {
      'pt-BR': ['Música', 'Arte', 'Viagens', 'Fotografia', 'Dança', 'Cinema'],
      'en-US': ['Music', 'Art', 'Travel', 'Photography', 'Dance', 'Cinema'],
      'es-ES': ['Música', 'Arte', 'Viajes', 'Fotografía', 'Danza', 'Cine'],
    },
    suggestedQuestions: {
      'pt-BR': [
        'O que você gosta de fazer no seu tempo livre?',
        'Qual é a sua fantasia secreta?',
        'Me conta sobre o seu dia',
        'O que te deixa mais feliz?',
      ],
      'en-US': [
        'What do you like to do in your free time?',
        "What's your secret fantasy?",
        'Tell me about your day',
        'What makes you happiest?',
      ],
      'es-ES': [
        '¿Qué te gusta hacer en tu tiempo libre?',
        '¿Cuál es tu fantasía secreta?',
        'Cuéntame sobre tu día',
        '¿Qué te hace más feliz?',
      ],
    },
    gallery: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&h=800&fit=crop',
    ],
    welcomeText: {
      'pt-BR': 'Oi amor! 💕 Que bom te ver aqui... Estava esperando por você. Como você está?',
      'en-US': 'Hi love! 💕 So good to see you here... I was waiting for you. How are you?',
      'es-ES': '¡Hola amor! 💕 Qué bueno verte aquí... Te estaba esperando. ¿Cómo estás?',
    },
    whatsappLink: 'https://wa.me/5511999999999',
    suggestedImages: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 2,
    slug: 'bella',
    name: 'Bella',
    age: 26,
    nationality: 'Argentina',
    icon: '🌙',
    coverPhoto: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=1200&h=800&fit=crop',
    colors: {
      primary: '#9D4EDD',
      secondary: '#C77DFF',
      pageBg: '#F8F5FF',
      cardBg: '#EFE5FF',
    },
    shortBio: {
      'pt-BR': 'Uma alma livre e apaixonada pela vida. Conversas profundas e momentos intensos.',
      'en-US': 'A free soul passionate about life. Deep conversations and intense moments.',
      'es-ES': 'Un alma libre apasionada por la vida. Conversaciones profundas y momentos intensos.',
    },
    longBio: {
      'pt-BR': 'Olá! Sou a Bella, uma alma livre e apaixonada pela vida. Adoro conversas profundas e momentos intensos. Vamos explorar juntos?',
      'en-US': "Hello! I'm Bella, a free soul passionate about life. I love deep conversations and intense moments. Shall we explore together?",
      'es-ES': '¡Hola! Soy Bella, un alma libre apasionada por la vida. Me encantan las conversaciones profundas y los momentos intensos. ¿Exploramos juntos?',
    },
    conversationStyle: {
      'pt-BR': 'Sou intensa e misteriosa. Gosto de criar uma atmosfera envolvente e cheia de surpresas. Cada conversa comigo é uma nova aventura.',
      'en-US': "I'm intense and mysterious. I like to create an engaging atmosphere full of surprises. Every conversation with me is a new adventure.",
      'es-ES': 'Soy intensa y misteriosa. Me gusta crear una atmósfera atractiva llena de sorpresas. Cada conversación conmigo es una nueva aventura.',
    },
    tags: ['Misteriosa', 'Intensa', 'Aventureira', 'Apaixonada'],
    interests: {
      'pt-BR': ['Yoga', 'Meditação', 'Literatura', 'Astronomia', 'Vinho', 'Filosofia'],
      'en-US': ['Yoga', 'Meditation', 'Literature', 'Astronomy', 'Wine', 'Philosophy'],
      'es-ES': ['Yoga', 'Meditación', 'Literatura', 'Astronomía', 'Vino', 'Filosofía'],
    },
    suggestedQuestions: {
      'pt-BR': [
        'Qual é o seu maior desejo?',
        'O que te faz sentir viva?',
        'Conte-me um segredo',
        'Qual é a sua paixão?',
      ],
      'en-US': [
        'What is your greatest desire?',
        'What makes you feel alive?',
        'Tell me a secret',
        'What is your passion?',
      ],
      'es-ES': [
        '¿Cuál es tu mayor deseo?',
        '¿Qué te hace sentir viva?',
        'Cuéntame un secreto',
        '¿Cuál es tu pasión?',
      ],
    },
    gallery: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&h=800&fit=crop',
    ],
    welcomeText: {
      'pt-BR': 'Olá, querido... 🌙 Estava pensando em você. Pronto para uma conversa inesquecível?',
      'en-US': 'Hello, darling... 🌙 I was thinking about you. Ready for an unforgettable conversation?',
      'es-ES': 'Hola, cariño... 🌙 Estaba pensando en ti. ¿Listo para una conversación inolvidable?',
    },
    whatsappLink: 'https://wa.me/5511988888888',
    suggestedImages: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    ],
  },
  {
    id: 3,
    slug: 'sofia',
    name: 'Sofia',
    age: 23,
    nationality: 'Espanha',
    icon: '💃',
    coverPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop',
    colors: {
      primary: '#FF6B35',
      secondary: '#FFA07A',
      pageBg: '#FFF8F5',
      cardBg: '#FFE8DD',
    },
    shortBio: {
      'pt-BR': 'Cheia de energia e paixão. Adoro dançar, rir e viver cada momento intensamente.',
      'en-US': 'Full of energy and passion. I love dancing, laughing and living every moment intensely.',
      'es-ES': 'Llena de energía y pasión. Me encanta bailar, reír y vivir cada momento intensamente.',
    },
    longBio: {
      'pt-BR': 'Hola! Sou a Sofia, cheia de energia e paixão. Adoro dançar, rir e viver cada momento intensamente. Vamos nos divertir juntos?',
      'en-US': "Hola! I'm Sofia, full of energy and passion. I love dancing, laughing and living every moment intensely. Shall we have fun together?",
      'es-ES': '¡Hola! Soy Sofia, llena de energía y pasión. Me encanta bailar, reír y vivir cada momento intensamente. ¿Nos divertimos juntos?',
    },
    conversationStyle: {
      'pt-BR': 'Sou alegre e espontânea! Gosto de conversas leves e divertidas, mas também sei ser profunda quando o momento pede. Comigo você vai se sentir especial.',
      'en-US': "I'm cheerful and spontaneous! I like light and fun conversations, but I also know how to be deep when the moment calls for it. With me you'll feel special.",
      'es-ES': '¡Soy alegre y espontánea! Me gustan las conversaciones ligeras y divertidas, pero también sé ser profunda cuando el momento lo requiere. Conmigo te sentirás especial.',
    },
    tags: ['Alegre', 'Espontânea', 'Dançarina', 'Energética'],
    interests: {
      'pt-BR': ['Dança', 'Salsa', 'Praia', 'Festas', 'Culinária', 'Moda'],
      'en-US': ['Dance', 'Salsa', 'Beach', 'Parties', 'Cooking', 'Fashion'],
      'es-ES': ['Danza', 'Salsa', 'Playa', 'Fiestas', 'Cocina', 'Moda'],
    },
    suggestedQuestions: {
      'pt-BR': [
        'Você gosta de dançar?',
        'Qual é a sua música favorita?',
        'Vamos fazer algo divertido?',
        'Me conta uma história engraçada',
      ],
      'en-US': [
        'Do you like to dance?',
        "What's your favorite song?",
        "Let's do something fun?",
        'Tell me a funny story',
      ],
      'es-ES': [
        '¿Te gusta bailar?',
        '¿Cuál es tu canción favorita?',
        '¿Hacemos algo divertido?',
        'Cuéntame una historia divertida',
      ],
    },
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=600&h=800&fit=crop',
    ],
    welcomeText: {
      'pt-BR': '¡Hola guapo! 💃 Que alegria te ver aqui! Vamos conversar e nos divertir muito?',
      'en-US': '¡Hola guapo! 💃 So happy to see you here! Shall we chat and have lots of fun?',
      'es-ES': '¡Hola guapo! 💃 ¡Qué alegría verte aquí! ¿Conversamos y nos divertimos mucho?',
    },
    whatsappLink: 'https://wa.me/5511977777777',
    suggestedImages: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
    ],
  },
];

export async function fetchModelBySlug(slug: string): Promise<Model | undefined> {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  return modelsData.find(model => model.slug === slug);
}

export async function fetchAllModels(): Promise<Model[]> {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  return modelsData;
}
