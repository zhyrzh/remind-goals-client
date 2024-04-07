import { FC, useState } from "react";
import { Card } from "../ui/card";
import CustomCheckbox from "./checkbox.reminder";
import DeleteButton from "./delete-button.reminder";
import EditButton from "./edit-button.reminder";
import { IReminder } from "./types";

// Types declarations
interface IReminderItemProps {
  reminder: IReminder;
}

/* Function component START */
const ReminderItem: FC<IReminderItemProps> = ({ reminder }) => {
  // useState declarations
  const [editable] = useState<boolean>(false);

  return (
    <Card
      key={reminder.id}
      className={
        "flex items-center p-2 transition-all duration-200 ease-in-out border-none first:mt-0 mt-2 cursor-pointer" +
        (!reminder.active
          ? " bg-neutral-300 hover:bg-neutral-300"
          : " bg-neutral-100 hover:bg-neutral-200")
      }
    >
      <CustomCheckbox reminder={reminder} />
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
        <EditButton reminder={reminder} />
        <DeleteButton reminder={reminder} />
      </section>
    </Card>
  );
};
/* Function component END */

export default ReminderItem;
