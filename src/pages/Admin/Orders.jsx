
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  ShoppingCart,
  Clock,
  CheckCircle,
  X,
  Trash2,
  Eye
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const initialOrders = [
  {
    po_id: 1,
    po_number: "PO-2026-0001",
    retailer: "Apollo Pharmacy",
    distributor: "Mehta Pharma Distributors",
    po_date: "2026-09-22",
    expected_delivery_date: "2026-09-29",
    total_amount: 10000,
    total_gst: 1200,
    grand_total: 11200,
    po_source: "manual",
    status: "confirmed",
    medicines: "Crocin 650mg Tablet",
    quantity: 500
  },
  {
    po_id: 2,
    po_number: "PO-2026-0002",
    retailer: "City Medical Store",
    distributor: "Mehta Pharma Distributors",
    po_date: "2026-09-23",
    expected_delivery_date: "2026-09-30",
    total_amount: 5000,
    total_gst: 600,
    grand_total: 5600,
    po_source: "manual",
    status: "sent",
    medicines: "Paracetamol 500mg",
    quantity: 250
  },
  {
    po_id: 3,
    po_number: "PO-2026-0003",
    retailer: "Health Plus Pharmacy",
    distributor: "Shree Medical Distributors",
    po_date: "2026-09-24",
    expected_delivery_date: "2026-10-01",
    total_amount: 8000,
    total_gst: 960,
    grand_total: 8960,
    po_source: "auto",
    status: "partially_received",
    medicines: "Vitamin C 1000mg",
    quantity: 400
  },
  {
    po_id: 4,
    po_number: "PO-2026-0004",
    retailer: "Apollo Pharmacy",
    distributor: "Shree Medical Distributors",
    po_date: "2026-09-25",
    expected_delivery_date: "2026-10-02",
    total_amount: 3000,
    total_gst: 360,
    grand_total: 3360,
    po_source: "manual",
    status: "received",
    medicines: "Cetirizine 10mg",
    quantity: 150
  }
];

