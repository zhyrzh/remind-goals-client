import Error from "@/Error";
import Home from "@/Home";
import Login from "@/components/auth/Login";
import SetupProfile from "@/components/auth/SetupProfile";
import Signup from "@/components/auth/Signup";
import Header from "@/components/header";
import { AuthContextProvider } from "@/store/auth.context";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <AuthContextProvider>
        <Login />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: (
      <AuthContextProvider>
        <Signup />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/setup-profile",
    element: (
      <AuthContextProvider>
        <Header />
        <SetupProfile />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
  },
]);
