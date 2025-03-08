import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import { MutationFunction, QueryFunction } from "@tanstack/react-query";
import useFetchRequest from "./useFetchREquest";

export const useReminderAPIrequest = () => {
  const { get, del, post, put } = useFetchRequest();

  const getAllRemindersReq: QueryFunction<IReminder[]> = async () =>
    get(`/reminder`);

  const createReminderReq: MutationFunction<
    IReminder,
    { content: string; frequency: FrequencyEnum; isActive: boolean }
  > = async (values) => post(`/reminder`, values);

  const toggleIsActiveReq: MutationFunction<
    IReminder,
    { id: number; isActive: boolean }
  > = async ({ id, isActive }) => put(`/reminder/${id}/${isActive}`);

  const deleteReminderItemReq: MutationFunction<
    { count: number },
    { id: number }
  > = async ({ id }) => del(`/reminder/${id}`);

  const editReminderDetailsReq: MutationFunction<
    IReminder,
    {
      id: number;
      content: string;
      frequency: FrequencyEnum;
      triggerDate: Date;
    }
  > = async ({ id, content, frequency, triggerDate }) =>
    put(`/reminder/details/${id}`, {
      content,
      frequency,
      triggerDate,
    });

  return {
    getAllRemindersReq,
    createReminderReq,
    toggleIsActiveReq,
    deleteReminderItemReq,
    editReminderDetailsReq,
  };
};
