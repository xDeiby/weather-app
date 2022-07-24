export const dateFormat = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

export const dateTime = (date: Date) =>
  date
    .toLocaleDateString("es-CL", {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    })
    .split(",")[1];
