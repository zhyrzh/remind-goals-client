import { FC, useEffect, useState } from "react";
import Checklist from "../checklist";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { IGoal, IGoalChecklist } from ".";

interface IEditGoalProps {
  goalId: number;
  goalTitle: string;
  checklist: IGoalChecklist[];
  onEditGoal: (id: number, goal: Omit<IGoal, "id">) => void;
}

const EditGoal: FC<IEditGoalProps> = ({
  checklist,
  goalTitle,
  goalId,
  onEditGoal,
}) => {
  const [showEditGoalModal, setShowEditGoalModal] = useState<boolean>(false);
  const [currentGoalTitle, setCurrentGoalTitle] = useState<string>("");
  const [currentChecklist, setCurrentChecklist] = useState<IGoalChecklist[]>(
    []
  );

  useEffect(() => {
    setCurrentChecklist(checklist);
    setCurrentGoalTitle(goalTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEditGoalModal]);

  return (
    <Dialog open={showEditGoalModal} onOpenChange={setShowEditGoalModal}>
      <DialogTrigger asChild>
        <Button>Edit Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit goal details</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="mt-2"
            onChange={(e) => setCurrentGoalTitle(e.target.value)}
            value={currentGoalTitle}
          />
        </div>
        <Checklist
          checklist={currentChecklist}
          setChecklist={setCurrentChecklist}
        />
        <DialogFooter className="mt-12">
          <Button
            type="submit"
            onClick={() => {
              onEditGoal(goalId, {
                title: currentGoalTitle,
                checklist: currentChecklist,
              });
              setShowEditGoalModal(false);
            }}
          >
            Save Changes
          </Button>
          <Button
            type="button"
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => {
              setShowEditGoalModal(false);
              setCurrentChecklist([]);
              setCurrentGoalTitle("");
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoal;
