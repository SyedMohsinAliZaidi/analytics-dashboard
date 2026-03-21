type Props = {
  title: string;
  value: number;
};

const StatsCard = ({ title, value }: Props) => {
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatsCard;