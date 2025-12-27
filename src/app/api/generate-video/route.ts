import { NextResponse } from 'next/server';

// Biblioteca de vídeos gerados (substituir por banco de dados em produção)
let videoLibrary: Record<string, string> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, mediaId, modelSlug } = body;

    if (!imageUrl || !mediaId || !modelSlug) {
      return NextResponse.json(
        { error: 'imageUrl, mediaId e modelSlug são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se já existe vídeo gerado para esta imagem
    const cacheKey = `${modelSlug}-${mediaId}`;
    if (videoLibrary[cacheKey]) {
      return NextResponse.json({
        videoUrl: videoLibrary[cacheKey],
        cached: true,
      });
    }

    // Tentar gerar vídeo usando as APIs configuradas
    let videoUrl = null;

    // 1. Tentar OpenAI (se configurado)
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sua_chave_openai_aqui') {
      try {
        videoUrl = await generateVideoWithOpenAI(imageUrl);
      } catch (error) {
        console.error('Erro ao gerar vídeo com OpenAI:', error);
      }
    }

    // 2. Tentar ComfyUI (se configurado e OpenAI falhou)
    if (!videoUrl && process.env.COMFYUI_API_URL && process.env.COMFYUI_API_URL !== 'sua_url_comfyui_aqui') {
      try {
        videoUrl = await generateVideoWithComfyUI(imageUrl);
      } catch (error) {
        console.error('Erro ao gerar vídeo com ComfyUI:', error);
      }
    }

    // 3. Tentar RunPod (se configurado e anteriores falharam)
    if (!videoUrl && process.env.RUNPOD_API_KEY && process.env.RUNPOD_API_KEY !== 'sua_chave_runpod_aqui') {
      try {
        videoUrl = await generateVideoWithRunPod(imageUrl);
      } catch (error) {
        console.error('Erro ao gerar vídeo com RunPod:', error);
      }
    }

    // Se nenhuma API funcionou, retornar erro
    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Nenhuma API de geração de vídeo configurada ou disponível' },
        { status: 503 }
      );
    }

    // Salvar na biblioteca para reutilização
    videoLibrary[cacheKey] = videoUrl;

    return NextResponse.json({
      videoUrl,
      cached: false,
    });
  } catch (error) {
    console.error('Erro ao gerar vídeo:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar vídeo' },
      { status: 500 }
    );
  }
}

// Função para gerar vídeo com OpenAI
async function generateVideoWithOpenAI(imageUrl: string): Promise<string | null> {
  // Implementação da integração com OpenAI
  // Esta é uma implementação de exemplo - ajustar conforme API real
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `Generate a video from this image: ${imageUrl}`,
      n: 1,
      size: '1024x1024',
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar vídeo com OpenAI');
  }

  const data = await response.json();
  return data.data[0]?.url || null;
}

// Função para gerar vídeo com ComfyUI
async function generateVideoWithComfyUI(imageUrl: string): Promise<string | null> {
  // Implementação da integração com ComfyUI
  // Esta é uma implementação de exemplo - ajustar conforme API real
  
  const response = await fetch(`${process.env.COMFYUI_API_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.COMFYUI_API_KEY}`,
    },
    body: JSON.stringify({
      image_url: imageUrl,
      workflow: 'image-to-video',
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar vídeo com ComfyUI');
  }

  const data = await response.json();
  return data.video_url || null;
}

// Função para gerar vídeo com RunPod
async function generateVideoWithRunPod(imageUrl: string): Promise<string | null> {
  // Implementação da integração com RunPod
  // Esta é uma implementação de exemplo - ajustar conforme API real
  
  const response = await fetch(`https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RUNPOD_API_KEY}`,
    },
    body: JSON.stringify({
      input: {
        image_url: imageUrl,
        task: 'image-to-video',
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao gerar vídeo com RunPod');
  }

  const data = await response.json();
  
  // Aguardar conclusão do job (polling)
  const jobId = data.id;
  let videoUrl = null;
  let attempts = 0;
  const maxAttempts = 30;

  while (!videoUrl && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Aguardar 2 segundos
    
    const statusResponse = await fetch(`https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/status/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.RUNPOD_API_KEY}`,
      },
    });

    const statusData = await statusResponse.json();
    
    if (statusData.status === 'COMPLETED') {
      videoUrl = statusData.output?.video_url;
    } else if (statusData.status === 'FAILED') {
      throw new Error('Job falhou no RunPod');
    }
    
    attempts++;
  }

  return videoUrl;
}
