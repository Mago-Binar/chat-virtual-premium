'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/contexts/locale-context';
import { useTokens } from '@/contexts/tokens-context';
import { User, Settings, LogOut, Mail, Lock, Bell, CreditCard, Shield, ChevronRight, Coins } from 'lucide-react';
import Link from 'next/link';

export default function ContaPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const { tokens } = useTokens();
  const [activeSection, setActiveSection] = useState('profile');

  const content = {
    pt: {
      title: 'Minha Conta',
      subtitle: 'Gerencie suas configurações e preferências',
      profile: 'Perfil',
      settings: 'Configurações',
      logout: 'Sair',
      tokens: 'Tokens',
      buyTokens: 'Comprar Tokens',
      upgradeAccount: 'Upgrade da Conta',
      sections: {
        profile: {
          title: 'Informações do Perfil',
          name: 'Nome',
          email: 'E-mail',
          password: 'Senha',
          changePassword: 'Alterar senha',
          save: 'Salvar alterações'
        },
        notifications: {
          title: 'Notificações',
          emailNotif: 'Notificações por e-mail',
          pushNotif: 'Notificações push',
          messages: 'Mensagens de modelos',
          updates: 'Atualizações do sistema'
        },
        subscription: {
          title: 'Assinatura',
          plan: 'Plano Atual',
          free: 'Gratuito',
          premium: 'Premium',
          upgrade: 'Fazer upgrade',
          manage: 'Gerenciar assinatura'
        },
        privacy: {
          title: 'Privacidade e Segurança',
          twoFactor: 'Autenticação de dois fatores',
          dataPrivacy: 'Privacidade de dados',
          deleteAccount: 'Excluir conta'
        }
      },
      menu: [
        { id: 'profile', icon: User, label: 'Perfil' },
        { id: 'notifications', icon: Bell, label: 'Notificações' },
        { id: 'subscription', icon: CreditCard, label: 'Assinatura' },
        { id: 'privacy', icon: Shield, label: 'Privacidade' }
      ]
    },
    en: {
      title: 'My Account',
      subtitle: 'Manage your settings and preferences',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      tokens: 'Tokens',
      buyTokens: 'Buy Tokens',
      upgradeAccount: 'Upgrade Account',
      sections: {
        profile: {
          title: 'Profile Information',
          name: 'Name',
          email: 'Email',
          password: 'Password',
          changePassword: 'Change password',
          save: 'Save changes'
        },
        notifications: {
          title: 'Notifications',
          emailNotif: 'Email notifications',
          pushNotif: 'Push notifications',
          messages: 'Model messages',
          updates: 'System updates'
        },
        subscription: {
          title: 'Subscription',
          plan: 'Current Plan',
          free: 'Free',
          premium: 'Premium',
          upgrade: 'Upgrade',
          manage: 'Manage subscription'
        },
        privacy: {
          title: 'Privacy & Security',
          twoFactor: 'Two-factor authentication',
          dataPrivacy: 'Data privacy',
          deleteAccount: 'Delete account'
        }
      },
      menu: [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'notifications', icon: Bell, label: 'Notifications' },
        { id: 'subscription', icon: CreditCard, label: 'Subscription' },
        { id: 'privacy', icon: Shield, label: 'Privacy' }
      ]
    },
    es: {
      title: 'Mi Cuenta',
      subtitle: 'Administra tus configuraciones y preferencias',
      profile: 'Perfil',
      settings: 'Configuración',
      logout: 'Cerrar sesión',
      tokens: 'Tokens',
      buyTokens: 'Comprar Tokens',
      upgradeAccount: 'Actualizar Cuenta',
      sections: {
        profile: {
          title: 'Información del Perfil',
          name: 'Nombre',
          email: 'Correo electrónico',
          password: 'Contraseña',
          changePassword: 'Cambiar contraseña',
          save: 'Guardar cambios'
        },
        notifications: {
          title: 'Notificaciones',
          emailNotif: 'Notificaciones por correo',
          pushNotif: 'Notificaciones push',
          messages: 'Mensajes de modelos',
          updates: 'Actualizaciones del sistema'
        },
        subscription: {
          title: 'Suscripción',
          plan: 'Plan Actual',
          free: 'Gratuito',
          premium: 'Premium',
          upgrade: 'Actualizar',
          manage: 'Administrar suscripción'
        },
        privacy: {
          title: 'Privacidad y Seguridad',
          twoFactor: 'Autenticación de dos factores',
          dataPrivacy: 'Privacidad de datos',
          deleteAccount: 'Eliminar cuenta'
        }
      },
      menu: [
        { id: 'profile', icon: User, label: 'Perfil' },
        { id: 'notifications', icon: Bell, label: 'Notificaciones' },
        { id: 'subscription', icon: CreditCard, label: 'Suscripción' },
        { id: 'privacy', icon: Shield, label: 'Privacidad' }
      ]
    }
  };

  const t = content[locale];

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-white/60">{t.subtitle}</p>
        </div>

        {/* Tokens Balance Card */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">{t.tokens}</p>
              <p className="text-3xl font-bold text-white">{tokens}</p>
            </div>
          </div>
          <Link
            href="/comprar-tokens"
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all"
          >
            {t.buyTokens}
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 space-y-2">
              {t.menu.map((item) => (
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
                  <span className="flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-left">{t.logout}</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t.sections.profile.title}</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">{t.sections.profile.name}</label>
                      <input
                        type="text"
                        placeholder="João Silva"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 mb-2 text-sm">{t.sections.profile.email}</label>
                      <input
                        type="email"
                        placeholder="joao@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-pink-500/50"
                      />
                    </div>
                    <button className="text-pink-500 hover:text-pink-400 text-sm transition-colors">
                      {t.sections.profile.changePassword}
                    </button>
                    <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all mt-4">
                      {t.sections.profile.save}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t.sections.notifications.title}</h2>
                  <div className="space-y-4">
                    {[
                      t.sections.notifications.emailNotif,
                      t.sections.notifications.pushNotif,
                      t.sections.notifications.messages,
                      t.sections.notifications.updates
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <span className="text-white/80">{item}</span>
                        <label className="relative inline-block w-12 h-6">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                          <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscription Section */}
              {activeSection === 'subscription' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t.sections.subscription.title}</h2>
                  <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-6 mb-4">
                    <p className="text-white/60 text-sm mb-2">{t.sections.subscription.plan}</p>
                    <p className="text-2xl font-bold text-white mb-4">{t.sections.subscription.free}</p>
                    <Link
                      href="/comprar-tokens"
                      className="block w-full text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                    >
                      {t.upgradeAccount}
                    </Link>
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">{t.sections.privacy.title}</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <span className="text-white/80">{t.sections.privacy.twoFactor}</span>
                      <label className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-purple-600"></div>
                      </label>
                    </div>
                    <button className="w-full text-left p-4 bg-white/5 rounded-xl text-white/80 hover:bg-white/10 transition-colors">
                      {t.sections.privacy.dataPrivacy}
                    </button>
                    <button className="w-full text-left p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-colors">
                      {t.sections.privacy.deleteAccount}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
