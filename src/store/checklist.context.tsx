import { FC, createContext } from "react";

interface IGoalChecklistContext {}

export const ChecklistContext = createContext<IGoalChecklistContext>(
  null as unknown as IGoalChecklistContext
);

const ChecklistContextProvider: FC<{ children: any }> = ({ children }) => {
  return (
    <ChecklistContext.Provider value={{}}>{children}</ChecklistContext.Provider>
  );
};

export default ChecklistContextProvider;
