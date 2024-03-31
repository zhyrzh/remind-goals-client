import { IGoalChecklist } from "@/components/goal/types";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FC, createContext } from "react";
import {
  addGoalChecklistItmToExistingGoalReq,
  addGoalChklistItmReq,
  deleteAllNoGoalIdReq,
  deleteSpecificChecklistItmReq,
  editChecklistItmTitleReq,
  getAllChecklistByGoalIdReq,
  getAllChecklistWithNoGoalIdReq,
  toggleChecklistItmStatusReq,
} from "@/api/goal-checklist.api";

interface IGoalChecklistContext {
  getAllChecklistWithNoGoalIdQry: UseQueryResult<IGoalChecklist[]>;
  getAllChecklistByGoalIdQry: (
    goalId: number
  ) => UseQueryResult<IGoalChecklist[]>;
  addGoalChklistItmMutn: UseMutationResult<
    IGoalChecklist,
    Error,
    { title: string; isActive: boolean }
  >;
  addGoalChecklistItmToExistingGoalMtn: UseMutationResult<
    IGoalChecklist,
    Error,
    { title: string; isActive: boolean; goalId: number }
  >;
  deleteAllNoGoalIdMtn: UseMutationResult<{ count: number }, Error, any>;
  toggleChecklistItmStatusMutn: UseMutationResult<
    IGoalChecklist,
    Error,
    { checklistItmId: number; isActive: boolean }
  >;
  deleteSpecificChecklistItm: UseMutationResult<
    IGoalChecklist,
    Error,
    { id: number }
  >;
  editChecklistItmTitleMtn: UseMutationResult<
    IGoalChecklist,
    Error,
    { id: number; title: string }
  >;
}

export const ChecklistContext = createContext<IGoalChecklistContext>(
  null as unknown as IGoalChecklistContext
);

const ChecklistContextProvider: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const getAllChecklistWithNoGoalIdQry = useQuery<IGoalChecklist[]>({
    queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
    queryFn: getAllChecklistWithNoGoalIdReq,
    placeholderData: [],
    refetchOnWindowFocus: false,
  });

  const getAllChecklistByGoalIdQry = (goalId: number) => {
    return useQuery<IGoalChecklist[]>({
      queryKey: ["goal-checklist", "get-all-by-goal-id", goalId],
      queryFn: getAllChecklistByGoalIdReq,
      placeholderData: [],
      refetchOnWindowFocus: false,
    });
  };

  const addGoalChklistItmMutn = useMutation<
    IGoalChecklist,
    Error,
    { title: string; isActive: boolean }
  >({
    mutationKey: ["goal-checklist", "add"],
    mutationFn: addGoalChklistItmReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-by-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const addGoalChecklistItmToExistingGoalMtn = useMutation<
    IGoalChecklist,
    Error,
    { title: string; isActive: boolean; goalId: number }
  >({
    mutationKey: ["goal-checklist", "add"],
    mutationFn: addGoalChecklistItmToExistingGoalReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-by-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const deleteAllNoGoalIdMtn = useMutation<{ count: number }, Error, undefined>(
    {
      mutationKey: ["goal-checklist", "delete-no-goal-id"],
      mutationFn: deleteAllNoGoalIdReq,
      onSuccess: () => {
        qryClient.invalidateQueries({
          queryKey: ["goal-checklist", "get-all-by-goal-id"],
        });
        qryClient.invalidateQueries({
          queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
        });
        qryClient.invalidateQueries({
          queryKey: ["goals"],
        });
      },
    }
  );

  const toggleChecklistItmStatusMutn = useMutation<
    IGoalChecklist,
    Error,
    { checklistItmId: number; isActive: boolean }
  >({
    mutationKey: ["goal-checklist", "toggle-status"],
    mutationFn: toggleChecklistItmStatusReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-by-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const deleteSpecificChecklistItm = useMutation<
    IGoalChecklist,
    Error,
    { id: number }
  >({
    mutationKey: ["goal-checklist", "delete-specific"],
    mutationFn: deleteSpecificChecklistItmReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-by-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  const editChecklistItmTitleMtn = useMutation<
    IGoalChecklist,
    Error,
    { id: number; title: string }
  >({
    mutationKey: ["goal-checklist", "edit-title"],
    mutationFn: editChecklistItmTitleReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-by-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      });
      qryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });

  return (
    <ChecklistContext.Provider
      value={{
        getAllChecklistWithNoGoalIdQry,
        getAllChecklistByGoalIdQry,
        addGoalChklistItmMutn,
        addGoalChecklistItmToExistingGoalMtn,
        deleteAllNoGoalIdMtn,
        toggleChecklistItmStatusMutn,
        deleteSpecificChecklistItm,
        editChecklistItmTitleMtn,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export default ChecklistContextProvider;
