import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  ShoppingCart, Pill, IndianRupee, Package, AlertTriangle,
  Calendar, ArrowRight, Zap, BarChart3,
} from "lucide-react";
import { salesTrend, categories, recentOrders, topMedicines } from "../data/mockData";

const StatCard = ({ icon: Icon, label, value, link, to, color }) => (
  <div className={`stat-card ${color}`}>
    <div className="stat-icon"><Icon size={28} /></div>
    <div>
      <p>{label}</p>
      <h2>{value}</h2>
      <Link to={to}>{link} <ArrowRight size={14} /></Link>
    </div>
  </div>
);

const AlertCard = ({ type, title, text, count, to }) => (
  <div className={`alert-card ${type}`}>
    <div className="alert-head">
      <AlertTriangle size={26} />
      <h3>{title}</h3>
      <span className="count">{count}</span>
    </div>
    <p>{text}</p>
    <Link to={to}>View Details <ArrowRight size={14} /></Link>
  </div>
);

export default function Dashboard() {
  return (
    <>
      <div className="welcome">
        <div>
          <h1 className="page-title">Welcome, Retailer!</h1>
          <p className="muted">Here's what's happening with your medicine store today.</p>
        </div>
        <div className="date-box">
          <Calendar size={22} />
          <div><small>Today</small><strong>30 Oct 2026</strong></div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid-4">
        <StatCard icon={ShoppingCart} label="Total Purchase Orders" value="12" link="View Orders" to="/purchase-orders" color="blue" />
        <StatCard icon={Pill} label="Total Medicines" value="156" link="View Medicines" to="/medicines" color="green" />
        <StatCard icon={IndianRupee} label="Total Sales (Today)" value="₹ 18,450" link="View Sales Report" to="/reports" color="purple" />
        <StatCard icon={Package} label="Low Stock Items" value="8" link="View Inventory" to="/inventory" color="orange" />
      </div>

      {/* Charts */}
      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Sales Trend</h3>
            <select><option>Last 7 Days</option><option>Last 30 Days</option></select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesTrend}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f80ed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2f80ed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e9f0" />
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`} />
              <Area type="linear" dataKey="sales" stroke="#2f80ed" strokeWidth={2} fill="url(#g)" dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-head"><h3>Medicine Category Distribution</h3></div>
          <div className="pie-wrap">
            <div className="pie-box">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={categories} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={1}>
                    {categories.map((c) => <Cell key={c.name} fill={c.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center"><strong>156</strong><small>Total Medicines</small></div>
            </div>
            <ul className="legend">
              {categories.map((c) => (
                <li key={c.name}>
                  <span className="dot" style={{ background: c.color }} />
                  {c.name}<b>{c.value}%</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Alerts + Quick actions */}
      <div className="grid-3">
        <AlertCard type="red" title="Expiring Soon" count={3} text="3 medicines are expiring within 30 days." to="/inventory" />
        <AlertCard type="yellow" title="Low Stock Alert" count={5} text="5 medicines are below minimum stock level." to="/inventory" />
        <div className="card quick">
          <h3><Zap size={18} /> Quick Actions</h3>
          <div className="quick-grid">
            <Link to="/purchase-orders" className="qbtn"><ShoppingCart size={18} /> Place Purchase Order</Link>
            <Link to="/medicines" className="qbtn"><Pill size={18} /> Add New Medicine</Link>
            <Link to="/reports" className="qbtn"><BarChart3 size={18} /> View Sales Report</Link>
            <Link to="/inventory" className="qbtn"><Package size={18} /> Check Inventory</Link>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <h3>Recent Orders</h3>
            <Link to="/purchase-orders">View All <ArrowRight size={14} /></Link>
          </div>
          <table>
            <thead><tr><th>Order ID</th><th>Supplier</th><th>Date</th><th>Status</th><th>Total Amount</th></tr></thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{o.supplier}</td><td>{o.date}</td>
                  <td><span className={`status ${o.status.toLowerCase()}`}>{o.status}</span></td>
                  <td>₹ {o.amount.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Top Selling Medicines</h3>
            <Link to="/medicines">View All <ArrowRight size={14} /></Link>
          </div>
          <table>
            <thead><tr><th>Rank</th><th>Medicine Name</th><th>Category</th><th>Qty Sold</th></tr></thead>
            <tbody>
              {topMedicines.map((m, i) => (
                <tr key={m.name}>
                  <td><span className="rank">{i + 1}</span></td>
                  <td>{m.name}</td><td>{m.category}</td><td>{m.sold.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}