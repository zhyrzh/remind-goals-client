import { useState } from "react";
import AddReminder, { IReminderInputValues } from "./AddReminder";
import ReminderList from "./ReminderList";
import { IReminder } from "./ReminderItem";
import { dummyReminders } from "./constants";

/* Function component START */
const Reminder = () => {
  // useState declarations
  const [reminders, setReminders] = useState<IReminder[]>(dummyReminders);

  // methods declarations
  const onRemoveReminder = (id: number) => {
    setReminders((prevReminder) =>
      prevReminder.filter((reminder) => reminder.id !== id)
    );
  };

  const onSetReminderAsDone = (id: number) => {
    setReminders((prevReminder) =>
      prevReminder.map((reminder) => ({
        ...reminder,
        active: reminder.id === id ? !reminder.active : reminder.active,
      }))
    );
  };

  const onAddReminder = (value: IReminderInputValues) => {
    setReminders((prevReminders) => [
      ...prevReminders,
      {
        id: prevReminders[prevReminders.length - 1].id + 1,
        content: value.title,
        active: true,
        frequency: value.frequency,
      },
    ]);
  };

  const onEditReminder = (id: number, values: IReminderInputValues) => {
    setReminders((prevReminders) =>
      prevReminders.map((item) =>
        item.id === id
          ? { ...item, content: values.title, frequency: values.frequency }
          : item
      )
    );
  };

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <h1 className="text-[24px] font-bold">Reminders</h1>
        <AddReminder onAddReminder={onAddReminder} />
      </div>
      <ReminderList
        reminders={reminders}
        onRemoveReminder={onRemoveReminder}
        onSetReminderAsDone={onSetReminderAsDone}
        onEditReminder={onEditReminder}
      />
    </>
  );
};
/* Function component END */

export default Reminder;
