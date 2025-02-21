import { FC, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import { IReminder } from "./types";
import { ReminderContext } from "@/store/reminder.context";
import Spinner from "../ui/spinner";

interface ICustomCheckbox {
  reminder: IReminder;
}

/* Function component START */
const CustomCheckbox: FC<ICustomCheckbox> = ({ reminder }) => {
  // hooks declarations
  const toggleIsActiveMtn = useContext(ReminderContext).toggleIsActiveMtn;

  // useState declarations
  const [showSetIsActiveDialog, setShowIsActiveDialog] =
    useState<boolean>(false);

  if (toggleIsActiveMtn.isPending) {
    return <Spinner />;
  }

  return (
    <Dialog open={showSetIsActiveDialog} onOpenChange={setShowIsActiveDialog}>
      <DialogTrigger asChild>
        <Checkbox
          className="transition-all disabled:cursor-auto"
          checked={!reminder.isActive}
          disabled={!reminder.isActive}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark as done</DialogTitle>
          <DialogDescription>
            Are you sure you want this specific reminder to be marked as done?
            You <b>WON'T</b> be able to retain it's status if you do so.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              toggleIsActiveMtn.mutate({ id: reminder.id, isActive: false });
              setShowIsActiveDialog((prevVal) => !prevVal);
            }}
          >
            Yes
          </Button>
          <Button
            type="button"
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => setShowIsActiveDialog(false)}
          >
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
/* Function component START */

export default CustomCheckbox;
