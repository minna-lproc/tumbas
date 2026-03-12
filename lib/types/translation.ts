
// languages
export interface Language {
  id: string;
  language_name: string;
  iso_code: string;
  created_at: string;
  type: string;
}

// source text
export interface SourceText {
  id: string;
  text_content: string;
  language: Language;
  created_at: string;
}

// parallel source text for multiple languages
export interface ParallelSourceText {
  id: string;
  source_texts: Array<SourceText>;
  status: 'pending' | 'in progress' | 'translated';
}

// translation
export interface Translation {
  id: string;
  source_text: string;
  translator: string;
  translation_text: string;
  target_language: Language;
  created_at: string;
}

export interface Review {
  id: string;
  evaluator: string;
  modified_translation: string;
  translation: Translation;
  created_at: string;
}

