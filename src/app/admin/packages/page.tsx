'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Edit, Trash2, Coins } from 'lucide-react';

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
  const [isSaving, setIsSaving] = useState(false);
  const [packages, setPackages] = useState<TokenPackage[]>([
    { id: '1', tokens: 50, price: 19.90, bonus: 0, popular: false },
    { id: '2', tokens: 100, price: 34.90, bonus: 10, popular: false },
    { id: '3', tokens: 250, price: 79.90, bonus: 50, popular: true },
    { id: '4', tokens: 500, price: 149.90, bonus: 100, popular: false },
    { id: '5', tokens: 1000, price: 279.90, bonus: 250, popular: false },
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
    setIsSaving(true);
    // Simular salvamento
    setTimeout(() => {
      alert('✅ Pacotes atualizados com sucesso!');
      setIsSaving(false);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pacote?')) {
      setPackages(packages.filter(p => p.id !== id));
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
              <h1 className="text-3xl font-bold text-white">Pacotes de Tokens</h1>
              <p className="text-white/60">Gerencie valores e quantidades</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all">
              <Plus className="w-5 h-5" />
              Novo Pacote
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>

        {/* Packages List */}
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white/5 backdrop-blur-sm border rounded-2xl p-6 ${
                pkg.popular ? 'border-pink-500' : 'border-white/10'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Tokens */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Tokens</label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="number"
                      value={pkg.tokens}
                      onChange={(e) => updatePackage(pkg.id, 'tokens', parseInt(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Preço (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={pkg.price}
                    onChange={(e) => updatePackage(pkg.id, 'price', parseFloat(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                {/* Bonus */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Bônus</label>
                  <input
                    type="number"
                    value={pkg.bonus}
                    onChange={(e) => updatePackage(pkg.id, 'bonus', parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50"
                  />
                </div>

                {/* Popular */}
                <div>
                  <label className="block text-white/60 text-sm mb-2">Popular</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pkg.popular}
                      onChange={(e) => updatePackage(pkg.id, 'popular', e.target.checked)}
                      className="w-5 h-5 rounded bg-white/5 border border-white/10 checked:bg-pink-500"
                    />
                    <span className="text-white/80 text-sm">
                      {pkg.popular ? 'Sim' : 'Não'}
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
                </div>
              </div>

              {/* Total Preview */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Total de tokens:</span>
                  <span className="text-white font-bold">
                    {pkg.tokens + pkg.bonus} tokens por R$ {pkg.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
