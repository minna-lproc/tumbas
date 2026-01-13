export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  total_translations: number;
}
