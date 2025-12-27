import { NextResponse } from 'next/server';

// Dados do carrossel armazenados em memória (substituir por banco de dados em produção)
let carouselSlides = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&h=1080&fit=crop',
    title: 'Bem-vindo ao Meu Sugar',
    subtitle: 'Conversas premium com IA personalizada',
    textPosition: 'center',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop',
    title: 'Conheça Nossas Modelos',
    subtitle: 'Experiências únicas e personalizadas',
    textPosition: 'left',
  },
];

export async function GET() {
  return NextResponse.json(carouselSlides);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, title, subtitle, textPosition } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL da imagem é obrigatória' },
        { status: 400 }
      );
    }

    const newSlide = {
      id: Date.now().toString(),
      imageUrl,
      title: title || '',
      subtitle: subtitle || '',
      textPosition: textPosition || 'center',
    };

    carouselSlides.push(newSlide);

    return NextResponse.json(newSlide, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar slide' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, imageUrl, title, subtitle, textPosition } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID do slide é obrigatório' },
        { status: 400 }
      );
    }

    const slideIndex = carouselSlides.findIndex((slide) => slide.id === id);

    if (slideIndex === -1) {
      return NextResponse.json(
        { error: 'Slide não encontrado' },
        { status: 404 }
      );
    }

    carouselSlides[slideIndex] = {
      ...carouselSlides[slideIndex],
      imageUrl: imageUrl || carouselSlides[slideIndex].imageUrl,
      title: title !== undefined ? title : carouselSlides[slideIndex].title,
      subtitle: subtitle !== undefined ? subtitle : carouselSlides[slideIndex].subtitle,
      textPosition: textPosition || carouselSlides[slideIndex].textPosition,
    };

    return NextResponse.json(carouselSlides[slideIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar slide' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID do slide é obrigatório' },
        { status: 400 }
      );
    }

    const slideIndex = carouselSlides.findIndex((slide) => slide.id === id);

    if (slideIndex === -1) {
      return NextResponse.json(
        { error: 'Slide não encontrado' },
        { status: 404 }
      );
    }

    carouselSlides.splice(slideIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar slide' },
      { status: 500 }
    );
  }
}
