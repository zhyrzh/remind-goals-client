import { IGoalChecklist } from "@/components/goal/types";
import { useGoalChecklistAPIRequest } from "@/hooks/useGoalChecklistAPIRequest";
import { FetchError } from "@/utils/error";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FC, createContext } from "react";

interface IGoalChecklistContext {
  getAllChecklistWithNoGoalIdQry: UseQueryResult<IGoalChecklist[], FetchError>;
  getAllChecklistByGoalIdQry: (
    goalId: number
  ) => UseQueryResult<IGoalChecklist[]>;
  addGoalChklistItmMutn: UseMutationResult<
    IGoalChecklist,
    FetchError,
    { title: string; isActive: boolean }
  >;
  addGoalChecklistItmToExistingGoalMtn: UseMutationResult<
    IGoalChecklist,
    FetchError,
    { title: string; isActive: boolean; goalId: number }
  >;
  deleteAllNoGoalIdMtn: UseMutationResult<{ count: number }, FetchError, any>;
  toggleChecklistItmStatusMutn: UseMutationResult<
    IGoalChecklist,
    FetchError,
    { checklistItmId: number; isActive: boolean }
  >;
  deleteSpecificChecklistItm: UseMutationResult<
    IGoalChecklist,
    FetchError,
    { id: number }
  >;
  editChecklistItmTitleMtn: UseMutationResult<
    IGoalChecklist,
    FetchError,
    { id: number; title: string }
  >;
}

export const ChecklistContext = createContext<IGoalChecklistContext>(
  null as unknown as IGoalChecklistContext
);

const ChecklistContextProvider: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const {
    addGoalChecklistItmToExistingGoalReq,
    addGoalChklistItmReq,
    deleteAllNoGoalIdReq,
    deleteSpecificChecklistItmReq,
    editChecklistItmTitleReq,
    getAllChecklistByGoalIdReq,
    getAllChecklistWithNoGoalIdReq,
    toggleChecklistItmStatusReq,
  } = useGoalChecklistAPIRequest();

  const getAllChecklistWithNoGoalIdQry = useQuery<IGoalChecklist[], FetchError>(
    {
      queryKey: ["goal-checklist", "get-all-with-no-goal-id"],
      queryFn: getAllChecklistWithNoGoalIdReq,
      placeholderData: [],
      refetchOnWindowFocus: false,
    }
  );

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
    FetchError,
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
    FetchError,
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

  const deleteAllNoGoalIdMtn = useMutation<
    { count: number },
    FetchError,
    undefined
  >({
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
  });

  const toggleChecklistItmStatusMutn = useMutation<
    IGoalChecklist,
    FetchError,
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
    FetchError,
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
    FetchError,
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
