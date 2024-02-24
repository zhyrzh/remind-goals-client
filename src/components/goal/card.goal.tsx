import { FC, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { IGoal } from ".";
import EditGoal from "./edit.goal";

interface IGoalItemCardProp {
  goal: IGoal;
  onEditGoal: (id: number, goal: Omit<IGoal, "id">) => void;
}

const GoalItemCard: FC<IGoalItemCardProp> = ({ goal, onEditGoal }) => {
  // state declaration
  const [progress, setProgress] = useState<string>("");

  // methods declaration

  useEffect(() => {
    setProgress(
      (
        (goal.checklist.filter(({ isActive }) => isActive !== true).length /
          goal.checklist.length) *
        100
      ).toFixed(1)
    );
  }, [goal.checklist]);

  return (
    <Card
      className="flex items-center justify-between p-2 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer bg-neutral-300 hover:bg-neutral-300"
      style={{
        background: `linear-gradient(90deg, rgb(212 212 212) ${progress}%, rgb(245 245 245) ${progress}%)`,
      }}
    >
      <p>{goal.title}</p>
      <section className="flex items-center">
        <p className="mr-2">{`${progress}% completed`}</p>
        <EditGoal
          checklist={goal.checklist}
          goalTitle={goal.title}
          onEditGoal={onEditGoal}
          goalId={goal.id}
        />
      </section>
    </Card>
  );
};

export default GoalItemCard;
