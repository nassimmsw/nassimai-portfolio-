import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: number;
  title: string;
  description: string;
  long_description: string;
  tags: string[];
  color: string;
  icon: string;
  github: string;
  demo: string;
  created_at: string;
}

const ADMINCredentials = {
  email: 'admin@portfolio.com',
  password: 'Portfolio@2024!',
};

export const getAdminCredentials = () => {
  const stored = localStorage.getItem('admin_credentials');
  if (stored) {
    return JSON.parse(stored);
  }
  return ADMINCredentials;
};

export const setAdminCredentials = (email: string, password: string) => {
  localStorage.setItem('admin_credentials', JSON.stringify({ email, password }));
};

export const getAdminEmail = () => getAdminCredentials().email;
export const getAdminPassword = () => getAdminCredentials().password;
