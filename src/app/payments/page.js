"use client";

import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";


export default function PaymentsPage({ userId }) {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPayment, setCurrentPayment] = useState(null);

const API_BASE = "http://localhost:4000/api/userPayment"; 

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        const res = await fetch(`${API_BASE}/pending/${userId}`);
        const data = await res.json();
        setPendingPayments(data.pendingPayments || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pending payments:", err);
        setLoading(false);
      }
    };

    fetchPendingPayments();
  }, [userId]);



  const handleCreateOrder = async (amount) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (data?.order) {
        setCurrentPayment(data.payment);
        openRazorpay(data.order);
      }
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  const handleVerifyPayment = async (paymentData, orderId) => {
    try {
      const res = await fetch(`${API_BASE}/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentData.razorpay_payment_id,
          razorpaySignature: paymentData.razorpay_signature,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Payment verified successfully!");
        setCurrentPayment(data.payment);

        // refresh pending payments
        const refreshed = await fetch(`${API_BASE}/pending/${userId}`);
        const pendingData = await refreshed.json();
        setPendingPayments(pendingData.pendingPayments || []);
      } else {
        alert("Payment verification failed!");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
    }
  };

  const openRazorpay = (order) => {
    const options = {
      key: "", // TODO: add Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Paperly Enterprise",
      description: "Monthly Subscription Payment",
      order_id: order.id,
      handler: (response) => {
        handleVerifyPayment(response, order.id);
      },
      theme: {
        color: "#FBBF24",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div className="p-6">Loading payments...</div>;

  const token = localStorage.getItem("token");
let user = null;

if (token) {
  try {
    user = jwt_decode(token); // contains user id, name, email, etc.
  } catch (err) {
    console.error("Invalid token", err);
  }
}

  return (
    <>
    <div className="flex items-center mb-4">
  {user?.avatar ? (
    <img src={user.avatar} alt={user.name} className="w-10 h-10 mr-2 rounded-full" />
  ) : (
    <div className="flex items-center justify-center w-10 h-10 mr-2 bg-gray-300 rounded-full">
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>
  )}
  <span className="font-semibold">{user?.name || "Guest"}</span>
</div>

    <div className="max-w-xl p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">User Payments</h1>

      {/* Current subscription */}
      {currentPayment ? (
        <div className="p-4 border border-yellow-200 rounded-md bg-yellow-50">
          <p>
            <span className="font-semibold">Current Payment Status:</span>{" "}
            {currentPayment.status}
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ₹
            {currentPayment.amount}
          </p>
          <p>
            <span className="font-semibold">Next Due Date:</span>{" "}
            {new Date(currentPayment.nextDueDate).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p>No active subscription</p>
        </div>
      )}

      {/* Create new order */}
      <button
        onClick={() => handleCreateOrder(100)}
        className="px-4 py-2 text-white transition bg-yellow-400 rounded-md hover:bg-yellow-500"
      >
        Create Order / Pay ₹100
      </button>

      {/* Pending payments */}
      <div>
        <h2 className="mb-2 text-lg font-medium text-gray-800">
          Pending Payments
        </h2>
        {pendingPayments.length === 0 ? (
          <p>No pending payments</p>
        ) : (
          <ul className="space-y-2">
            {pendingPayments.map((p) => (
              <li
                key={p._id}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹{p.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Due Date:</span>{" "}
                    {new Date(p.nextDueDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() =>
                    openRazorpay({
                      id: p.razorpayOrderId,
                      amount: p.amount * 100, // Razorpay expects paise
                      currency: p.currency,
                    })
                  }
                  className="px-3 py-1 text-white transition bg-yellow-400 rounded-md hover:bg-yellow-500"
                >
                  Pay Now
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}
