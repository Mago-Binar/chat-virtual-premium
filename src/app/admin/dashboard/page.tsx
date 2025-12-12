'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Coins, 
  Settings, 
  FileText, 
  Image as ImageIcon,
  LogOut,
  DollarSign,
  TrendingUp,
  Package
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-sm border-r border-white/10 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-white/60 text-sm mt-1">Gerenciamento Completo</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Visão Geral' },
              { id: 'users', icon: Users, label: 'Usuários' },
              { id: 'tokens', icon: Coins, label: 'Pacotes de Tokens' },
              { id: 'models', icon: ImageIcon, label: 'Modelos' },
              { id: 'content', icon: FileText, label: 'Conteúdo' },
              { id: 'settings', icon: Settings, label: 'Configurações' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Visão Geral</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Usuários Ativos', value: '1,234', icon: Users, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Tokens Vendidos', value: '45,678', icon: Coins, color: 'from-pink-500 to-purple-600' },
                  { label: 'Receita Total', value: 'R$ 12,345', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
                  { label: 'Crescimento', value: '+23%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white/60 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Atividade Recente</h3>
                <div className="space-y-4">
                  {[
                    { user: 'João Silva', action: 'Comprou 100 tokens', time: '5 min atrás' },
                    { user: 'Maria Santos', action: 'Criou nova conta', time: '12 min atrás' },
                    { user: 'Pedro Costa', action: 'Comprou 250 tokens', time: '23 min atrás' },
                    { user: 'Ana Oliveira', action: 'Atualizou perfil', time: '1 hora atrás' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div>
                        <p className="text-white font-medium">{activity.user}</p>
                        <p className="text-white/60 text-sm">{activity.action}</p>
                      </div>
                      <p className="text-white/40 text-sm">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Gerenciar Usuários</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-white/60">Lista de usuários e gerenciamento em desenvolvimento...</p>
              </div>
            </div>
          )}

          {/* Tokens Section */}
          {activeSection === 'tokens' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Pacotes de Tokens</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Starter', tokens: 50, price: 19.90, bonus: 0 },
                  { name: 'Basic', tokens: 100, price: 34.90, bonus: 10 },
                  { name: 'Popular', tokens: 250, price: 79.90, bonus: 50 },
                  { name: 'Premium', tokens: 500, price: 149.90, bonus: 100 },
                  { name: 'Ultimate', tokens: 1000, price: 279.90, bonus: 250 },
                ].map((pkg, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                      <Package className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-white/60">Tokens: <span className="text-white font-semibold">{pkg.tokens}</span></p>
                      <p className="text-white/60">Bônus: <span className="text-white font-semibold">+{pkg.bonus}</span></p>
                      <p className="text-white/60">Preço: <span className="text-white font-semibold">R$ {pkg.price.toFixed(2)}</span></p>
                    </div>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-xl hover:scale-105 transition-all">
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Models Section */}
          {activeSection === 'models' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Gerenciar Modelos</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white/60">Adicionar, editar ou remover modelos</p>
                  <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all">
                    Adicionar Modelo
                  </button>
                </div>
                <p className="text-white/40 text-sm">Funcionalidade em desenvolvimento...</p>
              </div>
            </div>
          )}

          {/* Content Section */}
          {activeSection === 'content' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Gerenciar Conteúdo</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-white/60">Editar textos, banners e fontes do site</p>
                <p className="text-white/40 text-sm mt-4">Funcionalidade em desenvolvimento...</p>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Configurações</h2>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <p className="text-white/60">Configurações gerais do sistema</p>
                <p className="text-white/40 text-sm mt-4">Funcionalidade em desenvolvimento...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
