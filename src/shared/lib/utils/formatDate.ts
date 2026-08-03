export const formatDate = (timestamp: number | null) => {
  if (!timestamp) return "Скоро";
  const date = new Date(timestamp * 1000); // Unix → миллисекунды
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
};
