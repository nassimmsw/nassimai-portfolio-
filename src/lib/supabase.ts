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
