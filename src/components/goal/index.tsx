import { useContext } from "react";
import AddGoal from "./add.goal";
import GoalItemCard from "./card.goal";
import { GoalContext } from "@/store/goal.context";

/* Function component START */
const Goal = () => {
  // context declarations
  const goalCtx = useContext(GoalContext).getAllGoalsQry;

  return (
    <>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <AddGoal />
        </div>
        {goalCtx.data?.map((goal) => (
          <GoalItemCard goal={goal} key={goal.id} />
        ))}
      </div>
    </>
  );
};
/* Function component END */

export default Goal;
