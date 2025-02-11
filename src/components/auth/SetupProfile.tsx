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
import { FormEventHandler, useContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { AuthContext } from "@/store/auth.context";

const SetupProfile = () => {
  const authCtx = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { toast } = useToast();

  const onSetupProfile: FormEventHandler = async (e) => {
    e.preventDefault();

    if (firstName === "" || lastName === "") {
      toast({
        title: "All fields are required",
        description: "Kindly fill up all details",
        variant: "destructive",
      });
    }

    authCtx.onSetupProfileHandler.mutate({ firstName, lastName });
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
