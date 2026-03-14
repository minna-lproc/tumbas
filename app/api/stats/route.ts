import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");

  try {

    const supabase = await createServerSupabaseClient();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (role === "evaluator") {
      const { data: totalCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('evaluator', user.id)

      const { count: todayCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('evaluator', user.id)
        .gte('created_at', today.toISOString());


      const { data: recentTranslations } = await supabase
        .from('reviews')
        .select('translation_text, created_at, source_texts(text_content)')
        .eq('evaluator', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      return NextResponse.json({
        data: {
          total_translations: totalCount || 0,
          translations_today: todayCount || 0,
          recent_translations: recentTranslations || [],
        },
        error: null,
      });
    }

    const { data: totalCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('translator', user.id)

    console.log(totalCount)

    const { count: todayCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('translator', user.id)
      .gte('created_at', today.toISOString());


    const { data: recentTranslations } = await supabase
      .from('translations')
      .select('translation_text, created_at, source_texts(text_content)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      data: {
        total_translations: totalCount || 0,
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
