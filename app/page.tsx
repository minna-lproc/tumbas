// import { redirect } from 'next/navigation';
// import { createServerSupabaseClient } from '@/lib/supabase/server';

// Supabase commented out - redirect to translate for UI development
export default async function HomePage() {
  // Always redirect to translate page for UI development
  // In production, this would check auth and redirect accordingly
  const { redirect } = await import('next/navigation');
  redirect('/translate');

  /* COMMENTED OUT - Supabase authentication
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/translate');
  } else {
    redirect('/login');
  }
  */
}
