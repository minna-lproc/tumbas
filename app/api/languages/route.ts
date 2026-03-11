import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  try {

    const supabase = await createServerSupabaseClient();

    const { data, error: LanguagesError } = await supabase
      .from("languages" as any)
      .select("*")

    if (LanguagesError) throw LanguagesError;
    return NextResponse.json({ data: data, error: null });
    
  } catch (error) {
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}