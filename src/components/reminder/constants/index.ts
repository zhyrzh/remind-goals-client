export const enum FrequencyEnum {
  once = "once",
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  annually = "annually",
}

export const radioItems = [
  {
    item: FrequencyEnum.once,
  },
  {
    item: FrequencyEnum.daily,
  },
  {
    item: FrequencyEnum.weekly,
  },
  {
    item: FrequencyEnum.monthly,
  },
  {
    item: FrequencyEnum.annually,
  },
];

export const dummyReminders = [
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
];
