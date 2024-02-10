import { useState } from "react";
import AddReminder, { FrequencyEnum } from "./AddReminder";
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

  const onRemoveGoal = (id: number) => {
    setReminders((prevReminder) =>
      prevReminder.filter((reminder) => reminder.id !== id)
    );
  };

  const onSetGoalAsDone = (id: number) => {
    setReminders((prevReminder) =>
      prevReminder.map((reminder) => ({
        ...reminder,
        active: reminder.id === id ? !reminder.active : reminder.active,
      }))
    );
  };

  const onAddGoal = (value: { title: string; frequency: FrequencyEnum }) => {
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

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <h1 className="text-[24px] font-bold">Reminders</h1>
        <AddReminder onAddGoal={onAddGoal} />
      </div>
      <ReminderList
        reminders={reminders}
        onRemoveGoal={onRemoveGoal}
        onSetGoalAsDone={onSetGoalAsDone}
      />
    </>
  );
};

export default Reminder;
