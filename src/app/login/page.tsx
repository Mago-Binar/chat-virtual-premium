'use client';

import { useState } from 'react';
import { useLocale } from '@/contexts/locale-context';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { locale } = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      orContinue: 'Ou continue com'
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
      orContinue: 'Or continue with'
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
      orContinue: 'O continúa con'
    }
  };

  const t = content[locale];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de login aqui
    console.log('Login:', { email, password });
  };

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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                {t.loginButton}
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
    </div>
  );
}
