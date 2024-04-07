import { FrequencyEnum } from "./constants";

export interface IReminder {
  id: number;
  content: string;
  active: boolean;
  frequency: FrequencyEnum;
  reminderStartDate: Date;
}
