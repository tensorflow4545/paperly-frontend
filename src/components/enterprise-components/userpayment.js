// src/components/enterprise-components/userpayment.js
"use client";

import { useState, useEffect } from "react";
import { getAuthToken, getUserData } from "@/utils/auth";
import { toast } from "sonner";

export default function PaymentsPage() {
  const [user, setUser] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [nextDueDate, setNextDueDate] = useState(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [subscriptionCheckFailed, setSubscriptionCheckFailed] = useState(false);

  const API_BASE = "http://localhost:4000/api/userPayment"; 
  const SUBSCRIPTION_AMOUNT = 399;

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      const token = getAuthToken();
      const userData = getUserData();
      
      if (token && userData) {
        setUser(userData);
      }
    };
    
    loadUserData();
  }, []);

  // Check subscription status
  const checkSubscriptionStatus = async () => {
    try {
      setIsCheckingSubscription(true);
      setError(null);
      setSubscriptionCheckFailed(false);
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE}/subscription-status`, {
        headers: { 
          "Authorization": `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // Endpoint not found, use alternative approach
          setSubscriptionCheckFailed(true);
          toast.warning("Subscription check feature is temporarily unavailable");
          return;
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setHasActiveSubscription(data.hasActiveSubscription);
      if (data.activeSubscription) {
        setNextDueDate(data.activeSubscription.nextDueDate);
      }
      setPaymentStatus(null);
    } catch (error) {
      console.error("Error checking subscription status:", error);
      setSubscriptionCheckFailed(true);
      toast.error("Unable to check subscription status");
    } finally {
      setIsCheckingSubscription(false);
    }
  };

  // Alternative method to check subscription status by fetching all payments
  const checkSubscriptionViaPayments = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${API_BASE}/all-payments/${user.id || user._id}`, {
        headers: { 
          "Authorization": `Bearer ${token}` 
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Find the most recent paid payment that hasn't expired
        const activePayment = data.payments.find(p => 
          p.status === "Paid" && new Date(p.nextDueDate) > new Date()
        );
        
        setHasActiveSubscription(!!activePayment);
        if (activePayment) {
          setNextDueDate(activePayment.nextDueDate);
        }
      }
    } catch (error) {
      console.error("Error checking subscription via payments:", error);
    }
  };

  // Check subscription after user data is loaded
  useEffect(() => {
    if (user) {
      checkSubscriptionStatus();
    }
  }, [user]);

  // If subscription status check fails, try alternative method
  useEffect(() => {
    if (subscriptionCheckFailed && user) {
      checkSubscriptionViaPayments();
    }
  }, [subscriptionCheckFailed, user]);

  const handleCreateOrder = async () => {
    if (hasActiveSubscription) {
      setError("You already have an active subscription. You can pay again after your subscription expires.");
      toast.error("You already have an active subscription");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setPaymentStatus("creating");
      const token = getAuthToken();
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const res = await fetch(`${API_BASE}/create-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ amount: SUBSCRIPTION_AMOUNT }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const data = await res.json();
      
      if (data?.order) {
        setPaymentStatus("pending");
        toast.info("Payment order created. Opening payment gateway...");
        openRazorpay(data.order);
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.message);
      setPaymentStatus("error");
      toast.error("Failed to create payment order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyPayment = async (response, orderId) => {
    try {
      setPaymentStatus("verifying");
      toast.loading("Verifying your payment...");
      
      const token = getAuthToken();
      
      // Check if we have all required payment verification data
      if (!response.razorpay_payment_id || !response.razorpay_signature) {
        console.error("Missing payment verification data:", response);
        toast.dismiss();
        toast.error("Payment verification data is incomplete");
        throw new Error("Payment verification data is incomplete. Please contact support with your payment details.");
      }

      const res = await fetch(`${API_BASE}/verify-payment`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          razorpayOrderId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        toast.dismiss();
        toast.error("Payment verification failed");
        throw new Error(data.error || "Payment verification failed");
      }

      if (data.success) {
        setPaymentStatus("success");
        toast.dismiss();
        toast.success("Payment verified successfully! Your subscription is now active.");
        // Refresh subscription status
        setTimeout(() => {
          checkSubscriptionStatus();
        }, 1500);
      } else {
        setPaymentStatus("failed");
        setError("Payment verification failed. Please try again or contact support.");
        toast.dismiss();
        toast.error("Payment verification failed");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      setError(err.message);
      setPaymentStatus("error");
      toast.dismiss();
      toast.error(err.message || "Payment verification error");
    }
  };

  const openRazorpay = (order) => {
    if (hasActiveSubscription) {
      setError("You already have an active subscription. You can pay again after your subscription expires.");
      toast.error("You already have an active subscription");
      return;
    }

    if (typeof window === 'undefined') {
      setError("Payment system is not available in this environment.");
      toast.error("Payment system not available");
      return;
    }

    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        initializeRazorpay(order);
      };
      script.onerror = () => {
        setError('Failed to load payment system. Please try again later.');
        setPaymentStatus("error");
        toast.error("Failed to load payment system");
      };
      document.body.appendChild(script);
    } else {
      initializeRazorpay(order);
    }
  };

  const initializeRazorpay = (order) => {
    try {
      const options = {
        key: "rzp_test_RGza9p0QhWmwOL",
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Paperly Enterprise",
        description: "Monthly Subscription Payment",
        order_id: order.id,
        handler: (response) => {
          handleVerifyPayment(response, order.id);
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: "#4F46E5",
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus("cancelled");
            setError("Payment was cancelled. Please try again if you want to subscribe.");
            toast.warning("Payment cancelled");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      setError("Error initializing payment. Please try again.");
      setPaymentStatus("error");
      toast.error("Error initializing payment");
    }
  };

  // Display payment status message
  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case "creating":
        return <div className="p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="text-blue-800">Creating your payment order...</span>
          </div>
        </div>;
      case "pending":
        return <div className="p-4 mb-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800">Payment pending. Complete the payment in the popup window.</span>
          </div>
        </div>;
      case "verifying":
        return <div className="p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <span className="text-blue-800">Verifying your payment...</span>
          </div>
        </div>;
      case "success":
        return <div className="p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-800">Payment successful! Your subscription is now active.</span>
          </div>
        </div>;
      case "failed":
        return <div className="p-4 mb-4 border border-red-200 rounded-lg bg-red-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-800">Payment verification failed. Please try again.</span>
          </div>
        </div>;
      case "cancelled":
        return <div className="p-4 mb-4 border border-yellow-200 rounded-lg bg-yellow-50">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800">Payment was cancelled. Please try again if you want to subscribe.</span>
          </div>
        </div>;
      default:
        return null;
    }
  };

  if (isCheckingSubscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-600">Checking your subscription status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Monthly Subscription</h1>
          <p className="text-gray-600">Access all features with our monthly plan</p>
        </div>

        {/* User Info */}
        <div className="flex items-center justify-center p-4 mb-8 bg-white rounded-lg shadow-sm">
          <div className="flex items-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-12 h-12 mr-4 rounded-full" />
            ) : (
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-blue-100 rounded-full">
                <span className="text-xl font-semibold text-blue-700">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{user?.name || "Guest"}</h2>
              <p className="text-sm text-gray-600">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        {renderPaymentStatus()}

        {/* Error Display */}
        {error && (
          <div className="p-4 mb-6 text-red-700 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p>{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="px-3 py-1 mt-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Card */}
        <div className="mb-6 overflow-hidden bg-white shadow-md rounded-xl">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Monthly Plan</h3>
                <p className="text-gray-600">Unlock all features</p>
              </div>
              <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                ₹{SUBSCRIPTION_AMOUNT}/mo
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Full access to all features</span>
              </div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Priority support</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>

            {/* Subscription Status */}
            {hasActiveSubscription ? (
              <div className="p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-green-800">Active Subscription</span>
                </div>
                {nextDueDate && (
                  <p className="mt-1 text-sm text-green-700">
                    Your subscription is active until {new Date(nextDueDate).toLocaleDateString()}
                  </p>
                )}
                <p className="mt-2 text-sm text-green-700">
                  You cannot make another payment until your current subscription expires.
                </p>
              </div>
            ) : (
              <div className="p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-blue-800">No Active Subscription</span>
                </div>
                <p className="mt-1 text-sm text-blue-700">
                  Subscribe now to access all features
                </p>
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handleCreateOrder}
              disabled={hasActiveSubscription || isProcessing || paymentStatus === "verifying"}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center ${
                hasActiveSubscription || isProcessing || paymentStatus === "verifying"
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
            >
              {isProcessing || paymentStatus === "verifying" ? (
                <>
                  <div className="w-5 h-5 mr-3 border-b-2 border-white rounded-full animate-spin"></div>
                  {paymentStatus === "verifying" ? "Verifying..." : "Processing..."}
                </>
              ) : hasActiveSubscription ? (
                "Already Subscribed"
              ) : (
                `Subscribe Now - ₹${SUBSCRIPTION_AMOUNT}`
              )}
            </button>
            
            {hasActiveSubscription && nextDueDate && (
              <p className="mt-3 text-xs text-center text-gray-500">
                You can subscribe again on {new Date(nextDueDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {/* Simple Info Section */}
        <div className="p-6 overflow-hidden bg-white shadow-md rounded-xl">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">How it works</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-xs font-bold text-blue-800 bg-blue-100 rounded-full">1</div>
              <p className="text-sm text-gray-600">Click the subscribe button to make a payment</p>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-xs font-bold text-blue-800 bg-blue-100 rounded-full">2</div>
              <p className="text-sm text-gray-600">Complete the payment in the popup window</p>
            </div>
            <div className="flex items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-xs font-bold text-blue-800 bg-blue-100 rounded-full">3</div>
              <p className="text-sm text-gray-600">Your subscription will be active for 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}