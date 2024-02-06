import { FC } from "react";
import {
  Card,
  // CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { TrashIcon } from "@radix-ui/react-icons";

interface IReminderItemProps {
  goal: { id: number; content: string; active: boolean };
  onRemoveGoal: (id: number) => void;
  onSetGoals: (
    goals: Array<{ id: number; content: string; active: boolean }>
  ) => void;
}

const ReminderItem: FC<IReminderItemProps> = ({ goal, onRemoveGoal }) => {
  return (
    <Card
      key={goal.id}
      className={
        "flex items-center p-2 bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer"
        // (removeItem ? " animate-item-removed" : "")
      }
    >
      <Checkbox className="transition-all" />
      <p className="text-left ml-2">{goal.content}</p>
      <TrashIcon
        className="ml-auto"
        fill="true"
        onClick={() => {
          // setRemoveItem(true);
          onRemoveGoal(goal.id);
        }}
      />
    </Card>
  );
};

export default ReminderItem;
