import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const limit = parseInt(searchParams.get("limit") || '0');

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
      const { count: totalCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('evaluator', user.id)

      const { count: todayCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('evaluator', user.id)
        .gte('created_at', today.toISOString());


      const query = supabase
        .from('reviews')
        .select(`
      id,
      evaluator,
      modified_translation,
      created_at,
      translation,
      translations (
        id,
        translation_text,
        source_text,
        source_texts (
          text_content,
          parallel_to,
          parallel_source_texts (
            status 
          )
        )
      )
    `)
        .eq('evaluator', user.id)
        .order('created_at', { ascending: false })

      if (limit != 0) query.limit(limit);

      const { data: recentReviews, error } = await query;

      const formatted = recentReviews?.map(r => ({
      id: r.id,
      evaluator: r.evaluator,
      modified_translation: r.modified_translation,
      created_at: r.created_at,
      translation: r.translation,
      translation_text: r.translations?.translation_text,
      source_text: r.translations?.source_text,
      text_content: r.translations?.source_texts?.text_content,
      status: r.translations?.source_texts?.parallel_source_texts?.status
      }));

      return NextResponse.json({
        data: {
          total_stats: totalCount || 0,
          stats_today: todayCount || 0,
          recent_stats: formatted || [],
        },
        error: null,
      });
    }

    const { count: totalCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('translator', user.id)

    const { count: todayCount } = await supabase
      .from('translations')
      .select('*', { count: 'exact', head: true })
      .eq('translator', user.id)
      .gte('created_at', today.toISOString());


    const { data: recentTranslations, error } = await supabase
      .from('translations')
      .select('*, source_texts(text_content)')
      .eq('translator', user.id)
      .order('created_at', { ascending: false })
      .limit(3);

    return NextResponse.json({
      data: {
        total_stats: totalCount || 0,
        stats_today: todayCount || 0,
        recent_stats: recentTranslations || [],
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
