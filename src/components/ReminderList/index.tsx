import { useState } from "react";
import ReminderItem from "./ReminderItem";

const ReminderList = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      content: "Build my dream pc.",
      active: true,
    },
    {
      id: 2,
      content: "Buy new keyboard.",
      active: true,
    },
    {
      id: 3,
      content: "Get passport.",
      active: false,
    },
  ]);

  const onRemoveGoal = (id: number) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  const onSetGoals = (
    goals: Array<{ id: number; content: string; active: boolean }>
  ) => {
    setGoals(goals);
  };

  return goals.map((goal) => (
    <ReminderItem
      key={goal.id}
      goal={goal}
      onRemoveGoal={onRemoveGoal}
      onSetGoals={onSetGoals}
    />
  ));
};

export default ReminderList;
