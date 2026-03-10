import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const translationSchema = z.object({
  source_text_id: z.string().uuid(),
  translation_text: z.string().min(1, 'Translation text is required'),
  dialect: z.string().default('siargaonon'),
});

export async function GET(request: Request) {

  try {
    const supabase = await createServerSupabaseClient();

    const { searchParams } = new URL(request.url);
    const sourceTextId = searchParams.get('source_text_id');
    const userId = searchParams.get('user_id');

    let query = supabase.from('translations').select('*, source_texts(*), users(username, email)');

    if (sourceTextId) {
      query = query.eq('source_text_id', sourceTextId);
    }

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data, error: null });

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

    const body = await request.json();
    const validatedData = translationSchema.parse(body);

    // Check if user already translated this source text
    const { data: existing } = await supabase
      .from('translations')
      .select('id')
      .eq('source_text_id', validatedData.source_text_id)
      .eq('user_id', user.id)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'You have already translated this text' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('translations')
      .insert({
        ...validatedData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
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
