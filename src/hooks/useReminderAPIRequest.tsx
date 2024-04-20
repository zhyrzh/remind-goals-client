import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import { FetchError } from "@/store/reminder.context";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";

export const useReminderAPIrequest = () => {
  const token = localStorage.getItem("remind-goals-ath-tkn");
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
    if (res.ok) {
      return await res.json();
    } else {
      console.log(await res.json(), "checkes");
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
    return await res.json();
  };

  const toggleIsActiveReq: MutationFunction<
    IReminder,
    { id: number; isActive: boolean }
  > = async ({ id, isActive }) => {
    const res = await fetch(`${baseUrl}/${id}/${isActive}`, {
      method: "PUT",
      headers,
    });
    return await res.json();
  };

  const deleteReminderItemReq: MutationFunction<
    { count: number },
    { id: number }
  > = async ({ id }) => {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
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
    return await res.json();
  };

  return {
    getAllRemindersReq,
    createReminderReq,
    toggleIsActiveReq,
    deleteReminderItemReq,
    editReminderDetailsReq,
  };
};
