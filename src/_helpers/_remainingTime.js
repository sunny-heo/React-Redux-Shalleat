import moment from "moment";
import "moment-precise-range-plugin";

const timeFormatter = time => time.slice(0, 2) + ":" + time.slice(2);
const addYearDateToHours = hours =>
  moment(moment().format(`YYYY-MM-DD ${hours}:00`));
const currentYearDateTime = () => moment().format("YYYY-MM-DD HH:mm:ss");
const calcDiff = (closeDay, openDay) => {
  console.log("closeDay");
  console.log(closeDay); // 1
  console.log("openDay");
  console.log(openDay); // 5
  // 5  1 => 2 (0 + 3) % 7 = 3
  // 5  1 => 2 (1 + 3) % 7 = 4
  // 5  1 => 2 (2 + 3) % 7 = 5
  // 5  1 => 2 (3 + 3) % 7 = 6
  // 5  1 => 2 (4 + 3) % 7 = 0
  // 5  1 => 2 (5 + 3) % 7 = 1
  // 5  1 => 2 (6 + 3) % 7 = 2
  if (closeDay === openDay) return 0;
  if (closeDay < openDay) return 1;
  if (closeDay > openDay) return closeDay - openDay;
};

export const _getTodayHours = ({
  notAvailable,
  immortal,
  isOpenToday,
  isOpenNow,
  todayHours,
  nextDayHours
}) => {
  if (notAvailable) return "Not available";
  if (immortal) return "Open 24 hours";
  const currentTime = moment().format("HHmm");
  const { open, close } = todayHours;
  const { open: nextOpen } = nextDayHours;
  let closeTime, openTime;

  if (isOpenToday) {
    if (isOpenNow) {
      const closeHours = timeFormatter(close.time);
      const diff = calcDiff(close.day, open.day); //close day >= open.day except close is 0 open is 6
      const yearDateHours = addYearDateToHours(closeHours);
      diff
        ? (closeTime = moment(yearDateHours).add(diff, "d"))
        : (closeTime = yearDateHours);
    } else {
      if (open.time >= currentTime) {
        // Will open later today
        const openhours = timeFormatter(open.time);
        openTime = addYearDateToHours(openhours);
      } else {
        // Already closed today
        const nextOpenHours = timeFormatter(nextOpen.time);
        console.log("nextOpenHours");
        console.log(nextOpenHours);
        // const diff = Math.abs(nextOpen.day - close.day);
        const diff = calcDiff(nextOpen.day, close.day);
        console.log("diff");
        console.log(diff);
        const yearDateHours = addYearDateToHours(nextOpenHours);
        diff
          ? (closeTime = moment(yearDateHours).add(diff, "d"))
          : (closeTime = yearDateHours);
      }
    }
  } else {
    const date = new Date();
    const today = date.getDay();
    const openhours = timeFormatter(nextOpen.time);
    const diff = calcDiff(today, nextOpen.day);
    const yearDateHours = addYearDateToHours(openhours);
    openTime = moment(yearDateHours).add(diff, "d");
  }
  return { openTime, closeTime };
};

export const _calcRemainingTime = ({ openTime = false, closeTime }) => {
  return openTime
    ? moment(currentYearDateTime()).preciseDiff(openTime)
    : moment(currentYearDateTime()).preciseDiff(closeTime);
};

export const _calcTest = ({ openTime = false, closeTime }) => {
  return openTime
    ? moment(currentYearDateTime()).preciseDiff(openTime)
    : moment(moment("20180928 19:20:50", "YYYYMMDD HH:mm:ss")).preciseDiff(
        closeTime
      );
};
