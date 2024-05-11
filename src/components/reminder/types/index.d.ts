import { FrequencyEnum } from "./constants";

export interface IReminder {
  id: number;
  content: string;
  isActive: boolean;
  frequency: FrequencyEnum;
  reminderStartDate: Date;
}
