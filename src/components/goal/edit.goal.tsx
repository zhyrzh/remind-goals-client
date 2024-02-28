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
import { Tabs, TabsContent } from "../ui/tabs";
import useCurrTabDetails from "../../hooks/useCurrTabDetails";
import { useToast } from "../ui/use-toast";

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

  // hooks
  const { toast } = useToast();
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
  });

  useEffect(() => {
    setCurrentChecklist(checklist);
    setCurrentGoalTitle(goalTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEditGoalModal]);

  // methods
  const resetCurrTabDetails = () => {
    setCurrTabDetails({
      value: "main",
      isCancel: false,
      tabTitle: "",
    });
  };

  const resetFields = () => {
    setCurrentGoalTitle("");
    setCurrentChecklist([]);
  };

  const onOpenChange = (val: boolean) => {
    setShowEditGoalModal(val);
    resetCurrTabDetails();
    resetFields();
  };

  return (
    <Dialog open={showEditGoalModal} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit Goal</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="main" value={currTabDetails.value}>
          <TabsContent value="main">
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
                  if (
                    currentGoalTitle === goalTitle &&
                    JSON.stringify(checklist) ===
                      JSON.stringify(currentChecklist)
                  ) {
                    toast({
                      title: "No changes has been made",
                      description: "Edit something on your goal details",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (!currentGoalTitle && currentGoalTitle.trim() === "") {
                    toast({
                      title: "Empty title",
                      description: "Please proved title for your goal",
                      variant: "destructive",
                    });
                    return;
                  }
                  if (currentChecklist.length <= 0) {
                    toast({
                      title: "Empty checklist",
                      description: "Please proved at least 1 checklist",
                      variant: "destructive",
                    });
                    return;
                  }
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
                    onEditGoal(goalId, {
                      title: goalTitle,
                      checklist,
                    });
                  }
                  resetCurrTabDetails();
                  resetFields();
                  setShowEditGoalModal(false);
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

export default EditGoal;
