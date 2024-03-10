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

interface IChecklistCardProp {
  checklist: IGoalChecklist;
  onToggleIsActive: (id: number, value: boolean) => void;
  onRemoveChecklist: (id: number) => void;
  onEditChecklist: (id: number, title: string) => void;
}

const ChecklistCard: FC<IChecklistCardProp> = ({
  checklist,
  onToggleIsActive,
  onRemoveChecklist,
  onEditChecklist,
}) => {
  // useState declecations
  const [isEdittingChecklist, setIsEdittingChecklist] =
    useState<boolean>(false);
  const [checklistEditedTitleValue, setChecklistEditedTitleValue] =
    useState<string>("");

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
              onClick={() => onToggleIsActive(checklist.id, false)}
            />
          ) : (
            <Cross1Icon
              className="mt-1 mr-2"
              role="button"
              onClick={() => onToggleIsActive(checklist.id, true)}
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
            onClick={() => onRemoveChecklist(checklist.id)}
          />
        </section>
      </>
    );
  };

  const editStateComponent = (checklist: IGoalChecklist): JSX.Element => {
    return (
      <>
        <Input
          type="text"
          value={checklistEditedTitleValue ? checklistEditedTitleValue : ""}
          onChange={(e) => setChecklistEditedTitleValue(e.target.value)}
          ref={editInputRef}
        />
        <section className="flex">
          <Button
            className=""
            onClick={() => {
              onEditChecklist(checklist.id, checklistEditedTitleValue);
              setIsEdittingChecklist(false);
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
