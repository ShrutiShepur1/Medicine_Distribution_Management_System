
import { Routes, Route } from "react-router-dom";

import RetailerDashboard from "./pages/RetailerDashboard";
import Medicines from "./pages/Admin/Medicines";
import Orders from "./pages/Admin/Orders";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RetailerDashboard />} />
      <Route path="/medicines" element={<Medicines />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
