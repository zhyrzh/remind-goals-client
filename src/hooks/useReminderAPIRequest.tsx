import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import { FetchError } from "@/utils/error";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";

export const useReminderAPIrequest = () => {
  const userDetails = JSON.parse(localStorage.getItem("remind-goals-ath-tkn")!);
  const token = userDetails?.access_token ? userDetails?.access_token : "";
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const baseUrl = "http://localhost:5000/reminder";

  const getAllRemindersReq: QueryFunction<IReminder[]> = async () => {
    const res = await fetch(`${baseUrl}`, {
      method: "GET",
      headers,
    });
    console.log(res, "check res");
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const createReminderReq: MutationFunction<
    IReminder,
    { content: string; frequency: FrequencyEnum; isActive: boolean }
  > = async (values) => {
    const res = await fetch(`${baseUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify(values),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const toggleIsActiveReq: MutationFunction<
    IReminder,
    { id: number; isActive: boolean }
  > = async ({ id, isActive }) => {
    const res = await fetch(`${baseUrl}/${id}/${isActive}`, {
      method: "PUT",
      headers,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const deleteReminderItemReq: MutationFunction<
    { count: number },
    { id: number }
  > = async ({ id }) => {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers,
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  const editReminderDetailsReq: MutationFunction<
    IReminder,
    {
      id: number;
      content: string;
      frequency: FrequencyEnum;
      reminderStartDate: Date;
    }
  > = async ({ id, content, frequency, reminderStartDate }) => {
    const res = await fetch(`${baseUrl}/details/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ content, frequency, reminderStartDate }),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new FetchError(res);
    }
  };

  return {
    getAllRemindersReq,
    createReminderReq,
    toggleIsActiveReq,
    deleteReminderItemReq,
    editReminderDetailsReq,
  };
};
