export interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  isExist: boolean;
  kitchenkakisJWT: string;
}

