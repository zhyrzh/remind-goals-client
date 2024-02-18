import { FC, useEffect, useState } from "react";
import { Card } from "../ui/card";
import { IGoal } from ".";

const GoalItemCard: FC<{ goal: IGoal }> = ({ goal }) => {
  const [progress, setProgress] = useState(
    (
      (goal.checklist.filter(({ isActive }) => isActive).length /
        goal.checklist.length) *
      100
    ).toFixed(1)
  );

  useEffect(() => {
    setProgress(
      (
        (goal.checklist.filter(({ isActive }) => isActive).length /
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
      <p>{`${progress}% completed`}</p>
    </Card>
  );
};

export default GoalItemCard;
