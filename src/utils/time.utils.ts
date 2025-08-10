interface ITargetRange {
  from: Date;
  to: Date;
}

export function getTimeSince(lastDate: Date | string) {
  const currentDateTime: number = new Date().getTime();
  const lastDateTime: number = new Date(lastDate).getTime();
  const timeDifference: number = currentDateTime - lastDateTime;

  //   Calculate time units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months) return hours + "m";
  else if (days) return days + "d";
  else if (hours) return hours + "h";
  else if (minutes) return minutes + "min";
  else return seconds + "s";
}

// export const getCalendarByMonthAndYear = (month: number, year: number) => {
//   const weeks: any[] = [];
//   const firstDayOfMonth = new Date(year, month - 1, 1);
//   const lastDayOfMonth = new Date(year, month, 0);
//   const daysInMonth = lastDayOfMonth.getDate();
//   let startingDay = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

//   // Adjust startingDay to start from Monday (0 for Monday, 1 for Tuesday, ..., 6 for Sunday)
//   startingDay = startingDay === 0 ? 6 : startingDay - 1;

//   let currentWeek = [];
//   const currentMonth = month; // Adjust month index to start from 1
//   const currentYear = year;

//   // Add days from the previous month to fill the gap at the beginning of the current month
//   const previousMonthLastDay = new Date(year, month, 0).getDate();
//   const previousMonthFirstDayOfWeek = previousMonthLastDay - startingDay + 1;
//   for (let i = previousMonthFirstDayOfWeek; i <= previousMonthLastDay; i++) {
//     currentWeek.push({
//       day: i,
//       isCurrentMonth: false,
//       week: weeks.length + 1,
//       month: currentMonth === 1 ? 12 : currentMonth - 1,
//       year: currentMonth === 1 ? year - 1 : year,
//     });
//   }

//   // Add days of the current month
//   for (let day = 1; day <= daysInMonth; day++) {
//     currentWeek.push({
//       day: day,
//       isCurrentMonth: true,
//       week: weeks.length + 1,
//       month: currentMonth,
//       year: currentYear,
//     });
//     // If we've reached Sunday or the last day of the month, push the current week and start a new one
//     if (currentWeek.length === 7 || day === daysInMonth) {
//       weeks.push(currentWeek);
//       currentWeek = [];
//     }
//   }

//   // Add days from the next month to fill the gap at the end of the current month
//   currentWeek = weeks[weeks.length - 1];
//   const remainingDays = 7 - currentWeek.length;

//   for (let i = 1; i <= remainingDays; i++) {
//     currentWeek.push({
//       day: i,
//       isCurrentMonth: false,
//       week: weeks.length + 1,
//       month: currentMonth === 12 ? 1 : currentMonth + 1,
//       year: currentMonth === 12 ? year + 1 : year,
//     });
//   }

//   return weeks;
// };

// function getOrdinalIndicator(day: number): string {
//   if (day >= 11 && day <= 13) {
//     return "th";
//   }
//   switch (day % 10) {
//     case 1:
//       return "st";
//     case 2:
//       return "nd";
//     case 3:
//       return "rd";
//     default:
//       return "th";
//   }
// }

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   const day = date.getDate();
//   const month = date.toLocaleString("default", { month: "long" });
//   const year = date.getFullYear();
//   const ordinalIndicator = getOrdinalIndicator(day);

//   return `${day}${ordinalIndicator} ${month} ${year}`;
// }

// export function formatDateTime(dateString: string): string {
//   const date = new Date(dateString);
//   const formattedDate = formatDate(dateString);
//   const hours = date.getHours();
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   return `${formattedDate} at ${hours}:${minutes}`;
// }

// interface ITargetRange {
//   from: Date;
//   to: Date;
// }

export function isRangeIntersectionExists(
  targetRange: ITargetRange,
  ranges: ITargetRange[]
): boolean {
  const targetRangeFrom = targetRange.from.getTime();
  const targetRangeTo = targetRange.to.getTime();

  for (const range of ranges) {
    const rangeFrom = range.from.getTime();
    const rangeTo = range.to.getTime();

    if (
      (targetRangeFrom >= rangeFrom && targetRangeFrom <= rangeTo) ||
      (targetRangeTo >= rangeFrom && targetRangeTo <= rangeTo)
    ) {
      return true;
    }

    if (
      rangeFrom >= targetRangeFrom &&
      rangeFrom <= targetRangeTo &&
      rangeTo >= targetRangeFrom &&
      rangeTo <= targetRangeTo
    ) {
      return true;
    }
  }
  return false;
}

