import { useState } from "react";
import AddGoal from "./add.goal";
import GoalItemCard from "./card.goal";
import { dummyGoals } from "./constants";

// Types declaration
export interface IGoalChecklist {
  id: number;
  title: string;
  isActive: boolean;
}
export interface IGoal {
  id: number;
  title: string;
  checklist: IGoalChecklist[];
}

/* Function component START */
const Goal = () => {
  const [goals, setGoals] = useState<IGoal[]>(dummyGoals);

  const onAddGoal = ({ title, checklist }: Omit<IGoal, "id">) => {
    setGoals((prevGoals) => [
      ...prevGoals,
      {
        id: prevGoals.length + 1,
        title,
        checklist,
      },
    ]);
  };

  const onEditGoal = (id: number, goal: Omit<IGoal, "id">) => {
    setGoals((prevGoals) =>
      prevGoals.map((itm) =>
        itm.id === id
          ? { ...itm, checklist: goal.checklist, title: goal.title }
          : itm
      )
    );
  };

  return (
    <>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <AddGoal onAddGoal={onAddGoal} />
        </div>
        {goals.map((goal) => (
          <GoalItemCard goal={goal} key={goal.id} onEditGoal={onEditGoal} />
        ))}
      </div>
    </>
  );
};
/* Function component END */

export default Goal;
