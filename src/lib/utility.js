export const formatDate = (date) => {
  const formatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  };
  const dateFormatter = new Intl.DateTimeFormat("ja-JP", formatOptions);
  return dateFormatter.format(date);
};

export const formatDateTime = (date) => {
  const formatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Tokyo",
  };
  const dateFormatter = new Intl.DateTimeFormat("ja-JP", formatOptions);
  return dateFormatter.format(date);
};
