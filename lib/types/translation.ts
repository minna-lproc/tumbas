export interface SourceText {
  id: string;
  text_content: string;
  language: string;
  category: string | null;
  difficulty_level: number;
  status: string;
  created_at: string;
}

export interface Translation {
  id: string;
  source_text_id: string;
  user_id: string;
  translation_text: string;
  dialect: string;
  created_at: string;
}
