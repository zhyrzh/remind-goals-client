import { createContext, FC } from "react";
import { Toaster } from "@/components/ui/toaster";

interface IAuthContext {}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
