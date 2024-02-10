import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar } from "../ui/calendar";
import moment from "moment";
import { Button } from "../ui/button";

interface IAddReminder {
  // freqVal: FrequencyEnum;
  // showAddReminderModal: boolean;
  // setShowAddReminderModal: React.Dispatch<React.SetStateAction<boolean>>;
  // setFreqVal: React.Dispatch<React.SetStateAction<string>>;
  onAddGoal: (value: { title: string; frequency: FrequencyEnum }) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const enum FrequencyEnum {
  once = "once",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  annually = "annually",
}

const radioItems = [
  {
    item: FrequencyEnum.once,
  },
  {
    item: FrequencyEnum.daily,
  },
  {
    item: FrequencyEnum.weekly,
  },
  {
    item: FrequencyEnum.monthly,
  },
  {
    item: FrequencyEnum.annually,
  },
];

const AddReminder: FC<IAddReminder> = ({ onAddGoal }) => {
  const [showAddReminderModal, setShowAddReminderModal] =
    useState<boolean>(false);

  const [values, setValues] = useState<{
    title: string;
    frequency: FrequencyEnum;
  }>({
    title: "",
    frequency: FrequencyEnum.once,
  });

  const isDisabled = (current: Date) => {
    const curr = moment(current);
    // const customDate = moment().format("YYYY-MM-DD");
    // return curr && curr.isBefore(customDate);
    return curr.isBefore(moment());
  };

  return (
    <Dialog open={showAddReminderModal} onOpenChange={setShowAddReminderModal}>
      <DialogTrigger asChild>
        <Button>Add Reminder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new reminder</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="mt-2"
            value={values && values.title}
            onChange={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex transition-all">
          <div>
            <h1 className="font-medium text-sm mb-2">Frequncy</h1>
            <RadioGroup
              defaultValue={FrequencyEnum.once}
              value={values.frequency}
              onValueChange={(value: FrequencyEnum) =>
                setValues((prevValues) => ({ ...prevValues, frequency: value }))
              }
            >
              {radioItems.map(({ item }) => (
                <div key={item} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>
                    {item.charAt(0).toUpperCase() + item.slice(1, item.length)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {values.frequency === FrequencyEnum.once && (
            <div className="ml-12">
              <h1 className="font-medium text-sm mb-2">Pick a date</h1>
              <Calendar
                disabled={isDisabled}
                className="bg-slate-200 mx-auto"
              />
            </div>
          )}
        </div>
        <DialogFooter className="mt-12">
          <Button
            type="submit"
            onClick={() => {
              onAddGoal(values);
              setShowAddReminderModal(false);
            }}
          >
            Add Reminder
          </Button>
          <Button
            type="button"
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => setShowAddReminderModal(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReminder;
