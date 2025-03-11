import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useGoalAPIRequest = () => {
  const { get, post, put } = useFetchRequest();

  const getAllGoalsReq: QueryFunction<IGoal[]> = async () => get("/goals");

  const getSpecificGoalReq: QueryFunction<IGoal> = async ({
    queryKey: [_primKey, id],
  }) => get(`/goals/specific/${id}`);

  const addGoalReq: MutationFunction<
    IGoal,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  > = async ({ title, checklist }) =>
    post("/goals", {
      title,
      checklist,
    });

  const editGoalTitleReq: MutationFunction<
    IGoal,
    Pick<IGoal, "id" | "title">
  > = async ({ id, title }) => put(`/goals/${id}`, title);

  return { getAllGoalsReq, getSpecificGoalReq, addGoalReq, editGoalTitleReq };
};
