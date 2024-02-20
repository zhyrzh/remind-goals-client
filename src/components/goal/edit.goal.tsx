import { FC, useState } from "react";
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
import { IGoalChecklist } from ".";

interface IEditGoalProps {
  goalTitle: string;
  checklist: IGoalChecklist[];
}

const EditGoal: FC<IEditGoalProps> = ({ checklist, goalTitle }) => {
  const [showEditGoalModal, setShowEditGoalModal] = useState<boolean>(false);
  const [currentGoalTitle, setCurrentGoalTitle] = useState<string>(goalTitle);
  const [currentChecklist, setCurrentChecklist] =
    useState<IGoalChecklist[]>(checklist);
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
          <Button type="submit" onClick={() => {}}>
            Save Changes
          </Button>
          <Button
            type="button"
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => setShowEditGoalModal(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoal;
