<!-- src/pages/CreateSalesOrder.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Create New Sales Order
          </h1>
          <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today's Date: <span class="ml-1">{{ formattedCurrentDate }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button 
            type="button" 
            @click="cancel" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button 
            type="button" 
            @click="saveDraft" 
            class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save as Draft
          </button>
          <button 
            type="submit" 
            form="salesOrderForm" 
            class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Order' }}
          </button>
        </div>
      </div>
    </div>

    <form id="salesOrderForm" @submit.prevent="submitForm" class="space-y-6">
      <!-- Order Information -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Order Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Basic details about the sales order.
          </p>
        </div>
        
        <div class="bg-white px-4 py-5 sm:p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Order Number -->
            <div>
              <label for="orderNumber" class="form-label">Order Number</label>
              <input
                id="orderNumber"
                v-model="formData.orderNumber"
                type="text"
                class="form-input"
                disabled
              />
            </div>
            
            <!-- Order Date -->
            <div>
              <label for="orderDate" class="form-label">Order Date</label>
              <input
                id="orderDate"
                v-model="formData.orderDate"
                type="date"
                class="form-input"
                required
              />
              <p v-if="errors.orderDate" class="form-error">{{ errors.orderDate }}</p>
            </div>
            
            <!-- Due Date -->
            <div>
              <label for="dueDate" class="form-label">Due Date</label>
              <input
                id="dueDate"
                v-model="formData.dueDate"
                type="date"
                class="form-input"
              />
            </div>
            
            <!-- Customer -->
            <div>
              <label for="customerId" class="form-label">Customer</label>
              <select
                id="customerId"
                v-model="formData.customerId"
                class="form-select"
                required
              >
                <option value="">Select a customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.name }}
                </option>
              </select>
              <p v-if="errors.customerId" class="form-error">{{ errors.customerId }}</p>
            </div>
            
            <!-- Sales Person -->
            <div>
              <label for="salesPersonId" class="form-label">Sales Person</label>
              <select
                id="salesPersonId"
                v-model="formData.salesPersonId"
                class="form-select"
                required
              >
                <option value="">Select a sales person</option>
                <option v-for="person in salesPersons" :key="person.id" :value="person.id">
                  {{ person.name }}
                </option>
              </select>
              <p v-if="errors.salesPersonId" class="form-error">{{ errors.salesPersonId }}</p>
            </div>
            
            <!-- Status -->
            <div>
              <label for="status" class="form-label">Status</label>
              <select
                id="status"
                v-model="formData.status"
                class="form-select"
                required
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <!-- Payment Terms -->
            <div>
              <label for="paymentTerms" class="form-label">Payment Terms</label>
              <select
                id="paymentTerms"
                v-model="formData.paymentTerms"
                class="form-select"
              >
                <option value="">Select payment terms</option>
                <option value="net15">Net 15</option>
                <option value="net30">Net 30</option>
                <option value="net60">Net 60</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>
            
            <!-- Shipping Method -->
            <div>
              <label for="shippingMethod" class="form-label">Shipping Method</label>
              <select
                id="shippingMethod"
                v-model="formData.shippingMethod"
                class="form-select"
              >
                <option value="">Select shipping method</option>
                <option value="ground">Ground</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
                <option value="pickup">Customer Pickup</option>
              </select>
            </div>
            
            <!-- Tax Rate -->
            <div>
              <label for="taxRate" class="form-label">Tax Rate (%)</label>
              <input
                id="taxRate"
                v-model.number="formData.taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                class="form-input"
                @input="calculateTotals"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Line Items -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Line Items
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Products or services included in this order.
            </p>
          </div>
          <button
            type="button"
            @click="addLineItem"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg class="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Item
          </button>
        </div>
        
        <div class="bg-white px-4 py-5 sm:p-6">
          <!-- Line Items Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount %</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in formData.items" :key="index" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <select
                      v-model="item.productId"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                      @change="updateLineItemDetails(index)"
                    >
                      <option value="">Select a product</option>
                      <option v-for="product in products" :key="product.id" :value="product.id">
                        {{ product.name }}
                      </option>
                    </select>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model="item.description"
                      type="text"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Description"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      required
                      @input="updateLineItemTotal(index)"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="text-gray-500 pr-1">$</span>
                      <input
                        v-model.number="item.unitPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                        @input="updateLineItemTotal(index)"
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input
                      v-model.number="item.discountPercent"
                      type="number"
                      min="0"
                      max="100"
                      class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      @input="updateLineItemTotal(index)"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span class="text-gray-500 pr-1">$</span>
                      <input
                        v-model.number="item.total"
                        type="number"
                        min="0"
                        step="0.01"
                        class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        readonly
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      type="button"
                      @click="removeLineItem(index)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>

                <tr v-if="formData.items.length === 0">
                  <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500 italic">
                    No items added yet. Click "Add Item" to add a product to this order.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Order Totals -->
          <div class="mt-6 flex justify-end">
            <div class="w-full max-w-sm">
              <div class="bg-gray-50 px-4 py-5 sm:p-6 rounded-md">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-gray-500">Subtotal:</span>
                  <span class="text-sm font-medium">${{ formatNumber(formData.subtotal) }}</span>
                </div>
                <div class="flex justify-between items-center mb-3">
                  <span class="text-sm text-gray-500">Tax ({{ formData.taxRate }}%):</span>
                  <span class="text-sm font-medium">${{ formatNumber(formData.taxAmount) }}</span>
                </div>
                <div class="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span class="text-base font-medium text-gray-900">Total:</span>
                  <span class="text-base font-bold text-gray-900">${{ formatNumber(formData.total) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSalesOrderStore } from '../stores/salesOrder';
import { useOrderCalculations } from '../composables/useOrderCalculations';
import { useFormValidation } from '../composables/useFormValidation';

const router = useRouter();
const salesOrderStore = useSalesOrderStore();
const { calculateItemTotal, calculateOrderTotals, formatPrice } = useOrderCalculations();
const { validateForm } = useFormValidation();

// State
const formData = ref({
  orderNumber: '',
  orderDate: new Date().toISOString().substr(0, 10),
  dueDate: '',
  customerId: '',
  salesPersonId: '',
  status: 'draft',
  paymentTerms: '',
  shippingMethod: '',
  subtotal: 0,
  taxRate: 8, // Default tax rate
  taxAmount: 0,
  total: 0,
  items: []
});

const customers = ref([]);
const salesPersons = ref([]);
const products = ref([]);
const errors = ref({});
const isSubmitting = ref(false);

// Format the current date
const formattedCurrentDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Format number with 2 decimal places
const formatNumber = (number) => {
  return parseFloat(number).toFixed(2);
};

// Fetch necessary data
onMounted(async () => {
  try {
    // Fetch order number
    const orderNumberResponse = await fetch('/api/next-order-number');
    const orderNumberData = await orderNumberResponse.json();
    formData.value.orderNumber = orderNumberData.orderNumber;
    
    // Fetch customers
    const customersResponse = await fetch('/api/customers');
    customers.value = await customersResponse.json();
    
    // Fetch sales persons
    const salesPersonsResponse = await fetch('/api/sales-persons');
    salesPersons.value = await salesPersonsResponse.json();
    
    // Fetch products
    const productsResponse = await fetch('/api/products');
    products.value = await productsResponse.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Add line item
const addLineItem = () => {
  formData.value.items.push({
    productId: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discountPercent: 0,
    total: 0
  });
};

// Remove line item
const removeLineItem = (index) => {
  formData.value.items.splice(index, 1);
  calculateTotals();
};

// Update line item details when product changes
const updateLineItemDetails = (index) => {
  const item = formData.value.items[index];
  const product = products.value.find(p => p.id == item.productId);
  
  if (product) {
    item.description = product.description || '';
    item.unitPrice = product.price;
    updateLineItemTotal(index);
  }
};

// Update line item total
const updateLineItemTotal = (index) => {
  const item = formData.value.items[index];
  item.total = calculateItemTotal(
    item.quantity || 0,
    item.unitPrice || 0,
    item.discountPercent || 0
  );
  calculateTotals();
};

// Calculate order totals
const calculateTotals = () => {
  const { subtotal, tax_amount, total } = calculateOrderTotals({
    items: formData.value.items,
    taxRate: formData.value.taxRate
  });
  
  formData.value.subtotal = subtotal;
  formData.value.taxAmount = tax_amount;
  formData.value.total = total;
};

// Form navigation
const cancel = () => {
  router.push('/');
};

// Save as draft
const saveDraft = async () => {
  formData.value.status = 'draft';
  await submitForm();
};

// Submit form
const submitForm = async () => {
  const validation = validateForm(formData.value);
  
  if (!validation.isValid) {
    errors.value = validation.errors;
    return;
  }
  
  errors.value = {};
  isSubmitting.value = true;
  
  try {
    await salesOrderStore.createSalesOrder(formData.value);
    router.push('/');
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>