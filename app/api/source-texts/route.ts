import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  try {

    const supabase = await createServerSupabaseClient();
    const { searchParams } = new URL(request.url);

    const language = parseInt(searchParams.get('language') || '0');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const { data: sourceTexts, error: sourceTextsError } = await supabase
      .from("pending_source_texts" as any)
      .select("*")
      .eq("language", language)
      .order('created_at', { ascending: false })
      .limit(limit);


    if (sourceTextsError) throw sourceTextsError;

    const shuffled = sourceTexts.sort(() => Math.random() - 0.5).slice(0, limit);


    return NextResponse.json({ data: shuffled, error: null });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
