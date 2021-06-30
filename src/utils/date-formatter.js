const dateFormat = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const timeFormat = {
  hour: "numeric",
  minute: "2-digit",
};
export const getDateAndTime = (milliseconds) => {
  const d = new Date(milliseconds);
  const date =
    d.toLocaleDateString("en", dateFormat) +
    " " +
    d.toLocaleTimeString("en", timeFormat);
  return date;
};

export const getDate = (milliseconds) => {
  const d = new Date(milliseconds);
  const date = d.toLocaleDateString("en", dateFormat);
  return date;
};
