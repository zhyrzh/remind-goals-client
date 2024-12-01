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
import { FormEventHandler, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { AuthContext } from "@/store/auth.context";

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrimedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    authCtx?.onFacebookAuthHandler();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("remind-goals-ath-tkn") &&
      window.location.hash !== "#_=_"
    ) {
      navigate("/");
    }
  }, []);

  const onSignUp: FormEventHandler = async (e) => {
    e.preventDefault();
    if (password === "" || email === "" || confrimedPassword === "") {
      toast({
        title: "All fields are required",
        description: "Kindly fill up all details",
        variant: "destructive",
      });
      return;
    }
    authCtx.onSignUpHandler(email, password);
  };

  return (
    <div className="h-screen flex items-center justify-items-center	">
      <Toaster />
      <Card className="mx-auto max-w-sm mb-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSignUp}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  required
                  type="password"
                  value={confrimedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full mt-12" type="submit" onClick={onSignUp}>
              Signup
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
                window.location.href =
                  "http://localhost:5001/auth/signup/facebook";
              }}
            >
              Signup with facebook
            </Button>
            <CardDescription className="text-center mt-12">
              Already registed? Go to{" "}
              <Link to={"/login"} className="underline">
                login page
              </Link>
              .
            </CardDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
