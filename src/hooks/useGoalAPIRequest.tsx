import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useGoalAPIRequest = () => {
  const getAllGoalsReq: QueryFunction<IGoal[]> = async () =>
    useFetchRequest(`/goals`, "GET")();

  const getSpecificGoalReq: QueryFunction<IGoal> = async ({
    queryKey: [_primKey, id],
  }) => useFetchRequest(`/goals/specific/${id}`, "GET")();

  const addGoalReq: MutationFunction<
    IGoal,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  > = async ({ title, checklist }) =>
    useFetchRequest(`/goals`, "POST", {
      title,
      checklist,
    })();

  const editGoalTitleReq: MutationFunction<
    IGoal,
    { title: string; id: number }
  > = async ({ id, title }) =>
    useFetchRequest(`/goals/${id}`, "PUT", { title })();

  return { getAllGoalsReq, getSpecificGoalReq, addGoalReq, editGoalTitleReq };
};
