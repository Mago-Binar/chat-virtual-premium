'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from '@/contexts/locale-context';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import Link from 'next/link';
import { resetPassword } from '@/lib/storage';

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token inválido ou expirado.');
    }
  }, [searchParams]);

  const content = {
    pt: {
      title: 'Redefinir Senha',
      subtitle: 'Digite sua nova senha',
      passwordLabel: 'Nova Senha',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar Nova Senha',
      confirmPasswordPlaceholder: '••••••••',
      resetButton: 'Redefinir Senha',
      processing: 'Redefinindo...',
      successMessage: 'Senha redefinida com sucesso!',
      backToLogin: 'Voltar para Login',
    },
    en: {
      title: 'Reset Password',
      subtitle: 'Enter your new password',
      passwordLabel: 'New Password',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirm New Password',
      confirmPasswordPlaceholder: '••••••••',
      resetButton: 'Reset Password',
      processing: 'Resetting...',
      successMessage: 'Password reset successfully!',
      backToLogin: 'Back to Login',
    },
    es: {
      title: 'Restablecer Contraseña',
      subtitle: 'Ingresa tu nueva contraseña',
      passwordLabel: 'Nueva Contraseña',
      passwordPlaceholder: '••••••••',
      confirmPasswordLabel: 'Confirmar Nueva Contraseña',
      confirmPasswordPlaceholder: '••••••••',
      resetButton: 'Restablecer Contraseña',
      processing: 'Restableciendo...',
      successMessage: '¡Contraseña restablecida con éxito!',
      backToLogin: 'Volver al Inicio de Sesión',
    }
  };

  const t = content[locale];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!token) {
      setError('Token inválido ou expirado.');
      return;
    }

    setIsLoading(true);

    try {
      const result = resetPassword(token, password);
      
      if (!result) {
        setError('Token inválido ou expirado. Solicite um novo link de recuperação.');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setIsLoading(false);
      
      alert('✅ Senha redefinida com sucesso!');
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setError('Erro ao redefinir senha. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Card de Redefinição */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-white/60">{t.subtitle}</p>
            </div>

            {success ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 mb-6">
                  {t.successMessage}
                </div>
                <Link
                  href="/login"
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
                >
                  {t.backToLogin}
                </Link>
              </div>
            ) : (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nova Senha */}
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

                  {/* Confirmar Nova Senha */}
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      {t.confirmPasswordLabel}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

                  {/* Reset Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-5 h-5" />
                    {isLoading ? t.processing : t.resetButton}
                  </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6 text-center">
                  <Link
                    href="/login"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
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
