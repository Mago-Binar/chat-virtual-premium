'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Locale, t } from '@/lib/i18n';

interface ExitWhatsappModalProps {
  whatsappLink: string;
  locale: Locale;
  primaryColor: string;
  secondaryColor: string;
}

export default function ExitWhatsappModal({
  whatsappLink,
  locale,
  primaryColor,
  secondaryColor,
}: ExitWhatsappModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if modal was already shown in this session
    const sessionKey = 'euana-exit-modal-shown';
    const wasShown = sessionStorage.getItem(sessionKey);
    
    if (wasShown) {
      setHasShown(true);
      return;
    }

    let inactivityTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem(sessionKey, 'true');
      }
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!hasShown) {
          setIsVisible(true);
          setHasShown(true);
          sessionStorage.setItem(sessionKey, 'true');
        }
      }, 120000); // 2 minutos de inatividade
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keypress', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, [hasShown]);

  if (!isVisible || hasShown) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 relative animate-in zoom-in duration-300">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">💔</div>
          
          <h2 className="text-3xl font-bold" style={{ color: primaryColor }}>
            {t('exitModal.title', locale)}
          </h2>
          
          <p className="text-xl text-gray-600">
            {t('exitModal.subtitle', locale)}
          </p>
          
          <p className="text-lg text-gray-500">
            {t('exitModal.description', locale)}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            {t('exitModal.cta', locale)}
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t('exitModal.close', locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
