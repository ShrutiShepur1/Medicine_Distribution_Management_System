import { Bell, UserCircle, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="bell">
        <Bell size={22} />
        <span className="badge">3</span>
      </div>
      <div className="profile">
        <UserCircle size={36} />
        <div>
          <strong>ABC Medicals</strong>
          <small>Retailer</small>
        </div>
        <ChevronDown size={16} />
      </div>
    </header>
  );
}