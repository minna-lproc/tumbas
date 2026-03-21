import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

type Payload = {
    translation: any;
    evaluator: string;
    modified_translation?: string;
};

export async function GET(request: Request) {

    try {
        const supabase = await createServerSupabaseClient();

        const { searchParams } = new URL(request.url);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

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
            .order('created_at', { ascending: false });

        if (user) query.eq('user_id', user.id);

        const { data, error } = await query;

        if (error ) throw error;

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

        const body = await request.json()

        const payload: Payload = {
            translation: body.translation_id,
            evaluator: user.id,
        };

        if (body.has_modified) {
            payload.modified_translation = body.review_text;
        }

        const { data, error: reviewError } = await supabase
            .from('reviews')
            .insert(payload)
            .select()
            .single();

        if (reviewError) throw reviewError;

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

/*export async function PATCH(request: Request) {
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
}*/
