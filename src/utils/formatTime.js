export default function formatTime(timeStr) {
  const timeObj = new Date(timeStr);

  return `${timeObj.getFullYear()}-${
    timeObj.getMonth() + 1
  }-${timeObj.getDate()} ${(timeObj.getHours() + "").padStart(2, 0)}:${(
    timeObj.getMinutes() + ""
  ).padStart(2, 0)}:${(timeObj.getSeconds() + "").padStart(2, 0)}`;
}
