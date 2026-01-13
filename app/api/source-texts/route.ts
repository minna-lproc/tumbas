import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get source texts that user hasn't translated yet
    const { data: sourceTexts, error: sourceTextsError } = await supabase
      .from('source_texts')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (sourceTextsError) throw sourceTextsError;

    // Get user's translations to filter out already translated texts
    const { data: userTranslations } = await supabase
      .from('translations')
      .select('source_text_id')
      .eq('user_id', user.id);

    const translatedIds = new Set(userTranslations?.map((t) => t.source_text_id) || []);

    const availableTexts = sourceTexts?.filter((text) => !translatedIds.has(text.id)) || [];

    return NextResponse.json({ data: availableTexts, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
