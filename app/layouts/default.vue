<script setup lang="ts">
const menuOpen = ref(false)
const portaalOpen = ref(false) // Voeg deze variabele toe voor de dropdown

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
};
</script>

<template>
  <div class="flex min-h-screen flex-col border border-transparent bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] md:border-gray-300">
    <header class="sticky top-0 z-50 flex items-center rounded-b-3xl border-b-4 border-gray-500 bg-[rgb(214,201,174)] px-3 py-2 shadow-lg md:px-6 md:py-2">
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between">
        <!-- Logo en Bedrijfsnaam -->
        <div class="flex items-center space-x-4">
          <img src="/LSClogo.png" alt="Little Steps Care logo" class="h-[45px] w-auto object-contain opacity-100 md:h-[120px]">
          <div class="flex flex-col">
            <p class="ml-2 font-meow_script text-lg text-gray-500 sm:text-xl md:ml-4 md:text-5xl">
              Little Steps Care
            </p>
            <p class="ml-2 mt-1 font-dosis text-sm text-gray-700 md:ml-4 md:mt-2">
              Professionele gezinsondersteuning met oppasservice, consulting ÉN coaching op maat.
            </p>
          </div>
        </div>

        <!-- Navigatiebalk (Desktop) -->
        <nav class="hidden lg:flex">
          <ul class="flex font-dosis text-base text-gray-500 md:space-x-10 md:text-xl lg:space-x-16 lg:text-2xl">
            <li>
              <NuxtLink to="/" class="font-zen_loop transition hover:text-[#C8A2C8]">
                <strong>Home</strong>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/onze-visie" class="font-zen_loop transition hover:text-[#C8A2C8]">
                <strong>Onze visie</strong>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/pakketten" class="font-zen_loop transition hover:text-[#C8A2C8]">
                <strong>Pakketten</strong>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ons-team" class="font-zen_loop transition hover:text-[#C8A2C8]">
                <strong>Ons Team</strong>
              </NuxtLink>
            </li>

            <!-- Portaal Button met dropdown -->
            <li class="relative">
              <button
                class="font-zen_loop transition hover:text-[#C8A2C8]"
                @click="portaalOpen = !portaalOpen"
              >
                <strong>Portaal</strong>
              </button>

              <!-- Dropdown Menu voor Inloggen -->
              <ul v-if="portaalOpen" class="absolute right-0 mt-2 w-48 transition-all">
                <li>
                  <NuxtLink to="/medewerkersportaal/inloggenpreview" class="block rounded-xl px-4 py-2 text-sm font-dosis bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] text-gray-500 transition-colors hover:bg-gray-200">
                    Medewerkerportaal
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/ouderportaal/inloggenpreview" class="block rounded-xl px-4 py-2 text-sm font-dosis bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] text-gray-500 transition-colors hover:bg-gray-200">
                    Ouderportaal
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <!-- Hamburger Menu (Mobile) -->
        <button class="text-gray-800 focus:outline-none lg:hidden" @click="menuOpen = !menuOpen">
          <svg class="size-7 transition-transform duration-300 md:size-8" :class="{ 'rotate-90': menuOpen }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Mobiele Navigatie -->
      <nav v-if="menuOpen" class="fixed right-4 top-16 w-64 max-w-xs scale-95 rounded-lg border border-gray-300 bg-[#fdf6f9] shadow-xl transition-all duration-300">
        <ul class="flex flex-col space-y-4 p-4 font-dosis text-lg text-gray-500">
          <li>
            <NuxtLink to="/" class="block transition hover:text-[#C8A2C8]" @click="menuOpen = false">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/onze-visie" class="block transition hover:text-[#C8A2C8]" @click="menuOpen = false">
              Onze Visie
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pakketten" class="block transition hover:text-[#C8A2C8]" @click="menuOpen = false">
              Pakketten
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ons-team" class="block transition hover:text-[#C8A2C8]" @click="menuOpen = false">
              Ons Team
            </NuxtLink>
          </li>
          <!-- Mobile Portaal Dropdown -->
          <li>
            <button
              class="block w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-200"
              @click="portaalOpen = !portaalOpen"
            >
              Portaal
            </button>
            <ul v-if="portaalOpen" class="ml-4 space-y-2">
              <li>
                <NuxtLink to="/medewerkersportaal/inloggenpreview" class="block px-4 py-2 text-gray-500 hover:bg-gray-200" @click="menuOpen = false">
                  Inloggen Medewerkerportaal
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/ouderportaal/inloggenpreview" class="block px-4 py-2 text-gray-500 hover:bg-gray-200" @click="menuOpen = false">
                  Inloggen Ouderportaal
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>

        <!-- Sluitknop -->
        <button class="absolute right-3 top-2 text-2xl text-gray-500 hover:text-gray-800" @click="menuOpen = false">
          ✕
        </button>
      </nav>
    </header>

    <!-- Hoofdinhoud -->
    <div class="py-4">
      <slot />
    </div>

    <!-- Footer Component -->
    <footer class="relative w-full rounded-t-3xl border-t-4 border-gray-500 bg-[rgb(214,201,174)] py-6 text-gray-500 md:py-10">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
        <!-- Linksectie links -->
        <div class="flex flex-col space-y-3 text-left font-zen_loop">
          <NuxtLink to="/underconstruction" class="font-dosis text-lg transition hover:text-[#A8E6CF]">
            ▻ Vind jouw Gezinsondersteuner bij jou in de buurt
          </NuxtLink>
          <NuxtLink to="/underconstruction" class="font-dosis text-lg transition hover:text-[#A8E6CF]">
            ▻ Vraag de informatiebrochure aan
          </NuxtLink>
          <NuxtLink to="/underconstruction" class="font-dosis text-lg transition hover:text-[#A8E6CF]">
            ▻ Schrijf je hier in voor een kennismakingsgesprek
          </NuxtLink>
        </div>

        <!-- Linksectie midden -->
        <div class="grid grid-cols-2 gap-4 font-dosis text-sm text-gray-500">
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/gezinsondersteuning" class="transition hover:text-[#A8E6CF]">
              Gezinsondersteuning
            </NuxtLink>
            <NuxtLink to="/oppasservice" class="transition hover:text-[#A8E6CF]">
              Oppasservice
            </NuxtLink>
            <NuxtLink to="/consultingencoaching" class="transition hover:text-[#A8E6CF]">
              Consulting & Coaching
            </NuxtLink>
            <NuxtLink to="/pakketten" class="transition hover:text-[#A8E6CF]">
              Pakketten en tarieven
            </NuxtLink>
          </div>
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/oudersoverons" class="transition hover:text-[#A8E6CF]">
              Ouders over ons
            </NuxtLink>
            <NuxtLink to="/underconstruction" class="transition hover:text-[#A8E6CF]">
              Algemene voorwaarden
            </NuxtLink>
            <NuxtLink to="/underconstruction" class="transition hover:text-[#A8E6CF]">
              Herroepingsrecht
            </NuxtLink>
            <NuxtLink to="/underconstruction" class="transition hover:text-[#A8E6CF]">
              Werken bij LSC
            </NuxtLink>
            <NuxtLink to="/ouderportaal/inloggenpreview" class="transition hover:text-[#A8E6CF]">
              Inloggen voor ouders
            </NuxtLink>
            <NuxtLink to="/medewerkersportaal/inloggenpreview" class="transition hover:text-[#A8E6CF]">
              Inloggen voor nannies en consultants
            </NuxtLink>
          </div>
        </div>

        <!-- Social Media & Logo (rechts) -->
        <div class="flex flex-col items-end space-y-3">
          <div class="flex space-x-3">
            <a href="https://www.instagram.com/little.steps.care" target="_blank" class="flex items-center rounded-full bg-[#A8E6CF] p-2 text-white transition hover:bg-[#6FBFA4]">
              <Icon name="mdi:instagram" class="text-lg" />
            </a>
            <a href="https://www.pinterest.com/littlestepscare4you" target="_blank" class="flex items-center rounded-full bg-[#A8E6CF] p-2 text-white transition hover:bg-[#6FBFA4]">
              <Icon name="mdi:pinterest" class="text-lg" />
            </a>
          </div>

          <!-- Logo & Bedrijfsnaam rechts onderin -->
          <div
            class="group relative flex cursor-pointer items-center space-x-2"
            @click="scrollToTop"
          >
            <img src="/LSCLogoIcon.jpeg" alt="Little Steps Care Logo" class="h-6 w-auto object-contain opacity-100 md:h-10">
            <p
              class="font-playwrite-italia-moderna bg-gradient-to-r from-[#A8E6CF] via-gray-500 to-[#A8E6CF] bg-clip-text text-sm text-transparent transition-opacity group-hover:opacity-80 md:text-xl"
            >
              LITTLE STEPS CARE
            </p>

            <!-- Tooltip bij hover -->
            <span
              class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-lg bg-gray-400 p-1 text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              Scroll back to top
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
