'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/locale-context';
import { Heart, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { locale } = useLocale();

  const footerContent = {
    pt: {
      about: 'Sobre',
      aboutText: 'EuAna é uma plataforma premium de conversas com IA, oferecendo experiências personalizadas e envolventes.',
      links: 'Links Rápidos',
      quickLinks: [
        { label: 'Início', href: '/' },
        { label: 'Modelos', href: '/#modelos' },
        { label: 'Sobre', href: '/#sobre' },
        { label: 'Contato', href: '/#contato' },
      ],
      social: 'Redes Sociais',
      support: 'Suporte',
      supportEmail: 'meusugarsuporte@gmail.com',
      legal: 'Legal',
      legalLinks: [
        { label: 'Termos de Uso', href: '/termos' },
        { label: 'Política de Privacidade', href: '/privacidade' },
      ],
      rights: '© 2024 EuAna. Todos os direitos reservados.',
      madeWith: 'Feito com',
    },
    en: {
      about: 'About',
      aboutText: 'EuAna is a premium AI conversation platform, offering personalized and engaging experiences.',
      links: 'Quick Links',
      quickLinks: [
        { label: 'Home', href: '/' },
        { label: 'Models', href: '/#modelos' },
        { label: 'About', href: '/#sobre' },
        { label: 'Contact', href: '/#contato' },
      ],
      social: 'Social Media',
      support: 'Support',
      supportEmail: 'meusugarsuporte@gmail.com',
      legal: 'Legal',
      legalLinks: [
        { label: 'Terms of Use', href: '/termos' },
        { label: 'Privacy Policy', href: '/privacidade' },
      ],
      rights: '© 2024 EuAna. All rights reserved.',
      madeWith: 'Made with',
    },
    es: {
      about: 'Acerca de',
      aboutText: 'EuAna es una plataforma premium de conversaciones con IA, ofreciendo experiencias personalizadas y envolventes.',
      links: 'Enlaces Rápidos',
      quickLinks: [
        { label: 'Inicio', href: '/' },
        { label: 'Modelos', href: '/#modelos' },
        { label: 'Acerca de', href: '/#sobre' },
        { label: 'Contacto', href: '/#contato' },
      ],
      social: 'Redes Sociales',
      support: 'Soporte',
      supportEmail: 'meusugarsuporte@gmail.com',
      legal: 'Legal',
      legalLinks: [
        { label: 'Términos de Uso', href: '/termos' },
        { label: 'Política de Privacidad', href: '/privacidade' },
      ],
      rights: '© 2024 EuAna. Todos los derechos reservados.',
      madeWith: 'Hecho con',
    },
  };

  const content = footerContent[locale];

  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              EuAna
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {content.aboutText}
            </p>
            
            {/* Support Email */}
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-sm">{content.support}</h4>
              <a 
                href={`mailto:${content.supportEmail}`}
                className="text-pink-500 hover:text-pink-400 text-sm transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {content.supportEmail}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{content.links}</h4>
            <ul className="space-y-2">
              {content.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`${link.href}${link.href.includes('#') ? '' : `?lang=${locale}`}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-semibold mb-4">{content.social}</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-white/60 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-pink-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:meusugarsuporte@gmail.com" className="text-white/60 hover:text-pink-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <h4 className="font-semibold mb-4">{content.legal}</h4>
            <ul className="space-y-2">
              {content.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`${link.href}?lang=${locale}`}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">{content.rights}</p>
          <p className="text-white/40 text-sm flex items-center gap-2">
            {content.madeWith} <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by EuAna Team
          </p>
        </div>
      </div>
    </footer>
  );
}
