import { Language } from "./translation";

export interface AuthFormData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  source_language_id: number;
  source_language: string;
  target_language_id: number;
  target_language: string;
  is_active: boolean;
  has_read_guidelines: boolean;
  role: 'user' | 'evaluator' | 'admin';
  created_at: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'evaluator' | 'admin';
  source_language?: Language;
  target_language?: Language;
}

export interface RegisterResult {
  user: UserProfile;
  hasVerifiedEmail: boolean;
}