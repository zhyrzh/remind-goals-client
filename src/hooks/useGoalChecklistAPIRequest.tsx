import { IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useGoalChecklistAPIRequest = () => {
  const { get, del, post, put } = useFetchRequest();

  const getAllChecklistWithNoGoalIdReq = async (
    _context: QueryFunctionContext
  ) => get(`/goal-checklist/get-all-no-goal-id`);

  const getAllChecklistByGoalIdReq = async ({
    queryKey: [_primKey, _subKey, goalId],
  }: QueryFunctionContext) =>
    get(`/goal-checklist/get-all-by-goal-id/${goalId}`);

  const addGoalChklistItmReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean }
  > = async (values) => post(`/goal-checklist`, values);

  const addGoalChecklistItmToExistingGoalReq: MutationFunction<
    IGoalChecklist,
    { title: string; isActive: boolean; goalId: number }
  > = async (values) =>
    post(`/goal-checklist/to-existing-goal/${values.goalId}`, {
      title: values.title,
      isActive: values.isActive,
    });

  const deleteAllNoGoalIdReq: MutationFunction<
    { count: number },
    undefined
  > = async () => del(`/goal-checklist/all/no-goal-id`);

  const toggleChecklistItmStatusReq: MutationFunction<
    IGoalChecklist,
    { checklistItmId: number; isActive: boolean }
  > = async ({ checklistItmId, isActive }) =>
    put(`/goal-checklist/toggle-is-active/${checklistItmId}/${isActive}`);

  const deleteSpecificChecklistItmReq: MutationFunction<
    IGoalChecklist,
    { id: number }
  > = async ({ id }) => del(`/goal-checklist/${id}`);

  const editChecklistItmTitleReq: MutationFunction<
    IGoalChecklist,
    { id: number; title: string }
  > = async ({ id, title }) => put(`/goal-checklist/edit-title/${id}/${title}`);

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
