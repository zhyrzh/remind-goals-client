import { createContext, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

interface IAuthContext {
  isLoggedIn: boolean;
  onLogoutHandler: () => void;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onLogoutHandler = () => {
    localStorage.removeItem("remind-goals-ath-tkn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        onLogoutHandler,
        isLoggedIn,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
