import { FC, createContext } from "react";
import ChecklistContextProvider from "./checklist.context";

interface IGoalContext {}

export const GoalContext = createContext<IGoalContext>(
  null as unknown as IGoalContext
);

const GoalContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <ChecklistContextProvider>
      <GoalContext.Provider value={{}}>{children}</GoalContext.Provider>
    </ChecklistContextProvider>
  );
};

export default GoalContextProvider;
