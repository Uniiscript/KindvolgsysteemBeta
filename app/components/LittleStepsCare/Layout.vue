<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-yellow-100 to-pink-100 border border-transparent md:border-gray-300">
    <!-- Header Component met Navigatiebalk -->
    <header class="bg-[rgb(214,201,174)] sticky top-0 z-50 shadow-lg border-b-4 border-gray-800 py-2 md:py-6 h-[65px] md:h-[120px]">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-3 md:px-6">
        <!-- Logo en Bedrijfsnaam -->
        <div class="flex items-center mt-[-5px] md:mt-0">
          <img src="/LSClogo.png" alt="Little.Steps.Care-logo" class="h-[45px] md:h-[120px] w-auto object-contain opacity-100" />
          <p class="text-base md:text-3xl font-semibold text-gray-800 ml-2 md:ml-4">Little Steps Care</p>
        </div>

        <!-- Hamburger Menu (Mobile) -->
        <button @click="menuOpen = !menuOpen" class="lg:hidden text-gray-800 focus:outline-none mt-[-5px]">
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
          <li><NuxtLink to="/vacatures" class="block hover:text-purple-500 transition" @click="menuOpen = false">Werken bij</NuxtLink></li>
        </ul>
      </div>
    </header>

    <!-- Hoofdinhoud -->
    <div class="flex-grow px-3 md:px-6">
      <slot />
    </div>

    <!-- Footer Component -->
<footer class="relative bg-[rgb(214,201,174)] py-6 md:py-10 border-t-4 border-gray-800 text-gray-800 w-full">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Linksectie links -->
      <div class="flex flex-col space-y-3 text-left">
        <NuxtLink to="#" class="text-lg font-semibold hover:text-purple-500 transition">
          > Vind jouw Gezinsondersteuner bij jou in de buurt
        </NuxtLink>
        <NuxtLink to="#" class="text-lg font-semibold hover:text-purple-500 transition">
          > Vraag de informatiebrochure aan
        </NuxtLink>
        <NuxtLink to="#" class="text-lg font-semibold hover:text-purple-500 transition">
          > Schrijf je hier in voor een kennismakingsgesprek
        </NuxtLink>
      </div>

      <!-- Linksectie midden -->
      <div class="grid grid-cols-2 gap-4 text-sm text-gray-800">
        <div class="flex flex-col space-y-2">
          <NuxtLink to="#" class="hover:text-purple-500 transition">Allround Gezinsondersteuning</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Oppasservice</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Consulting & coaching</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Pakketten & tarieven</NuxtLink>
        </div>
        <div class="flex flex-col space-y-2">
          <NuxtLink to="#" class="hover:text-purple-500 transition">Over ons</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Algemene voorwaarden</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Herroepingsrecht</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Werken bij LSC</NuxtLink>
          <NuxtLink to="#" class="hover:text-purple-500 transition">Bestaande klant</NuxtLink>
        </div>
      </div>

      <!-- Social Media & Privacy -->
      <div class="flex flex-col items-center">
        <div class="flex space-x-3">
          <!-- Instagram met MDI icon -->
          <a href="https://www.instagram.com/little.steps.care" target="_blank" class="bg-red-400 p-3 rounded-full text-white hover:bg-red-500 transition flex flex-col items-center">
            <Icon name="mdi:instagram" class="text-2xl" />
          </a>

          <!-- Pinterest met MDI icon -->
          <a href="https://www.pinterest.com/littlestepscare4you" target="_blank" class="bg-red-400 p-3 rounded-full text-white hover:bg-red-500 transition flex flex-col items-center">
            <Icon name="mdi:pinterest" class="text-2xl" />
          </a>
        </div>
        <NuxtLink to="#" class="text-sm text-gray-600 mt-2 hover:text-purple-500 transition">
          Privacy, cookies & meer
        </NuxtLink>
      </div>
    </div>

   <div class="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
  <div class="flex items-center space-x-2">
    <img src="/LSCLogoIcon.jpeg" alt="Little Steps Care Logo" class="h-12 w-auto object-contain opacity-80" />
    <p>&copy; 2025 Little Steps Care. Alle rechten voorbehouden.</p>
  </div>
</div>
</div>
</footer>




  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
</script>
