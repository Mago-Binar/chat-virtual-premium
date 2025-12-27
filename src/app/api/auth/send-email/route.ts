import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, type, code } = await request.json();

    // Em produção, integrar com serviço de email real (SendGrid, AWS SES, etc.)
    // Por enquanto, apenas simular o envio
    
    console.log('📧 Email simulado enviado:');
    console.log('Para:', email);
    console.log('Tipo:', type);
    console.log('Código/Link:', code);
    console.log('Remetente: meusugarsuporte@gmail.com');

    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 500));

    // Em produção, usar algo como:
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'meusugarsuporte@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let subject = '';
    let html = '';

    if (type === 'reset-password') {
      subject = 'Recuperação de Senha';
      html = `
        <h2>Recuperação de Senha</h2>
        <p>Você solicitou a recuperação de senha.</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${code}">${code}</a>
        <p>Este link expira em 1 hora.</p>
      `;
    } else if (type === '2fa') {
      subject = 'Código de Verificação';
      html = `
        <h2>Código de Verificação</h2>
        <p>Seu código de verificação é:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px;">${code}</h1>
        <p>Este código expira em 10 minutos.</p>
      `;
    }

    await transporter.sendMail({
      from: 'meusugarsuporte@gmail.com',
      to: email,
      subject,
      html
    });
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar email' },
      { status: 500 }
    );
  }
}
