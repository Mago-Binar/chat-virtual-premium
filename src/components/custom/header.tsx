'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/locale-context';
import { useTokens } from '@/contexts/tokens-context';
import { Globe, User, Coins } from 'lucide-react';

export default function Header() {
  const { locale, setLocale } = useLocale();
  const { tokens } = useTokens();

  const menuItems = {
    pt: [
      { label: 'Início', href: '/', type: 'link' },
      { label: 'Modelos', href: '/#modelos', type: 'link' },
      { label: 'Sobre', href: '/sobre', type: 'link' },
      { label: 'Contato', href: 'mailto:meusugarsuporte@gmail.com', type: 'email' },
      { label: 'Login', href: '/login', type: 'link' },
      { label: 'Minha Conta', href: '/conta', type: 'link', icon: User },
    ],
    en: [
      { label: 'Home', href: '/', type: 'link' },
      { label: 'Models', href: '/#modelos', type: 'link' },
      { label: 'About', href: '/sobre', type: 'link' },
      { label: 'Contact', href: 'mailto:meusugarsuporte@gmail.com', type: 'email' },
      { label: 'Login', href: '/login', type: 'link' },
      { label: 'My Account', href: '/conta', type: 'link', icon: User },
    ],
    es: [
      { label: 'Inicio', href: '/', type: 'link' },
      { label: 'Modelos', href: '/#modelos', type: 'link' },
      { label: 'Acerca de', href: '/sobre', type: 'link' },
      { label: 'Contacto', href: 'mailto:meusugarsuporte@gmail.com', type: 'email' },
      { label: 'Iniciar sesión', href: '/login', type: 'link' },
      { label: 'Mi Cuenta', href: '/conta', type: 'link', icon: User },
    ],
  };

  const languages = [
    { code: 'pt' as const, label: 'PT' },
    { code: 'en' as const, label: 'EN' },
    { code: 'es' as const, label: 'ES' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/?lang=${locale}`} className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Meu Sugar
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems[locale].map((item) => {
              if (item.type === 'email') {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </a>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={`${item.href}${item.href.includes('#') ? '' : `?lang=${locale}`}`}
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Tokens + Language */}
          <div className="flex items-center gap-4">
            {/* Token Counter */}
            <Link
              href="/comprar-tokens"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all"
            >
              <Coins className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{tokens}</span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-white/60" />
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      locale === lang.code
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
