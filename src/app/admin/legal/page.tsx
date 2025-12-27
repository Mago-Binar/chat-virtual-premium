'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Save, Link as LinkIcon } from 'lucide-react';
import { getLegalPage, saveLegalPage, getExternalLinks, saveExternalLinks, ExternalLinks } from '@/lib/storage';

export default function AdminLegalPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'links'>('terms');
  
  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [externalLinks, setExternalLinks] = useState<ExternalLinks>({});
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
      loadContent();
    }
  }, [router]);

  const loadContent = () => {
    const terms = getLegalPage('terms');
    const privacy = getLegalPage('privacy');
    const links = getExternalLinks();
    
    setTermsContent(terms.content);
    setPrivacyContent(privacy.content);
    setExternalLinks(links);
  };

  const handleSaveTerms = () => {
    saveLegalPage('terms', termsContent);
    showSaveMessage('Termos de Uso salvos com sucesso!');
  };

  const handleSavePrivacy = () => {
    saveLegalPage('privacy', privacyContent);
    showSaveMessage('Política de Privacidade salva com sucesso!');
  };

  const handleSaveLinks = () => {
    saveExternalLinks(externalLinks);
    showSaveMessage('Links externos salvos com sucesso!');
  };

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Páginas Legais & Links</h1>
              <p className="text-white/60">Edite conteúdo e configure links externos</p>
            </div>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center">
            {saveMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'terms'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <FileText className="w-5 h-5" />
            Termos de Uso
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Shield className="w-5 h-5" />
            Política de Privacidade
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'links'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <LinkIcon className="w-5 h-5" />
            Links Externos
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          {activeTab === 'terms' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Editar Termos de Uso</h2>
              <p className="text-white/60 mb-6">
                Use Markdown para formatação. # para títulos, ## para subtítulos.
              </p>
              <textarea
                value={termsContent}
                onChange={(e) => setTermsContent(e.target.value)}
                className="w-full h-96 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm"
                placeholder="Digite o conteúdo dos Termos de Uso..."
              />
              <button
                onClick={handleSaveTerms}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all"
              >
                <Save className="w-5 h-5" />
                Salvar Termos de Uso
              </button>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Editar Política de Privacidade</h2>
              <p className="text-white/60 mb-6">
                Use Markdown para formatação. # para títulos, ## para subtítulos.
              </p>
              <textarea
                value={privacyContent}
                onChange={(e) => setPrivacyContent(e.target.value)}
                className="w-full h-96 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm"
                placeholder="Digite o conteúdo da Política de Privacidade..."
              />
              <button
                onClick={handleSavePrivacy}
                className="mt-4 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all"
              >
                <Save className="w-5 h-5" />
                Salvar Política de Privacidade
              </button>
            </div>
          )}

          {activeTab === 'links' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Configurar Links Externos</h2>
              <p className="text-white/60 mb-6">
                Configure os links para redes sociais e outros destinos externos.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Instagram</label>
                  <input
                    type="url"
                    value={externalLinks.instagram || ''}
                    onChange={(e) => setExternalLinks({ ...externalLinks, instagram: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    placeholder="https://instagram.com/seu-perfil"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Twitter / X</label>
                  <input
                    type="url"
                    value={externalLinks.twitter || ''}
                    onChange={(e) => setExternalLinks({ ...externalLinks, twitter: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    placeholder="https://twitter.com/seu-perfil"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Facebook</label>
                  <input
                    type="url"
                    value={externalLinks.facebook || ''}
                    onChange={(e) => setExternalLinks({ ...externalLinks, facebook: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    placeholder="https://facebook.com/sua-pagina"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">TikTok</label>
                  <input
                    type="url"
                    value={externalLinks.tiktok || ''}
                    onChange={(e) => setExternalLinks({ ...externalLinks, tiktok: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    placeholder="https://tiktok.com/@seu-perfil"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">WhatsApp</label>
                  <input
                    type="url"
                    value={externalLinks.whatsapp || ''}
                    onChange={(e) => setExternalLinks({ ...externalLinks, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                    placeholder="https://wa.me/5511999999999"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveLinks}
                className="mt-6 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all"
              >
                <Save className="w-5 h-5" />
                Salvar Links Externos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
