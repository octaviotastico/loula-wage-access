export const formatDateWithDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long", // long, short, or narrow
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};