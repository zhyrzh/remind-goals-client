import { FC } from "react";
import ReminderItem, { IReminder } from "./ReminderItem";
import { IReminderInputValues } from "./AddReminder";

interface IReminderList {
  reminders: IReminder[];
  onRemoveGoal: (id: number) => void;
  onSetGoalAsDone: (id: number) => void;
  onEditReminder: (id: number, values: IReminderInputValues) => void;
}

const ReminderList: FC<IReminderList> = ({
  reminders,
  onRemoveGoal,
  onSetGoalAsDone,
  onEditReminder,
}) => {
  return (
    <>
      {reminders
        .sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
        .map((reminder) => (
          <ReminderItem
            key={reminder.id}
            goal={reminder}
            onRemoveGoal={onRemoveGoal}
            onSetGoalAsDone={onSetGoalAsDone}
            onEditReminder={onEditReminder}
          />
        ))}
    </>
  );
};

export default ReminderList;
