import { IGoalChecklist } from "@/components/goal/types";
import { FetchError } from "@/utils/error";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";

export const useGoalChecklistAPIRequest = () => {
  const userDetails = JSON.parse(localStorage.getItem("remind-goals-ath-tkn")!);
  const token = userDetails?.access_token ? userDetails?.access_token : "";
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

    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const getAllChecklistByGoalIdReq = async ({
    queryKey,
  }: QueryFunctionContext) => {
    const [_primKey, _subKey, goalId] = queryKey;
    const res = await fetch(`${baseUrl}/get-all-by-goal-id/${goalId}`, {
      headers,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const deleteSpecificChecklistItmReq: MutationFunction<
    IGoalChecklist,
    { id: number }
  > = async ({ id }) => {
    const res = await fetch(`http://localhost:5000/goal-checklist/${id}`, {
      headers,
      method: "DELETE",
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
