import { RegisterCredentials } from "../Auth";

export interface SnakeCaseRegisterCredentials {
  username: string;
  password: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export const registerCredentialsFromSnakeCase = (
  creds: SnakeCaseRegisterCredentials,
): RegisterCredentials => ({
  username: creds.username,
  password: creds.password,
  email: creds.email,
  firstName: creds.first_name,
  lastName: creds.last_name,
});

export const registerCredentialsToSnakeCase = (
  creds: RegisterCredentials,
): SnakeCaseRegisterCredentials => ({
  username: creds.username,
  password: creds.password,
  email: creds.email,
  first_name: creds.firstName,
  last_name: creds.lastName,
});
