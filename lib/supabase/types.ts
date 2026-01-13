export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      source_texts: {
        Row: {
          id: string;
          text_content: string;
          language: string;
          category: string | null;
          difficulty_level: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          text_content: string;
          language: string;
          category?: string | null;
          difficulty_level?: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          text_content?: string;
          language?: string;
          category?: string | null;
          difficulty_level?: number;
          status?: string;
          created_at?: string;
        };
      };
      translations: {
        Row: {
          id: string;
          source_text_id: string;
          user_id: string;
          translation_text: string;
          dialect: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          source_text_id: string;
          user_id: string;
          translation_text: string;
          dialect: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          source_text_id?: string;
          user_id?: string;
          translation_text?: string;
          dialect?: string;
          created_at?: string;
        };
      };
      users: {
        Row: {
          id: string;
          username: string | null;
          email: string;
          total_translations: number;
        };
        Insert: {
          id: string;
          username?: string | null;
          email: string;
          total_translations?: number;
        };
        Update: {
          id?: string;
          username?: string | null;
          email?: string;
          total_translations?: number;
        };
      };
      dialects: {
        Row: {
          id: string;
          name: string;
          code: string;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          code: string;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          code?: string;
          is_active?: boolean;
        };
      };
    };
  };
}
