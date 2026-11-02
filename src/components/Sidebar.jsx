
import {
  LayoutDashboard,
  ShoppingCart,
  Pill,
  Receipt,
  Package,
  Truck,
  BarChart3,
  User,
  Settings,
  PlusCircle
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Purchase Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Medicines", icon: Pill, path: "/medicines" },
  { name: "Sales / Billing", icon: Receipt, path: "/billing" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "Suppliers", icon: Truck, path: "/suppliers" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Settings", icon: Settings, path: "/settings" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <PlusCircle size={32} />
        </div>
        <div>
          <h3>Medicine Distribution</h3>
          <p>Retailer Portal</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/"}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Pill size={55} />
        <h3>Better Medicines</h3>
        <p>Healthier Tomorrow</p>
      </div>
    </aside>
  );
}
