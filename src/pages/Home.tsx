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

type ThemeMode = "light" | "dark";
type DateRange = "7d" | "30d" | "6m";

const Home = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchDashboardData(dateRange);
        setData(res);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    loadData();
  }, [navigate, dateRange]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const filteredActivities = useMemo(() => {
    if (!data) return [];

    return data.recentActivities.filter((item) => {
      const term = searchTerm.toLowerCase();
      return (
        item.user.toLowerCase().includes(term) ||
        item.action.toLowerCase().includes(term) ||
        item.status.toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm]);

  const pieData = useMemo(() => {
    if (!data) return [];

    const inactiveUsers = Math.max(data.totalUsers - data.activeUsers, 0);

    return [
      { name: "Active", value: data.activeUsers },
      { name: "Inactive", value: inactiveUsers },
    ];
  }, [data]);

  const exportReport = () => {
    if (!data) return;

    const rows = [
      ["Metric", "Value"],
      ["Total Users", data.totalUsers.toString()],
      ["Active Users", data.activeUsers.toString()],
      ["Revenue", data.revenue.toString()],
      [],
      ["Recent Activities"],
      ["User", "Action", "Date", "Status"],
      ...filteredActivities.map((item) => [
        item.user,
        item.action,
        item.date,
        item.status,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${cell ?? ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `analytics-report-${dateRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-6 text-slate-700 text-lg font-medium">
          Loading dashboard...
        </div>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="flex min-h-screen">
        <aside
          className={`w-64 px-6 py-8 hidden md:block ${
            isDark ? "bg-slate-900 text-white" : "bg-slate-950 text-white"
          }`}
        >
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
          <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
            <div>
              <p className={`${isDark ? "text-slate-400" : "text-slate-500"} text-sm`}>
                Welcome back
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                Analytics Dashboard
              </h1>
              <p className={`${isDark ? "text-slate-400" : "text-slate-500"} mt-2`}>
                Track performance, user activity, and revenue in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRange)}
                className={`px-4 py-2 rounded-xl border shadow-sm outline-none ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="6m">Last 6 Months</option>
              </select>

              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-xl shadow-sm transition ${
                  isDark
                    ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={exportReport}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-sm transition"
              >
                Export Report
              </button>

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
              isDark={isDark}
            />
            <StatCard
              title="Active Users"
              value={data.activeUsers.toLocaleString()}
              trend="+8.7%"
              trendPositive
              isDark={isDark}
            />
            <StatCard
              title="Revenue"
              value={`$${data.revenue.toLocaleString()}`}
              trend="+12.4%"
              trendPositive
              isDark={isDark}
            />
            <StatCard
              title="Conversion Rate"
              value={dateRange === "7d" ? "4.2%" : dateRange === "30d" ? "6.8%" : "8.4%"}
              trend="-0.8%"
              trendPositive={false}
              isDark={isDark}
            />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <Panel isDark={isDark} className="xl:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold">User Growth</h3>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                    <XAxis dataKey="name" stroke={isDark ? "#cbd5e1" : "#475569"} />
                    <YAxis stroke={isDark ? "#cbd5e1" : "#475569"} />
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
            </Panel>

            <Panel isDark={isDark}>
              <div className="mb-5">
                <h3 className="text-lg font-semibold">User Distribution</h3>
                <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
            </Panel>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <Panel isDark={isDark} className="xl:col-span-2">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg font-semibold">Monthly Activity</h3>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                    <XAxis dataKey="name" stroke={isDark ? "#cbd5e1" : "#475569"} />
                    <YAxis stroke={isDark ? "#cbd5e1" : "#475569"} />
                    <Tooltip />
                    <Bar dataKey="users" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Panel>

            <Panel isDark={isDark}>
              <h3 className="text-lg font-semibold mb-1">Top Performers</h3>
              <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Best contributors this month
              </p>

              <div className="space-y-4">
                {data.topPerformers.map((person, index) => (
                  <div
                    key={person.name}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 border ${
                      isDark ? "border-slate-700" : "border-slate-200"
                    }`}
                  >
                    <div>
                      <p className="font-medium">
                        #{index + 1} {person.name}
                      </p>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {person.deals} deals closed
                      </p>
                    </div>
                    <span className="text-emerald-600 font-semibold">
                      {person.growth}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Panel isDark={isDark} className="xl:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    Latest updates from the platform
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`px-4 py-2 rounded-xl border outline-none ${
                    isDark
                      ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                      : "bg-white border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className={`text-left border-b ${
                        isDark ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-200"
                      }`}
                    >
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Action</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-b ${isDark ? "border-slate-800" : "border-slate-100"}`}
                      >
                        <td className="py-4 font-medium">{item.user}</td>
                        <td className={`py-4 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                          {item.action}
                        </td>
                        <td className={`py-4 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {item.date}
                        </td>
                        <td className="py-4">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))}
                    {filteredActivities.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className={`py-6 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          No matching activity found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel isDark={isDark}>
              <h3 className="text-lg font-semibold mb-1">Goals Overview</h3>
              <p className={`text-sm mb-5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Current KPI completion progress
              </p>

              <ProgressItem label="Monthly Revenue" value={78} />
              <ProgressItem label="Lead Conversion" value={64} />
              <ProgressItem label="User Activation" value={86} />
              <ProgressItem label="Report Completion" value={58} />
            </Panel>
          </section>
        </main>
      </div>
    </div>
  );
};

const Panel = ({
  children,
  className = "",
  isDark,
}: {
  children: React.ReactNode;
  className?: string;
  isDark: boolean;
}) => (
  <div
    className={`rounded-2xl shadow-sm border p-5 ${
      isDark
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-slate-200"
    } ${className}`}
  >
    {children}
  </div>
);

type StatCardProps = {
  title: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  isDark: boolean;
};

const StatCard = ({
  title,
  value,
  trend,
  trendPositive,
  isDark,
}: StatCardProps) => (
  <div
    className={`rounded-2xl shadow-sm border p-5 hover:shadow-md transition ${
      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}
  >
    <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{title}</p>
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
    <span className="text-slate-600 dark:text-slate-300">{label}</span>
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