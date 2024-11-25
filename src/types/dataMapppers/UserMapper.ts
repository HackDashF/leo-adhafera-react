import { User } from "../User";

export interface SnakeCaseUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const transformUser = (user: SnakeCaseUser): User => ({
  id: user.id,
  username: user.username,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});
