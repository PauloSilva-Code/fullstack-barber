import { addMinutes, format, setHours, setMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // Set start time to 09:00
  const endTime = setMinutes(setHours(date, 21), 0); // Set and time to 21:00
  const interval = 45; // Set interval in 45 minutes
  const timeList: string[] = []; // Guarda a lista de horários

  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
