import { useToast } from "@/components/ui/use-toast";
import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Toaster } from "@/components/ui/toaster";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuthAPIRequest } from "@/hooks/useAuthAPIRequeset";
import { FetchError } from "@/utils/error";

interface IAuthContext {
  isLoggedIn: boolean;
  onLogoutHandler: () => void;
  onSignUpHandler: (email: string, password: string) => Promise<void>;
  onFacebookAuthHandler: () => void;
  onGetUserDetails: () => void;
  onLoginHandler: UseMutationResult<
    any,
    FetchError,
    { username: string; password: string }
  >;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { loginReq } = useAuthAPIRequest();

  useEffect(() => {
    onGetUserDetails();
  }, []);

  const onLogoutHandler = () => {
    localStorage.removeItem("remind-goals-ath-tkn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const onLoginHandler = useMutation<
    any,
    FetchError,
    { username: string; password: string }
  >({
    mutationKey: ["auth", "login"],
    mutationFn: loginReq,
    onSuccess: (data) => {
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
    },
    onError: (error) => {
      if (error!.res?.status >= 400 && error!.res?.status < 500) {
        toast({
          title: "Invalid credentials",
          description: "Pleases provide valid credentials",
          variant: "destructive",
        });
        return;
      }
    },
  });

  const onFacebookAuthHandler = () => {
    if (window.location.hash === "#_=_") {
      if (history.replaceState) {
        const cleanHref = window.location.href.split("#")[0];
        history.replaceState(null, "", cleanHref);
      } else {
        window.location.hash = "";
      }
    }
    const data = Cookies.get("my-key");

    if (data) {
      if (data?.includes("j:")) {
        const cookieData = data?.replace("j:", "");
        const parsedData = JSON.parse(cookieData!);

        if (parsedData?.profile !== undefined) {
          localStorage.setItem("remind-goals-ath-tkn", cookieData);
          setIsLoggedIn(true);
          if (parsedData?.profile === null) {
            navigate("/setup-profile");
          } else {
            navigate("/");
          }
        } else {
          toast({
            title: parsedData.message,
            variant: "destructive",
          });
        }
        Cookies.remove("my-key");
      }
    }
  };

  const onSignUpHandler = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem("remind-goals-ath-tkn", JSON.stringify(data));
        navigate("/setup-profile");
      } else {
        toast({
          title: "Signup error",
          variant: "destructive",
          description: data.message,
        });
      }
    } catch (error) {
      localStorage.removeItem("remind-goals-ath-tkn");
    }
  };

  const onGetUserDetails = async () => {
    try {
      const userDetails = JSON.parse(
        localStorage.getItem("remind-goals-ath-tkn")!
      );
      const token = userDetails?.access_token ? userDetails?.access_token : "";
      const resposne = await fetch(`http://localhost:5001/auth/verify-user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (resposne.status >= 400) {
        setIsLoggedIn(false);
        navigate("/login");
      }
      await resposne.json();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onLogoutHandler,
        onLoginHandler,
        onSignUpHandler,
        onFacebookAuthHandler,
        onGetUserDetails,
        isLoggedIn,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
