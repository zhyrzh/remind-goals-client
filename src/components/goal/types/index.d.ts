export interface IGoalChecklist {
  id: number;
  title: string;
  isActive: boolean;
}
export interface IGoal {
  id: number;
  title: string;
  checklist: IGoalChecklist[];
}
