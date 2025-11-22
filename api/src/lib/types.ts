export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate: Date;
  created_at: Date;
  updated_at: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: Omit<User, 'password'>;
    token?: string;
  };
  error?: string;
}