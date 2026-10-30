import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const salesData = [
  { day: "24 Oct", sales: 6000 },
  { day: "25 Oct", sales: 10000 },
  { day: "26 Oct", sales: 7500 },
  { day: "27 Oct", sales: 11000 },
  { day: "28 Oct", sales: 18500 },
  { day: "29 Oct", sales: 13000 },
  { day: "30 Oct", sales: 15800 }
];

const categoryData = [
  { name: "Pain Relief", value: 28 },
  { name: "Antibiotics", value: 20 },
  { name: "Vitamins", value: 15 },
  { name: "Diabetes Care", value: 12 },
  { name: "Respiratory", value: 10 },
  { name: "Others", value: 15 }
];

const COLORS = [
  "#3182f6",
  "#36c77a",
  "#ffc52e",
  "#8057f5",
  "#13b8c9",
  "#f16b9b"
];

export default function Charts() {
  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h3>📈 Sales Trend</h3>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2878ed"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>💊 Medicine Category Distribution</h3>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={95}
              innerRadius={55}
              paddingAngle={3}
            >
              {categoryData.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}