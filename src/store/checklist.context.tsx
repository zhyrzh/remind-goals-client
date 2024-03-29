import { IGoalChecklist } from "@/components/goal/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FC, createContext } from "react";

interface IGoalChecklistContext {
  getAllChecklistWithNoGoalIdQry: UseQueryResult<IGoalChecklist[]>;
}

export const ChecklistContext = createContext<IGoalChecklistContext>(
  null as unknown as IGoalChecklistContext
);

const ChecklistContextProvider: FC<{ children: any }> = ({ children }) => {
  const getAllChecklistWithNoGoalIdQry = useQuery<IGoalChecklist[]>({
    queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/goal-checklist/get-all-no-goal-id",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
        }
      );

      return await res.json();
    },
    placeholderData: [],
    refetchOnWindowFocus: false,
  });

  return (
    <ChecklistContext.Provider
      value={{
        getAllChecklistWithNoGoalIdQry,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export default ChecklistContextProvider;
