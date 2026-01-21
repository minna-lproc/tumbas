import { Language } from "./translation";

export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  first_name: string;
  last_name: string;
  source_language?: Language;
  target_language?: Language;
  is_active: boolean;
  is_admin: boolean;
  is_evaluator: boolean;
  date_joined: string;
  total_translations: number;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  is_evaluator: boolean;
}

export interface RegisterResult {
  user: User;
  hasVerifiedEmail: boolean;
}