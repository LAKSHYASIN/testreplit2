<!-- src/App.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <main class="flex-1">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

onMounted(() => {
  document.title = "CRM Sales Order System";
});
</script>