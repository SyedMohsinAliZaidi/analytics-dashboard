import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { LineChartCard, BarChartCard } from "../components/ChartCard";
import { fetchDashboardData } from "../services/api";

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetchDashboardData();
      setData(res);
    };
    loadData();
  }, []);

  if (!data)
    return (
      <div style={{ padding: 40 }}>
        <h2>Loading dashboard...</h2>
      </div>
    );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 220,
          background: "#1e293b",
          color: "white",
          padding: 20,
        }}
      >
        <h2>Dedale</h2>
        <p style={{ marginTop: 20 }}>Dashboard</p>
        <p>Analytics</p>
        <p>Reports</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 30, background: "#f1f5f9" }}>
        <h1 style={{ marginBottom: 20 }}>Analytics Dashboard</h1>

        {/* Filter */}
        <div style={{ marginBottom: 20 }}>
          <select style={{ padding: 8, borderRadius: 8 }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 20 }}>
          <StatsCard title="Total Users" value={data.totalUsers} />
          <StatsCard title="Active Users" value={data.activeUsers} />
          <StatsCard title="Revenue" value={data.revenue} />
        </div>

        {/* Charts */}
        <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
          <LineChartCard data={data.chartData} />
          <BarChartCard data={data.chartData} />
        </div>
      </div>
    </div>
  );
};

export default Home;