import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const ChartCard = ({ data }: any) => {
  return (
    <LineChart width={400} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#8884d8" />
    </LineChart>
  );
};

export default ChartCard;