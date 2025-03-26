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
  onFacebookAuthHandler: () => void;
  onGetUserDetails: () => void;
  onLoginHandler: UseMutationResult<
    any,
    FetchError,
    { username: string; password: string }
  >;
  onSignupHandler: UseMutationResult<
    any,
    FetchError,
    { email: string; password: string }
  >;
  onSetupProfileHandler: UseMutationResult<
    any,
    FetchError,
    { firstName: string; lastName: string }
  >;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { loginReq, signUpReq, setupProfileReq } = useAuthAPIRequest();

  useEffect(() => {
    onGetUserDetails();
  }, []);

  const onLogoutHandler = () => {
    localStorage.removeItem("remind-goals-ath-tkn");
    setIsLoggedIn(false);
    Cookies.remove("my-key", {
      domain: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
    });
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
        setIsLoggedIn(true);
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

  const onSignupHandler = useMutation<
    any,
    FetchError,
    { email: string; password: string }
  >({
    mutationKey: ["auth", "login"],
    mutationFn: signUpReq,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("remind-goals-ath-tkn", JSON.stringify(data));
        setIsLoggedIn(true);
        navigate("/setup-profile");
      }
    },
    onError: async () => {
      toast({
        title: "Signup error",
        variant: "destructive",
        description: "Email already taken.",
      });
    },
  });

  const onSetupProfileHandler = useMutation<
    any,
    FetchError,
    { firstName: string; lastName: string }
  >({
    mutationKey: ["auth", "login"],
    mutationFn: setupProfileReq,
    onSuccess: (data) => {
      const userDetails = JSON.parse(
        localStorage.getItem("remind-goals-ath-tkn")!
      );

      if (data) {
        localStorage.setItem(
          "remind-goals-ath-tkn",
          JSON.stringify({
            access_token: userDetails?.access_token,
            profile: data,
          })
        );
        navigate("/");
      }
    },
    onError: async () => {
      localStorage.removeItem("remind-goals-ath-tkn");
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
          localStorage.setItem("fb_auth_error", parsedData.message);
          toast({
            title: parsedData.message,
            variant: "destructive",
          });
        }
        Cookies.remove("my-key", {
          domain: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
        });
      }
    }
  };

  const onGetUserDetails = async () => {
    try {
      const userDetails = JSON.parse(
        localStorage.getItem("remind-goals-ath-tkn")!
      );
      const token = userDetails?.access_token ? userDetails?.access_token : "";
      const resposne = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/verify-user/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (resposne.status >= 400) {
        setIsLoggedIn(false);
        navigate("/login");
      }
      await resposne.json();
      setIsLoggedIn(true);
    } catch (error) {
      Cookies.remove("my-key", {
        domain: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
      });
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onLogoutHandler,
        onLoginHandler,
        onSignupHandler,
        onSetupProfileHandler,
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
