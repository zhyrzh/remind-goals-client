import Error from "@/Error";
import Home from "@/Home";
import Login from "@/components/auth/Login";
import SetupProfile from "@/components/auth/SetupProfile";
import Signup from "@/components/auth/Signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    path: "/setup-profile",
    element: <SetupProfile />,
    errorElement: <Error />,
  },
]);
