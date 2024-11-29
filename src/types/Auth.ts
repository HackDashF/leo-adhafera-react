export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
