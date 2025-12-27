'use client';

import { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { isAgeVerified, setAgeVerified } from '@/lib/storage';

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Verificar se já foi verificado
    if (!isAgeVerified()) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    if (isChecked) {
      setAgeVerified();
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md">
      <div className="max-w-md w-full mx-4">
        {/* Card */}
        <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Verificação de Idade
          </h2>

          {/* Message */}
          <p className="text-white/80 text-center mb-6 leading-relaxed">
            Este site contém conteúdo exclusivo para maiores de 18 anos. 
            Para continuar, você deve confirmar que tem idade legal.
          </p>

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm text-center">
              ⚠️ Conteúdo adulto - Acesso restrito
            </p>
          </div>

          {/* Checkbox */}
          <label className="flex items-start gap-3 mb-6 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-lg border-2 transition-all ${
                  isChecked
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500'
                    : 'bg-white/5 border-white/20 group-hover:border-white/40'
                }`}
              >
                {isChecked && (
                  <Check className="w-full h-full text-white p-0.5" />
                )}
              </div>
            </div>
            <span className="text-white/90 text-sm leading-relaxed">
              Confirmo que tenho <strong className="text-white">18 anos ou mais</strong> e 
              concordo em acessar conteúdo adulto.
            </span>
          </label>

          {/* Button */}
          <button
            onClick={handleConfirm}
            disabled={!isChecked}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
              isChecked
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/50'
                : 'bg-white/10 cursor-not-allowed opacity-50'
            }`}
          >
            {isChecked ? 'Entrar no Site' : 'Marque a caixa acima'}
          </button>

          {/* Footer */}
          <p className="text-white/40 text-xs text-center mt-6">
            Ao continuar, você concorda com nossos Termos de Uso
          </p>
        </div>
      </div>
    </div>
  );
}
