import "./App.css";
import Clock from "./components/clock";
import Reminder from "./components/reminder";
import Goal from "./components/goal";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <Toaster />
      <div className="grid grid-cols-12 gap-[30px]">
        <Clock />
        <div className="col-start-4 col-end-13 transition-all">
          <Reminder />
        </div>
      </div>
      <Goal />
    </div>
  );
}

export default App;
