import { FC } from "react";
import ReminderItem from "./item.reminder";
import { IReminder } from "./types";

// Types declaration
interface IReminderList {
  reminders: IReminder[];
}

/* Function component START */
const ReminderList: FC<IReminderList> = ({ reminders }) => {
  return (
    <>
      {reminders
        ?.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
        .map((reminder) => (
          <ReminderItem key={reminder.id} reminder={reminder} />
        ))}
    </>
  );
};
/* Function component END */

export default ReminderList;
