import { useContext } from "react";
import AddGoal from "./add.goal";
import GoalItemCard from "./card.goal";
import { GoalContext } from "@/store/goal.context";
import { useNavigate } from "react-router-dom";

/* Function component START */
const Goal = () => {
  const navigate = useNavigate();

  // context declarations
  const goalCtx = useContext(GoalContext)?.getAllGoalsQry;

  if (goalCtx.isLoading) {
    return <h1>Loading</h1>;
  }

  if (goalCtx.isError && goalCtx.error.res.status === 401) {
    localStorage.removeItem("remind-goals-ath-tkn");
    navigate("/login");
  }

  return (
    <>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <AddGoal />
        </div>
        {goalCtx?.data && goalCtx?.data.length >= 1 ? (
          goalCtx.data?.map((goal) => (
            <GoalItemCard goal={goal} key={goal.id} />
          ))
        ) : (
          <p className="text-center">No goas created.</p>
        )}
      </div>
    </>
  );
};
/* Function component END */

export default Goal;
