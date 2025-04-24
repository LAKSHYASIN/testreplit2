// dev.js - Script designed to run the CRM Sales Order System in a Replit workflow
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialize the application
const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for the application
let customers = [
  { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '(555) 123-4567' },
  { id: 2, name: 'Globex Industries', email: 'info@globex.com', phone: '(555) 987-6543' },
  { id: 3, name: 'Tech Innovators', email: 'hello@techinnovators.com', phone: '(555) 456-7890' }
];

let salesPersons = [
  { id: 1, name: 'John Smith', email: 'john@crm.com', phone: '(555) 111-2222' },
  { id: 2, name: 'Jane Doe', email: 'jane@crm.com', phone: '(555) 333-4444' },
  { id: 3, name: 'Michael Johnson', email: 'michael@crm.com', phone: '(555) 555-6666' }
];

let products = [
  { id: 1, name: 'Premium Laptop', description: '15.6" Display, 16GB RAM, 512GB SSD', price: 1299.99 },
  { id: 2, name: 'Wireless Headphones', description: 'Noise-cancelling Bluetooth headphones', price: 199.99 },
  { id: 3, name: 'Office Chair', description: 'Ergonomic design with lumbar support', price: 249.99 },
  { id: 4, name: 'Software License', description: 'Annual subscription for productivity suite', price: 129.99 }
];

let salesOrders = [
  {
    id: 1,
    order_number: 'SO-000001',
    order_date: '2025-04-10',
    due_date: '2025-05-10',
    customer_id: 1,
    sales_person_id: 2,
    status: 'completed',
    payment_terms: 'net30',
    shipping_method: 'ground',
    subtotal: 1549.98,
    tax_rate: 8,
    tax_amount: 123.99,
    total: 1673.97,
    items: [
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        description: '15.6" Display, 16GB RAM, 512GB SSD',
        quantity: 1,
        unit_price: 1299.99,
        discount_percent: 0,
        total: 1299.99
      },
      {
        id: 2,
        order_id: 1,
        product_id: 2,
        description: 'Noise-cancelling Bluetooth headphones',
        quantity: 1,
        unit_price: 199.99,
        discount_percent: 25,
        total: 249.99
      }
    ]
  }
];

// Next available IDs
let nextOrderId = 2;
let nextOrderItemId = 3;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Add API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CRM Sales Order System API is running',
    timestamp: new Date(),
    data: {
      customers: customers.length,
      products: products.length,
      salesOrders: salesOrders.length
    }
  });
});

// Get all customers
app.get('/api/customers', (req, res) => {
  console.log('Customers API endpoint accessed');
  res.json(customers);
});

// Get all sales persons
app.get('/api/sales-persons', (req, res) => {
  console.log('Sales Persons API endpoint accessed');
  res.json(salesPersons);
});

// Get all products
app.get('/api/products', (req, res) => {
  console.log('Products API endpoint accessed');
  res.json(products);
});

// Get next order number
app.get('/api/next-order-number', (req, res) => {
  const nextOrderNumber = `SO-${String(nextOrderId).padStart(6, '0')}`;
  res.json({ orderNumber: nextOrderNumber });
});

// Get all sales orders
app.get('/api/sales-orders', (req, res) => {
  console.log('Sales Orders API endpoint accessed');
  const ordersWithRelations = salesOrders.map(order => {
    const customer = customers.find(c => c.id === order.customer_id);
    const sales_person = salesPersons.find(sp => sp.id === order.sales_person_id);
    
    return {
      ...order,
      customer,
      sales_person
    };
  });
  
  res.json(ordersWithRelations);
});

// Get a sales order by ID
app.get('/api/sales-orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = salesOrders.find(o => o.id === orderId);
  
  if (!order) {
    return res.status(404).json({ message: 'Sales order not found' });
  }
  
  const customer = customers.find(c => c.id === order.customer_id);
  const sales_person = salesPersons.find(sp => sp.id === order.sales_person_id);
  
  const orderWithRelations = {
    ...order,
    customer,
    sales_person
  };
  
  res.json(orderWithRelations);
});

