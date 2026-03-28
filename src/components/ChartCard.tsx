import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const ChartCard = ({ title, data }: any) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="font-semibold mb-4">{title}</h3>

    <LineChart width={400} height={200} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#6366f1" />
    </LineChart>
  </div>
);