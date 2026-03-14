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
  source_language: number;
  source: string;
  target_language: number;
  target: string;
  is_active: boolean;
  role: 'user' | 'evaluator' | 'admin';
  date_joined: string;
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