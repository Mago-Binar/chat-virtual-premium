import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET - Buscar modelo específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado' },
        { status: 503 }
      );
    }

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
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const body = await request.json();

    // Preparar dados para atualização
    const updateData: Record<string, unknown> = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.age !== undefined) updateData.age = body.age;
    if (body.nationality !== undefined) updateData.nationality = body.nationality;
    if (body.coverPhoto !== undefined) updateData.cover_photo = body.coverPhoto;
    if (body.videoUrl !== undefined) updateData.video_url = body.videoUrl;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.shortBio !== undefined) updateData.short_bio = body.shortBio;
    if (body.longBio !== undefined) updateData.long_bio = body.longBio;
    if (body.conversationStyle !== undefined) updateData.conversation_style = body.conversationStyle;
    if (body.interests !== undefined) updateData.interests = body.interests;
    if (body.gallery !== undefined) updateData.gallery = body.gallery;
    if (body.colors?.primary !== undefined) updateData.primary_color = body.colors.primary;
    if (body.colors?.secondary !== undefined) updateData.secondary_color = body.colors.secondary;

    // Atualizar slug se nome mudou
    if (body.name) {
      updateData.slug = body.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Adicionar timestamp de atualização
    updateData.updated_at = new Date().toISOString();

    const { data: updatedModel, error } = await supabase
      .from('models')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar modelo:', error);
      return NextResponse.json(
        { error: `Erro ao atualizar modelo: ${error.message}` },
        { status: 500 }
      );
    }

    if (!updatedModel) {
      return NextResponse.json(
        { error: 'Modelo não encontrada' },
        { status: 404 }
      );
    }

    // Transformar para o formato esperado
    const transformedModel = {
      id: updatedModel.id,
      name: updatedModel.name,
      age: updatedModel.age,
      nationality: updatedModel.nationality,
      coverPhoto: updatedModel.cover_photo,
      videoUrl: updatedModel.video_url || null,
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
    // Verificar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const { error } = await supabase
      .from('models')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Erro ao excluir modelo:', error);
      return NextResponse.json(
        { error: `Erro ao excluir modelo: ${error.message}` },
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
