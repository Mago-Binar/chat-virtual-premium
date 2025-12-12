'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/locale-context';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const content = {
    pt: {
      title: 'Recuperar Senha',
      subtitle: 'Enviaremos um link de recuperação para seu e-mail',
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      sendButton: 'Enviar Link',
      backToLogin: 'Voltar para Login',
      processing: 'Enviando...',
      successMessage: 'Link de recuperação enviado! Verifique seu e-mail.',
      errorMessage: 'E-mail não encontrado. Verifique e tente novamente.',
    },
    en: {
      title: 'Recover Password',
      subtitle: 'We will send a recovery link to your email',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      sendButton: 'Send Link',
      backToLogin: 'Back to Login',
      processing: 'Sending...',
      successMessage: 'Recovery link sent! Check your email.',
      errorMessage: 'Email not found. Please check and try again.',
    },
    es: {
      title: 'Recuperar Contraseña',
      subtitle: 'Enviaremos un enlace de recuperación a tu correo',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      sendButton: 'Enviar Enlace',
      backToLogin: 'Volver al Inicio de Sesión',
      processing: 'Enviando...',
      successMessage: '¡Enlace de recuperación enviado! Revisa tu correo.',
      errorMessage: 'Correo no encontrado. Verifica e intenta nuevamente.',
    }
  };

  const t = content[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Verificar se o email existe no localStorage
      const savedEmail = localStorage.getItem('euana-user-email');
      
      if (savedEmail === email) {
        // Simular envio de email (implementar backend depois)
        setTimeout(() => {
          setSuccess(true);
          setIsLoading(false);
          
          // Gerar senha provisória
          const tempPassword = Math.random().toString(36).slice(-8);
          console.log('Senha provisória:', tempPassword);
          
          // Em produção, enviar email com senha provisória
          alert(`✅ Senha provisória enviada para ${email}: ${tempPassword}`);
          
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }, 1500);
      } else {
        setError(t.errorMessage);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao recuperar senha:', error);
      setError('Erro ao processar solicitação. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Card de Recuperação */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-white/60">{t.subtitle}</p>
            </div>

            {success ? (
              <div className="text-center">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 mb-6">
                  {t.successMessage}
                </div>
                <Link
                  href="/login"
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToLogin}
                </Link>
              </div>
            ) : (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      {t.emailLabel}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {isLoading ? t.processing : t.sendButton}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t.backToLogin}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
