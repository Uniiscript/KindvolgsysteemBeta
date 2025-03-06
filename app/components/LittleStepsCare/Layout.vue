<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-yellow-100 to-pink-100 border border-transparent md:border-gray-300">
    <!-- Header Component met Navigatiebalk -->
    <header class="bg-[rgb(214,201,174)] sticky top-0 z-50 shadow-lg border-b-4 border-gray-800 py-3 md:py-6 h-[70px] md:h-[120px]">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6">

        <!-- Logo en Bedrijfsnaam -->
        <div class="flex items-center">
          <img src="/LSClogo.png" alt="Little Steps Care logo" class="h-[120px] w-auto object-contain opacity-100" />
          <p class="text-3xl font-semibold text-gray-800 ml-4">Little Steps Care</p>
        </div>

        <!-- Hamburger Menu (Mobile) -->
        <button @click="menuOpen = !menuOpen" class="lg:hidden text-gray-800 focus:outline-none">
          <svg class="w-5 h-5 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <!-- Navigatiebalk -->
        <nav class="hidden lg:flex">
          <ul class="flex space-x-2 md:space-x-8 text-sm md:text-xl text-gray-800 font-semibold">
            <li><NuxtLink to="/" class="hover:text-purple-500 transition">Home</NuxtLink></li>
            <li><NuxtLink to="/over-ons" class="hover:text-purple-500 transition">Over ons</NuxtLink></li>
            <li><NuxtLink to="/onze-diensten" class="hover:text-purple-500 transition">Onze diensten</NuxtLink></li>
            <li><NuxtLink to="/vacatures" class="hover:text-purple-500 transition">Vacatures</NuxtLink></li>
          </ul>
        </nav>
      </div>

      <!-- Mobiel menu -->
      <div v-if="menuOpen" class="lg:hidden bg-[rgb(214,201,174)] border-t border-gray-800 py-4 px-3">
        <ul class="text-center text-base text-gray-800 font-semibold space-y-2">
          <li><NuxtLink to="/" class="block hover:text-purple-500 transition" @click="menuOpen = false">Home</NuxtLink></li>
          <li><NuxtLink to="/over-ons" class="block hover:text-purple-500 transition" @click="menuOpen = false">Over ons</NuxtLink></li>
          <li><NuxtLink to="/onze-diensten" class="block hover:text-purple-500 transition" @click="menuOpen = false">Onze diensten</NuxtLink></li>
          <li><NuxtLink to="/vacatures" class="block hover:text-purple-500 transition" @click="menuOpen = false">Vacatures</NuxtLink></li>
        </ul>
      </div>
    </header>

    <!-- Hoofdinhoud -->
    <div class="flex-grow px-3 md:px-6">
      <slot />
    </div>

    <!-- Footer Component -->
    <footer class="bg-[rgb(214,201,174)] py-3 md:py-6 border-t-4 border-gray-800 text-center w-full">
      <div class="max-w-7xl mx-auto px-3 md:px-6">
        <p class="text-gray-600 text-xs md:text-base">&copy; 2025 Little Steps Care. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
</script>
