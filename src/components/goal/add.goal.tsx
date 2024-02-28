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
import { Tabs, TabsContent } from "../ui/tabs";
import useCurrTabDetails from "../../hooks/useCurrTabDetails";

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
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
  });

  // methods
  const resetFields = () => {
    setGoalTitle("");
    setCheckList([]);
  };

  const resetCurrTabDetails = () => {
    setCurrTabDetails({
      value: "main",
      isCancel: false,
      tabTitle: "",
    });
  };

  const onOpenChange = (val: boolean) => {
    setShowAddGoalModal(val);
    resetCurrTabDetails();
    resetFields();
  };

  return (
    <Dialog open={showAddGoalModal} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="main" value={currTabDetails.value}>
          <TabsContent value="main">
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
                  }
                  setCurrTabDetails({
                    value: "confirmation",
                    isCancel: false,
                    tabTitle: "Are you sure you want to add this todo?",
                  });
                }}
              >
                Add Goal
              </Button>
              <Button
                type="button"
                className="bg-transparent text-slate-900 hover:bg-transparent"
                onClick={() => {
                  if (
                    (goalTitle && goalTitle.trim() !== "") ||
                    checklist.length >= 1
                  ) {
                    setCurrTabDetails({
                      value: "confirmation",
                      isCancel: true,
                      tabTitle: "Are you sure you want to discard your changes",
                    });
                  } else {
                    resetFields();
                    setShowAddGoalModal(false);
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
                    onAddGoal({
                      title: goalTitle,
                      checklist,
                    });
                  }
                  resetCurrTabDetails();
                  resetFields();
                  setShowAddGoalModal(false);
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

export default AddGoal;
