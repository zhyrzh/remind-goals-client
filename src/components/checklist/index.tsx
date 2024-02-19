import { FC, useEffect, useRef, useState } from "react";
import { IGoalChecklist } from "../goal";
import { Card } from "../ui/card";
import {
  CheckIcon,
  Pencil1Icon,
  TrashIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { ToastProps } from "../ui/toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface IChecklistProps {
  checklist: IGoalChecklist[];
  setChecklist: React.Dispatch<React.SetStateAction<IGoalChecklist[]>>;
}

const Checklist: FC<IChecklistProps> = ({ checklist, setChecklist }) => {
  // state declaration
  const [checklistTitleValue, setChecklistTitleValue] = useState<string>("");
  const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
  const [checklistEditedTitleValue, setChecklistEditedTitleValue] =
    useState<string>("");
  const [isEdittingChecklist, setIsEdittingChecklist] =
    useState<boolean>(false);
  const [currToast, setCurrToast] = useState<ToastProps>();

  // refs declecation
  const editInputRef = useRef<HTMLInputElement>(null);

  // hooks decleration
  const { toast, dismiss } = useToast();

  // methods declaration
  const onAddChecklist = () => {
    if (checklistTitleValue && checklistTitleValue.trim() !== "") {
      dismiss(currToast?.id);
      setChecklist((prevChecklist) => [
        ...prevChecklist,
        {
          id: checklist.length,
          isActive: true,
          title: checklistTitleValue!,
        },
      ]);
      setChecklistTitleValue("");
    } else {
      const createdToast = toast({
        title: "Add title",
        description: "A title value is required to add a checklist",
        variant: "destructive",
      });
      setCurrToast(createdToast);
    }
  };

  const onRemoveChecklist = (id: number) => {
    setChecklist((prevChecklist) =>
      prevChecklist.filter((itm) => itm.id !== id)
    );
  };

  const onEditChecklist = (id: number) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((itm) =>
        itm.id === id
          ? { ...itm, title: checklistEditedTitleValue }
          : { ...itm }
      )
    );
    setIsEdittingChecklist(false);
  };

  const onToggleIsActive = (id: number, value: boolean) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((itm) =>
        itm.id === id ? { ...itm, isActive: value } : itm
      )
    );
  };

  const viewStateComponent = (chcklst: IGoalChecklist): JSX.Element => {
    return (
      <>
        <section className="flex items-center">
          {chcklst.isActive ? (
            <CheckIcon
              className="mt-1 mr-2"
              role="button"
              onClick={() => onToggleIsActive(chcklst.id, false)}
            />
          ) : (
            <Cross1Icon
              className="mt-1 mr-2"
              role="button"
              onClick={() => onToggleIsActive(chcklst.id, true)}
            />
          )}
          <h1 className={!chcklst.isActive ? "line-through" : ""}>
            {chcklst.title}
          </h1>
        </section>
        {chcklst.isActive ? (
          <section className="flex mt-1">
            <Pencil1Icon
              role="button"
              onClick={() => {
                setSelectedChecklistId(chcklst.id);
                setIsEdittingChecklist(true);
              }}
            />
            <TrashIcon
              className="ml-1"
              role="button"
              onClick={() => onRemoveChecklist(chcklst.id)}
            />
          </section>
        ) : null}
      </>
    );
  };

  const editStateComponent = (chcklst: IGoalChecklist): JSX.Element => {
    return (
      <>
        <Input
          type="text"
          value={checklistEditedTitleValue ? checklistEditedTitleValue : ""}
          onChange={(e) => setChecklistEditedTitleValue(e.target.value)}
          ref={editInputRef}
        />
        <section className="flex">
          <Button className="" onClick={() => onEditChecklist(chcklst.id)}>
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

  // useEffect decleration
  useEffect(() => {
    if (selectedChecklistId !== undefined) {
      setChecklistEditedTitleValue(
        checklist.filter((itm) => itm.id === selectedChecklistId)[0]?.title
      );
      editInputRef.current?.focus();
    }
  }, [checklist, isEdittingChecklist, selectedChecklistId]);

  return (
    <>
      <div>
        <Label>Checklist</Label>
        <div className="flex items-center">
          <Input
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
      </div>
      <ul>
        {checklist.map((chcklst) => (
          <li key={chcklst.id} className="first:mt-0 mt-2">
            <Card className="px-2 py-1 flex items-center justify-between">
              {!isEdittingChecklist
                ? viewStateComponent(chcklst)
                : editStateComponent(chcklst)}
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Checklist;
