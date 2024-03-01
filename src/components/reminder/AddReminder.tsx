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
import { Tabs, TabsContent } from "../ui/tabs";
import { useToast } from "../ui/use-toast";
import useCurrTabDetails from "@/hooks/useCurrTabDetails";
import { FrequencyEnum, radioItems } from "./constants";

// Types declarations
interface IAddReminder {
  onAddReminder: (value: IReminderInputValues) => void;
}

export interface IReminderInputValues {
  title: string;
  frequency: FrequencyEnum;
}

/* Function component START */
const AddReminder: FC<IAddReminder> = ({ onAddReminder }) => {
  // useState declaration
  const [showAddReminderModal, setShowAddReminderModal] =
    useState<boolean>(false);
  const [values, setValues] = useState<IReminderInputValues>({
    title: "",
    frequency: FrequencyEnum.once,
  });

  // hooks declaration
  const { toast } = useToast();
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
  });

  // methods declaration
  const isDisabled = (current: Date) => {
    const curr = moment(current);
    // const customDate = moment().format("YYYY-MM-DD");
    // return curr && curr.isBefore(customDate);
    return curr.isBefore(moment());
  };

  const resetCurrTabDetails = () => {
    setCurrTabDetails({
      value: "main",
      isCancel: false,
      tabTitle: "",
    });
  };

  const resetFields = () => {
    setValues({
      title: "",
      frequency: FrequencyEnum.once,
    });
  };

  return (
    <Dialog open={showAddReminderModal} onOpenChange={setShowAddReminderModal}>
      <DialogTrigger asChild>
        <Button>Add Reminder</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="main" value={currTabDetails.value}>
          <TabsContent value="main">
            <DialogHeader>
              <DialogTitle>Add new reminder</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
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

            <div className="flex transition-all mt-4">
              <div>
                <h1 className="font-medium text-sm mb-2">Frequncy</h1>
                <RadioGroup
                  defaultValue={FrequencyEnum.once}
                  value={values.frequency}
                  onValueChange={(value: FrequencyEnum) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      frequency: value,
                    }))
                  }
                >
                  {radioItems.map(({ item }) => (
                    <div key={item} className="flex items-center space-x-2">
                      <RadioGroupItem value={item} id={item} />
                      <Label htmlFor={item}>
                        {item.charAt(0).toUpperCase() +
                          item.slice(1, item.length)}
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
                  if (!values.title || values.title.trim() === "") {
                    toast({
                      title: "No title added.",
                      description: "Add a title to your reminder",
                      variant: "destructive",
                    });
                    return;
                  }
                  setCurrTabDetails({
                    value: "confirmation",
                    isCancel: false,
                    tabTitle: "Are you sure you want to add this reminder?",
                  });
                }}
              >
                Add Reminder
              </Button>
              <Button
                type="button"
                className="bg-transparent text-slate-900 hover:bg-transparent"
                onClick={() => {
                  if (values.title && values.title.trim() !== "") {
                    setCurrTabDetails({
                      value: "confirmation",
                      isCancel: true,
                      tabTitle: "Are you sure you want to discard your changes",
                    });
                    return;
                  } else {
                    setShowAddReminderModal(false);
                  }
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="confirmation">
            <DialogHeader>
              <DialogTitle>{currTabDetails.tabTitle}</DialogTitle>
            </DialogHeader>

            <DialogFooter className="mt-12">
              <Button
                type="submit"
                onClick={() => {
                  if (!currTabDetails.isCancel) {
                    console.log("triggered");
                    onAddReminder(values);
                  }
                  resetCurrTabDetails();
                  resetFields();
                  setShowAddReminderModal(false);
                }}
              >
                {!currTabDetails.isCancel ? "Confirm" : "Discard"}
              </Button>
              <Button
                type="button"
                className="bg-transparent text-slate-900 hover:bg-transparent"
                onClick={() => {
                  resetCurrTabDetails();
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
/* Function component END */

export default AddReminder;
