import { createContext, ReactNode, useState } from "react";
import { User } from "../types/User";
import { AuthTokens } from "../types/Auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  tokens: null,
  setTokens: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, tokens, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
