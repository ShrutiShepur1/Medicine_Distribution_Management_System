
import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Pill,
  Save,
  X
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const initialMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Pain Relief", price: 25, stock: 150, manufacturer: "ABC Pharma" },
  { id: 2, name: "Amoxicillin 500mg", category: "Antibiotics", price: 85, stock: 80, manufacturer: "HealthCare Ltd" },
  { id: 3, name: "Vitamin C 1000mg", category: "Vitamins", price: 120, stock: 12, manufacturer: "Wellness Pharma" },
  { id: 4, name: "Ibuprofen 400mg", category: "Pain Relief", price: 35, stock: 200, manufacturer: "MediPlus" },
  { id: 5, name: "Cetirizine 10mg", category: "Allergy", price: 45, stock: 75, manufacturer: "HealthCare Ltd" }
];

const emptyForm = {
  name: "",
  category: "",
  price: "",
  stock: "",
  manufacturer: ""
};

export default function Medicines() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.category || form.price === "" || form.stock === "") {
      alert("Please fill all required fields");
      return;
    }

    if (Number(form.price) < 0 || Number(form.stock) < 0) {
      alert("Price and stock cannot be negative");
      return;
    }

    if (editingId !== null) {
      setMedicines((previous) =>
        previous.map((medicine) =>
          medicine.id === editingId
            ? { ...form, id: editingId, price: Number(form.price), stock: Number(form.stock) }
            : medicine
        )
      );
    } else {
      setMedicines((previous) => [
        ...previous,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          stock: Number(form.stock)
        }
      ]);
    }

    resetForm();
  };

  const handleEdit = (medicine) => {
    setForm({
      name: medicine.name,
      category: medicine.category,
      price: medicine.price,
      stock: medicine.stock,
      manufacturer: medicine.manufacturer
    });
    setEditingId(medicine.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines((previous) =>
        previous.filter((medicine) => medicine.id !== id)
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <section className="medicine-page">

          {/* Page Heading */}
          <div className="medicine-page-heading">
            <div className="medicine-title">
              <Pill size={42} />
              <div>
                <h1>Medicine Management</h1>
                <p>Manage your medicines and inventory</p>
              </div>
            </div>

            <button
              className="add-medicine-btn"
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(!showForm);
              }}
            >
              <Plus size={20} /> Add Medicine
            </button>
          </div>

          {/* Add Medicine Form */}
          {showForm && (
            <div className="medicine-form-card">
              <div className="medicine-form-heading">
                <Plus size={22} />
                <h3>{editingId !== null ? "Edit Medicine" : "Add New Medicine"}</h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="medicine-form-grid">

                  <div className="medicine-field">
                    <label>Medicine Name <span>*</span></label>
                    <input
                      name="name"
                      placeholder="Enter medicine name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="medicine-field">
                    <label>Category <span>*</span></label>
                    <select name="category" value={form.category} onChange={handleChange} required>
                      <option value="">Select category</option>
                      <option value="Pain Relief">Pain Relief</option>
                      <option value="Antibiotics">Antibiotics</option>
                      <option value="Vitamins">Vitamins</option>
                      <option value="Diabetes Care">Diabetes Care</option>
                      <option value="Allergy">Allergy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="medicine-field">
                    <label>Price <span>*</span></label>
                    <input
                      type="number"
                      min="0"
                      name="price"
                      placeholder="Enter price"
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="medicine-field">
                    <label>Stock Quantity <span>*</span></label>
                    <input
                      type="number"
                      min="0"
                      name="stock"
                      placeholder="Enter stock quantity"
                      value={form.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="medicine-field">
                    <label>Manufacturer</label>
                    <input
                      name="manufacturer"
                      placeholder="Enter manufacturer"
                      value={form.manufacturer}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="medicine-form-actions">
                  <button type="submit" className="save-medicine-btn">
                    <Save size={18} />
                    {editingId !== null ? "Update Medicine" : "Save Medicine"}
                  </button>

                  <button type="button" className="cancel-medicine-btn" onClick={resetForm}>
                    <X size={18} /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Medicine Table */}
          <div className="medicine-table-card">
            <div className="medicine-toolbar">
              <h3><Pill size={22} /> All Medicines ({medicines.length})</h3>

              <div className="medicine-search">
                <Search size={19} />
                <input
                  placeholder="Search medicine..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="medicine-table-scroll">
              <table className="medicine-table">
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Manufacturer</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMedicines.map((medicine) => (
                    <tr key={medicine.id}>
                      <td>
                        <div className="medicine-name-cell">
                          <span className="medicine-pill-icon"><Pill size={23} /></span>
                          {medicine.name}
                        </div>
                      </td>
                      <td><span className="category-badge">{medicine.category}</span></td>
                      <td>₹{medicine.price}</td>
                      <td>
                        <span className={`stock-badge ${medicine.stock <= 20 ? "low-stock" : ""}`}>
                          {medicine.stock}
                        </span>
                      </td>
                      <td>{medicine.manufacturer || "-"}</td>
                      <td>
                        <div className="medicine-action-buttons">
                          <button
                            className="edit-medicine-btn"
                            title="Edit Medicine"
                            onClick={() => handleEdit(medicine)}
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            className="delete-medicine-btn"
                            title="Delete Medicine"
                            onClick={() => handleDelete(medicine.id)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredMedicines.length === 0 && (
                    <tr><td colSpan="6" className="no-medicines">No medicines found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="medicine-table-footer">
              Showing {filteredMedicines.length} of {medicines.length} medicines
            </div>
          </div>

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
