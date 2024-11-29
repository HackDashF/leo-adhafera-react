import { User } from "../User";

export interface SnakeCaseUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const userFromSnakeCase = (user: SnakeCaseUser): User => ({
  id: user.id,
  username: user.username,
  email: user.email,
  firstName: user.first_name,
  lastName: user.last_name,
});

export const userToSnakeCase = (user: User): SnakeCaseUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  first_name: user.firstName,
  last_name: user.lastName,
});
