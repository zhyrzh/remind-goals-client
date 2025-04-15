import { FC, useContext, useEffect, useState } from "react";
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
import { IGoalChecklist } from "./types/";
import { Tabs, TabsContent } from "../ui/tabs";
import useCurrTabDetails from "../../hooks/useCurrTabDetails";
import { useToast } from "../ui/use-toast";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ChecklistContext } from "@/store/checklist.context";
import { GoalContext } from "@/store/goal.context";
import Spinner from "../ui/Spinner";

// Types declaration
interface IEditGoalProps {
  goalId: number;
  goalTitle: string;
  checklist: IGoalChecklist[];
}

/* Function component START */
const EditGoal: FC<IEditGoalProps> = ({ goalId }) => {
  // context declarations
  const goalChecklistCtx = useContext(ChecklistContext);
  const goalCtx = useContext(GoalContext);
  const goalDetailsQry = goalCtx.getSpecificGoalQry(goalId);

  // useState declarations
  const [showEditGoalModal, setShowEditGoalModal] = useState<boolean>(false);
  const [currentGoalTitle, setCurrentGoalTitle] = useState<string>("");
  const [isEdittingTitle, setIsEdittingTitle] = useState<boolean>(false);

  // hooks
  const { toast } = useToast();
  const { currTabDetails, setCurrTabDetails } = useCurrTabDetails({
    value: "main",
    isCancel: false,
    tabTitle: "",
    type: undefined,
  });

  // useEffect delcaration
  useEffect(() => {
    setCurrentGoalTitle(goalDetailsQry.data?.title!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEditGoalModal, currTabDetails.value, goalDetailsQry.data?.title]);

  useEffect(() => {
    setCurrentGoalTitle(() => goalCtx.editGoalTitleMtn.data?.title!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goalCtx?.editGoalTitleMtn?.isSuccess]);

  // methods declaration
  const resetCurrTabDetails = () => {
    setCurrTabDetails({
      value: "main",
      isCancel: false,
      tabTitle: "",
      type: undefined,
    });
  };

  const resetFields = () => {
    setCurrentGoalTitle("");
  };

  const onOpenChange = (val: boolean) => {
    setShowEditGoalModal(val);
    resetCurrTabDetails();
    resetFields();
  };

  useEffect(() => {
    if (goalCtx.editGoalTitleMtn.status !== "pending") {
      if (currTabDetails.type === "goal.edit.title") {
        setCurrentGoalTitle(currTabDetails.data?.title!);
        setIsEdittingTitle(false);
        resetCurrTabDetails();
      }
    }
  }, [goalCtx.editGoalTitleMtn.status]);

  useEffect(() => {
    if (
      goalChecklistCtx.addGoalChecklistItmToExistingGoalMtn.status !== "pending"
    ) {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx?.addGoalChecklistItmToExistingGoalMtn.status]);

  useEffect(() => {
    if (goalChecklistCtx.editChecklistItmTitleMtn.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx?.editChecklistItmTitleMtn.status]);

  useEffect(() => {
    if (goalChecklistCtx.deleteSpecificChecklistItm.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx?.deleteSpecificChecklistItm.status]);

  useEffect(() => {
    if (goalChecklistCtx.toggleChecklistItmStatusMutn.status !== "pending") {
      resetCurrTabDetails();
    }
  }, [goalChecklistCtx?.toggleChecklistItmStatusMutn.status]);

  return (
    <Dialog open={showEditGoalModal} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Pencil1Icon />
      </DialogTrigger>
      <DialogContent>
        <Tabs value={currTabDetails.value}>
          <TabsContent value="main">
            <DialogHeader>
              <DialogTitle>Edit goal details</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Label
                htmlFor="title"
                className="flex"
                onClick={(e) => e.preventDefault()}
              >
                Title{" "}
                <span
                  className="ml-1"
                  role="button"
                  onClick={() => setIsEdittingTitle(true)}
                >
                  <Pencil1Icon />
                </span>
              </Label>
              {!isEdittingTitle ? (
                <p className="mt-2">{currentGoalTitle}</p>
              ) : (
                <div className="flex mt-2">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setCurrentGoalTitle(e.target.value)}
                    value={currentGoalTitle}
                  />
                  <section className="flex ml-1">
                    <Button
                      onClick={() => {
                        if (currentGoalTitle === goalDetailsQry.data?.title!) {
                          toast({
                            title: "No changes has been made",
                            description:
                              "Edit something on your goal details to be saved.",
                            variant: "destructive",
                          });
                          return;
                        }
                        setCurrTabDetails({
                          value: "confirmation",
                          isCancel: false,
                          tabTitle:
                            "Are you sure you want to edit the title of this goal?",
                          type: "goal.edit.title",
                          data: {
                            id: goalId,
                            title: currentGoalTitle,
                          },
                        });
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      className="bg-transparent text-slate-900 hover:bg-transparent"
                      onClick={() => setIsEdittingTitle(false)}
                    >
                      Cancel
                    </Button>
                  </section>
                </div>
              )}
            </div>
            <Checklist
              setCurrTabDetails={setCurrTabDetails}
              isEdit
              goalId={goalId}
            />
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
                    switch (currTabDetails.type) {
                      case "goal.edit.title":
                        goalCtx.editGoalTitleMtn.mutate({
                          ...currTabDetails.data,
                        });
                        break;
                      case "checklist.toggle":
                        goalChecklistCtx.toggleChecklistItmStatusMutn.mutate({
                          id: currTabDetails.data?.id!,
                          isActive: currTabDetails.data?.isActive!,
                        });
                        break;
                      case "checklist.delete":
                        if (goalDetailsQry.data?.checklist.length! === 1) {
                          toast({
                            title: "Cannot delete last checklist item",
                            description:
                              "A goal must have at least one checklist.",
                            variant: "destructive",
                          });
                        } else {
                          goalChecklistCtx.deleteSpecificChecklistItm.mutate({
                            id: currTabDetails.data?.id,
                          });
                        }

                        break;
                      case "checklist.edit.title":
                        goalChecklistCtx.editChecklistItmTitleMtn.mutate({
                          id: currTabDetails.data?.id!,
                          title: currTabDetails.data?.title!,
                        });
                        break;
                      case "checklist.add.to-existing-goal":
                        goalChecklistCtx.addGoalChecklistItmToExistingGoalMtn.mutate(
                          currTabDetails.data
                        );
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
                    setShowEditGoalModal(false);
                  }
                }}
                disabled={
                  goalCtx.editGoalTitleMtn.isPending ||
                  goalChecklistCtx.addGoalChecklistItmToExistingGoalMtn
                    .isPending ||
                  goalChecklistCtx.editChecklistItmTitleMtn.isPending ||
                  goalChecklistCtx.deleteSpecificChecklistItm.isPending ||
                  goalChecklistCtx.toggleChecklistItmStatusMutn.isPending
                }
              >
                {goalCtx.editGoalTitleMtn.isPending ||
                goalChecklistCtx.addGoalChecklistItmToExistingGoalMtn
                  .isPending ||
                goalChecklistCtx.editChecklistItmTitleMtn.isPending ||
                goalChecklistCtx.deleteSpecificChecklistItm.isPending ||
                goalChecklistCtx.toggleChecklistItmStatusMutn.isPending ? (
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

export default EditGoal;
