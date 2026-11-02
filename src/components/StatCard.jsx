
export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  action
}) {
  return (
    <div className={`stat-card ${color || "blue"}`}>

      <div className="stat-icon">
        {Icon && <Icon size={27} />}
      </div>

      <div className="stat-info">
        <p>{title}</p>

        <h2>
          {value ?? 0}
        </h2>

        <span>
          {action} →
        </span>
      </div>

    </div>
  );
}
