import "./App.css";
import Clock from "./components/clock";
import Reminder from "./components/reminder";
import Goal from "./components/goal";
import { Toaster } from "./components/ui/toaster";
import GoalContextProvider, { GoalContext } from "./store/goal.context";
import {
  ReminderContext,
  ReminderContextProvder,
} from "./store/reminder.context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";
import { AuthContextProvider } from "./store/auth.context";
import Cookies from "js-cookie";

function Home() {
  const navigate = useNavigate();
  const getAllRemindersQry = useContext(ReminderContext)?.getAllRemindersQry;
  const getAllGoalsQry = useContext(GoalContext)?.getAllGoalsQry;

  useEffect(() => {
    const userDetails = JSON.parse(
      localStorage.getItem("remind-goals-ath-tkn")!
    );

    if (userDetails && userDetails.profile === null) {
      navigate("/setup-profile");
    }
  }, []);

  // if (getAllGoalsQry?.isPending || getAllRemindersQry?.isPending) {
  //   return <Spinner />;
  // }

  if (
    getAllGoalsQry?.isError &&
    getAllGoalsQry.error.res.status === 401 &&
    localStorage.getItem("remind-goals-ath-tkn") === null
  ) {
    localStorage.removeItem("remind-goals-ath-tkn");
    Cookies.remove("my-key", {
      domain: import.meta.env.VITE_COOKIE_DOMAIN || "localhost",
    });
    navigate("/login");
  }

  return (
    <AuthContextProvider>
      <Header />
      <div className="max-w-[1400px] mx-auto px-2 pt-2">
        <Toaster />
        <div className="grid grid-cols-12 gap-[30px]">
          <Clock />
          <div className="col-start-1 col-end-13 transition-all">
            <ReminderContextProvder>
              <Reminder />
            </ReminderContextProvder>
          </div>
        </div>
        <GoalContextProvider>
          <Goal />
        </GoalContextProvider>
      </div>
    </AuthContextProvider>
  );
}

export default Home;
