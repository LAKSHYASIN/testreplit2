// run.js - A script to launch the CRM Sales Order System
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting CRM Sales Order System...');

// Start the server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit', // This allows us to see the logs from the server
  env: {
    ...process.env,
    PORT: process.env.PORT || 3000
  }
});

// Handle server process events
server.on('error', (err) => {
  console.error('Failed to start server process:', err);
  process.exit(1);
});

server.on('close', (code) => {
  if (code !== 0) {
    console.error(`Server process exited with code ${code}`);
    process.exit(code);
  }
});

// Log server information
console.log(`Server is running on port ${process.env.PORT || 3000}`);
console.log('Dashboard: http://localhost:3000/');
console.log('Create Sales Order: http://localhost:3000/create-sales-order.html');

// Keep the script running
process.on('SIGINT', () => {
  console.log('Stopping CRM Sales Order System...');
  server.kill('SIGINT');
  process.exit(0);
});