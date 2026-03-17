import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: Request) {

  try {
    const supabase = await createServerSupabaseClient();
    const limit = 10;

    const { searchParams } = new URL(request.url);
    const sourceLanguage = parseInt(searchParams.get('sourceLanguage') || '0');
    const targetLanguage = parseInt(searchParams.get('targetLanguage') || '0');

    const query = supabase
      .from('pending_translations')
      .select('*')
      .order('created_at', { ascending: false });

    if (sourceLanguage != 0) query.eq('source_language', sourceLanguage);
    if (targetLanguage != 0) query.eq('target_language', targetLanguage);

    const { data, error: translationsError } = await query;

    if (translationsError) throw translationsError;

    const shuffled = data.sort(() => Math.random() - 0.5).slice(0, limit);

    return NextResponse.json({ shuffled, error: null });

  } catch (error) {

    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );

  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from('translations')
      .insert({
        source_text: body.source_text,
        translator: user.id,
        target_language: body.dialect,
        translation_text: body.translation_text

      })
      .select()
      .single();
    
    if (error) throw error;

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Translation ID is required' }, { status: 400 });
    }

    // Verify ownership
    const { data: existing } = await supabase
      .from('translations')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing || existing.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('translations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, error: null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
