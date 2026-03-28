import type { DashboardData } from "../types/dashboard";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    totalUsers: 1500,
    activeUsers: 1100,
    revenue: 75000,
    chartData: [
      { name: "Jan", users: 240 },
      { name: "Feb", users: 380 },
      { name: "Mar", users: 520 },
      { name: "Apr", users: 690 },
      { name: "May", users: 860 },
      { name: "Jun", users: 1040 },
    ],
    recentActivities: [
      {
        id: 1,
        user: "Sarah Ahmed",
        action: "Created new sales report",
        date: "28 Mar 2026",
        status: "Completed",
      },
      {
        id: 2,
        user: "Ali Raza",
        action: "Updated dashboard filters",
        date: "28 Mar 2026",
        status: "In Review",
      },
      {
        id: 3,
        user: "John Pierre",
        action: "Exported analytics summary",
        date: "27 Mar 2026",
        status: "Pending",
      },
      {
        id: 4,
        user: "Emma Lewis",
        action: "Added 24 new leads",
        date: "27 Mar 2026",
        status: "Completed",
      },
    ],
    topPerformers: [
      { name: "Sarah Ahmed", deals: 42, growth: "+18%" },
      { name: "Emma Lewis", deals: 35, growth: "+12%" },
      { name: "Ali Raza", deals: 29, growth: "+9%" },
    ],
  };
};