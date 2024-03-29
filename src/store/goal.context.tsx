import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { FC, createContext } from "react";
import ChecklistContextProvider from "./checklist.context";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface IGoalContext {
  goalsQry: UseQueryResult<IGoal[]>;
  getSpecificGoalQry: (id: number) => UseQueryResult<IGoal>;
  addGoalMtn: UseMutationResult<
    IGoal,
    Error,
    { title: string; checklist: Array<Pick<IGoalChecklist, "id">> }
  >;
}

export const GoalContext = createContext<IGoalContext>(
  null as unknown as IGoalContext
);

const GoalContextProvider: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

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

  const getSpecificGoalQry = (id: number) => {
    return useQuery({
      queryKey: ["goals", id],
      queryFn: async () => {
        const res = await fetch(`http://localhost:5000/goals/specific/${id}`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
        });
        return await res.json();
      },
      refetchOnWindowFocus: false,
    });
  };

  const addGoalMtn = useMutation<
    IGoal,
    Error,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  >({
    mutationKey: ["goals", "add"],
    mutationFn: async ({ title, checklist }) => {
      const res = await fetch("http://localhost:5000/goals", {
        method: "POST",
        body: JSON.stringify({
          title,
          checklist,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
        },
      });
      return await res.json();
    },
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist"],
      });
    },
  });

  return (
    <ChecklistContextProvider>
      <GoalContext.Provider
        value={{ goalsQry, getSpecificGoalQry, addGoalMtn }}
      >
        {children}
      </GoalContext.Provider>
    </ChecklistContextProvider>
  );
};

export default GoalContextProvider;
