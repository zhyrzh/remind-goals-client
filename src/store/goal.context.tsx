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
import { useGoalAPIRequest } from "@/hooks/useGoalAPIRequest";

interface IGoalContext {
  getAllGoalsQry: UseQueryResult<IGoal[]>;
  getSpecificGoalQry: (id: number) => UseQueryResult<IGoal>;
  addGoalMtn: UseMutationResult<
    IGoal,
    Error,
    { title: string; checklist: Array<Pick<IGoalChecklist, "id">> }
  >;
  editGoalTitleMtn: UseMutationResult<
    IGoal,
    Error,
    { title: string; id: number }
  >;
}

export const GoalContext = createContext<IGoalContext>(
  null as unknown as IGoalContext
);

const GoalContextProvider: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const { addGoalReq, editGoalTitleReq, getAllGoalsReq, getSpecificGoalReq } =
    useGoalAPIRequest();

  const getAllGoalsQry = useQuery({
    queryKey: ["goals"],
    queryFn: getAllGoalsReq,
    refetchOnWindowFocus: false,
  });

  const getSpecificGoalQry = (id: number) => {
    return useQuery({
      queryKey: ["goals", id],
      queryFn: getSpecificGoalReq,
      refetchOnWindowFocus: false,
    });
  };

  const addGoalMtn = useMutation<
    IGoal,
    Error,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  >({
    mutationKey: ["goals", "add"],
    mutationFn: addGoalReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist"],
      });
    },
  });

  const editGoalTitleMtn = useMutation<
    IGoal,
    Error,
    { title: string; id: number }
  >({
    mutationKey: ["goals", "add"],
    mutationFn: editGoalTitleReq,
    onSuccess: ({ id }) => {
      qryClient.invalidateQueries({
        queryKey: ["goals", id],
      });
    },
  });

  return (
    <ChecklistContextProvider>
      <GoalContext.Provider
        value={{
          getAllGoalsQry,
          getSpecificGoalQry,
          addGoalMtn,
          editGoalTitleMtn,
        }}
      >
        {children}
      </GoalContext.Provider>
    </ChecklistContextProvider>
  );
};

export default GoalContextProvider;
