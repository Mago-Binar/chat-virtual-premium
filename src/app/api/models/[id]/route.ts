import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Buscar modelo específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: model, error } = await supabase
      .from('models')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error || !model) {
      return NextResponse.json(
        { error: 'Modelo não encontrada' },
        { status: 404 }
      );
    }

    // Transformar para o formato esperado
    const transformedModel = {
      id: model.id,
      name: model.name,
      age: model.age,
      nationality: model.nationality,
      coverPhoto: model.cover_photo,
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
    };

    return NextResponse.json(transformedModel);
  } catch (error) {
    console.error('Erro ao buscar modelo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar modelo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Preparar dados para atualização
    const updateData: Record<string, unknown> = {};

    if (body.name) updateData.name = body.name;
    if (body.age) updateData.age = body.age;
    if (body.nationality) updateData.nationality = body.nationality;
    if (body.coverPhoto) updateData.cover_photo = body.coverPhoto;
    if (body.tags) updateData.tags = body.tags;
    if (body.shortBio) updateData.short_bio = body.shortBio;
    if (body.longBio) updateData.long_bio = body.longBio;
    if (body.conversationStyle) updateData.conversation_style = body.conversationStyle;
    if (body.interests) updateData.interests = body.interests;
    if (body.gallery) updateData.gallery = body.gallery;
    if (body.colors?.primary) updateData.primary_color = body.colors.primary;
    if (body.colors?.secondary) updateData.secondary_color = body.colors.secondary;

    // Atualizar slug se nome mudou
    if (body.name) {
      updateData.slug = body.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const { data: updatedModel, error } = await supabase
      .from('models')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar modelo:', error);
      return NextResponse.json(
        { error: 'Erro ao atualizar modelo' },
        { status: 500 }
      );
    }

    // Transformar para o formato esperado
    const transformedModel = {
      id: updatedModel.id,
      name: updatedModel.name,
      age: updatedModel.age,
      nationality: updatedModel.nationality,
      coverPhoto: updatedModel.cover_photo,
      tags: updatedModel.tags || [],
      slug: updatedModel.slug,
      shortBio: updatedModel.short_bio,
      longBio: updatedModel.long_bio,
      conversationStyle: updatedModel.conversation_style,
      interests: updatedModel.interests || [],
      gallery: updatedModel.gallery || [],
      colors: {
        primary: updatedModel.primary_color,
        secondary: updatedModel.secondary_color,
      },
    };

    return NextResponse.json(transformedModel);
  } catch (error) {
    console.error('Erro ao atualizar modelo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir modelo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('models')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Erro ao excluir modelo:', error);
      return NextResponse.json(
        { error: 'Erro ao excluir modelo' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Modelo excluída com sucesso',
    });
  } catch (error) {
    console.error('Erro ao excluir modelo:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
