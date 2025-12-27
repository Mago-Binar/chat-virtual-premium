import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET - Buscar links externos
export async function GET() {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json({
        instagram: '',
        twitter: '',
        facebook: '',
        tiktok: '',
        whatsapp: '',
      });
    }

    const { data: links, error } = await supabase
      .from('external_links')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar links externos:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar links externos' },
        { status: 500 }
      );
    }

    // Se não existir, retornar valores padrão
    if (!links) {
      return NextResponse.json({
        instagram: '',
        twitter: '',
        facebook: '',
        tiktok: '',
        whatsapp: '',
      });
    }

    return NextResponse.json({
      instagram: links.instagram,
      twitter: links.twitter,
      facebook: links.facebook,
      tiktok: links.tiktok,
      whatsapp: links.whatsapp,
    });
  } catch (error) {
    console.error('Erro ao buscar links externos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar links externos
export async function PUT(request: NextRequest) {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const { data: existingLinks } = await supabase
      .from('external_links')
      .select('id')
      .single();

    let result;

    if (existingLinks) {
      // Atualizar links existentes
      result = await supabase
        .from('external_links')
        .update({
          instagram: body.instagram || null,
          twitter: body.twitter || null,
          facebook: body.facebook || null,
          tiktok: body.tiktok || null,
          whatsapp: body.whatsapp || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingLinks.id)
        .select()
        .single();
    } else {
      // Criar novos links
      result = await supabase
        .from('external_links')
        .insert({
          instagram: body.instagram || null,
          twitter: body.twitter || null,
          facebook: body.facebook || null,
          tiktok: body.tiktok || null,
          whatsapp: body.whatsapp || null,
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Erro ao atualizar links externos:', result.error);
      return NextResponse.json(
        { error: 'Erro ao atualizar links externos' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      links: {
        instagram: result.data.instagram,
        twitter: result.data.twitter,
        facebook: result.data.facebook,
        tiktok: result.data.tiktok,
        whatsapp: result.data.whatsapp,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar links externos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
