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
import { FetchError } from "@/utils/error";

interface IGoalContext {
  getAllGoalsQry: UseQueryResult<IGoal[], FetchError>;
  getSpecificGoalQry: (id: number) => UseQueryResult<IGoal, FetchError>;
  addGoalMtn: UseMutationResult<
    IGoal,
    FetchError,
    { title: string; checklist: Array<Pick<IGoalChecklist, "id">> }
  >;
  editGoalTitleMtn: UseMutationResult<
    IGoal,
    FetchError,
    { title: string; id: number }
  >;
  deleteGoalMtn: UseMutationResult<IGoal, FetchError, { id: number }>;
}

export const GoalContext = createContext<IGoalContext>(
  null as unknown as IGoalContext
);

const GoalContextProvider: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const {
    addGoalReq,
    editGoalTitleReq,
    getAllGoalsReq,
    getSpecificGoalReq,
    deleteGoalReq,
  } = useGoalAPIRequest();

  const getAllGoalsQry = useQuery<IGoal[], FetchError>({
    queryKey: ["goals"],
    queryFn: getAllGoalsReq,
    refetchOnWindowFocus: false,
  });

  const getSpecificGoalQry = (id: number) => {
    return useQuery<IGoal, FetchError>({
      queryKey: ["goals", id],
      queryFn: getSpecificGoalReq,
      refetchOnWindowFocus: false,
    });
  };

  const addGoalMtn = useMutation<
    IGoal,
    FetchError,
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
    FetchError,
    { title: string; id: number }
  >({
    mutationKey: ["goals", "add"],
    mutationFn: editGoalTitleReq,
    onSuccess: ({ id }) => {
      qryClient.invalidateQueries({
        queryKey: ["goals", id],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const deleteGoalMtn = useMutation<IGoal, FetchError, { id: number }>({
    mutationKey: ["goals", "delete"],
    mutationFn: deleteGoalReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goals"],
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
          deleteGoalMtn,
        }}
      >
        {children}
      </GoalContext.Provider>
    </ChecklistContextProvider>
  );
};

export default GoalContextProvider;
