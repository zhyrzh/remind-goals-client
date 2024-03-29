import { IGoal } from "@/components/goal/types";
import { FC, createContext } from "react";
import ChecklistContextProvider from "./checklist.context";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface IGoalContext {
  goalsQry: UseQueryResult<IGoal[]>;
}

export const GoalContext = createContext<IGoalContext>(
  null as unknown as IGoalContext
);

const GoalContextProvider: FC<{ children: any }> = ({ children }) => {
  const goalsQry = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/goals", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
        },
      });
      return await res.json();
    },
    refetchOnWindowFocus: false,
  });

  return (
    <ChecklistContextProvider>
      <GoalContext.Provider value={{ goalsQry }}>
        {children}
      </GoalContext.Provider>
    </ChecklistContextProvider>
  );
};

export default GoalContextProvider;
