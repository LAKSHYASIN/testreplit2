<!-- src/components/Navbar.vue -->
<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-primary-800 font-bold text-xl">CRM Sales Order System</router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link 
              to="/" 
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-primary-500 text-gray-900': $route.path === '/' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/sales-orders/create" 
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              :class="{ 'border-primary-500 text-gray-900': $route.path === '/sales-orders/create' }"
            >
              Create Sales Order
            </router-link>
          </div>
        </div>
        <div class="ml-6 flex items-center">
          <div class="ml-3 relative">
            <div>
              <button 
                type="button" 
                class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                  JS
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <router-link 
          to="/" 
          class="text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-primary-50 border-primary-500 text-primary-700': $route.path === '/' }"
        >
          Dashboard
        </router-link>
        <router-link 
          to="/sales-orders/create" 
          class="text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          :class="{ 'bg-primary-50 border-primary-500 text-primary-700': $route.path === '/sales-orders/create' }"
        >
          Create Sales Order
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No additional script needed
</script>