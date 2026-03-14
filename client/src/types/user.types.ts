export interface User {
  _id: string;
  email: string;
  username: string;
  accessToken?: string;
}

export interface UserResponse {
  status: string;
  data: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  saveSession: (user: User) => void;
  clearSession: () => void;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  email: string;
  username: string;
  password: string;
}