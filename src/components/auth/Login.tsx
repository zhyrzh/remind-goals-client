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
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toaster } from "../ui/toaster";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log('first, "check');
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
        localStorage.setItem("remind-goals-ath-tkn", parsedData.access_token);
        if (parsedData.profile !== null) {
          navigate("/");
        } else {
          navigate("/setup-profile");
        }
        Cookies.remove("my-key");
      } else {
        console.log(JSON.parse(data!), "second");
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("remind-goals-ath-tkn")) {
      navigate("/");
    }
  }, []);

  const onLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
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
    console.log(data, "check data");
    if (data.profile) {
      navigate("/");
    } else {
      navigate("/setup-profile");
    }
  };

  return (
    <div className="h-screen flex items-center justify-items-center	">
      <Toaster />
      <Card className="mx-auto max-w-sm mb-24">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" type="submit" onClick={onLogin}>
              Login
            </Button>
          </div>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <Button
            className="w-full bg-[#1877F2] hover:bg-[#1877F2]/80"
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/auth/login/facebook")
            }
          >
            Login with facebook
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;