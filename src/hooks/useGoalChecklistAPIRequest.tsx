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
    Pick<IGoalChecklist, "title" | "isActive">
  > = async (values) => post(`/goal-checklist`, values);

  const addGoalChecklistItmToExistingGoalReq: MutationFunction<
    IGoalChecklist,
    Pick<IGoalChecklist, "title" | "isActive" | "goalId">
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
    Pick<IGoalChecklist, "id" | "isActive">
  > = async ({ id, isActive }) =>
    put(`/goal-checklist/toggle-is-active/${id}/${isActive}`);

  const deleteSpecificChecklistItmReq: MutationFunction<
    IGoalChecklist,
    Pick<IGoalChecklist, "id">
  > = async ({ id }) => del(`/goal-checklist/${id}`);

  const editChecklistItmTitleReq: MutationFunction<
    IGoalChecklist,
    Pick<IGoalChecklist, "id" | "title">
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
