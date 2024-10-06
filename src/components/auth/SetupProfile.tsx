import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Toaster } from "../ui/toaster";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

const SetupProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const onSetupProfile: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const userDetails = JSON.parse(
        localStorage.getItem("remind-goals-ath-tkn")!
      );
      const token = userDetails?.access_token ? userDetails?.access_token : "";
      const res = await fetch("http://localhost:5001/users/setup-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("remind-goals-ath-tkn");
    }
  };

  return (
    <div className="h-screen flex items-center justify-items-center	">
      <Toaster />
      <form className="mx-auto max-w-sm mb-24" onSubmit={onSetupProfile}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Setup your profile
            </CardTitle>
            <CardDescription>
              Enter your first name and last name to setup your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  autoComplete="off"
                  id="firstName"
                  required
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  autoComplete="off"
                  id="lastName"
                  required
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
            </div>
            <Button className="w-full mt-12" type="submit">
              Continue
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SetupProfile;
