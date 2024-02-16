import { Button } from "../ui/button";
import GoalItemCard from "./card.goal";

const Goal = () => {
  return (
    <>
      <div className="flex flex-col mt-[35px]">
        <div className="flex justify-between mb-[13px] items-center">
          <h1 className="text-[24px] font-bold">Goals</h1>
          <Button>Add Goal</Button>
        </div>
        <GoalItemCard />
      </div>
    </>
  );
};

export default Goal;
