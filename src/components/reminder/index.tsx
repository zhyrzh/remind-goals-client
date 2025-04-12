import { useContext } from "react";
import AddReminder from "./add.reminder";
import ReminderList from "./list.reminder";
import { ReminderContext } from "@/store/reminder.context";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/spinner";

/* Function component START */
const Reminder = () => {
  const navigate = useNavigate();
  const remindersQry = useContext(ReminderContext)?.getAllRemindersQry;

  if (remindersQry.isError && remindersQry.error.res.status === 401) {
    localStorage.removeItem("remind-goals-ath-tkn");
    navigate("/login");
  }

  return (
    <>
      <div className="flex justify-between mb-[15px]">
        <h1 className="text-[24px] font-bold">Reminders</h1>
        <AddReminder />
      </div>
      {remindersQry.isPending ? (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ReminderList reminders={remindersQry.data!} />
      )}
    </>
  );
};
/* Function component END */

export default Reminder;
