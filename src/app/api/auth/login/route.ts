import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      return NextResponse.json(
        { error: 'Banco de dados não configurado. Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 503 }
      );
    }

    const { email, password } = await request.json();

    // Validações
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário no banco
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Email não encontrado', notFound: true },
        { status: 404 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Senha incorreta' },
        { status: 401 }
      );
    }

    // Verificar se 2FA está habilitado
    if (user.two_factor_enabled) {
      // Gerar código 2FA
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutos

      // Salvar código no banco
      await supabase
        .from('users')
        .update({
          two_factor_code: code,
          two_factor_expiry: expiry,
        })
        .eq('id', user.id);

      // Enviar email com código
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: '2fa',
          code,
        }),
      });

      return NextResponse.json({
        success: true,
        needsTwoFactor: true,
        email: user.email,
        code, // Apenas para desenvolvimento
      });
    }

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
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
