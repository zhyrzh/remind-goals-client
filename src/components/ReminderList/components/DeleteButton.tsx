import { FC, useState } from "react";
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
import { IGoal } from "../ReminderItem";

const DeleteButton: FC<{
  goal: IGoal;
  onRemoveGoal: (id: number) => void;
}> = ({ goal, onRemoveGoal }) => {
  const [showSetIsActiveDialog, setShowIsActiveDialog] =
    useState<boolean>(false);
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
              onRemoveGoal(goal.id);
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

export default DeleteButton;
