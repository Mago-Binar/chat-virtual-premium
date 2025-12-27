'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { getLegalPage, LegalPage } from '@/lib/storage';

export default function TermsPage() {
  const [page, setPage] = useState<LegalPage | null>(null);

  useEffect(() => {
    const data = getLegalPage('terms');
    setPage(data);
  }, []);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">{page.title}</h1>
              <p className="text-white/60 text-sm mt-1">
                Última atualização: {new Date(page.lastUpdated).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div 
            className="prose prose-invert prose-pink max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: page.content.replace(/\n/g, '<br/>').replace(/## /g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">').replace(/# /g, '<h1 class="text-3xl font-bold text-white mb-6">') 
            }}
          />
        </div>
      </div>
    </div>
  );
}
