// src/composables/useOrderCalculations.js

/**
 * Composable for sales order calculations
 */
export function useOrderCalculations() {
  /**
   * Calculate the total for a single line item with discount applied
   * @param {number} quantity - The quantity of items
   * @param {number} unitPrice - The price per unit
   * @param {number} discountPercent - The discount percentage (0-100)
   * @returns {number} The calculated total
   */
  const calculateItemTotal = (quantity, unitPrice, discountPercent) => {
    let total = quantity * unitPrice;
    
    if (discountPercent > 0) {
      total = total * (1 - discountPercent / 100);
    }
    
    return roundToTwoDecimals(total);
  };

  /**
   * Calculate order subtotal, tax amount, and total
   * @param {Object} order - The order object with items and tax rate
   * @returns {Object} Object containing subtotal, tax_amount, and total
   */
  const calculateOrderTotals = (order) => {
    // Calculate subtotal from line items
    const subtotal = order.items.reduce((sum, item) => {
      return sum + (item.total || 0);
    }, 0);
    
    // Calculate tax amount
    const taxRate = order.taxRate || 0;
    const tax_amount = subtotal * (taxRate / 100);
    
    // Calculate total
    const total = subtotal + tax_amount;
    
    return {
      subtotal: roundToTwoDecimals(subtotal),
      tax_amount: roundToTwoDecimals(tax_amount),
      total: roundToTwoDecimals(total)
    };
  };
  
  /**
   * Round number to two decimal places
   * @param {number} value - The value to round
   * @returns {number} The rounded value
   */
  const roundToTwoDecimals = (value) => {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  };
  
  /**
   * Format price as currency string
   * @param {number} value - The value to format
   * @returns {string} The formatted price string
   */
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };
  
  return {
    calculateItemTotal,
    calculateOrderTotals,
    roundToTwoDecimals,
    formatPrice
  };
}