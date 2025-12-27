// Sistema de armazenamento centralizado para sincronização entre admin e site

export interface StoredModel {
  id: string;
  name: string;
  age: number;
  nationality: string;
  coverPhoto: string;
  tags: string[];
  slug: string;
  shortBio: string;
  longBio: string;
  conversationStyle: string;
  interests: string[];
  gallery: string[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export interface StoredMetrics {
  activeUsers: number;
  monthlyRevenue: number;
  tokensSold: number;
  newUsers: number;
  lastUpdated: string;
}

export interface LegalPage {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export interface ExternalLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
  whatsapp?: string;
}

export interface UserAccount {
  email: string;
  password: string;
  name: string;
  tokens: number;
  twoFactorEnabled: boolean;
  twoFactorCode?: string;
  twoFactorExpiry?: string;
  resetToken?: string;
  resetTokenExpiry?: string;
  createdAt: string;
}

// Chaves de armazenamento
const STORAGE_KEYS = {
  MODELS: 'euana-models',
  METRICS: 'euana-metrics',
  LEGAL_TERMS: 'euana-legal-terms',
  LEGAL_PRIVACY: 'euana-legal-privacy',
  EXTERNAL_LINKS: 'euana-external-links',
  AGE_VERIFIED: 'euana-age-verified',
  USER_ACCOUNTS: 'euana-user-accounts',
  CURRENT_USER: 'euana-current-user',
};

// ===== MODELS =====
export function getModels(): StoredModel[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.MODELS);
  return data ? JSON.parse(data) : [];
}

export function saveModels(models: StoredModel[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(models));
  // Trigger custom event para sincronização
  window.dispatchEvent(new CustomEvent('models-updated'));
}

export function addModel(model: StoredModel): void {
  const models = getModels();
  models.push(model);
  saveModels(models);
}

export function updateModel(id: string, updatedModel: Partial<StoredModel>): void {
  const models = getModels();
  const index = models.findIndex(m => m.id === id);
  if (index !== -1) {
    models[index] = { ...models[index], ...updatedModel };
    saveModels(models);
  }
}

export function deleteModel(id: string): void {
  const models = getModels();
  const filtered = models.filter(m => m.id !== id);
  saveModels(filtered);
}

// ===== METRICS =====
export function getMetrics(): StoredMetrics {
  if (typeof window === 'undefined') {
    return {
      activeUsers: 0,
      monthlyRevenue: 0,
      tokensSold: 0,
      newUsers: 100,
      lastUpdated: new Date().toISOString(),
    };
  }
  const data = localStorage.getItem(STORAGE_KEYS.METRICS);
  return data ? JSON.parse(data) : {
    activeUsers: 0,
    monthlyRevenue: 0,
    tokensSold: 0,
    newUsers: 100,
    lastUpdated: new Date().toISOString(),
  };
}

export function saveMetrics(metrics: Partial<StoredMetrics>): void {
  if (typeof window === 'undefined') return;
  const current = getMetrics();
  const updated = {
    ...current,
    ...metrics,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('metrics-updated'));
}

export function incrementNewUsers(): void {
  const metrics = getMetrics();
  saveMetrics({ newUsers: metrics.newUsers + 1 });
}

export function addRevenue(amount: number, tokensCount: number): void {
  const metrics = getMetrics();
  saveMetrics({
    monthlyRevenue: metrics.monthlyRevenue + amount,
    tokensSold: metrics.tokensSold + tokensCount,
  });
}

// ===== LEGAL PAGES =====
export function getLegalPage(type: 'terms' | 'privacy'): LegalPage {
  if (typeof window === 'undefined') {
    return {
      id: type,
      title: type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade',
      content: '',
      lastUpdated: new Date().toISOString(),
    };
  }
  const key = type === 'terms' ? STORAGE_KEYS.LEGAL_TERMS : STORAGE_KEYS.LEGAL_PRIVACY;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {
    id: type,
    title: type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade',
    content: getDefaultLegalContent(type),
    lastUpdated: new Date().toISOString(),
  };
}

export function saveLegalPage(type: 'terms' | 'privacy', content: string): void {
  if (typeof window === 'undefined') return;
  const key = type === 'terms' ? STORAGE_KEYS.LEGAL_TERMS : STORAGE_KEYS.LEGAL_PRIVACY;
  const page: LegalPage = {
    id: type,
    title: type === 'terms' ? 'Termos de Uso' : 'Política de Privacidade',
    content,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(page));
}

function getDefaultLegalContent(type: 'terms' | 'privacy'): string {
  if (type === 'terms') {
    return `# Termos de Uso\n\nÚltima atualização: ${new Date().toLocaleDateString('pt-BR')}\n\n## 1. Aceitação dos Termos\n\nAo acessar e usar este site, você aceita e concorda em cumprir estes Termos de Uso.\n\n## 2. Uso do Serviço\n\nEste é um serviço de entretenimento para maiores de 18 anos. O uso inadequado pode resultar no cancelamento da conta.\n\n## 3. Conteúdo\n\nTodo o conteúdo é protegido por direitos autorais. É proibida a reprodução sem autorização.\n\n## 4. Privacidade\n\nRespeitamos sua privacidade. Consulte nossa Política de Privacidade para mais informações.\n\n## 5. Modificações\n\nReservamos o direito de modificar estes termos a qualquer momento.`;
  } else {
    return `# Política de Privacidade\n\nÚltima atualização: ${new Date().toLocaleDateString('pt-BR')}\n\n## 1. Informações Coletadas\n\nColetamos apenas as informações necessárias para fornecer nossos serviços.\n\n## 2. Uso das Informações\n\nSuas informações são usadas exclusivamente para melhorar sua experiência.\n\n## 3. Compartilhamento\n\nNão compartilhamos suas informações com terceiros sem seu consentimento.\n\n## 4. Segurança\n\nImplementamos medidas de segurança para proteger seus dados.\n\n## 5. Seus Direitos\n\nVocê tem direito de acessar, corrigir ou excluir suas informações pessoais.`;
  }
}

// ===== EXTERNAL LINKS =====
export function getExternalLinks(): ExternalLinks {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(STORAGE_KEYS.EXTERNAL_LINKS);
  return data ? JSON.parse(data) : {
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    tiktok: 'https://tiktok.com',
    whatsapp: 'https://wa.me/5511999999999',
  };
}

export function saveExternalLinks(links: ExternalLinks): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.EXTERNAL_LINKS, JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('links-updated'));
}

