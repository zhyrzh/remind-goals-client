import { IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useGoalChecklistAPIRequest = () => {
  const getAllChecklistWithNoGoalIdReq = async (
    _context: QueryFunctionContext
  ) => useFetchRequest(`/goal-checklist/get-all-no-goal-id`, "GET")();

  const getAllChecklistByGoalIdReq = async ({
    queryKey: [_primKey, _subKey, goalId],
  }: QueryFunctionContext) =>
    useFetchRequest(`/goal-checklist/get-all-by-goal-id/${goalId}`, "GET")();

  const addGoalChklistItmReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean }
  > = async (values) => useFetchRequest("/goal-checklist", "POST", values)();

  const addGoalChecklistItmToExistingGoalReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean; goalId: number }
  > = async (values) =>
    useFetchRequest(
      `/goal-checklist/to-existing-goal/${values.goalId}`,
      "POST",
      {
        title: values.title,
        isActive: values.isActive,
      }
    )();

  const deleteAllNoGoalIdReq: MutationFunction<
    { count: number },
    undefined
  > = async () => useFetchRequest("/goal-checklist/all/no-goal-id", "DELETE")();

  const toggleChecklistItmStatusReq: MutationFunction<
    IGoalChecklist,
    { checklistItmId: number; isActive: boolean }
  > = async ({ checklistItmId, isActive }) =>
    useFetchRequest(
      `/goal-checklist/toggle-is-active/${checklistItmId}/${isActive}`,
      "PUT"
    )();

  const deleteSpecificChecklistItmReq: MutationFunction<
    IGoalChecklist,
    { id: number }
  > = async ({ id }) => useFetchRequest(`/goal-checklist/${id}`, "DELETE")();

  const editChecklistItmTitleReq: MutationFunction<
    IGoalChecklist,
    { id: number; title: string }
  > = async ({ id, title }) =>
    useFetchRequest(`/goal-checklist/edit-title/${id}/${title}`, "PUT")();

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
