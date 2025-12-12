'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Coins, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  UserPlus,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
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

  const stats = [
    { label: 'Usuários Ativos', value: '1,234', icon: Users, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { label: 'Receita Mensal', value: 'R$ 45.6k', icon: DollarSign, color: 'from-green-500 to-emerald-500', change: '+23%' },
    { label: 'Tokens Vendidos', value: '89.2k', icon: Coins, color: 'from-pink-500 to-purple-600', change: '+18%' },
    { label: 'Novos Usuários', value: '156', icon: UserPlus, color: 'from-orange-500 to-red-500', change: '+8%' },
  ];

  const menuItems = [
    { label: 'Gerenciar Conteúdo', href: '/admin/content', icon: FileText, description: 'Editar textos e banners' },
    { label: 'Gerenciar Modelos', href: '/admin/models', icon: Users, description: 'Adicionar/remover modelos' },
    { label: 'Pacotes de Tokens', href: '/admin/packages', icon: Coins, description: 'Editar valores e quantidades' },
    { label: 'Configurações', href: '/admin/settings', icon: Settings, description: 'Configurações gerais' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
                <p className="text-white/60 text-sm">EuAna Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              </div>
              <p className="text-white/60 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-all">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.label}</h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Atividade Recente</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="space-y-4">
              {[
                { action: 'Novo usuário registrado', user: 'João Silva', time: '5 min atrás' },
                { action: 'Compra de tokens realizada', user: 'Maria Santos', time: '12 min atrás' },
                { action: 'Modelo adicionado', user: 'Admin', time: '1 hora atrás' },
                { action: 'Configuração atualizada', user: 'Admin', time: '2 horas atrás' },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <Activity className="w-5 h-5 text-pink-500" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-white/60 text-sm">{activity.user}</p>
                  </div>
                  <span className="text-white/40 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