// Create a new sales order
app.post('/api/sales-orders', (req, res) => {
  console.log('Creating new sales order, data:', req.body);
  const orderData = req.body;
  
  // Validate required fields
  if (!orderData.orderDate || !orderData.customerId || !orderData.salesPersonId) {
    return res.status(400).json({ 
      success: false,
      message: 'Missing required fields' 
    });
  }
  
  // Create new order
  const newOrder = {
    id: nextOrderId++,
    order_number: orderData.orderNumber || `SO-${String(nextOrderId-1).padStart(6, '0')}`,
    order_date: orderData.orderDate,
    due_date: orderData.dueDate || null,
    customer_id: parseInt(orderData.customerId),
    sales_person_id: parseInt(orderData.salesPersonId),
    status: orderData.status || 'draft',
    payment_terms: orderData.paymentTerms || null,
    shipping_method: orderData.shippingMethod || null,
    subtotal: parseFloat(orderData.subtotal) || 0,
    tax_rate: parseFloat(orderData.taxRate) || 0,
    tax_amount: parseFloat(orderData.taxAmount) || 0,
    total: parseFloat(orderData.total) || 0,
    items: []
  };
  
  // Process line items
  if (orderData.items && orderData.items.length > 0) {
    newOrder.items = orderData.items.map(item => {
      return {
        id: nextOrderItemId++,
        order_id: newOrder.id,
        product_id: parseInt(item.productId),
        description: item.description || '',
        quantity: parseInt(item.quantity) || 0,
        unit_price: parseFloat(item.unitPrice) || 0,
        discount_percent: parseFloat(item.discountPercent) || 0,
        total: parseFloat(item.total) || 0
      };
    });
  }
  
  // Add to storage
  salesOrders.push(newOrder);
  
  // Return the new order with relations
  const customer = customers.find(c => c.id === newOrder.customer_id);
  const sales_person = salesPersons.find(sp => sp.id === newOrder.sales_person_id);
  
  res.status(201).json({
    success: true,
    order: {
      ...newOrder,
      customer,
      sales_person
    }
  });
});

// Update a sales order
app.put('/api/sales-orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderData = req.body;
  
  // Find the order
  const orderIndex = salesOrders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Sales order not found' });
  }
  
  // Update the order
  const updatedOrder = {
    ...salesOrders[orderIndex],
    order_date: orderData.orderDate || salesOrders[orderIndex].order_date,
    due_date: orderData.dueDate || salesOrders[orderIndex].due_date,
    customer_id: parseInt(orderData.customerId) || salesOrders[orderIndex].customer_id,
    sales_person_id: parseInt(orderData.salesPersonId) || salesOrders[orderIndex].sales_person_id,
    status: orderData.status || salesOrders[orderIndex].status,
    payment_terms: orderData.paymentTerms || salesOrders[orderIndex].payment_terms,
    shipping_method: orderData.shippingMethod || salesOrders[orderIndex].shipping_method,
    subtotal: parseFloat(orderData.subtotal) || salesOrders[orderIndex].subtotal,
    tax_rate: parseFloat(orderData.taxRate) || salesOrders[orderIndex].tax_rate,
    tax_amount: parseFloat(orderData.taxAmount) || salesOrders[orderIndex].tax_amount,
    total: parseFloat(orderData.total) || salesOrders[orderIndex].total
  };
  
  // Update line items
  if (orderData.items && orderData.items.length > 0) {
    // Remove existing items
    updatedOrder.items = [];
    
    // Add updated items
    updatedOrder.items = orderData.items.map(item => {
      return {
        id: item.id || nextOrderItemId++,
        order_id: updatedOrder.id,
        product_id: parseInt(item.productId),
        description: item.description || '',
        quantity: parseInt(item.quantity) || 0,
        unit_price: parseFloat(item.unitPrice) || 0,
        discount_percent: parseFloat(item.discountPercent) || 0,
        total: parseFloat(item.total) || 0
      };
    });
  }
  
  // Save the updated order
  salesOrders[orderIndex] = updatedOrder;
  
  // Return the updated order with relations
  const customer = customers.find(c => c.id === updatedOrder.customer_id);
  const sales_person = salesPersons.find(sp => sp.id === updatedOrder.sales_person_id);
  
  res.json({
    success: true,
    order: {
      ...updatedOrder,
      customer,
      sales_person
    }
  });
});

// Delete a sales order
app.delete('/api/sales-orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  
  // Find the order
  const orderIndex = salesOrders.findIndex(o => o.id === orderId);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Sales order not found' });
  }
  
  // Remove the order
  salesOrders.splice(orderIndex, 1);
  
  res.status(204).send();
});

// Serve static HTML for any other route
app.get('*', (req, res) => {
  if (req.path.endsWith('.html')) {
    // If the path explicitly ends with .html, serve the file directly
    const filePath = path.join(__dirname, 'public', req.path);
    res.sendFile(filePath, (err) => {
      if (err) {
        // If file not found, serve index.html as fallback
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
      }
    });
  } else {
    // Otherwise, serve index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`=================================================================`);
  console.log(`CRM Sales Order System server is running on port ${port}`);
  console.log(`-----------------------------------------------------------------`);
  console.log(`Dashboard:           http://localhost:${port}/`);
  console.log(`Create Sales Order:  http://localhost:${port}/create-sales-order.html`);
  console.log(`API Status:          http://localhost:${port}/api/status`);
  console.log(`=================================================================`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server has been terminated');
    process.exit(0);
  });
});

// Keep the script running until explicitly terminated
process.stdin.resume();