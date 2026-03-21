import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import ChartCard from "../components/ChartCard";
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

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>
        <StatsCard title="Total Users" value={data.totalUsers} />
        <StatsCard title="Active Users" value={data.activeUsers} />
        <StatsCard title="Revenue" value={data.revenue} />
      </div>

      <ChartCard data={data.chartData} />
    </div>
  );
};

export default Home;