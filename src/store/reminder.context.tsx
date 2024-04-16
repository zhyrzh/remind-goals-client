import { FC, createContext } from "react";

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

interface IReminderContext {}

export const ReminderContext = createContext<IReminderContext>(
  null as unknown as IReminderContext
);

export const ReminderContextProvder: FC<{ children: any }> = ({ children }) => {
  return (
    <ReminderContext.Provider value={{}}>{children}</ReminderContext.Provider>
  );
};
