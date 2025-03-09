<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] border border-transparent md:border-gray-300">
    <!-- Header Component met Navigatiebalk -->
    <header class="bg-[rgb(214,201,174)] sticky top-0 z-50 shadow-lg border-b-4 border-gray-500 py-2 md:py-6 h-[65px] md:h-[120px] flex items-center px-3 md:px-6">
      <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
        <!-- Logo en Bedrijfsnaam -->
        <div class="flex items-center space-x-4">
          <img src="/LSClogo.png" alt="Little Steps Care logo" class="h-[45px] md:h-[120px] w-auto object-contain opacity-100" />
          <p class="text-lg sm:text-xl md:text-5xl font-meow_script text-gray-500 ml-2 md:ml-4">
            Little Steps Care
          </p>
        </div>

        <!-- Navigatiebalk (Desktop) -->
        <nav class="hidden lg:flex">
          <ul class="flex space-x-4 md:space-x-10 text-base md:text-xl lg:text-2xl text-gray-500 font-semibold">
            <li><NuxtLink to="/" class="hover:text-[#C8A2C8] font-zen_loop transition">Home</NuxtLink></li>
            <li><NuxtLink to="/over-ons" class="hover:text-[#C8A2C8] font-zen_loop transition">Over ons</NuxtLink></li>
            <li><NuxtLink to="/onze-diensten" class="hover:text-[#C8A2C8] font-zen_loop transition">Onze diensten</NuxtLink></li>
            <li><NuxtLink to="/vacatures" class="hover:text-[#C8A2C8] font-zen_loop transition">Vacatures</NuxtLink></li>
          </ul>
        </nav>

        <!-- Hamburger Menu (Mobile) -->
        <button @click="menuOpen = !menuOpen" class="lg:hidden text-gray-800 focus:outline-none">
          <svg class="w-7 h-7 md:w-8 md:h-8 transition-transform duration-300" :class="{ 'rotate-90': menuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Mobiele Navigatie -->
      <nav v-if="menuOpen" class="fixed top-16 right-4 w-64 max-w-xs bg-[#fdf6f9] border border-gray-300 rounded-lg shadow-xl transition-all duration-300 transform scale-95">
        <ul class="flex flex-col space-y-4 p-4 text-lg font-semibold text-gray-500">
          <li><NuxtLink @click="menuOpen = false" to="/" class="block hover:text-[#C8A2C8] transition">Home</NuxtLink></li>
          <li><NuxtLink @click="menuOpen = false" to="/over-ons" class="block hover:text-[#C8A2C8] transition">Over ons</NuxtLink></li>
          <li><NuxtLink @click="menuOpen = false" to="/onze-diensten" class="block hover:text-[#C8A2C8] transition">Onze diensten</NuxtLink></li>
          <li><NuxtLink @click="menuOpen = false" to="/vacatures" class="block hover:text-[#C8A2C8] transition">Vacatures</NuxtLink></li>
        </ul>

        <!-- Sluitknop -->
        <button @click="menuOpen = false" class="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          ✕
        </button>
      </nav>
    </header>

    <!-- Hoofdinhoud -->
    <div class="flex-grow px-3 md:px-6">
      <slot />
    </div>

    <!-- Footer Component -->
    <footer class="relative bg-[rgb(214,201,174)] py-6 md:py-10 border-t-4 border-gray-500 text-gray-500 w-full">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col space-y-3 text-left">
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">▻ Vind jouw Gezinsondersteuner bij jou in de buurt</NuxtLink>
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">▻ Vraag de informatiebrochure aan</NuxtLink>
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">▻ Schrijf je hier in voor een kennismakingsgesprek</NuxtLink>
          </div>

          <!-- Linksectie midden -->
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div class="flex flex-col space-y-2">
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Allround Gezinsondersteuning</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Oppasservice</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Consulting & Coaching</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Tarieven</NuxtLink>
            </div>
            <div class="flex flex-col space-y-2">
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Over ons</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Algemene voorwaarden</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Herroepingsrecht</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Werken bij LSC</NuxtLink>
              <NuxtLink to="#" class="hover:text-[#A8E6CF] transition">Bestaande klant</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Social Media & Logo -->
        <div class="flex items-center justify-between w-full px-6 py-4">
          <div class="flex items-center space-x-3">
            <a href="https://www.instagram.com/little.steps.care" target="_blank" class="bg-[#A8E6CF] p-2 rounded-full text-white hover:bg-[#6FBFA4] transition flex items-center">
              <Icon name="mdi:instagram" class="text-lg" />
            </a>
            <a href="https://www.pinterest.com/littlestepscare4you" target="_blank" class="bg-[#A8E6CF] p-2 rounded-full text-white hover:bg-[#6FBFA4] transition flex items-center">
              <Icon name="mdi:pinterest" class="text-lg" />
            </a>

            <NuxtLink to="#" class="text-xs text-gray-600 hover:text-[#A8E6CF] transition">
          Privacy, cookies & meer
        </NuxtLink>
          </div>

          <!-- Logo met klikbare melding -->
          <div class="flex items-center cursor-pointer space-x-2" @click="showMessage">
            <img src="/LSCLogoIcon.jpeg" alt="Little Steps Care Logo" class="h-6 md:h-10 w-auto object-contain opacity-100" />
            <p class="text-sm md:text-xl font-playwrite-italia-moderna bg-gradient-to-r from-[#A8E6CF] via-gray-500 to-[#A8E6CF] bg-clip-text text-transparent">
      LITTLE STEPS CARE
    </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const menuOpen = ref(false);
const showMessage = () => alert("Welkom op onze pagina, als je vragen hebt, neem dan contact met ons op! :)");
</script>
