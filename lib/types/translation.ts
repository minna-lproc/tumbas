
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
  source_text_id: string;
  user_id: string;
  translation_text: string;
  voice_recording_url?: string;
  voice_recording_duration?: number;
  voice_recording_blob?: Blob;
  language: Language;
  created_at: string;
  review_status: 'pending' | 'in progress' | 'approved' | 'modified';
  evaluator_id?: string;
  reviewed_at?: string;
}
