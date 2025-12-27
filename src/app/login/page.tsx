'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/locale-context';
import { Mail, Lock, Eye, EyeOff, LogIn, X, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    pt: {
      title: 'Bem-vindo de Volta',
      subtitle: 'Entre na sua conta para continuar',
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
      loginButton: 'Entrar',
      forgotPassword: 'Esqueceu a senha?',
      noAccount: 'Não tem uma conta?',
      signUp: 'Cadastre-se',
      twoFactorTitle: 'Autenticação de Dois Fatores',
      twoFactorSubtitle: 'Digite o código enviado para seu e-mail',
      codeLabel: 'Código de 6 dígitos',
      codePlaceholder: '000000',
      verifyButton: 'Verificar Código',
      errorTitle: 'Email não encontrado',
      errorMessage: 'Por favor, faça seu cadastro.',
      signUpNow: 'Cadastrar Agora',
      closeButton: 'Fechar',
    },
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account to continue',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      loginButton: 'Sign In',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorSubtitle: 'Enter the code sent to your email',
      codeLabel: '6-digit code',
      codePlaceholder: '000000',
      verifyButton: 'Verify Code',
      errorTitle: 'Email not found',
      errorMessage: 'Please sign up.',
      signUpNow: 'Sign Up Now',
      closeButton: 'Close',
    },
    es: {
      title: 'Bienvenido de Nuevo',
      subtitle: 'Inicia sesión en tu cuenta para continuar',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: '••••••••',
      loginButton: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes una cuenta?',
      signUp: 'Regístrate',
      twoFactorTitle: 'Autenticación de Dos Factores',
      twoFactorSubtitle: 'Ingresa el código enviado a tu correo',
      codeLabel: 'Código de 6 dígitos',
      codePlaceholder: '000000',
      verifyButton: 'Verificar Código',
      errorTitle: 'Correo no encontrado',
      errorMessage: 'Por favor, regístrate.',
      signUpNow: 'Registrarse Ahora',
      closeButton: 'Cerrar',
    }
  };

  const t = content[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Chamar API de login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 404) {
        // Email não encontrado
        setShowErrorModal(true);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login');
        setIsLoading(false);
        return;
      }

      if (data.needsTwoFactor) {
        // Mostrar tela de 2FA
        setShowTwoFactor(true);
        setIsLoading(false);
        alert(`🔐 Código 2FA enviado para ${email}\\n\\nCódigo (dev): ${data.code}`);
      } else {
        // Login bem-sucedido - salvar sessão
        localStorage.setItem('euana-current-user', JSON.stringify(data.user));
        alert('✅ Login realizado com sucesso!');
        router.push('/');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao fazer login. Tente novamente.');
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Chamar API de verificação 2FA
      const response = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: twoFactorCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Código inválido');
        setIsLoading(false);
        return;
      }

      // Login bem-sucedido - salvar sessão
      localStorage.setItem('euana-current-user', JSON.stringify(data.user));
      alert('✅ Autenticação concluída com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao verificar 2FA:', error);
      setError('Erro ao verificar código. Tente novamente.');
      setIsLoading(false);
    }
  };

  if (showTwoFactor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {t.twoFactorTitle}
                </h1>
                <p className="text-white/60">{t.twoFactorSubtitle}</p>
                <p className="text-white/40 text-sm mt-2">{email}</p>
              </div>

              <form onSubmit={handleVerify2FA} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    {t.codeLabel}
                  </label>
                  <input
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder={t.codePlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-widest placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                    maxLength={6}
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || twoFactorCode.length !== 6}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Lock className="w-5 h-5" />
                  {isLoading ? 'Verificando...' : t.verifyButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Card de Login */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-white/60">{t.subtitle}</p>
            </div>

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

              {/* Password */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  href="/recuperar-senha"
                  className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
                >
                  {t.forgotPassword}
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? 'Entrando...' : t.loginButton}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                {t.noAccount}{' '}
                <Link
                  href="/cadastro"
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                >
                  {t.signUp}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-b from-red-950/90 to-black/90 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.errorTitle}</h2>
              <p className="text-white/60 mb-6">{t.errorMessage}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all"
                >
                  {t.closeButton}
                </button>
                <Link
                  href="/cadastro"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  {t.signUpNow}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
