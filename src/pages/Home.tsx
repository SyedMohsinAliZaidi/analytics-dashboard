import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { DashboardData } from "../types/dashboard";
import { fetchDashboardData } from "../services/api";

const Home = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDashboardData();
        setData(res);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const pieData = useMemo(() => {
    if (!data) return [];

    const inactiveUsers = Math.max(data.totalUsers - data.activeUsers, 0);

    return [
      { name: "Active", value: data.activeUsers },
      { name: "Inactive", value: inactiveUsers },
    ];
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-6 text-slate-700 text-lg font-medium">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-slate-950 text-white px-6 py-8 hidden md:block">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Dedale</h2>
            <p className="text-slate-400 text-sm mt-2">
              Intelligence Dashboard
            </p>
          </div>

          <nav className="space-y-3">
            <div className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded-xl px-4 py-3 font-medium">
              Dashboard
            </div>
            <div className="text-slate-300 hover:text-white cursor-pointer rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Analytics
            </div>
            <div className="text-slate-300 hover:text-white cursor-pointer rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Reports
            </div>
            <div className="text-slate-300 hover:text-white cursor-pointer rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Customers
            </div>
            <div className="text-slate-300 hover:text-white cursor-pointer rounded-xl px-4 py-3 hover:bg-slate-800 transition">
              Settings
            </div>
          </nav>

          <div className="mt-12 rounded-2xl bg-slate-900 border border-slate-800 p-4">
            <p className="text-sm text-slate-400">Current Role</p>
            <p className="mt-1 font-semibold">Admin</p>
            <p className="text-xs text-slate-500 mt-2">
              Demo user with dashboard access
            </p>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <p className="text-sm text-slate-500">Welcome back</p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                Analytics Dashboard
              </h1>
              <p className="text-slate-500 mt-2">
                Track performance, user activity, and revenue in one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select className="px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-sm outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-sm transition"
              >
                Logout
              </button>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatCard
              title="Total Users"
              value={data.totalUsers.toLocaleString()}
              trend="+14.2%"
              trendPositive
            />
            <StatCard
              title="Active Users"
              value={data.activeUsers.toLocaleString()}
              trend="+8.7%"
              trendPositive
            />
            <StatCard
              title="Revenue"
              value={`$${data.revenue.toLocaleString()}`}
              trend="+12.4%"
              trendPositive
            />
            <StatCard
              title="Conversion Rate"
              value="6.8%"
              trend="-0.8%"
              trendPositive={false}
            />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold">User Growth</h3>
                  <p className="text-sm text-slate-500">
                    Monthly trend of platform users
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                  Growth
                </span>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="mb-5">
                <h3 className="text-lg font-semibold">User Distribution</h3>
                <p className="text-sm text-slate-500">
                  Active vs inactive users
                </p>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#4f46e5" />
                      <Cell fill="#cbd5e1" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <LegendItem color="bg-indigo-600" label="Active Users" />
                <LegendItem color="bg-slate-300" label="Inactive Users" />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold">Monthly Activity</h3>
                  <p className="text-sm text-slate-500">
                    Comparison of monthly usage activity
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                  Stable
                </span>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold mb-1">Top Performers</h3>
              <p className="text-sm text-slate-500 mb-5">
                Best contributors this month
              </p>

              <div className="space-y-4">
                {data.topPerformers.map((person, index) => (
                  <div
                    key={person.name}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium">
                        #{index + 1} {person.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {person.deals} deals closed
                      </p>
                    </div>
                    <span className="text-emerald-600 font-semibold">
                      {person.growth}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <p className="text-sm text-slate-500">
                    Latest updates from the platform
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Action</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentActivities.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-4 font-medium">{item.user}</td>
                        <td className="py-4 text-slate-600">{item.action}</td>
                        <td className="py-4 text-slate-500">{item.date}</td>
                        <td className="py-4">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h3 className="text-lg font-semibold mb-1">Goals Overview</h3>
              <p className="text-sm text-slate-500 mb-5">
                Current KPI completion progress
              </p>

              <ProgressItem label="Monthly Revenue" value={78} />
              <ProgressItem label="Lead Conversion" value={64} />
              <ProgressItem label="User Activation" value={86} />
              <ProgressItem label="Report Completion" value={58} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  trendPositive: boolean;
};

const StatCard = ({
  title,
  value,
  trend,
  trendPositive,
}: StatCardProps) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
    <p
      className={`text-sm mt-3 font-medium ${
        trendPositive ? "text-emerald-600" : "text-rose-500"
      }`}
    >
      {trendPositive ? "▲" : "▼"} {trend}
    </p>
  </div>
);

const LegendItem = ({
  color,
  label,
}: {
  color: string;
  label: string;
}) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-full ${color}`}></span>
    <span className="text-slate-600">{label}</span>
  </div>
);

const StatusBadge = ({
  status,
}: {
  status: "Completed" | "Pending" | "In Review";
}) => {
  const styles: Record<string, string> = {
    Completed: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    "In Review": "bg-indigo-100 text-indigo-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

const ProgressItem = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="mb-5 last:mb-0">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium">{label}</p>
      <span className="text-sm text-slate-500">{value}%</span>
    </div>
    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-indigo-600 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default Home;