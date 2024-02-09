import { useState } from "react";
import "./App.css";
import moment from "moment";
import ReminderList from "./components/reminder";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Calendar } from "./components/ui/calendar";
import Clock from "./components/clock";

function App() {
  const [showAddReminderModal, setShowAddReminderModal] =
    useState<boolean>(false);

  const [freqVal, setFreqVal] = useState<string>("once");

  const isDisabled = (current: Date) => {
    const curr = moment(current);
    const customDate = moment().format("YYYY-MM-DD");
    return curr && curr.isBefore(customDate);
    // return current.isBefore(moment())
  };
  return (
    <div className="max-w-[1400px] mx-auto ">
      <Dialog
        open={showAddReminderModal}
        onOpenChange={setShowAddReminderModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new reminder</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" className="mt-2" />
          </div>

          <div className="flex transition-all">
            <div>
              <h1 className="font-medium text-sm mb-2">Frequncy</h1>
              <RadioGroup
                defaultValue="once"
                value={freqVal}
                onValueChange={(value) => setFreqVal(value)}
                className=""
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="once" id="r1" />
                  <Label htmlFor="r1">Once</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="r2" />
                  <Label htmlFor="r2">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="r3" />
                  <Label htmlFor="r3">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="r4" />
                  <Label htmlFor="r4">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="annually" id="r5" />
                  <Label htmlFor="r5">Annually</Label>
                </div>
              </RadioGroup>
            </div>
            {freqVal === "once" && (
              <div className="ml-12">
                <h1 className="font-medium text-sm mb-2">Pick a date</h1>
                <Calendar
                  disabled={isDisabled}
                  className="bg-slate-200 mx-auto"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-12 gap-[30px]">
        <Clock />
        <div className="col-start-4 col-end-13 transition-all">
          <div className="flex justify-between mb-[15px]">
            <h1 className="text-[24px] font-bold">Reminders</h1>
            <Button onClick={() => setShowAddReminderModal(true)}>
              Add Reminder
            </Button>
          </div>
          <ReminderList />
        </div>
      </div>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <Button>Add Goal</Button>
        </div>
        <ReminderList />
      </div>
    </div>
  );
}

export default App;

// const disabledDate = (current: Moment) => {
//   let customDate = moment().format("YYYY-MM-DD");
//   return current && current < moment(customDate, "YYYY-MM-DD");
//   // return current.isBefore(moment())
// };
