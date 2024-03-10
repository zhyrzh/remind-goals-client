import { FC, useState } from "react";
import { ToastProps } from "../ui/toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import ChecklistCard from "./card.checklist";
import { IGoalChecklist } from "../goal/types";

interface IChecklistProps {
  checklist: IGoalChecklist[];
  setChecklist: React.Dispatch<React.SetStateAction<IGoalChecklist[]>>;
}

const Checklist: FC<IChecklistProps> = ({ checklist, setChecklist }) => {
  // state declaration
  const [checklistTitleValue, setChecklistTitleValue] = useState<string>("");
  const [currToast, setCurrToast] = useState<ToastProps>();

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

  const onEditChecklist = (id: number, title: string) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((itm) =>
        itm.id === id ? { ...itm, title: title } : { ...itm }
      )
    );
  };

  const onToggleIsActive = (id: number, value: boolean) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((itm) =>
        itm.id === id ? { ...itm, isActive: value } : itm
      )
    );
  };

  return (
    <>
      <div className="mt-4">
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
      <ul className="mt-2">
        {checklist.map((chcklst) => (
          <ChecklistCard
            key={chcklst.id}
            checklist={chcklst}
            onEditChecklist={onEditChecklist}
            onRemoveChecklist={onRemoveChecklist}
            onToggleIsActive={onToggleIsActive}
          />
        ))}
      </ul>
    </>
  );
};

export default Checklist;
