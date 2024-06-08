import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useReminderAPIrequest = () => {
  const baseUrl = "http://localhost:5000/reminder";

  const getAllRemindersReq: QueryFunction<IReminder[]> = async () =>
    useFetchRequest(`${baseUrl}`, "GET")();

  const createReminderReq: MutationFunction<
    IReminder,
    { content: string; frequency: FrequencyEnum; isActive: boolean }
  > = async (values) => useFetchRequest(`${baseUrl}`, "POST", values)();

  const toggleIsActiveReq: MutationFunction<
    IReminder,
    { id: number; isActive: boolean }
  > = async ({ id, isActive }) =>
    useFetchRequest(`${baseUrl}/${id}/${isActive}`, "PUT")();

  const deleteReminderItemReq: MutationFunction<
    { count: number },
    { id: number }
  > = async ({ id }) => useFetchRequest(`${baseUrl}/${id}`, "DELETE")();

  const editReminderDetailsReq: MutationFunction<
    IReminder,
    {
      id: number;
      content: string;
      frequency: FrequencyEnum;
      reminderStartDate: Date;
    }
  > = async ({ id, content, frequency, reminderStartDate }) =>
    useFetchRequest(`${baseUrl}/details/${id}`, "PUT", {
      content,
      frequency,
      reminderStartDate,
    })();

  return {
    getAllRemindersReq,
    createReminderReq,
    toggleIsActiveReq,
    deleteReminderItemReq,
    editReminderDetailsReq,
  };
};
