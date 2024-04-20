import { IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";

export const useGoalChecklistAPIRequest = () => {
  const token = localStorage.getItem("remind-goals-ath-tkn");
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const baseUrl = "http://localhost:5000/goal-checklist";

  const getAllChecklistWithNoGoalIdReq = async (
    _context: QueryFunctionContext
  ) => {
    const res = await fetch(`${baseUrl}/get-all-no-goal-id`, {
      headers,
    });

    return await res.json();
  };

  const getAllChecklistByGoalIdReq = async ({
    queryKey,
  }: QueryFunctionContext) => {
    const [_primKey, _subKey, goalId] = queryKey;
    const res = await fetch(`${baseUrl}/get-all-by-goal-id/${goalId}`, {
      headers,
    });
    return await res.json();
  };

  const addGoalChklistItmReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean }
  > = async (values) => {
    const res = await fetch("http://localhost:5000/goal-checklist", {
      headers,
      method: "POST",
      body: JSON.stringify(values),
    });
    return await res.json();
  };

  const addGoalChecklistItmToExistingGoalReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean; goalId: number }
  > = async (values) => {
    const res = await fetch(
      `http://localhost:5000/goal-checklist/to-existing-goal/${values.goalId}`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          isActive: values.isActive,
        }),
      }
    );
    return await res.json();
  };

  const deleteAllNoGoalIdReq: MutationFunction<
    { count: number },
    undefined
  > = async () => {
    const res = await fetch(
      "http://localhost:5000/goal-checklist/all/no-goal-id",
      {
        headers,
        method: "DELETE",
      }
    );
    return await res.json();
  };

  const toggleChecklistItmStatusReq: MutationFunction<
    IGoalChecklist,
    { checklistItmId: number; isActive: boolean }
  > = async ({ checklistItmId, isActive }) => {
    const res = await fetch(
      `http://localhost:5000/goal-checklist/toggle-is-active/${checklistItmId}/${isActive}`,
      {
        headers,
        method: "PUT",
      }
    );
    return await res.json();
  };

  const deleteSpecificChecklistItmReq: MutationFunction<
    IGoalChecklist,
    { id: number }
  > = async ({ id }) => {
    const res = await fetch(`http://localhost:5000/goal-checklist/${id}`, {
      headers,
      method: "DELETE",
    });
    return await res.json();
  };

  const editChecklistItmTitleReq: MutationFunction<
    IGoalChecklist,
    { id: number; title: string }
  > = async ({ id, title }) => {
    const res = await fetch(
      `http://localhost:5000/goal-checklist/edit-title/${id}/${title}`,
      {
        headers,
        method: "PUT",
      }
    );
    return await res.json();
  };

  return {
    getAllChecklistWithNoGoalIdReq,
    getAllChecklistByGoalIdReq,
    addGoalChklistItmReq,
    addGoalChecklistItmToExistingGoalReq,
    deleteAllNoGoalIdReq,
    toggleChecklistItmStatusReq,
    deleteSpecificChecklistItmReq,
    editChecklistItmTitleReq,
  };
};
