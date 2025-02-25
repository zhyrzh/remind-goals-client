import { FrequencyEnum } from "@/components/reminder/constants";
import { IReminder } from "@/components/reminder/types";
import { useReminderAPIrequest } from "@/hooks/useReminderAPIRequest";
import { FetchError } from "@/utils/error";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FC, createContext } from "react";

interface IReminderContext {
  getAllRemindersQry: UseQueryResult<IReminder[], FetchError>;
  createReminderMtn: UseMutationResult<
    IReminder,
    FetchError,
    {
      content: string;
      frequency: FrequencyEnum;
      isActive: boolean;
      triggerDate: Date;
    }
  >;
  toggleIsActiveMtn: UseMutationResult<
    IReminder,
    FetchError,
    { id: number; isActive: boolean }
  >;
  deleteReminderItemMtn: UseMutationResult<
    { count: number },
    FetchError,
    { id: number }
  >;
  editReminderDetailsMtn: UseMutationResult<
    IReminder,
    FetchError,
    {
      id: number;
      content: string;
      frequency: FrequencyEnum;
      triggerDate: Date;
    }
  >;
}

export const ReminderContext = createContext<IReminderContext>(
  null as unknown as IReminderContext
);

export const ReminderContextProvder: FC<{ children: any }> = ({ children }) => {
  const qryClient = useQueryClient();

  const {
    createReminderReq,
    deleteReminderItemReq,
    editReminderDetailsReq,
    getAllRemindersReq,
    toggleIsActiveReq,
  } = useReminderAPIrequest();

  const getAllRemindersQry = useQuery<IReminder[], FetchError>({
    queryKey: ["reminders"],
    queryFn: getAllRemindersReq,
    refetchOnWindowFocus: false,
  });

  const createReminderMtn = useMutation<
    IReminder,
    FetchError,
    {
      content: string;
      frequency: FrequencyEnum;
      isActive: boolean;
      triggerDate: Date;
    }
  >({
    mutationKey: ["reminder", "add"],
    mutationFn: createReminderReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  const toggleIsActiveMtn = useMutation<
    IReminder,
    FetchError,
    { id: number; isActive: boolean }
  >({
    mutationKey: ["reminder", "toggle-is-active"],
    mutationFn: toggleIsActiveReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  const deleteReminderItemMtn = useMutation<
    { count: number },
    FetchError,
    { id: number }
  >({
    mutationKey: ["reminder", "delete"],
    mutationFn: deleteReminderItemReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  const editReminderDetailsMtn = useMutation<
    IReminder,
    FetchError,
    {
      id: number;
      content: string;
      frequency: FrequencyEnum;
      triggerDate: Date;
    }
  >({
    mutationKey: ["reminder", "edit-details"],
    mutationFn: editReminderDetailsReq,
    onSuccess: () => {
      qryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  return (
    <ReminderContext.Provider
      value={{
        getAllRemindersQry,
        createReminderMtn,
        toggleIsActiveMtn,
        deleteReminderItemMtn,
        editReminderDetailsMtn,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
};
