export const sortStoreAnalyticsStatsCardsByDate = (
  data: {
    day: string;
    totalProfit?: number;
    totalAmount?: number;
    orders?: number;
  }[],
) => {
  return data.sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime(),
  );
};
