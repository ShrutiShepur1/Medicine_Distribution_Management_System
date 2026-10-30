import { Bell, ChevronDown, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="mobile-title">
        Medicine Distribution
      </div>

      <div className="navbar-right">
        <button className="notification">
          <Bell size={22} />
          <span className="notification-count">3</span>
        </button>

        <div className="profile">
          <UserCircle size={36} />
          <div>
            <h4>ABC Medicals</h4>
            <p>Retailer</p>
          </div>
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}