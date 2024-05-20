import { IGoal, IGoalChecklist } from "@/components/goal/types";
import { FetchError } from "@/utils/error";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";

export const useGoalAPIRequest = () => {
  const userDetails = JSON.parse(localStorage.getItem("remind-goals-ath-tkn")!);
  const token = userDetails?.access_token ? userDetails?.access_token : "";
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const baseUrl = "http://localhost:5000/goals";

  const getAllGoalsReq: QueryFunction<IGoal[]> = async () => {
    const res = await fetch(`${baseUrl}`, {
      headers,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const getSpecificGoalReq: QueryFunction<IGoal> = async ({ queryKey }) => {
    const [_primKey, id] = queryKey;
    const res = await fetch(`http://localhost:5000/goals/specific/${id}`, {
      headers,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
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
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  return { getAllGoalsReq, getSpecificGoalReq, addGoalReq, editGoalTitleReq };
};
