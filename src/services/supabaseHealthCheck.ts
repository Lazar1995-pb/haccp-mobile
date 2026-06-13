import { isSupabaseConfigured, supabase } from '../lib/supabase';

export type SupabaseHealthCheckResult = {
  success: boolean;
  message: string;
};

export function checkSupabaseHealth(): SupabaseHealthCheckResult {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      message: 'Supabase environment variables are not configured.',
    };
  }

  if (!supabase) {
    return {
      success: false,
      message: 'Supabase client is not initialized.',
    };
  }

  return {
    success: true,
    message: 'Supabase client is initialized.',
  };
}
