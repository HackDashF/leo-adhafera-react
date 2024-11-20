import { createContext, ReactNode, useState } from "react";
import { User } from "../types/User";

const AppContext = createContext({});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
