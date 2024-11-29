import { API_URL } from "../../config";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthTokens,
} from "../../types/Auth";
import { User } from "../../types/User";
import {
  SnakeCaseUser,
  userFromSnakeCase,
} from "../../types/dataMapppers/UserMapper";
import { apiRequest } from "../../utils/apiUtils";

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiRequest<AuthTokens>(() =>
      fetch(`${API_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
    ),

  register: (credentials: RegisterCredentials) =>
    apiRequest<void>(() =>
      fetch(`${API_URL}/auth/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
    ),

  getCurrentUser: (token: string) =>
    apiRequest<SnakeCaseUser, User>(
      () =>
        fetch(`${API_URL}/auth/users/me/`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }),
      userFromSnakeCase,
    ),

  refreshToken: (token: string) =>
    apiRequest<AuthTokens>(() =>
      fetch(`${API_URL}/auth/jwt/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: token }),
      }),
    ),

  verifyToken: (token: string) =>
    apiRequest<boolean>(() =>
      fetch(`${API_URL}/auth/jwt/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }),
    ),
};
