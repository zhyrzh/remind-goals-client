import { getAllRemindersReq } from "@/api/reminder.api";
import { IReminder } from "@/components/reminder/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FC, createContext } from "react";

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

interface IReminderContext {
  getAllRemindersQry: UseQueryResult<IReminder[], FetchError>;
}

export const ReminderContext = createContext<IReminderContext>(
  null as unknown as IReminderContext
);

export const ReminderContextProvder: FC<{ children: any }> = ({ children }) => {
  const getAllRemindersQry = useQuery<IReminder[], FetchError>({
    queryKey: ["reminders"],
    queryFn: getAllRemindersReq,
    refetchOnWindowFocus: false,
  });

  return (
    <ReminderContext.Provider
      value={{
        getAllRemindersQry,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
