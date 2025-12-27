import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper para verificar se as variáveis estão configuradas
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

// Cliente Supabase com fallback seguro
// Só cria o cliente se as variáveis estão configuradas corretamente
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types para o banco de dados
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          tokens: number;
          two_factor_enabled: boolean;
          two_factor_code: string | null;
          two_factor_expiry: string | null;
          reset_token: string | null;
          reset_token_expiry: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name: string;
          tokens?: number;
          two_factor_enabled?: boolean;
          two_factor_code?: string | null;
          two_factor_expiry?: string | null;
          reset_token?: string | null;
          reset_token_expiry?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string;
          tokens?: number;
          two_factor_enabled?: boolean;
          two_factor_code?: string | null;
          two_factor_expiry?: string | null;
          reset_token?: string | null;
          reset_token_expiry?: string | null;
          updated_at?: string;
        };
      };
      models: {
        Row: {
          id: string;
          name: string;
          age: number;
          nationality: string;
          cover_photo: string;
          tags: string[];
          slug: string;
          short_bio: string;
          long_bio: string;
          conversation_style: string;
          interests: string[];
          gallery: string[];
          primary_color: string;
          secondary_color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          age: number;
          nationality: string;
          cover_photo: string;
          tags?: string[];
          slug: string;
          short_bio: string;
          long_bio: string;
          conversation_style: string;
          interests?: string[];
          gallery?: string[];
          primary_color?: string;
          secondary_color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          age?: number;
          nationality?: string;
          cover_photo?: string;
          tags?: string[];
          slug?: string;
          short_bio?: string;
          long_bio?: string;
          conversation_style?: string;
          interests?: string[];
          gallery?: string[];
          primary_color?: string;
          secondary_color?: string;
          updated_at?: string;
        };
      };
      metrics: {
        Row: {
          id: string;
          active_users: number;
          monthly_revenue: number;
          tokens_sold: number;
          new_users: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          active_users?: number;
          monthly_revenue?: number;
          tokens_sold?: number;
          new_users?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          active_users?: number;
          monthly_revenue?: number;
          tokens_sold?: number;
          new_users?: number;
          updated_at?: string;
        };
      };
      legal_pages: {
        Row: {
          id: string;
          type: 'terms' | 'privacy';
          title: string;
          content: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: 'terms' | 'privacy';
          title: string;
          content: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: 'terms' | 'privacy';
          title?: string;
          content?: string;
          updated_at?: string;
        };
      };
      external_links: {
        Row: {
          id: string;
          instagram: string | null;
          twitter: string | null;
          facebook: string | null;
          tiktok: string | null;
          whatsapp: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          instagram?: string | null;
          twitter?: string | null;
          facebook?: string | null;
          tiktok?: string | null;
          whatsapp?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          instagram?: string | null;
          twitter?: string | null;
          facebook?: string | null;
          tiktok?: string | null;
          whatsapp?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
