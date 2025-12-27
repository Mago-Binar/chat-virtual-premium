import { NextResponse } from 'next/server';

// Biblioteca de mídia armazenada em memória (substituir por banco de dados em produção)
let mediaLibrary: Record<string, any[]> = {
  default: [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
      videoUrl: null,
      title: 'Foto 1',
      tokenCost: 50,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
      videoUrl: null,
      title: 'Foto 2',
      tokenCost: 50,
    },
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelSlug = searchParams.get('modelSlug');

  if (!modelSlug) {
    return NextResponse.json(
      { error: 'modelSlug é obrigatório' },
      { status: 400 }
    );
  }

  const gallery = mediaLibrary[modelSlug] || mediaLibrary.default;

  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { modelSlug, imageUrl, title, tokenCost } = body;

    if (!modelSlug || !imageUrl) {
      return NextResponse.json(
        { error: 'modelSlug e imageUrl são obrigatórios' },
        { status: 400 }
      );
    }

    const newMedia = {
      id: Date.now().toString(),
      imageUrl,
      videoUrl: null,
      title: title || 'Nova mídia',
      tokenCost: tokenCost || 50,
    };

    if (!mediaLibrary[modelSlug]) {
      mediaLibrary[modelSlug] = [];
    }

    mediaLibrary[modelSlug].push(newMedia);

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao adicionar mídia' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modelSlug = searchParams.get('modelSlug');
    const mediaId = searchParams.get('mediaId');

    if (!modelSlug || !mediaId) {
      return NextResponse.json(
        { error: 'modelSlug e mediaId são obrigatórios' },
        { status: 400 }
      );
    }

    if (!mediaLibrary[modelSlug]) {
      return NextResponse.json(
        { error: 'Galeria não encontrada' },
        { status: 404 }
      );
    }

    mediaLibrary[modelSlug] = mediaLibrary[modelSlug].filter(
      (media) => media.id !== mediaId
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar mídia' },
      { status: 500 }
    );
  }
}