// ===== AGE VERIFICATION =====
export function isAgeVerified(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.AGE_VERIFIED) === 'true';
}

export function setAgeVerified(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.AGE_VERIFIED, 'true');
}

// ===== USER ACCOUNTS (Sistema completo de autenticação) =====
export function getAllUsers(): Record<string, UserAccount> {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(STORAGE_KEYS.USER_ACCOUNTS);
  return data ? JSON.parse(data) : {};
}

export function saveAllUsers(users: Record<string, UserAccount>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_ACCOUNTS, JSON.stringify(users));
}

export function registerUser(email: string, password: string, name: string): boolean {
  const users = getAllUsers();
  
  if (users[email]) {
    return false; // Usuário já existe
  }

  users[email] = {
    email,
    password, // Em produção, usar hash (bcrypt)
    name,
    tokens: 10, // Tokens de boas-vindas
    twoFactorEnabled: false,
    createdAt: new Date().toISOString(),
  };

  saveAllUsers(users);
  incrementNewUsers();
  return true;
}

export function loginUser(email: string, password: string): { success: boolean; user?: UserAccount; needsTwoFactor?: boolean } {
  const users = getAllUsers();
  const user = users[email];

  if (!user) {
    return { success: false };
  }

  if (user.password !== password) {
    return { success: false };
  }

  if (user.twoFactorEnabled) {
    return { success: true, needsTwoFactor: true, user };
  }

  // Login bem-sucedido
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, email);
  return { success: true, user };
}

export function generate2FACode(email: string): string {
  const users = getAllUsers();
  const user = users[email];

  if (!user) return '';

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutos

  user.twoFactorCode = code;
  user.twoFactorExpiry = expiry;
  users[email] = user;
  saveAllUsers(users);

  return code;
}

export function verify2FACode(email: string, code: string): boolean {
  const users = getAllUsers();
  const user = users[email];

  if (!user || !user.twoFactorCode || !user.twoFactorExpiry) {
    return false;
  }

  const now = new Date();
  const expiry = new Date(user.twoFactorExpiry);

  if (now > expiry) {
    return false; // Código expirado
  }

  if (user.twoFactorCode !== code) {
    return false; // Código incorreto
  }

  // Código correto - limpar e fazer login
  user.twoFactorCode = undefined;
  user.twoFactorExpiry = undefined;
  users[email] = user;
  saveAllUsers(users);

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, email);
  return true;
}

export function generateResetToken(email: string): string | null {
  const users = getAllUsers();
  const user = users[email];

  if (!user) return null;

  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const expiry = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hora

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  users[email] = user;
  saveAllUsers(users);

  return token;
}

export function resetPassword(token: string, newPassword: string): boolean {
  const users = getAllUsers();

  for (const email in users) {
    const user = users[email];
    if (user.resetToken === token && user.resetTokenExpiry) {
      const now = new Date();
      const expiry = new Date(user.resetTokenExpiry);

      if (now <= expiry) {
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        users[email] = user;
        saveAllUsers(users);
        return true;
      }
    }
  }

  return false;
}

export function getCurrentUser(): UserAccount | null {
  if (typeof window === 'undefined') return null;
  const email = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!email) return null;

  const users = getAllUsers();
  return users[email] || null;
}

export function updateUser(email: string, updates: Partial<UserAccount>): void {
  const users = getAllUsers();
  if (users[email]) {
    users[email] = { ...users[email], ...updates };
    saveAllUsers(users);
  }
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}
