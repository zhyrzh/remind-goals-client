import { FC, useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { IGoalChecklist } from "../goal/types";
import { ICurrTabDetails } from "@/hooks/useCurrTabDetails";
import { useToast } from "../ui/use-toast";

interface IChecklistCardProp {
  checklist: IGoalChecklist;
  setCurrTabDetails: React.Dispatch<React.SetStateAction<ICurrTabDetails>>;
}

const ChecklistCard: FC<IChecklistCardProp> = ({
  checklist,
  setCurrTabDetails,
}) => {
  // useState declecations
  const [isEdittingChecklist, setIsEdittingChecklist] =
    useState<boolean>(false);
  const [checklistEditedTitleValue, setChecklistEditedTitleValue] =
    useState<string>("");

  // hookds declarations
  const { toast } = useToast();

  // ref declerations
  const editInputRef = useRef<HTMLInputElement>(null);

  // useEffect decleration
  useEffect(() => {
    setChecklistEditedTitleValue(checklist.title);
    editInputRef.current?.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdittingChecklist]);

  const viewStateComponent = (checklist: IGoalChecklist): JSX.Element => {
    return (
      <>
        <section className="flex items-center">
          {checklist.isActive ? (
            <CheckIcon
              className="mt-1 mr-2"
              role="button"
              onClick={() => {
                setCurrTabDetails({
                  value: "confirmation",
                  tabTitle: "Are you sure you want to switch the goal status?",
                  isCancel: false,
                  type: "checklist.toggle",
                  data: {
                    id: checklist.id,
                    isActive: false,
                  },
                });
              }}
            />
          ) : (
            <Cross1Icon
              className="mt-1 mr-2"
              role="button"
              onClick={() => {
                // onToggleIsActive(checklist.id, true);
                setCurrTabDetails({
                  value: "confirmation",
                  tabTitle: "Are you sure you want to switch the goal status?",
                  isCancel: false,
                  type: "checklist.toggle",
                  data: {
                    id: checklist.id,
                    isActive: true,
                  },
                });
              }}
            />
          )}
          <h1 className={!checklist.isActive ? "line-through" : ""}>
            {checklist.title}
          </h1>
        </section>
        <section className="flex mt-1">
          {checklist.isActive && (
            <Pencil1Icon
              role="button"
              onClick={() => {
                setIsEdittingChecklist(true);
              }}
            />
          )}
          <TrashIcon
            className="ml-1"
            role="button"
            onClick={() =>
              setCurrTabDetails({
                value: "confirmation",
                tabTitle:
                  "Are you sure you want to delete this checklist item?",
                isCancel: false,
                type: "checklist.delete",
                data: {
                  id: checklist.id,
                },
              })
            }
          />
        </section>
      </>
    );
  };

  const editStateComponent = (checklist: IGoalChecklist): JSX.Element => {
    return (
      <>
        <Input
          autoComplete="off"
          type="text"
          value={checklistEditedTitleValue ? checklistEditedTitleValue : ""}
          onChange={(e) => setChecklistEditedTitleValue(e.target.value)}
          ref={editInputRef}
        />
        <section className="flex ml-1">
          <Button
            className=""
            onClick={() => {
              // onEditChecklist(checklist.id, checklistEditedTitleValue);
              // setIsEdittingChecklist(false);
              if (checklist.title === checklistEditedTitleValue) {
                toast({
                  title: "No changes",
                  description:
                    "Please make sure to make actual changes on the title.",
                  variant: "destructive",
                });
              } else {
                setCurrTabDetails({
                  value: "confirmation",
                  tabTitle: "Are you sure you want to edit the title?",
                  isCancel: false,
                  type: "checklist.edit.title",
                  data: {
                    id: checklist.id,
                    title: checklistEditedTitleValue,
                  },
                });
              }
            }}
          >
            Save
          </Button>
          <Button
            className="bg-transparent text-slate-900 hover:bg-transparent"
            onClick={() => setIsEdittingChecklist(false)}
          >
            Cancel
          </Button>
        </section>
      </>
    );
  };

  return (
    <li key={checklist.id} className="first:mt-0 mt-2">
      <Card className="px-2 py-1 flex items-center justify-between">
        {!isEdittingChecklist
          ? viewStateComponent(checklist)
          : editStateComponent(checklist)}
      </Card>
    </li>
  );
};

export default ChecklistCard;
