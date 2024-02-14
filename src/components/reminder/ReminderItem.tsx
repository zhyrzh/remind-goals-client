import { FC, useState } from "react";
import { Card } from "../ui/card";
import CustomCheckbox from "./ReminderCheckbox";
import DeleteButton from "./ReminderDeleteButton";
import { FrequencyEnum, IReminderInputValues } from "./AddReminder";
import EditButton from "./ReminderEditButton";

export interface IReminder {
  id: number;
  content: string;
  active: boolean;
  frequency: FrequencyEnum;
}
interface IReminderItemProps {
  reminder: IReminder;
  onRemoveReminder: (id: number) => void;
  onSetReminderAsDone: (id: number) => void;
  onEditReminder: (id: number, values: IReminderInputValues) => void;
}

const ReminderItem: FC<IReminderItemProps> = ({
  reminder,
  onRemoveReminder,
  onSetReminderAsDone,
  onEditReminder,
}) => {
  const [editable] = useState<boolean>(false);

  return (
    <>
      <Card
        key={reminder.id}
        className={
          "flex items-center p-2 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer" +
          (!reminder.active
            ? " bg-neutral-300 hover:bg-neutral-300"
            : " bg-neutral-100 hover:bg-neutral-200")
        }
      >
        <CustomCheckbox
          reminder={reminder}
          onSetReminderAsDone={onSetReminderAsDone}
        />
        <p
          className={
            "text-left ml-2 transition-all duration-1000 ease-in-out" +
            (!reminder.active ? " line-through" : "") +
            (editable ? " px-2" : "")
          }
          contentEditable={editable}
          suppressContentEditableWarning={editable}
        >
          {reminder.content}
        </p>
        <section className="flex ml-auto">
          <EditButton reminder={reminder} onEditReminder={onEditReminder} />
          <DeleteButton
            onRemoveReminder={onRemoveReminder}
            reminder={reminder}
          />
        </section>
      </Card>
    </>
  );
};

export default ReminderItem;
