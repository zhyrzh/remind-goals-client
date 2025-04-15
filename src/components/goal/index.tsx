import { useContext } from "react";
import AddGoal from "./add.goal";
import GoalItemCard from "./card.goal";
import { GoalContext } from "@/store/goal.context";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/spinner";

/* Function component START */
const Goal = () => {
  const navigate = useNavigate();

  // context declarations
  const goals = useContext(GoalContext)?.getAllGoalsQry;

  if (goals.isError && goals.error.res.status === 401) {
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
        {goals.isPending ? (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : goals?.data && goals?.data.length >= 1 ? (
          goals.data?.map((goal) => <GoalItemCard goal={goal} key={goal.id} />)
        ) : (
          <p className="text-center">No goas created.</p>
        )}
      </div>
    </>
  );
};
/* Function component END */

export default Goal;
