// src/stores/salesOrder.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSalesOrderStore = defineStore('salesOrder', () => {
  const salesOrders = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  /**
   * Fetch all sales orders from the API
   */
  const fetchSalesOrders = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('/api/sales-orders');
      const data = await response.json();
      salesOrders.value = data;
      return data;
    } catch (err) {
      console.error('Error fetching sales orders:', err);
      error.value = 'Failed to load sales orders. Please try again.';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Fetch a single sales order by ID
   */
  const fetchSalesOrderById = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`/api/sales-orders/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching sales order ${id}:`, err);
      error.value = 'Failed to load sales order. Please try again.';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Create a new sales order
   */
  const createSalesOrder = async (orderData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('/api/sales-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newOrder = await response.json();
      salesOrders.value.push(newOrder);
      return newOrder;
    } catch (err) {
      console.error('Error creating sales order:', err);
      error.value = 'Failed to create sales order. Please try again.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Update an existing sales order
   */
  const updateSalesOrder = async (id, orderData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`/api/sales-orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const updatedOrder = await response.json();
      
      // Update in the local store
      const index = salesOrders.value.findIndex(order => order.id == id);
      if (index !== -1) {
        salesOrders.value[index] = updatedOrder;
      }
      
      return updatedOrder;
    } catch (err) {
      console.error(`Error updating sales order ${id}:`, err);
      error.value = 'Failed to update sales order. Please try again.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Delete a sales order
   */
  const deleteSalesOrder = async (id) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`/api/sales-orders/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Remove from local store
      salesOrders.value = salesOrders.value.filter(order => order.id != id);
      
      return true;
    } catch (err) {
      console.error(`Error deleting sales order ${id}:`, err);
      error.value = 'Failed to delete sales order. Please try again.';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    salesOrders,
    isLoading,
    error,
    fetchSalesOrders,
    fetchSalesOrderById,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder
  };
});