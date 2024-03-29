import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { useState } from "react";

export type ICurrTabDetails = {
  value: string;
  tabTitle: string;
  isCancel: boolean;
} & (
  | {
      type: "checklist.toggle";
      data: Pick<IGoalChecklist, "id" | "isActive">;
    }
  | {
      type: "checklist.add.to-existing-goal";
      data: {
        goalId: number;
        title: string;
        isActive: boolean;
      };
    }
  | {
      type: "checklist.add";
      data: Pick<IGoalChecklist, "title" | "isActive">;
    }
  | {
      type: "checklist.edit.title";
      data: Pick<IGoalChecklist, "id" | "title">;
    }
  | {
      type: "checklist.delete";
      data: Pick<IGoalChecklist, "id">;
    }
  | {
      type: "goal.edit.title";
      data: Pick<IGoal, "title" | "id">;
    }
  | {
      type: "goal.add";
    }
  | {
      type: undefined;
    }
);

const useCurrTabDetails = (value: ICurrTabDetails) => {
  const [currTabDetails, setCurrTabDetails] = useState<ICurrTabDetails>(value);
  return {
    currTabDetails,
    setCurrTabDetails,
  };
};

export default useCurrTabDetails;
