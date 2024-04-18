import { createReminderReq, getAllRemindersReq } from "@/api/reminder.api";
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

  return (
    <ReminderContext.Provider
      value={{
        getAllRemindersQry,
        createReminderMtn,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