export const isDateIncluded = (
  dateToCheck: Date,
  startDate: Date,
  endDate?: Date
) => {
  if (!endDate) {
    return dateToCheck.getTime() === startDate.getTime();
  } else {
    return (
      dateToCheck.getTime() >= startDate.getTime() &&
      dateToCheck.getTime() <= endDate.getTime()
    );
  }
};

export function isDateInRangeForMonth(
  date1: Date,
  date2: Date | undefined,
  targetMonth: number,
  targetYear: number
) {
  const startTargetPeriod = new Date(
    Date.UTC(targetYear, targetMonth, 1, 0, 0, 0)
  );
  const endTargetPeriod = new Date(startTargetPeriod);
  endTargetPeriod.setMonth(endTargetPeriod.getMonth() + 1);
  endTargetPeriod.setMilliseconds(endTargetPeriod.getMilliseconds() - 1);

  if (!date2) {
    return isDateIncluded(date1, startTargetPeriod, endTargetPeriod);
  }

  return isRangeIntersectionExists(
    {
      from: startTargetPeriod,
      to: endTargetPeriod,
    },
    [
      {
        from: date1,
        to: date2,
      },
    ]
  );
}

// export function calculateDaysDifference(date1: Date, date2: Date) {
//   // Convert both dates to milliseconds
//   const date1Milliseconds = date1.getTime();
//   const date2Milliseconds = date2.getTime();

//   // Calculate the difference in milliseconds
//   const differenceMilliseconds = Math.abs(
//     date2Milliseconds - date1Milliseconds
//   );

//   // Convert the difference to days
//   const differenceDays = Math.ceil(
//     differenceMilliseconds / (1000 * 60 * 60 * 24)
//   );

//   return differenceDays + 1;
// }

// export function calculateWeeksDifference(startDate: Date, endDate: Date) {
//   endDate.setDate(endDate.getDate() + 1);

//   // Calculate the difference in milliseconds
//   const differenceMs = endDate.getTime() - startDate.getTime();
//   // Convert milliseconds to weeks (1 week = 7 days = 7 * 24 * 60 * 60 * 1000 milliseconds)
//   const weeksDifference = differenceMs / (1000 * 60 * 60 * 24 * 7);
//   const weeks = Math.floor(weeksDifference);

//   // Calculate remaining days
//   const remainingDaysMs = differenceMs % (1000 * 60 * 60 * 24 * 7);
//   const remainingDays = Math.ceil(remainingDaysMs / (1000 * 60 * 60 * 24));

//   // Construct the label
//   let label = "";
//   if (weeks > 0) {
//     label += weeks === 1 ? "1 week" : `${weeks} weeks`;
//     if (remainingDays > 0) {
//       label += " and ";
//     }
//   }

//   if (remainingDays > 0) {
//     label += remainingDays === 1 ? "1 day" : `${remainingDays} days`;
//   }

//   return { label, value: weeksDifference };
// }

// export function getDurationDifference(
//   startDate: Date,
//   endDate: Date,
//   breaks?: number
// ) {
//   return endDate.getTime() - startDate.getTime() - (breaks ?? 0) * 1000;
// }

// export const getTotalWorkingHours = (timings: any[]) => {
//   const validTimings = timings.filter((el) => el.startTime && el.endTime);
//   let total = 0;

//   for (const time of validTimings) {
//     // Split the time strings into hours and minutes
//     const [hours1, minutes1] = time.startTime?.split(":").map(Number) ?? [];
//     const [hours2, minutes2] = time.endTime?.split(":").map(Number) ?? [];

//     // Calculate the total minutes for each time
//     const totalMinutes1 = hours1 * 60 + minutes1;
//     let totalMinutes2 = hours2 * 60 + minutes2;

//     if (totalMinutes2 < totalMinutes1) {
//       totalMinutes2 = totalMinutes2 + 24 * 60;
//     }

//     // Calculate the absolute difference in minutes
//     const differenceInMinutes = Math.abs(
//       totalMinutes2 - totalMinutes1 - (time.breakTime ?? 0) / 60
//     );
//     total += differenceInMinutes;
//   }

//   // Convert the difference back to hours and minutes
//   const hoursDifference = Math.floor(total / 60);
//   const minutesDifference = total % 60;

//   // Return the formatted difference
//   return `${hoursDifference}h ${minutesDifference}m`;
// };

// export const convertSecondsToTime = (seconds: number) => {
//   // Convert the difference back to hours and minutes
//   const hoursDifference = Math.floor(seconds / 60);
//   const minutesDifference = seconds % 60;

//   // Return the formatted difference
//   return `${hoursDifference}h ${Math.floor(minutesDifference)}m`;
// };

// export function getTimeAgo(date: Date): string {
//   const currentDate = new Date();
//   const delta = currentDate.getTime() - date.getTime();