const emptyForm = {
  distributor: "",
  medicine: "",
  quantity: "",
  expected_delivery_date: "",
  unit_price: "",
  gst_percent: "12",
  quotation_id: "",
  remarks: ""
};

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => ["draft", "sent"].includes(o.status)
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status === "received"
  ).length;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      [
        order.po_number,
        order.retailer,
        order.distributor,
        order.medicines,
        order.status
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quantity = Number(form.quantity);
    const price = Number(form.unit_price);
    const gst = Number(form.gst_percent);

    const totalAmount = quantity * price;
    const gstAmount = (totalAmount * gst) / 100;

    const newOrder = {
      po_id: Date.now(),
      po_number: `PO-2026-${String(orders.length + 1).padStart(4, "0")}`,
      retailer: "Apollo Pharmacy",
      distributor: form.distributor,
      po_date: new Date().toISOString().slice(0, 10),
      expected_delivery_date: form.expected_delivery_date,
      total_amount: totalAmount,
      total_gst: gstAmount,
      grand_total: totalAmount + gstAmount,
      po_source: "manual",
      status: "draft",
      medicines: form.medicine,
      quantity,
      quotation_id: form.quotation_id,
      remarks: form.remarks
    };

    setOrders([newOrder, ...orders]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Purchase Order?")) {
      setOrders(orders.filter((order) => order.po_id !== id));
    }
  };

  const formatAmount = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    })}`;

  const formatStatus = (status) =>
    status.replaceAll("_", " ");

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="orders-page">

          {/* Page Heading */}
          <div className="orders-heading">
            <div>
              <h1>Purchase Orders</h1>
              <p>Manage retailer purchase orders and distributor supplies.</p>
            </div>

            <button
              className="new-order-btn"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? <X size={18} /> : <Plus size={18} />}
              {showForm ? "Close Form" : "New Purchase Order"}
            </button>
          </div>

          {/* Summary Cards */}
          <div className="orders-stats">

            <div className="order-stat-card blue">
              <div className="order-stat-icon">
                <ShoppingCart size={25} />
              </div>
              <div>
                <p>Total Orders</p>
                <h2>{totalOrders}</h2>
              </div>
            </div>

            <div className="order-stat-card orange">
              <div className="order-stat-icon">
                <Clock size={25} />
              </div>
              <div>
                <p>Pending Orders</p>
                <h2>{pendingOrders}</h2>
              </div>
            </div>

            <div className="order-stat-card green">
              <div className="order-stat-icon">
                <CheckCircle size={25} />
              </div>
              <div>
                <p>Received Orders</p>
                <h2>{deliveredOrders}</h2>
              </div>
            </div>

          </div>

          {/* New Purchase Order Form */}
          {showForm && (
            <div className="order-form-card">
              <h2>Create Purchase Order</h2>
              <p>Enter purchase order details for your distributor.</p>

              <form onSubmit={handleSubmit}>
                <div className="order-form-grid">

                  <div className="order-field">
                    <label>Distributor *</label>
                    <select
                      name="distributor"
                      value={form.distributor}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Distributor</option>
                      <option value="Mehta Pharma Distributors">
                        Mehta Pharma Distributors
                      </option>
                      <option value="Shree Medical Distributors">
                        Shree Medical Distributors
                      </option>
                    </select>
                  </div>

                  <div className="order-field">
                    <label>Medicine *</label>
                    <select
                      name="medicine"
                      value={form.medicine}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Medicine</option>
                      <option value="Crocin 650mg Tablet">
                        Crocin 650mg Tablet
                      </option>
                      <option value="Paracetamol 500mg">
                        Paracetamol 500mg
                      </option>
                      <option value="Vitamin C 1000mg">
                        Vitamin C 1000mg
                      </option>
                      <option value="Cetirizine 10mg">
                        Cetirizine 10mg
                      </option>
                    </select>
                  </div>

                  <div className="order-field">
                    <label>Ordered Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      placeholder="Enter quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="order-field">
                    <label>Unit Price (₹) *</label>
                    <input
                      type="number"
                      name="unit_price"
                      min="0.01"
                      step="0.01"
                      placeholder="Enter unit price"
                      value={form.unit_price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="order-field">
                    <label>GST (%)</label>
                    <input
                      type="number"
                      name="gst_percent"
                      min="0"
                      max="100"
                      step="0.01"
                      value={form.gst_percent}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="order-field">
                    <label>Expected Delivery Date *</label>
                    <input
                      type="date"
                      name="expected_delivery_date"
                      value={form.expected_delivery_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="order-field">
                    <label>Quotation ID (Optional)</label>
                    <input
                      type="number"
                      name="quotation_id"
                      placeholder="Enter quotation ID"
                      value={form.quotation_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="order-field">
                    <label>Remarks</label>
                    <input
                      type="text"
                      name="remarks"
                      placeholder="Additional information"
                      value={form.remarks}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="order-form-actions">
                  <button
                    type="button"
                    className="cancel-order-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="save-order-btn">
                    <Plus size={17} /> Create Purchase Order
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Orders Table */}
          <div className="orders-table-card">

            <div className="orders-table-heading">
              <div>
                <h2>All Purchase Orders</h2>
                <p>{filteredOrders.length} orders found</p>
              </div>

              <div className="orders-search">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search purchase orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="orders-table-scroll">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Retailer</th>
                    <th>Distributor</th>
                    <th>PO Date</th>
                    <th>Expected Date</th>
                    <th>Grand Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.po_id}>
                      <td className="po-number">{order.po_number}</td>
                      <td>{order.retailer}</td>
                      <td>{order.distributor}</td>
                      <td>{order.po_date}</td>
                      <td>{order.expected_delivery_date}</td>
                      <td className="po-amount">
                        {formatAmount(order.grand_total)}
                      </td>
                      <td>
                        <span className={`po-status ${order.status}`}>
                          {formatStatus(order.status)}
                        </span>
                      </td>
                      <td>
                        <div className="po-actions">
                          <button
                            className="view-po-btn"
                            title="View"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            className="delete-po-btn"
                            title="Delete"
                            onClick={() => handleDelete(order.po_id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan="8" className="no-orders">
                        No purchase orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* View Order Details */}
          {selectedOrder && (
            <div className="po-modal-overlay">
              <div className="po-modal">
                <button
                  className="po-modal-close"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X size={20} />
                </button>

                <h2>Purchase Order Details</h2>
                <p className="po-modal-number">{selectedOrder.po_number}</p>

                <div className="po-detail-list">
                  <p><strong>Retailer:</strong> {selectedOrder.retailer}</p>
                  <p><strong>Distributor:</strong> {selectedOrder.distributor}</p>
                  <p><strong>Medicine:</strong> {selectedOrder.medicines}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                  <p><strong>PO Date:</strong> {selectedOrder.po_date}</p>
                  <p>
                    <strong>Expected Delivery:</strong>{" "}
                    {selectedOrder.expected_delivery_date}
                  </p>
                  <p>
                    <strong>Total Amount:</strong>{" "}
                    {formatAmount(selectedOrder.total_amount)}
                  </p>
                  <p>
                    <strong>GST:</strong>{" "}
                    {formatAmount(selectedOrder.total_gst)}
                  </p>
                  <p>
                    <strong>Grand Total:</strong>{" "}
                    {formatAmount(selectedOrder.grand_total)}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {formatStatus(selectedOrder.status)}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Orders;
