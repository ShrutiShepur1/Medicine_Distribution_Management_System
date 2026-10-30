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

const orders = [
  ["PO-1001", "HealthPlus Pharma", "30 Oct 2026", "Delivered", "₹8,200"],
  ["PO-1002", "MedCare Distributors", "29 Oct 2026", "Processing", "₹5,600"],
  ["PO-1003", "LifeLine Distributors", "28 Oct 2026", "Shipped", "₹12,400"],
  ["PO-1004", "CareWell Medicals", "27 Oct 2026", "Delivered", "₹7,850"],
  ["PO-1005", "PharmaHub", "26 Oct 2026", "Pending", "₹6,300"]
];

const medicines = [
  ["1", "Paracetamol 500mg", "Pain Relief", "1,250"],
  ["2", "Amoxicillin 500mg", "Antibiotics", "980"],
  ["3", "Vitamin C 1000mg", "Vitamins", "860"],
  ["4", "Metformin 500mg", "Diabetes Care", "720"],
  ["5", "Omeprazole 20mg", "Acidity", "650"]
];

export default function RetailerDashboard() {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="dashboard-content">

          <div className="welcome-section">
            <div>
              <h1>Welcome, Retailer!</h1>
              <p>Here's what's happening with your medicine store today.</p>
            </div>

            <div className="today-date">
              📅 Today <br />
              30 Oct 2026
            </div>
          </div>

          {/* Dashboard Cards */}

          <div className="stats-grid">

            <StatCard
              title="Total Purchase Orders"
              value="12"
              icon={ShoppingCart}
              color="blue"
              action="View Orders"
            />

            <StatCard
              title="Total Medicines"
              value="156"
              icon={Pill}
              color="green"
              action="View Medicines"
            />

            <StatCard
              title="Total Sales (Today)"
              value="₹18,450"
              icon={IndianRupee}
              color="purple"
              action="View Sales Report"
            />

            <StatCard
              title="Low Stock Items"
              value="8"
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
                <p>3 medicines are expiring within 30 days.</p>
                <a href="#">View Details →</a>
              </div>
            </div>

            <div className="alert-card stock">
              <Package size={30} />
              <div>
                <h3>Low Stock Alert</h3>
                <p>5 medicines are below minimum stock level.</p>
                <a href="#">View Details →</a>
              </div>
            </div>

            <div className="quick-actions">
              <h3>⚡ Quick Actions</h3>

              <div className="action-buttons">
                <button><ShoppingCart size={18} /> Place Purchase Order</button>
                <button><Plus size={18} /> Add New Medicine</button>
                <button><BarChart3 size={18} /> View Sales Report</button>
                <button><Eye size={18} /> Check Inventory</button>
              </div>
            </div>

          </div>

          {/* Tables */}

          <div className="tables-grid">

            <div className="table-card">
              <div className="table-heading">
                <h3><FileText size={20} /> Recent Orders</h3>
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
                    {orders.map((order) => (
                      <tr key={order[0]}>
                        {order.map((value, index) => (
                          <td key={index}>
                            {index === 3 ? (
                              <span className={`status ${value.toLowerCase()}`}>
                                {value}
                              </span>
                            ) : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-card">
              <div className="table-heading">
                <h3><Pill size={20} /> Top Selling Medicines</h3>
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
                    {medicines.map((medicine) => (
                      <tr key={medicine[0]}>
                        {medicine.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <footer className="dashboard-footer">
            © 2026 Medicine Distribution Management System
            <br />
            Retailer Portal | All Rights Reserved
          </footer>

        </section>
      </main>
    </div>
  );
}