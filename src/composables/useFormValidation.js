// src/composables/useFormValidation.js

/**
 * Composable for form validation
 */
export function useFormValidation() {
  /**
   * Validate a sales order form
   * @param {Object} formData - The form data to validate
   * @returns {Object} Object with isValid flag and errors object
   */
  const validateForm = (formData) => {
    const errors = {};
    
    // Validate order date
    if (!formData.orderDate) {
      errors.orderDate = 'Order date is required';
    }
    
    // Validate customer
    if (!formData.customerId) {
      errors.customerId = 'Please select a customer';
    }
    
    // Validate sales person
    if (!formData.salesPersonId) {
      errors.salesPersonId = 'Please select a sales person';
    }
    
    // Validate line items
    if (formData.items.length === 0) {
      errors.items = 'At least one line item is required';
    } else {
      const invalidItems = formData.items.filter(item => 
        !item.productId || 
        item.quantity <= 0 || 
        item.unitPrice < 0
      );
      
      if (invalidItems.length > 0) {
        errors.items = 'Some line items are invalid. Please check product, quantity and price';
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  /**
   * Validate a login form
   * @param {Object} formData - The form data to validate
   * @returns {Object} Object with isValid flag and errors object
   */
  const validateLoginForm = (formData) => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  /**
   * Validate a customer form
   * @param {Object} formData - The form data to validate
   * @returns {Object} Object with isValid flag and errors object
   */
  const validateCustomerForm = (formData) => {
    const errors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Customer name is required';
    }
    
    if (formData.email && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\d\+\-\(\) ]{7,15}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  return {
    validateForm,
    validateLoginForm,
    validateCustomerForm
  };
}