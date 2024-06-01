import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useGoalAPIRequest = () => {
  const baseUrl = "http://localhost:5000/goals";

  const getAllGoalsReq: QueryFunction<IGoal[]> = async () =>
    useFetchRequest(`${baseUrl}`, "GET")();

  const getSpecificGoalReq: QueryFunction<IGoal> = async ({
    queryKey: [_primKey, id],
  }) => useFetchRequest(`${baseUrl}/specific/${id}`, "GET")();

  const addGoalReq: MutationFunction<
    IGoal,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  > = async ({ title, checklist }) =>
    useFetchRequest(
      `${baseUrl}`,
      "POST",
      JSON.stringify({
        title,
        checklist,
      })
    )();

  const editGoalTitleReq: MutationFunction<
    IGoal,
    { title: string; id: number }
  > = async ({ id, title }) =>
    useFetchRequest(`${baseUrl}/${id}`, "PUT", JSON.stringify({ title }))();

  return { getAllGoalsReq, getSpecificGoalReq, addGoalReq, editGoalTitleReq };
};
