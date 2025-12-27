import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// GET - Buscar página legal por tipo
export async function GET(request: NextRequest) {
  try {
    // Validar se Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      const { searchParams } = new URL(request.url);
      const type = searchParams.get('type') as 'terms' | 'privacy';
      const defaultContent = getDefaultLegalContent(type || 'terms');
      return NextResponse.json({
        id: type,
        type,
        title: type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade',
        content: defaultContent,
      });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'terms' | 'privacy';

    if (!type || !['terms', 'privacy'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo inválido. Use "terms" ou "privacy"' },
        { status: 400 }
      );
    }

    const { data: page, error } = await supabase
      .from('legal_pages')
      .select('*')
      .eq('type', type)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar página legal:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar página legal' },
        { status: 500 }
      );
    }

    // Se não existir, retornar conteúdo padrão
    if (!page) {
      const defaultContent = getDefaultLegalContent(type);
      return NextResponse.json({
        id: type,
        type,
        title: type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade',
        content: defaultContent,
      });
    }

    return NextResponse.json({
      id: page.id,
      type: page.type,
      title: page.title,
      content: page.content,
    });
  } catch (error) {
    console.error('Erro ao buscar página legal:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar página legal
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
    const { type, title, content } = body;

    if (!type || !['terms', 'privacy'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo inválido. Use "terms" ou "privacy"' },
        { status: 400 }
      );
    }

    const { data: existingPage } = await supabase
      .from('legal_pages')
      .select('id')
      .eq('type', type)
      .single();

    let result;

    if (existingPage) {
      // Atualizar página existente
      result = await supabase
        .from('legal_pages')
        .update({
          title,
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('type', type)
        .select()
        .single();
    } else {
      // Criar nova página
      result = await supabase
        .from('legal_pages')
        .insert({
          type,
          title,
          content,
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Erro ao atualizar página legal:', result.error);
      return NextResponse.json(
        { error: 'Erro ao atualizar página legal' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      page: {
        id: result.data.id,
        type: result.data.type,
        title: result.data.title,
        content: result.data.content,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar página legal:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

function getDefaultLegalContent(type: 'terms' | 'privacy'): string {
  if (type === 'terms') {
    return `# Termos de Uso\n\nÚltima atualização: ${new Date().toLocaleDateString('pt-BR')}\n\n## 1. Aceitação dos Termos\n\nAo acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso.\n\n## 2. Uso do Serviço\n\nEste é um serviço de entretenimento para maiores de 18 anos. O uso inadequado pode resultar no cancelamento da conta.\n\n## 3. Conteúdo\n\nTodo o conteúdo é protegido por direitos autorais. É proibida a reprodução sem autorização.\n\n## 4. Privacidade\n\nRespeitamos sua privacidade. Consulte nossa Política de Privacidade para mais informações.\n\n## 5. Modificações\n\nReservamos o direito de modificar estes termos a qualquer momento.`;
  } else {
    return `# Política de Privacidade\n\nÚltima atualização: ${new Date().toLocaleDateString('pt-BR')}\n\n## 1. Informações Coletadas\n\nColetamos apenas as informações necessárias para fornecer nossos serviços.\n\n## 2. Uso das Informações\n\nSuas informações são usadas exclusivamente para melhorar sua experiência.\n\n## 3. Compartilhamento\n\nNão compartilhamos suas informações com terceiros sem seu consentimento.\n\n## 4. Segurança\n\nImplementamos medidas de segurança para proteger seus dados.\n\n## 5. Seus Direitos\n\nVocê tem direito de acessar, corrigir ou excluir suas informações pessoais.`;
  }
}
