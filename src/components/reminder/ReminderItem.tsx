import { FC } from "react";
import { Card } from "../ui/card";
import CustomCheckbox from "./ReminderCheckbox";
import DeleteButton from "./ReminderDeleteButton";
import { FrequencyEnum } from "./AddReminder";

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
}

const ReminderItem: FC<IReminderItemProps> = ({
  goal,
  onRemoveGoal,
  onSetGoalAsDone,
}) => {
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
            (!goal.active ? " line-through" : "")
          }
        >
          {goal.content}
        </p>
        <DeleteButton onRemoveGoal={onRemoveGoal} goal={goal} />
      </Card>
    </>
  );
};

export default ReminderItem;
