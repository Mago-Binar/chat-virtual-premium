import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Dados mock para quando Supabase não estiver configurado
const MOCK_MODELS = [
  {
    id: '1',
    name: 'Ana Silva',
    age: 25,
    nationality: 'Brasileira',
    coverPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    videoUrl: null,
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
    videoUrl: null,
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
    videoUrl: null,
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

// GET - Buscar todas as modelos
export async function GET() {
  try {
    // Se Supabase não estiver configurado, retornar dados mock
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(MOCK_MODELS, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
          'Content-Type': 'application/json',
        },
      });
    }

    const { data: models, error } = await supabase
      .from('models')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar modelos:', error);
      return NextResponse.json(MOCK_MODELS, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
          'Content-Type': 'application/json',
        },
      });
    }

    // Se não houver modelos no banco, retornar mock
    if (!models || models.length === 0) {
      return NextResponse.json(MOCK_MODELS, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
          'Content-Type': 'application/json',
        },
      });
    }

    // Transformar para o formato esperado pelo frontend
    const transformedModels = models.map(model => ({
      id: model.id,
      name: model.name,
      age: model.age,
      nationality: model.nationality,
      coverPhoto: model.cover_photo,
      videoUrl: model.video_url || null,
      tags: model.tags || [],
      slug: model.slug,
      shortBio: model.short_bio,
      longBio: model.long_bio,
      conversationStyle: model.conversation_style,
      interests: model.interests || [],
      gallery: model.gallery || [],
      colors: {
        primary: model.primary_color,
        secondary: model.secondary_color,
      },
    }));

    return NextResponse.json(transformedModels, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Erro inesperado na API models:', error);
    return NextResponse.json(MOCK_MODELS, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'Content-Type': 'application/json',
      },
    });
  }
}

// POST - Criar nova modelo
export async function POST(request: Request) {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Validações
    if (!body.name || !body.coverPhoto) {
      return NextResponse.json(
        { error: 'Nome e foto de capa são obrigatórios' },
        { status: 400 }
      );
    }

    // Criar slug a partir do nome
    const slug = body.name.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Inserir no banco
    const { data: newModel, error } = await supabase
      .from('models')
      .insert({
        name: body.name,
        age: body.age || 18,
        nationality: body.nationality || '',
        cover_photo: body.coverPhoto,
        video_url: body.videoUrl || null,
        tags: body.tags || [],
        slug,
        short_bio: body.shortBio || '',
        long_bio: body.longBio || '',
        conversation_style: body.conversationStyle || '',
        interests: body.interests || [],
        gallery: body.gallery || [],
        primary_color: body.colors?.primary || '#FF1B6D',
        secondary_color: body.colors?.secondary || '#FF6B9D',
      })
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar modelo:', error);
      return NextResponse.json(
        { error: `Erro ao criar modelo: ${error.message}` },
        { status: 500 }
      );
    }

    // Transformar para o formato esperado
    const transformedModel = {
      id: newModel.id,
      name: newModel.name,
      age: newModel.age,
      nationality: newModel.nationality,
      coverPhoto: newModel.cover_photo,
      videoUrl: newModel.video_url || null,
      tags: newModel.tags || [],
      slug: newModel.slug,
      shortBio: newModel.short_bio,
      longBio: newModel.long_bio,
      conversationStyle: newModel.conversation_style,
      interests: newModel.interests || [],
      gallery: newModel.gallery || [],
      colors: {
        primary: newModel.primary_color,
        secondary: newModel.secondary_color,
      },
    };

    return NextResponse.json(transformedModel, { status: 201 });
  } catch (error) {
    console.error('Erro inesperado ao criar modelo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
