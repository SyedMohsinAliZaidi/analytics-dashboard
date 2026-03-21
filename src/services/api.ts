export const fetchDashboardData = async () => {
  await new Promise((res) => setTimeout(res, 1000)); // simulate API delay

  return {
    totalUsers: 1200,
    activeUsers: 870,
    revenue: 54000,
    chartData: [
      { name: "Jan", users: 400 },
      { name: "Feb", users: 700 },
      { name: "Mar", users: 1200 },
      { name: "Apr", users: 900 },
      { name: "May", users: 1400 },
    ],
  };
};