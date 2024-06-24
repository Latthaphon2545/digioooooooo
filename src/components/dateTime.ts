export const ConvertTime = (time: any) => {
  const dateTime = new Date(time);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Months are zero-based
  const year = dateTime.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  const formattedTime = dateTime.toTimeString().split(" ")[0];

  const calculateTimeWithCurrent = new Date().getTime() - dateTime.getTime();
  const calculateTime = Math.floor(
    calculateTimeWithCurrent / (1000 * 60 * 60 * 24)
  );

  const displayTime = `${formattedTime} (${
    calculateTime === 0 ? "Today" : `${calculateTime} days ago`
  })`;

  return { formattedDate, displayTime };
};

export const DateFromObjectId = function (objectId: string) {
  const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
