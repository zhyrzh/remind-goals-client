import { useState, FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IGoal, IGoalChecklist } from ".";
import { useToast } from "../ui/use-toast";
import Checklist from "../checklist";

interface IAddGoal {
  onAddGoal: ({ title, checklist }: Omit<IGoal, "id">) => void;
}

const AddGoal: FC<IAddGoal> = ({ onAddGoal }) => {
  // state values declaration
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);
  const [checklist, setCheckList] = useState<IGoalChecklist[]>([]);

  // hooks
  const { toast } = useToast();

  return (
    <Dialog open={showAddGoalModal} onOpenChange={setShowAddGoalModal}>
      <DialogTrigger asChild>
        <Button>Add Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Goal</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="mt-2"
            onChange={(e) => setGoalTitle(e.target.value)}
            value={goalTitle}
          />
        </div>
        <Checklist checklist={checklist} setChecklist={setCheckList} />
        <DialogFooter className="mt-12">
          <Button
            type="submit"
            onClick={() => {
              if (!goalTitle && goalTitle.trim() === "") {
                toast({
                  title: "Empty title",
                  description: "Please proved title for your goal",
                  variant: "destructive",
                });
                return;
              }
              if (checklist.length <= 0) {
                toast({
                  title: "Empty checklist",
                  description: "Please proved at least 1 checklist",
                  variant: "destructive",
                });
                return;
              } else {
                onAddGoal({
                  title: goalTitle,
                  checklist,
                });
                setGoalTitle("");
                setCheckList([]);
                setShowAddGoalModal(false);
              }
            }}
          >
            Add Goal
          </Button>
          <Button
            type="button"
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => setShowAddGoalModal(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoal;
