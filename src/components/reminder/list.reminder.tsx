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
      {reminders && reminders.length >= 1 ? (
        reminders
          ?.sort((a, b) => (b.isActive ? 1 : 0) - (a.isActive ? 1 : 0))
          .map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} />
          ))
      ) : (
        <p className="text-center">No reminders created.</p>
      )}
    </>
  );
};
/* Function component END */

export default ReminderList;
