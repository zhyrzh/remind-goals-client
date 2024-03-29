export interface IGoalChecklist {
  id: number;
  title: string;
  isActive: boolean;
  userId: string;
  updatedAt: Date | null;
  createdAt: Date;
  goalId: number | null;
}
export interface IGoal {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  checklist: IGoalChecklist[];
}
