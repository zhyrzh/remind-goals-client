import { FC, useRef, useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { IReminderInputValues } from "./add.reminder";
import { Calendar } from "../ui/calendar";
import moment from "moment";
import { Tabs, TabsContent } from "../ui/tabs";
import useCurrTabDetails from "@/hooks/useCurrTabDetails";
import { useToast } from "../ui/use-toast";
import { FrequencyEnum, radioItems } from "./constants";
import { IReminder } from "./types";

// Types declaration
interface IEditButton {
  reminder: IReminder;
  onEditReminder: (id: number, values: IReminderInputValues) => void;
}

/* Function component START */
const EditButton: FC<IEditButton> = ({ reminder, onEditReminder }) => {
  // useState declaration
  const [values, setValues] = useState<IReminderInputValues>({
    title: reminder.content,
    frequency: reminder.frequency,
  });
  const [showEditReminderModal, setShowEditReminderModal] =
    useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // hooks
  const { toast } = useToast();
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
  });

  // methods
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
    <Dialog
      open={showEditReminderModal}
      onOpenChange={setShowEditReminderModal}
    >
      <DialogTrigger asChild>
        <Pencil1Icon />
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="main">
          <TabsContent value="main">
            <DialogHeader>
              <DialogTitle>Edit reminder</DialogTitle>
            </DialogHeader>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              className="mt-2"
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  title: e.target.value,
                }))
              }
              value={values.title ? values?.title : reminder.content}
              ref={inputRef}
              autoFocus={false}
            />

            <div className="flex transition-all">
              <div>
                <h1 className="font-medium text-sm mb-2">Frequncy</h1>
                <RadioGroup
                  defaultValue={FrequencyEnum.once}
                  value={
                    values.frequency ? values.frequency : reminder.frequency
                  }
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
                  if (values.title && values.title.trim() !== "") {
                    onEditReminder(reminder.id, values!);
                    setShowEditReminderModal(false);
                  } else {
                    toast({
                      title: "Empty title",
                      description: "Please proved at title for your reminder",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Save
              </Button>
              <Button
                type="button"
                className="bg-transparent text-slate-900 hover:bg-transparent"
                onClick={() => {}}
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
                    onEditReminder(reminder.id, values!);
                  } else {
                    resetCurrTabDetails();
                    resetFields();
                    setShowEditReminderModal(false);
                  }
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

export default EditButton;
