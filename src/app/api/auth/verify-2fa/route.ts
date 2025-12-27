import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validações
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email e código são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    // Verificar código
    if (!user.two_factor_code || !user.two_factor_expiry) {
      return NextResponse.json(
        { error: 'Código não encontrado' },
        { status: 400 }
      );
    }

    const now = new Date();
    const expiry = new Date(user.two_factor_expiry);

    if (now > expiry) {
      return NextResponse.json(
        { error: 'Código expirado' },
        { status: 401 }
      );
    }

    if (user.two_factor_code !== code) {
      return NextResponse.json(
        { error: 'Código incorreto' },
        { status: 401 }
      );
    }

    // Limpar código 2FA
    await supabase
      .from('users')
      .update({
        two_factor_code: null,
        two_factor_expiry: null,
      })
      .eq('id', user.id);

    // Login bem-sucedido
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tokens: user.tokens,
        twoFactorEnabled: user.two_factor_enabled,
      },
    });
  } catch (error) {
    console.error('Erro ao verificar 2FA:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
