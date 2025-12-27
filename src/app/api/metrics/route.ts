import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET - Buscar métricas
export async function GET() {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      // Retornar métricas padrão quando Supabase não está configurado
      return NextResponse.json({
        activeUsers: 0,
        monthlyRevenue: 0,
        tokensSold: 0,
        newUsers: 0,
      });
    }

    const { data: metrics, error } = await supabase
      .from('metrics')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      // Retornar métricas padrão em caso de erro
      return NextResponse.json({
        activeUsers: 0,
        monthlyRevenue: 0,
        tokensSold: 0,
        newUsers: 0,
      });
    }

    // Se não existir, retornar valores padrão
    if (!metrics) {
      return NextResponse.json({
        activeUsers: 0,
        monthlyRevenue: 0,
        tokensSold: 0,
        newUsers: 0,
      });
    }

    return NextResponse.json({
      activeUsers: metrics.active_users,
      monthlyRevenue: metrics.monthly_revenue,
      tokensSold: metrics.tokens_sold,
      newUsers: metrics.new_users,
    });
  } catch {
    // Retornar métricas padrão em caso de erro
    return NextResponse.json({
      activeUsers: 0,
      monthlyRevenue: 0,
      tokensSold: 0,
      newUsers: 0,
    });
  }
}

// PUT - Atualizar métricas
export async function PUT(request: Request) {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const body = await request.json();

    const { data: existingMetrics } = await supabase
      .from('metrics')
      .select('id')
      .single();

    let result;

    if (existingMetrics) {
      // Atualizar métricas existentes
      result = await supabase
        .from('metrics')
        .update({
          active_users: body.activeUsers,
          monthly_revenue: body.monthlyRevenue,
          tokens_sold: body.tokensSold,
          new_users: body.newUsers,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingMetrics.id)
        .select()
        .single();
    } else {
      // Criar novas métricas
      result = await supabase
        .from('metrics')
        .insert({
          active_users: body.activeUsers || 0,
          monthly_revenue: body.monthlyRevenue || 0,
          tokens_sold: body.tokensSold || 0,
          new_users: body.newUsers || 0,
        })
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar métricas' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      metrics: {
        activeUsers: result.data.active_users,
        monthlyRevenue: result.data.monthly_revenue,
        tokensSold: result.data.tokens_sold,
        newUsers: result.data.new_users,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
