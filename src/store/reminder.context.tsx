import {
  createReminderReq,
  deleteReminderItemReq,
  getAllRemindersReq,
  toggleIsActiveReq,
} from "@/api/reminder.api";
import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FC, createContext } from "react";

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

interface IReminderContext {
  getAllRemindersQry: UseQueryResult<IReminder[], FetchError>;
  createReminderMtn: UseMutationResult<
    IReminder,
    Error,
    {
      content: string;
      frequency: FrequencyEnum;
      isActive: boolean;
      reminderStartDate: Date;
    }
  >;
  toggleIsActiveMtn: UseMutationResult<
    IReminder,
    Error,
    { id: number; isActive: boolean }
  >;
  deleteReminderItemMtn: UseMutationResult<
    { count: number },
    Error,
    { id: number }
  >;
}

export const ReminderContext = createContext<IReminderContext>(
  null as unknown as IReminderContext
);

export const ReminderContextProvder: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const getAllRemindersQry = useQuery<IReminder[], FetchError>({
    queryKey: ["reminders"],
    queryFn: getAllRemindersReq,
    refetchOnWindowFocus: false,
  });

  const createReminderMtn = useMutation<
    IReminder,
    Error,
    {
      content: string;
      frequency: FrequencyEnum;
      isActive: boolean;
      reminderStartDate: Date;
    }
  >({
    mutationKey: ["reminder", "add"],
    mutationFn: createReminderReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  const toggleIsActiveMtn = useMutation<
    IReminder,
    Error,
    { id: number; isActive: boolean }
  >({
    mutationKey: ["reminder", "toggle-is-active"],
    mutationFn: toggleIsActiveReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  const deleteReminderItemMtn = useMutation<
    { count: number },
    Error,
    { id: number }
  >({
    mutationKey: ["reminder", "delete"],
    mutationFn: deleteReminderItemReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  return (
    <ReminderContext.Provider
      value={{
        getAllRemindersQry,
        createReminderMtn,
        toggleIsActiveMtn,
        deleteReminderItemMtn,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
