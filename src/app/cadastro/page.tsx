'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/locale-context';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function CadastroPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    pt: {
      title: 'Criar Conta',
      subtitle: 'Junte-se à nossa comunidade',
      nameLabel: 'Nome Completo',
      namePlaceholder: 'Seu nome',
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar Senha',
      confirmPasswordPlaceholder: '••••••••',
      signUpButton: 'Criar Conta',
      hasAccount: 'Já tem uma conta?',
      signIn: 'Entrar',
      processing: 'Criando conta...',
    },
    en: {
      title: 'Create Account',
      subtitle: 'Join our community',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: '••••••••',
      signUpButton: 'Create Account',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      processing: 'Creating account...',
    },
    es: {
      title: 'Crear Cuenta',
      subtitle: 'Únete a nuestra comunidad',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@email.com',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar Contraseña',
      confirmPasswordPlaceholder: '••••••••',
      signUpButton: 'Crear Cuenta',
      hasAccount: '¿Ya tienes una cuenta?',
      signIn: 'Iniciar Sesión',
      processing: 'Creando cuenta...',
    }
  };

  const t = content[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // Salvar email no localStorage para recuperação de senha
      localStorage.setItem('euana-user-email', formData.email);
      
      // Simular criação de conta (implementar backend depois)
      setTimeout(() => {
        console.log('Cadastro:', formData);
        alert('✅ Conta criada com sucesso! Você ganhou 10 tokens de boas-vindas.');
        router.push('/login');
      }, 1500);
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      setError('Erro ao criar conta. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Card de Cadastro */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-white/60">{t.subtitle}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  {t.nameLabel}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              {/* Confirmar Senha */}
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  {t.confirmPasswordLabel}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t.confirmPasswordPlaceholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5" />
                {isLoading ? t.processing : t.signUpButton}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-sm">
                {t.hasAccount}{' '}
                <Link
                  href="/login"
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                >
                  {t.signIn}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
