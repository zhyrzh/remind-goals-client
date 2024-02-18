import { useEffect, useRef, useState, FC } from "react";
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
import { ToastProps } from "../ui/toast";
import { Card } from "../ui/card";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface IAddGoal {
  onAddGoal: ({ title, checklist }: Omit<IGoal, "id">) => void;
}

const AddGoal: FC<IAddGoal> = ({ onAddGoal }) => {
  // state values declaration
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [checklistTitleValue, setChecklistTitleValue] = useState<string>("");
  const [currToast, setCurrToast] = useState<ToastProps>();
  const [showAddGoalModal, setShowAddGoalModal] = useState<boolean>(false);
  const [checklist, setCheckList] = useState<IGoalChecklist[]>([]);
  const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
  const [checklistEditedTitleValue, setChecklistEditedTitleValue] =
    useState<string>("");
  const [isEdittingChecklist, setIsEdittingChecklist] =
    useState<boolean>(false);

  // refs declaration
  const editInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const { toast, dismiss } = useToast();

  // methods declaration
  const onAddChecklist = () => {
    if (checklistTitleValue && checklistTitleValue.trim() !== "") {
      dismiss(currToast?.id);
      setCheckList((prevChecklist) => [
        ...prevChecklist,
        {
          id: checklist.length,
          isActive: false,
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
    setCheckList((prevChecklist) =>
      prevChecklist.filter((itm) => itm.id !== id)
    );
  };

  const onEditChecklist = (id: number) => {
    setCheckList((prevChecklist) =>
      prevChecklist.map((itm) =>
        itm.id === id
          ? { ...itm, title: checklistEditedTitleValue }
          : { ...itm }
      )
    );
    setIsEdittingChecklist(false);
  };

  const editStateComponent = (chcklst: IGoalChecklist): JSX.Element => {
    return (
      <>
        <h1>{chcklst.title}</h1>
        <section className="flex">
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
      </>
    );
  };

  const viewStateComponent = (chcklst: IGoalChecklist): JSX.Element => {
    return (
      <>
        <input
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

  // useEffect
  useEffect(() => {
    if (selectedChecklistId !== undefined) {
      setChecklistEditedTitleValue(
        checklist.filter((itm) => itm.id === selectedChecklistId)[0]?.title
      );
      editInputRef.current?.focus();
    }
  }, [checklist, isEdittingChecklist, selectedChecklistId]);

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
                  ? editStateComponent(chcklst)
                  : viewStateComponent(chcklst)}
              </Card>
            </li>
          ))}
        </ul>

        <DialogFooter className="mt-12">
          <Button
            type="submit"
            onClick={() => {
              onAddGoal({
                title: goalTitle,
                checklist,
              });
              setChecklistEditedTitleValue("");
              setGoalTitle("");
              setCheckList([]);
              setShowAddGoalModal(false);
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
