'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Edit } from 'lucide-react';

export default function AdminContentPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState({
    heroTitle: 'Conversas Premium com IA',
    heroSubtitle: 'Experiências personalizadas e envolventes com modelos virtuais',
    heroCTA: 'Explorar Modelos',
    aboutTitle: 'Sobre a EuAna',
    aboutText: 'EuAna é uma plataforma premium de conversas com IA, oferecendo experiências personalizadas e envolventes.',
  });

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    // Simular salvamento
    setTimeout(() => {
      alert('✅ Conteúdo atualizado com sucesso!');
      setIsSaving(false);
    }, 1000);
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
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-white">Gerenciar Conteúdo</h1>
              <p className="text-white/60">Edite textos e banners do site</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>

        {/* Content Form */}
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5 text-pink-500" />
              Seção Hero (Topo)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Subtítulo
                </label>
                <textarea
                  value={content.heroSubtitle}
                  onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Texto do Botão
                </label>
                <input
                  type="text"
                  value={content.heroCTA}
                  onChange={(e) => setContent({ ...content, heroCTA: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5 text-pink-500" />
              Seção Sobre
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Título
                </label>
                <input
                  type="text"
                  value={content.aboutTitle}
                  onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">
                  Texto
                </label>
                <textarea
                  value={content.aboutText}
                  onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
