import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('total_translations')
      .eq('id', user.id)
      .single();

    if (userError) throw userError;

    // Get today's translations count
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: todayCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString());

    // Get recent translations
    const { data: recentTranslations } = await supabase
      .from('translations')
      .select('translation_text, created_at, source_texts(text_content)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      data: {
        total_translations: userProfile?.total_translations || 0,
        translations_today: todayCount || 0,
        recent_translations: recentTranslations || [],
      },
      error: null,
    });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
