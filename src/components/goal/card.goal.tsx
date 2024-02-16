import { Card } from "../ui/card";

const GoalItemCard = () => {
  return (
    <Card
      className="flex items-center p-2 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer bg-neutral-300 hover:bg-neutral-300"
      style={{
        background: `linear-gradient(90deg, rgb(212 212 212) ${5}%, rgb(245 245 245) ${5}%)`,
      }}
    >
      <h1>Card</h1>
    </Card>
  );
};

export default GoalItemCard;
