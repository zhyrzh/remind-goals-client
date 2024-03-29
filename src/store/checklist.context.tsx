import { IGoalChecklist } from "@/components/goal/types";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FC, createContext } from "react";

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
    IGoalChecklist[],
    Error,
    { title: string; isActive: boolean; goalId: number }
  >;
  deleteAllNoGoalIdMtn: UseMutationResult<undefined, Error, any>;
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

  const getAllChecklistByGoalIdQry = (goalId: number) => {
    return useQuery<IGoalChecklist[]>({
      queryKey: ["goal-checklist", "get-all-by-goal-id"],
      queryFn: async () => {
        const res = await fetch(
          `http://localhost:5000/goal-checklist/get-all-by-goal-id/${goalId}`,
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
  };

  const addGoalChklistItmMutn = useMutation<
    IGoalChecklist,
    Error,
    { title: string; isActive: boolean }
  >({
    mutationKey: ["goal-checklist", "add"],
    mutationFn: async (values) => {
      const res = await fetch("http://localhost:5000/goal-checklist", {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      return await res.json();
    },
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
    IGoalChecklist[],
    Error,
    { title: string; isActive: boolean; goalId: number }
  >({
    mutationKey: ["goal-checklist", "add"],
    mutationFn: async (values) => {
      const res = await fetch(
        `http://localhost:5000/goal-checklist/to-existing-goal/${values.goalId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
          method: "POST",
          body: JSON.stringify({
            title: values.title,
            isActive: values.isActive,
          }),
        }
      );
      return await res.json();
    },
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

  const deleteAllNoGoalIdMtn = useMutation({
    mutationKey: ["goal-checklist", "delete-no-goal-id"],
    mutationFn: async () => {
      const res = await fetch(
        "http://localhost:5000/goal-checklist/all/no-goal-id",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
          method: "DELETE",
        }
      );
      return await res.json();
    },
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
    Error,
    { checklistItmId: number; isActive: boolean }
  >({
    mutationKey: ["goal-checklist", "toggle-status"],
    mutationFn: async ({ checklistItmId, isActive }) => {
      const res = await fetch(
        `http://localhost:5000/goal-checklist/toggle-is-active/${checklistItmId}/${isActive}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
          method: "PUT",
        }
      );
      return await res.json();
    },
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
    mutationFn: async ({ id }) => {
      const res = await fetch(`http://localhost:5000/goal-checklist/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
        },
        method: "DELETE",
      });
      return await res.json();
    },
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
    mutationFn: async ({ id, title }) => {
      // /edit-title/:id/:title
      const res = await fetch(
        `http://localhost:5000/goal-checklist/edit-title/${id}/${title}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyb25ncmh5ekBnbWFpLmNvbSIsInN1YiI6ImFyb25ncmh5ekBnbWFpLmNvbSIsImlhdCI6MTcxMTY0NDk2NywiZXhwIjoxNzExNzMxMzY3fQ.KNfs6YelPFvii5kvwZXNPuD3YlgUn28PT3tq7wg28m0",
          },
          method: "PUT",
        }
      );
      return await res.json();
    },
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
