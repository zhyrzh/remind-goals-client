import "./App.css";
import { Button } from "./components/ui/button";
import Clock from "./components/clock";
import Reminder from "./components/reminder";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <div className="grid grid-cols-12 gap-[30px]">
        <Clock />
        <div className="col-start-4 col-end-13 transition-all">
          <Reminder />
        </div>
      </div>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <Button>Add Goal</Button>
        </div>
        {/* <ReminderList /> */}
      </div>
    </div>
  );
}

export default App;