//   const days = Math.floor(delta / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((delta / 1000 / 60) % 60);

//   if (days > 0) {
//     return `${days}d ago`;
//   } else if (hours > 0) {
//     return `${hours}h ago`;
//   } else if (minutes > 0) {
//     return `${minutes}m ago`;
//   } else {
//     return "Now";
//   }
// }

// export function mergeContiguousAvailability(
//   availabilities: Availability[]
// ): IGroupedAvailability[] {
//   if (!availabilities || availabilities.length === 0) {
//     return [];
//   }

//   // Group availabilities by availabilityTime and status
//   const groupedAvailabilitiesMap: Map<
//     string,
//     Map<string, Availability[]>
//   > = new Map();
//   availabilities.forEach((availability) => {
//     const key = `${availability.status}`;
//     if (!groupedAvailabilitiesMap.has(key)) {
//       groupedAvailabilitiesMap.set(key, new Map());
//     }
//     const statusMap = groupedAvailabilitiesMap.get(key)!;
//     if (!statusMap.has(availability.property._id)) {
//       statusMap.set(availability.property._id, []);
//     }
//     statusMap.get(availability.property._id)?.push(availability);
//   });

//   // Merge contiguous availabilities for each availabilityTime and status group
//   const groupedAvailabilities: IGroupedAvailability[] = [];
//   groupedAvailabilitiesMap.forEach((statusMap) => {
//     statusMap.forEach((availabilitiesForProperty) => {
//       availabilitiesForProperty = availabilitiesForProperty.sort(
//         (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
//       );
//       let mergedAvailability: IGroupedAvailability | null = null;
//       availabilitiesForProperty.forEach((availability) => {
//         if (!mergedAvailability) {
//           // If it's the first availability, directly add it to groupedAvailabilities
//           mergedAvailability = {
//             _id: availability._id,
//             from: availability.date,
//             to: availability.date,
//             property: availability.property,
//             status: availability.status as EAvailabilityStatus,
//           };
//         } else {
//           const lastEndDate = new Date(mergedAvailability.to!);
//           lastEndDate.setDate(lastEndDate.getDate() + 1); // Increment last end date by one day
//           const currentDate = new Date(availability.date);
//           // Check if the current date is continuous with the last merged availability
//           if (
//             availability.status === mergedAvailability.status &&
//             currentDate.getTime() === lastEndDate.getTime()
//           ) {
//             // Merge the date ranges by updating the 'to' property of the last merged availability
//             mergedAvailability.to = availability.date;
//           } else {
//             // If the current date is not continuous, add the last merged availability and start a new one
//             groupedAvailabilities.push(mergedAvailability);
//             mergedAvailability = {
//               _id: availability._id,
//               from: availability.date,
//               to: availability.date,
//               property: availability.property,
//               status: availability.status as EAvailabilityStatus,
//             };
//           }
//         }
//       });
//       // Add the last merged availability after the loop
//       if (mergedAvailability) {
//         groupedAvailabilities.push(mergedAvailability);
//       }
//     });
//   });

//   return groupedAvailabilities;
// }

// export function convertTimeToUTC(time: string) {
//   const [hours, minutes] = time.split(":").map(Number);

//   // Create a new Date object with a specific date (e.g., 1970-01-01)
//   const localDate = new Date(1970, 0, 1, hours, minutes);

//   // Get the UTC hours and minutes
//   const utcHours = localDate.getUTCHours();
//   const utcMinutes = localDate.getUTCMinutes();

//   // Format the UTC time as "HH:mm"
//   const utcTime = `${utcHours < 10 ? "0" + utcHours : utcHours}:${
//     utcMinutes < 10 ? "0" + utcMinutes : utcMinutes
//   }`;

//   return utcTime;
// }

// export function convertTimeFromUTC(utcTime: string) {
//   // Extract hours and minutes from the UTC time string
//   const [hours, minutes] = utcTime.split(":").map(Number);

//   // Create a new Date object with current date but UTC hours and minutes
//   const localDate = new Date();
//   localDate.setUTCHours(hours);
//   localDate.setUTCMinutes(minutes);

//   // Get the local hours and minutes
//   const localHours = localDate.getHours();
//   const localMinutes = localDate.getMinutes();

//   // Format the local time as "HH:mm"
//   const localTime = `${localHours < 10 ? "0" + localHours : localHours}:${
//     localMinutes < 10 ? "0" + localMinutes : localMinutes
//   }`;

//   return localTime;
// }

// export function getRemainingDays(targetDate: string) {
//   const today = new Date().getTime();
//   const maxDate = new Date(targetDate).getTime();
//   const diffTime = maxDate - today;
//   // Convert milliseconds to days (24 * 60 * 60 * 1000)
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   return diffDays;
// }
