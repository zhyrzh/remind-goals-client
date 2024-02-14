import { useState } from "react";
import AddReminder, {
  FrequencyEnum,
  IReminderInputValues,
} from "./AddReminder";
import ReminderList from "./ReminderList";
import { IReminder } from "./ReminderItem";

const Reminder = () => {
  const [reminders, setReminders] = useState<IReminder[]>([
    {
      id: 1,
      content: "Build my dream pc.",
      active: true,
      frequency: FrequencyEnum.once,
    },
    {
      id: 2,
      content: "Buy new keyboard.",
      active: true,
      frequency: FrequencyEnum.once,
    },
    {
      id: 3,
      content: "Get passport.",
      active: false,
      frequency: FrequencyEnum.once,
    },
  ]);

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default Reminder;
