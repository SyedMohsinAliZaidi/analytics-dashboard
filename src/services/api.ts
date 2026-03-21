export const fetchDashboardData = async () => {
  return {
    totalUsers: 1200,
    activeUsers: 870,
    revenue: 54000,
    chartData: [
      { name: "Jan", users: 400 },
      { name: "Feb", users: 700 },
      { name: "Mar", users: 1200 },
    ],
  };
};