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

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Purchase Orders", icon: ShoppingCart },
  { name: "Medicines", icon: Pill },
  { name: "Sales / Billing", icon: Receipt },
  { name: "Inventory", icon: Package },
  { name: "Suppliers", icon: Truck },
  { name: "Reports", icon: BarChart3 },
  { name: "Profile", icon: User },
  { name: "Settings", icon: Settings }
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
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              href="#"
              key={item.name}
              className={`menu-item ${index === 0 ? "active" : ""}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </a>
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