// src/stores/usePaymentStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePaymentStore = create(
  persist(
    (set, get) => ({
      // State
      payments: [],
      currentPayment: null,
      loading: false,
      error: null,
      
      // Actions
      setPayments: (payments) => set({ payments }),
      setCurrentPayment: (currentPayment) => set({ currentPayment }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      
      // Fetch payments from API
      fetchPayments: async (userId, token) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`http://localhost:4000/api/userPayment/pending/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (!response.ok) throw new Error('Failed to fetch payments');
          
          const data = await response.json();
          set({ payments: data.pendingPayments || [], loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },
      
      // Fetch all payments (including paid ones)
      fetchAllPayments: async (userId, token) => {
        try {
          const response = await fetch(`http://localhost:4000/api/userPayment/all-payments/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (response.ok) {
            const data = await response.json();
            const paidPayment = data.payments?.find(p => p.status === 'Paid');
            if (paidPayment) {
              set({ currentPayment: paidPayment });
            }
          }
        } catch (error) {
          console.error('Error fetching all payments:', error);
        }
      },
      
      // Clear payments (on logout)
      clearPayments: () => set({ payments: [], currentPayment: null, error: null }),
    }),
    {
      name: 'payment-storage',
      getStorage: () => localStorage,
    }
  )
);