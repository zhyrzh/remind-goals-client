import { FC, useContext, useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IReminder } from "./types";
import { ReminderContext } from "@/store/reminder.context";
import Spinner from "../ui/spinner";

// Types declaration
interface IDeleteButton {
  reminder: IReminder;
}

/* Function component START */
const DeleteButton: FC<IDeleteButton> = ({ reminder }) => {
  // context declarations
  const reminderCtx = useContext(ReminderContext);

  // useState declarations
  const [showSetIsActiveDialog, setShowIsActiveDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (reminderCtx.deleteReminderItemMtn.status !== "pending") {
      setShowIsActiveDialog(false);
    }
  }, []);

  return (
    <Dialog open={showSetIsActiveDialog} onOpenChange={setShowIsActiveDialog}>
      <DialogTrigger asChild>
        <TrashIcon className="ml-auto" fill="true" onClick={() => {}} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this reminder. You won't be able to
            redo your action if you do so.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              reminderCtx.deleteReminderItemMtn.mutate({ id: reminder.id });
            }}
            disabled={reminderCtx.deleteReminderItemMtn.isPending}
          >
            {reminderCtx.deleteReminderItemMtn.isPending ? <Spinner /> : "Yes"}
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
/* Function component END */

export default DeleteButton;
