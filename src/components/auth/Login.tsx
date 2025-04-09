import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/store/auth.context";
import { useToast } from "../ui/use-toast";
import Spinner from "../ui/spinner";

const Login = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWindowRef = useRef<any>(null);

  useEffect(() => {
    const fb_auth_error = window.localStorage.getItem("fb_auth_error");
    if (fb_auth_error !== null) {
      toast({
        title: fb_auth_error,
        variant: "destructive",
      });
    }
    const interval = setInterval(() => {
      window.localStorage.removeItem("fb_auth_error");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    authCtx.onFacebookRefetchAuthHandler();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("remind-goals-ath-tkn")) {
      navigate("/");
    }
  }, []);

  const onLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const loginHandler = authCtx?.onLoginHandler;

    if (password === "" || email === "") {
      toast({
        title: "All fields are required",
        description: "Kindly fill up all details",
        variant: "destructive",
      });
      return;
    }

    loginHandler.mutateAsync({ username: email, password });
  };

  if (authCtx.onLoginHandler.isPending) {
    return <Spinner />;
  }

  useEffect(() => {
    const messageListener = (event: MessageEvent) => {
      console.log("should be here", event.origin);
      if (event.origin !== import.meta.env.VITE_BACKEND_URL) return;

      if (event.data === "auth_complete") {
        console.log("should be here rt?");
        if (loginWindowRef?.current) {
          loginWindowRef.current.close();
        }
        window.location.reload();
      }
    };

    window.addEventListener("message", messageListener);

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-items-center	">
      <Card className="mx-auto max-w-sm mb-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full mt-12" type="submit">
              Login
            </Button>
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Button
              className="w-full bg-[#1877F2] hover:bg-[#1877F2]/80"
              onClick={(e) => {
                e.preventDefault();
                if (import.meta.env.VITE_BACKEND_URL === "production")
                  authCtx?.onFacebookAuthHandler(
                    `/auth/login/facebook`,
                    loginWindowRef
                  );
                else
                  toast({
                    title: "Facebook login only available in development mode.",
                    description:
                      "Facebook app is not configured for production. Kindly use email and password.",
                  });
              }}
            >
              Login with facebook
            </Button>
            <CardDescription className="text-center mt-12">
              Not yet registed? Go to{" "}
              <Link to={"/signup"} className="underline">
                signup page
              </Link>
              .
            </CardDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
