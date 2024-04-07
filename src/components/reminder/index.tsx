import { useContext } from "react";
import AddReminder from "./add.reminder";
import ReminderList from "./list.reminder";
import { ReminderContext } from "@/store/reminder.context";

/* Function component START */
const Reminder = () => {
  const remindersQry = useContext(ReminderContext).getAllRemindersQry;

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <h1 className="text-[24px] font-bold">Reminders</h1>
        <AddReminder />
      </div>
      <ReminderList reminders={remindersQry.data!} />
    </>
  );
};
/* Function component END */

export default Reminder;
