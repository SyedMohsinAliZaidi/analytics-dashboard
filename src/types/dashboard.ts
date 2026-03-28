export interface ChartData {
  name: string;
  users: number;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  date: string;
  status: "Completed" | "Pending" | "In Review";
}

export interface PerformerItem {
  name: string;
  deals: number;
  growth: string;
}

export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  chartData: ChartData[];
  recentActivities: ActivityItem[];
  topPerformers: PerformerItem[];
}