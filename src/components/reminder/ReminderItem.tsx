import { FC, useState } from "react";
import { Card } from "../ui/card";
import CustomCheckbox from "./ReminderCheckbox";
import DeleteButton from "./ReminderDeleteButton";
import { FrequencyEnum, IReminderInputValues } from "./AddReminder";
import EditButton from "./ReminderEditButton";

export interface IReminder {
  id: number;
  content: string;
  active: boolean;
  frequency: FrequencyEnum;
}
interface IReminderItemProps {
  goal: IReminder;
  onRemoveGoal: (id: number) => void;
  onSetGoalAsDone: (id: number) => void;
  onEditReminder: (id: number, values: IReminderInputValues) => void;
}

const ReminderItem: FC<IReminderItemProps> = ({
  goal,
  onRemoveGoal,
  onSetGoalAsDone,
  onEditReminder,
}) => {
  const [editable] = useState<boolean>(false);

  return (
    <>
      <Card
        key={goal.id}
        className={
          "flex items-center p-2 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer" +
          (!goal.active
            ? " bg-neutral-300 hover:bg-neutral-300"
            : " bg-neutral-100 hover:bg-neutral-200")
        }
      >
        <CustomCheckbox goal={goal} onSetGoalAsDone={onSetGoalAsDone} />
        <p
          className={
            "text-left ml-2 transition-all duration-1000 ease-in-out" +
            (!goal.active ? " line-through" : "") +
            (editable ? " px-2" : "")
          }
          contentEditable={editable}
          suppressContentEditableWarning={editable}
        >
          {goal.content}
        </p>
        <section className="flex ml-auto">
          <EditButton reminder={goal} onEditReminder={onEditReminder} />
          <DeleteButton onRemoveGoal={onRemoveGoal} goal={goal} />
        </section>
      </Card>
    </>
  );
};

export default ReminderItem;
