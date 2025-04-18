import { useState, FC, useContext, useEffect } from "react";
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
import { useToast } from "../ui/use-toast";
import Checklist from "../checklist";
import { Tabs, TabsContent } from "../ui/tabs";
import useCurrTabDetails from "../../hooks/useCurrTabDetails";
import { ChecklistContext } from "@/store/checklist.context";
import { GoalContext } from "@/store/goal.context";
import Spinner from "../ui/spinner";

/* Function component START */
const AddGoal: FC = () => {
  // context declarations
  const goalChecklistCtx = useContext(ChecklistContext);
  const goalCtx = useContext(GoalContext);

  // state values declaration
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);

  // useEffect declarations
  useEffect(() => {
    goalChecklistCtx.deleteAllNoGoalIdMtn.mutate(undefined);
  }, [showAddGoalModal]);

  // hooks
  const { toast } = useToast();
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
    type: undefined,
  });

  // methods
  const resetFields = () => {
    setGoalTitle("");
  };

  const resetCurrTabDetails = () => {
    setCurrTabDetails({
      value: "main",
      isCancel: false,
      tabTitle: "",
      type: undefined,
    });
  };

  const onOpenChange = (val: boolean) => {
    setShowAddGoalModal(val);
    resetCurrTabDetails();
    if (goalTitle !== "") {
      resetFields();
    }
  };

  useEffect(() => {
    if (goalCtx.addGoalMtn.status !== "pending") {
      setShowAddGoalModal(false);
      resetFields();
    }
  }, [goalCtx.addGoalMtn.status]);

  useEffect(() => {
    if (goalChecklistCtx.addGoalChklistItmMutn.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx.addGoalChklistItmMutn.status]);

  useEffect(() => {
    if (goalChecklistCtx.editChecklistItmTitleMtn.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx.editChecklistItmTitleMtn.status]);

  useEffect(() => {
    if (goalChecklistCtx.toggleChecklistItmStatusMutn.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx.toggleChecklistItmStatusMutn.status]);

  useEffect(() => {
    if (goalChecklistCtx.deleteSpecificChecklistItm.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx.deleteSpecificChecklistItm.status]);

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
            <Checklist
              setCurrTabDetails={setCurrTabDetails}
              isEdit={false}
              goalId={undefined}
            />
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
                  if (
                    goalChecklistCtx.getAllChecklistWithNoGoalIdQry.data
                      ?.length! <= 0
                  ) {
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
                    type: "goal.add",
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
                    goalChecklistCtx.getAllChecklistWithNoGoalIdQry.data
                      ?.length! >= 1
                  ) {
                    setCurrTabDetails({
                      value: "confirmation",
                      isCancel: true,
                      tabTitle: "Are you sure you want to discard your changes",
                      type: undefined,
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
                disabled={
                  goalCtx.addGoalMtn.isPending ||
                  goalChecklistCtx.addGoalChklistItmMutn.isPending ||
                  goalChecklistCtx.editChecklistItmTitleMtn.isPending ||
                  goalChecklistCtx.toggleChecklistItmStatusMutn.isPending ||
                  goalChecklistCtx.deleteSpecificChecklistItm.isPending ||
                  goalChecklistCtx.editChecklistItmTitleMtn.isPending
                }
                type="submit"
                onClick={() => {
                  if (!currTabDetails.isCancel) {
                    switch (currTabDetails.type) {
                      case "checklist.add":
                        goalChecklistCtx?.addGoalChklistItmMutn.mutate({
                          isActive: currTabDetails.data?.isActive!,
                          title: currTabDetails.data?.title!,
                        });
                        break;
                      case "goal.add":
                        goalCtx.addGoalMtn.mutate({
                          title: goalTitle,
                          checklist:
                            goalChecklistCtx.getAllChecklistWithNoGoalIdQry.data?.map(
                              ({ id }) => ({ id })
                            )!,
                        });
                        break;
                      case "checklist.toggle":
                        goalChecklistCtx.toggleChecklistItmStatusMutn.mutate({
                          id: currTabDetails.data?.id!,
                          isActive: currTabDetails.data?.isActive!,
                        });
                        break;
                      case "checklist.delete":
                        goalChecklistCtx.deleteSpecificChecklistItm.mutate({
                          id: currTabDetails.data?.id!,
                        });
                        break;
                      case "checklist.edit.title":
                        goalChecklistCtx.editChecklistItmTitleMtn.mutate({
                          id: currTabDetails.data?.id!,
                          title: currTabDetails.data?.title!,
                        });
                        break;
                      default:
                        toast({
                          title: "Invalid tab type",
                          description:
                            "Please proved a valid tab type (code leve)",
                          variant: "destructive",
                        });
                    }
                  } else {
                    setShowAddGoalModal(false);
                  }
                }}
              >
                {goalCtx.addGoalMtn.isPending ||
                goalChecklistCtx.addGoalChklistItmMutn.isPending ||
                goalChecklistCtx.editChecklistItmTitleMtn.isPending ||
                goalChecklistCtx.toggleChecklistItmStatusMutn.isPending ||
                goalChecklistCtx.deleteSpecificChecklistItm.isPending ||
                goalChecklistCtx.editChecklistItmTitleMtn.isPending ? (
                  <Spinner />
                ) : !currTabDetails.isCancel ? (
                  "Confirm"
                ) : (
                  "Discard"
                )}
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

export default AddGoal;
