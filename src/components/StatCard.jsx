export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  action
}) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <Icon size={27} />
      </div>

      <div className="stat-info">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{action} →</span>
      </div>
    </div>
  );
}