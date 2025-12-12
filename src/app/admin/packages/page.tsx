'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Trash2, Coins } from 'lucide-react';

interface TokenPackage {
  id: string;
  tokens: number;
  price: number;
  bonus: number;
  popular: boolean;
}

export default function AdminPackagesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [packages, setPackages] = useState<TokenPackage[]>([
    { id: 'starter', tokens: 50, price: 19.90, bonus: 0, popular: false },
    { id: 'basic', tokens: 100, price: 34.90, bonus: 10, popular: false },
    { id: 'popular', tokens: 250, price: 79.90, bonus: 50, popular: true },
    { id: 'premium', tokens: 500, price: 149.90, bonus: 100, popular: false },
    { id: 'ultimate', tokens: 1000, price: 279.90, bonus: 250, popular: false },
  ]);

  useEffect(() => {
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleSave = () => {
    // Salvar alterações
    alert('✅ Pacotes atualizados com sucesso!');
  };

  const handleAddPackage = () => {
    const newPackage: TokenPackage = {
      id: `package-${Date.now()}`,
      tokens: 0,
      price: 0,
      bonus: 0,
      popular: false,
    };
    setPackages([...packages, newPackage]);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pacote?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const updatePackage = (id: string, field: keyof TokenPackage, value: any) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Gerenciar Pacotes de Tokens</h1>
            <p className="text-white/60">Edite valores, quantidades e bônus</p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Coins className="w-8 h-8 text-pink-500" />
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Tokens</label>
                  <input
                    type="number"
                    value={pkg.tokens}
                    onChange={(e) => updatePackage(pkg.id, 'tokens', parseInt(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pkg.price}
                    onChange={(e) => updatePackage(pkg.id, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Bônus</label>
                  <input
                    type="number"
                    value={pkg.bonus}
                    onChange={(e) => updatePackage(pkg.id, 'bonus', parseInt(e.target.value) || 0)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`popular-${pkg.id}`}
                    checked={pkg.popular}
                    onChange={(e) => updatePackage(pkg.id, 'popular', e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor={`popular-${pkg.id}`} className="text-white/80 text-sm">
                    Marcar como popular
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleAddPackage}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
          >
            <Plus className="w-5 h-5" />
            Adicionar Pacote
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            <Save className="w-5 h-5" />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
