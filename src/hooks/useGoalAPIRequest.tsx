import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";

export const useGoalAPIRequest = () => {
  const token = localStorage.getItem("remind-goals-ath-tkn");
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const baseUrl = "http://localhost:5000/goals";

  const getAllGoalsReq: QueryFunction<IGoal[]> = async () => {
    const res = await fetch(`${baseUrl}`, {
      headers,
    });
    return await res.json();
  };

  const getSpecificGoalReq: QueryFunction<IGoal> = async ({ queryKey }) => {
    const [_primKey, id] = queryKey;
    const res = await fetch(`http://localhost:5000/goals/specific/${id}`, {
      headers,
    });
    return await res.json();
  };

  const addGoalReq: MutationFunction<
    IGoal,
    { title: string; checklist: Pick<IGoalChecklist, "id">[] }
  > = async ({ title, checklist }) => {
    const res = await fetch("http://localhost:5000/goals", {
      method: "POST",
      body: JSON.stringify({
        title,
        checklist,
      }),
      headers,
    });
    return await res.json();
  };

  const editGoalTitleReq: MutationFunction<
    IGoal,
    { title: string; id: number }
  > = async ({ id, title }) => {
    const res = await fetch(`http://localhost:5000/goals/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
      headers,
    });
    return await res.json();
  };

  return { getAllGoalsReq, getSpecificGoalReq, addGoalReq, editGoalTitleReq };
};
