type Props = {
  title: string;
  value: number;
  trend?: string;
};

const StatsCard = ({ title, value, trend = "+12%" }: Props) => {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        minWidth: 180,
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <h4 style={{ color: "#64748b", marginBottom: 10 }}>{title}</h4>
      <h2 style={{ margin: 0 }}>{value}</h2>
      <p style={{ color: "green", marginTop: 8 }}>↑ {trend}</p>
    </div>
  );
};

export default StatsCard;