<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] border border-transparent md:border-gray-300">
    <!-- Header Component met Navigatiebalk -->
    <header class="bg-[rgb(214,201,174)] sticky top-0 z-50 shadow-lg border-b-4 border-gray-800 py-2 md:py-6 h-[65px] md:h-[120px] flex items-center px-3 md:px-6">
      <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
        <!-- Logo en Bedrijfsnaam -->
        <div class="flex items-center space-x-4">
          <img src="/LSClogo.png" alt="Little Steps Care logo" class="h-[45px] md:h-[120px] w-auto object-contain opacity-100" />
          <p class="text-base md:text-5xl font-meow_script text-gray-800 ml-2 md:ml-4">Little Steps Care</p>
        </div>

<!-- Navigatiebalk -->
<nav class="hidden lg:flex">
  <ul class="flex space-x-4 md:space-x-10 text-base md:text-xl lg:text-2xl text-gray-800 font-semibold">
    <li><NuxtLink to="/" class="hover:text-[#C8A2C8] font-zen_loop transition">Home</NuxtLink></li>
    <li><NuxtLink to="/over-ons" class="hover:text-[#C8A2C8] font-zen_loop transition">Over ons</NuxtLink></li>
    <li><NuxtLink to="/onze-diensten" class="hover:text-[#C8A2C8] font-zen_loop transition">Onze diensten</NuxtLink></li>
    <li><NuxtLink to="/vacatures" class="hover:text-[#C8A2C8] font-zen_loop transition">Vacatures</NuxtLink></li>
  </ul>
</nav>




        <!-- Hamburger Menu (Mobile) -->
        <button @click="menuOpen = !menuOpen" class="lg:hidden text-gray-800 focus:outline-none">
          <svg class="w-5 h-5 md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
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
          <div class="flex flex-col space-y-3 text-left">
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">
              ▻ Vind jouw Gezinsondersteuner bij jou in de buurt
            </NuxtLink>
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">
              ▻ Vraag de informatiebrochure aan
            </NuxtLink>
            <NuxtLink to="#" class="text-lg font-semibold hover:text-[#A8E6CF] transition">
              ▻ Schrijf je hier in voor een kennismakingsgesprek
            </NuxtLink>
          </div>

           <!-- Linksectie midden -->
      <div class="grid grid-cols-2 gap-4 text-sm text-gray-800">
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

    <div class="flex items-center justify-between w-full px-6 py-4">
      <div class="flex items-center cursor-pointer space-x-2">
        <img src="/LSCLogoIcon.jpeg" alt="Little Steps Care Logo" class="h-6 md:h-6 w-auto object-contain opacity-100" />
        <p class="text-xs md:text-sm font-playwrite-italia-moderna bg-gradient-to-r from-[#A8E6CF] via-black to-[#A8E6CF] bg-clip-text text-transparent">
          LITTLE STEPS CARE
        </p>
      </div>

      <!-- Social Media & Privacy -->
      <div class="flex items-center space-x-3">
        <!-- Instagram met MDI icon -->
        <a href="https://www.instagram.com/little.steps.care" target="_blank" class="bg-[#A8E6CF] p-2 rounded-full text-white hover:bg-[#6FBFA4] transition flex items-center">
          <Icon name="mdi:instagram" class="text-lg" />
        </a>

        <!-- Pinterest met MDI icon -->
        <a href="https://www.pinterest.com/littlestepscare4you" target="_blank" class="bg-[#A8E6CF] p-2 rounded-full text-white hover:bg-[#6FBFA4] transition flex items-center">
          <Icon name="mdi:pinterest" class="text-lg" />
        </a>

        <NuxtLink to="#" class="text-xs text-gray-600 hover:text-[#A8E6CF] transition">
          Privacy, cookies & meer
        </NuxtLink>
      </div>
      </div>
    </div>
  </footer>
  </div>
</template>

<script setup>
</script>
