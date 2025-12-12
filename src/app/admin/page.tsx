'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'password' | '2fa'>('password');
  const [password, setPassword] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular verificação de senha
    setTimeout(() => {
      if (password === 'admin123') {
        setStep('2fa');
        setIsLoading(false);
      } else {
        setError('Senha incorreta');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular verificação 2FA
    setTimeout(() => {
      if (code2FA === '123456') {
        // Login bem-sucedido
        localStorage.setItem('admin-authenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Código 2FA incorreto');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
          <p className="text-white/60">Acesso restrito a administradores</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {step === 'password' ? (
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-6">
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Senha de Administrador
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verificando...' : 'Continuar'}
              </button>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit}>
              <div className="mb-6">
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Código de Autenticação (2FA)
                </label>
                <p className="text-white/50 text-xs mb-4">
                  Digite o código de 6 dígitos do seu aplicativo autenticador
                </p>
                <input
                  type="text"
                  value={code2FA}
                  onChange={(e) => setCode2FA(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-center text-2xl tracking-widest placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || code2FA.length !== 6}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {isLoading ? 'Verificando...' : 'Acessar Painel'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('password');
                  setCode2FA('');
                  setError('');
                }}
                className="w-full text-white/60 hover:text-white text-sm transition-colors"
              >
                Voltar
              </button>
            </form>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            🔒 Conexão segura e criptografada
          </p>
        </div>
      </div>
    </div>
  );
}
