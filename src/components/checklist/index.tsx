import { FC, useContext, useState } from "react";
import { ToastProps } from "../ui/toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ChecklistCard from "./card.checklist";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { ICurrTabDetails } from "@/hooks/useCurrTabDetails";
import { ChecklistContext } from "@/store/checklist.context";

type IChecklistProps = {
  setCurrTabDetails: React.Dispatch<React.SetStateAction<ICurrTabDetails>>;
} & (
  | {
      isEdit: true;
      goalId: number;
    }
  | {
      isEdit: false;
      goalId: undefined;
    }
);

/* Component start */
/* Used forward ref to trigger child methods/functions */
const Checklist: FC<IChecklistProps> = ({
  isEdit,
  goalId,
  setCurrTabDetails,
}) => {
  // context declaration
  const goalChecklistCtx = useContext(ChecklistContext);

  // state declaration
  const [checklistTitleValue, setChecklistTitleValue] = useState<string>("");
  const [currToast, setCurrToast] = useState<ToastProps>();
  const [isEditting, setIsEditting] = useState<boolean>(false);

  // hooks decleration
  const { toast, dismiss } = useToast();

  // methods declaration
  const onAddChecklist = () => {
    if (checklistTitleValue && checklistTitleValue.trim() !== "") {
      dismiss(currToast?.id);
      if (!isEdit) {
        setCurrTabDetails({
          isCancel: false,
          value: "confirmation",
          tabTitle: "Are you sure you want to add this checklist?",
          type: "checklist.add",
          data: {
            title: checklistTitleValue,
            isActive: true,
          },
        });
      } else {
        setCurrTabDetails({
          value: "confirmation",
          tabTitle: "Are you sure you want to edit the title?",
          isCancel: false,
          type: "checklist.add.to-existing-goal",
          data: {
            goalId,
            isActive: true,
            title: checklistTitleValue,
          },
        });
      }
    } else {
      const createdToast = toast({
        title: "Add title",
        description: "A title value is required to add a checklist",
        variant: "destructive",
      });
      setCurrToast(createdToast);
    }
  };

  return (
    <>
      <div className="mt-4">
        <Label className="flex">
          Checklist{" "}
          {isEdit && (
            <span
              className="ml-1 "
              role="button"
              onClick={() => setIsEditting((prevVal) => !prevVal)}
            >
              {isEditting ? <Cross1Icon /> : <PlusIcon />}
            </span>
          )}
        </Label>
        {isEdit ? (
          isEditting && (
            <div className="flex items-center mt-2 transition-all">
              <Input
                autoComplete="off"
                type="text"
                id="checklistTitle"
                name="checklistTitle"
                onChange={(e) => {
                  dismiss(currToast?.id);
                  setChecklistTitleValue(e.target.value);
                }}
                value={checklistTitleValue}
              />
              <Button className="ml-2" onClick={onAddChecklist}>
                Add checklist
              </Button>
            </div>
          )
        ) : (
          <div className="flex items-center mt-2 transition-all">
            <Input
              autoComplete="off"
              type="text"
              id="checklistTitle"
              name="checklistTitle"
              onChange={(e) => {
                dismiss(currToast?.id);
                setChecklistTitleValue(e.target.value);
              }}
              value={checklistTitleValue}
            />
            <Button className="ml-2" onClick={onAddChecklist}>
              Add checklist
            </Button>
          </div>
        )}
      </div>
      <ul className="mt-2">
        {!isEdit
          ? goalChecklistCtx.getAllChecklistWithNoGoalIdQry?.data?.map(
              (chcklst) => {
                return (
                  <ChecklistCard
                    key={chcklst.id}
                    checklist={chcklst}
                    setCurrTabDetails={setCurrTabDetails}
                  />
                );
              }
            )
          : goalChecklistCtx
              .getAllChecklistByGoalIdQry(goalId)
              .data?.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))
              .map((chcklst) => {
                return (
                  <ChecklistCard
                    key={chcklst.id}
                    checklist={chcklst}
                    setCurrTabDetails={setCurrTabDetails}
                  />
                );
              })}
      </ul>
    </>
  );
};
/* Component end */

export default Checklist;
