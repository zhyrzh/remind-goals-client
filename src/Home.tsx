import "./App.css";
import Clock from "./components/clock";
import Reminder from "./components/reminder";
import Goal from "./components/goal";
import { Toaster } from "./components/ui/toaster";
import GoalContextProvider from "./store/goal.context";
import { ReminderContextProvder } from "./store/reminder.context";

function Home() {
  return (
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
  );
}

export default Home;
