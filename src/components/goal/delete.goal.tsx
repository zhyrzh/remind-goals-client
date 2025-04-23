import { FC, useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { GoalContext } from "@/store/goal.context";
import { IGoal } from "./types";
import Spinner from "../ui/spinner";
import { TrashIcon } from "@radix-ui/react-icons";

const DeleteGoal: FC<{ goal: IGoal }> = ({ goal }) => {
  // context declarations
  const goalCtx = useContext(GoalContext);

  // useState declarations
  const [showSetIsActiveDialog, setShowIsActiveDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (goalCtx.deleteGoalMtn.status !== "pending") {
      setShowIsActiveDialog(false);
    }
  }, []);

  return (
    <Dialog open={showSetIsActiveDialog} onOpenChange={setShowIsActiveDialog}>
      <DialogTrigger asChild>
        <TrashIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this goal. You won't be able to redo
            your action if you do so.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              goalCtx.deleteGoalMtn.mutate({ id: goal.id });
            }}
            disabled={goalCtx.deleteGoalMtn.isPending}
          >
            {goalCtx.deleteGoalMtn.isPending ? <Spinner /> : "Yes"}
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

export default DeleteGoal;
