import { useContext } from "react";
import { AuthContext } from "@/store/auth.context";
import { Button } from "../ui/button";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className="h-16 w-full bg-primary text-primary-foreground">
      <div className="max-w-[1400px] h-full px-2 mx-auto flex items-center">
        <h1 className="text-3xl font-bold">RemindGoals</h1>
        {authCtx?.isLoggedIn ? (
          <p
            className="ml-auto hover:cursor-pointer"
            onClick={() => {
              authCtx?.onLogoutHandler();
            }}
          >
            LOGOUT
          </p>
        ) : (
          <>
            <Button className="ml-auto hover:cursor-pointer bg-primary-foreground text-primary mr-3 hover:bg-primary-foreground">
              LOGIN
            </Button>
            <p
              className="hover:cursor-pointer"
              onClick={() => {
                authCtx?.onLogoutHandler();
              }}
            >
              SIGNUP
            </p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
