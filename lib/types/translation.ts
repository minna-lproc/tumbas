
// languages
export interface Language {
  id: string;
  language_name: string;
  iso_code: string;
  created_at: string;
  type: string;
}

// parallel source text for multiple languages
export interface ParallelSourceText {
  id: string;
  status: string;
  created_at: string;
}

// source text
export interface SourceText {
  id: number;
  text_content: string;
  language: number;
  created_at: string;
  parallel_to: number;
  parallel_source_texts: ParallelSourceText;
}

// translation
export interface Translation {
  id: string;
  source_text: number;
  source_texts: SourceText;
  translator: string;
  translation_text: string;
  target_language: number;
  created_at: string;
}

export interface Review {
  id: string;
  evaluator: string;
  modified_translation: string;
  translation: number;
  translations: Translation;
  created_at: string;
}

