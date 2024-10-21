import { useToast } from "@/components/ui/use-toast";
import { createContext, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

interface IAuthContext {
  isLoggedIn: boolean;
  onLogoutHandler: () => void;
  onLoginHandler: (email: string, sting: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const onLogoutHandler = () => {
    localStorage.removeItem("remind-goals-ath-tkn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const onLoginHandler = async (email: string, password: string) => {
    if (password === "" || email === "") {
      toast({
        title: "All fields are required",
        description: "Kindly fill up all details",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status >= 400 && data.profile === null) {
        toast({
          title: "Invalid credentials",
          description: "Pleases provide valid credentials",
          variant: "destructive",
        });
        return;
      }

      setIsLoggedIn(true);

      localStorage.setItem(
        "remind-goals-ath-tkn",
        JSON.stringify({
          ...data,
          profile: data.profile !== null ? true : null,
        })
      );

      if (data.profile !== null) {
        navigate("/");
      } else {
        navigate("/setup-profile");
      }
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.removeItem("remind-goals-ath-tkn");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onLogoutHandler,
        onLoginHandler,
        isLoggedIn,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
