import { FC } from "react";
import ReminderItem from "./ReminderItem";
import { IReminderInputValues } from "./AddReminder";
import { IReminder } from "./types";

// Types declaration
interface IReminderList {
  reminders: IReminder[];
  onRemoveReminder: (id: number) => void;
  onSetReminderAsDone: (id: number) => void;
  onEditReminder: (id: number, values: IReminderInputValues) => void;
}

/* Function component START */
const ReminderList: FC<IReminderList> = ({
  reminders,
  onRemoveReminder,
  onSetReminderAsDone,
  onEditReminder,
}) => {
  return (
    <>
      {reminders
        .sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
        .map((reminder) => (
          <ReminderItem
            key={reminder.id}
            reminder={reminder}
            onRemoveReminder={onRemoveReminder}
            onSetReminderAsDone={onSetReminderAsDone}
            onEditReminder={onEditReminder}
          />
        ))}
    </>
  );
};
/* Function component END */

export default ReminderList;
