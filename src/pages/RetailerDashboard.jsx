
import {
  ShoppingCart,
  Pill,
  IndianRupee,
  Package,
  AlertTriangle,
  FileText,
  Plus,
  BarChart3,
  Eye
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";
import {
  recentOrders,
  topMedicines,
  dashboardStats
} from "../data/mockData";

export default function RetailerDashboard() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="dashboard-content">

          {/* Welcome Section */}
          <div className="welcome-section">
            <div>
              <h1>Welcome, Retailer!</h1>
              <p>
                Here's what's happening with your medicine store today.
              </p>
            </div>

            <div className="today-date">
              📅 Today <br />
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}
            </div>
          </div>

          {/* Dashboard Cards */}
         
{/* Dashboard Cards */}
<div className="stats-grid">

  <StatCard
    title="Total Purchase Orders"
    value={dashboardStats.totalOrders}
    icon={ShoppingCart}
    color="blue"
    action="View Orders"
  />

  <StatCard
    title="Total Medicines"
    value={dashboardStats.totalMedicines}
    icon={Pill}
    color="green"
    action="View Medicines"
  />

  <StatCard
    title="Total Sales (Today)"
    value={`₹${dashboardStats.todaySales.toLocaleString("en-IN")}`}
    icon={IndianRupee}
    color="purple"
    action="View Sales Report"
  />

  <StatCard
    title="Low Stock Items"
    value={dashboardStats.lowStockItems}
    icon={Package}
    color="orange"
    action="View Inventory"
  />

</div>


          {/* Charts */}
          <Charts />

          {/* Alerts */}
          <div className="alerts-grid">

            <div className="alert-card expiry">
              <AlertTriangle size={30} />

              <div>
                <h3>Expiring Soon</h3>
                <p>
                  3 medicines are expiring within 30 days.
                </p>
                <a href="#">View Details →</a>
              </div>
            </div>

            <div className="alert-card stock">
              <Package size={30} />

              <div>
                <h3>Low Stock Alert</h3>
                <p>
                  5 medicines are below minimum stock level.
                </p>
                <a href="#">View Details →</a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>⚡ Quick Actions</h3>

              <div className="action-buttons">

                <button>
                  <ShoppingCart size={18} />
                  Place Purchase Order
                </button>

                <button>
                  <Plus size={18} />
                  Add New Medicine
                </button>

                <button>
                  <BarChart3 size={18} />
                  View Sales Report
                </button>

                <button>
                  <Eye size={18} />
                  Check Inventory
                </button>

              </div>
            </div>

          </div>

          {/* Tables */}
          <div className="tables-grid">

            {/* Recent Orders Table */}
            <div className="table-card">

              <div className="table-heading">
                <h3>
                  <FileText size={20} />
                  Recent Orders
                </h3>

                <a href="#">View All →</a>
              </div>

              <div className="table-scroll">
                <table>

                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Supplier</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.supplier}</td>
                        <td>{order.date}</td>

                        <td>
                          <span
                            className={`status ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td>
                          ₹{order.amount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}

                    {recentOrders.length === 0 && (
                      <tr>
                        <td colSpan="5">
                          No recent orders available.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </div>

            {/* Top Selling Medicines Table */}
            <div className="table-card">

              <div className="table-heading">
                <h3>
                  <Pill size={20} />
                  Top Selling Medicines
                </h3>

                <a href="#">View All →</a>
              </div>

              <div className="table-scroll">
                <table>

                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Medicine Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    {topMedicines.map((medicine, index) => (
                      <tr key={medicine.name}>
                        <td>{index + 1}</td>
                        <td>{medicine.name}</td>
                        <td>{medicine.category}</td>

                        <td>
                          {medicine.sold.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}

                    {topMedicines.length === 0 && (
                      <tr>
                        <td colSpan="4">
                          No medicine data available.
                        </td>
                      </tr>
                    )}
                  </tbody>

                </table>
              </div>
            </div>

          </div>

          {/* Footer */}
          <footer className="dashboard-footer">
            © {new Date().getFullYear()} Medicine Distribution Management System
            <br />
            Retailer Portal | All Rights Reserved
          </footer>

        </section>
      </main>
    </div>
  );
}
