<template>
  <div class="flex flex-col items-center w-full py-12">
    <p class="text-lg text-gray-800 max-w-2xl text-center mb-8 font-medium">
      Welkom bij <span class="text-[#C8A2C8] font-semibold">Little Steps Care</span>! Wij bieden liefdevolle en professionele opvang en gezinsondersteuning op maat.
    </p>

    <!-- Overkoepelend Verhaal -->
    <section class="mb-12 max-w-2xl text-center">
      <div class="bg-white shadow-xl border border-purple-300 rounded-2xl p-6 hover:shadow-2xl transition">
        <p class="text-lg text-gray-700">
          Little Steps Care is ontstaan vanuit mijn jarenlange ervaring als oppas en de waardevolle inzichten die ik van mijn moeder heb meegekregen...
        </p>
      </div>
    </section>

    <!-- Services -->
    <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
      <NuxtLink v-for="(service, index) in services" :key="index" :to="service.link" class="block" aria-label="Meer informatie over {{ service.title }}">
        <article class="bg-white shadow-lg border border-gray-300 rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-purple-50 hover:border-purple-400">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ service.title }}</h2>
          <p class="text-gray-600">{{ service.description }}</p>
          <button class="mt-4 px-4 py-2 bg-[#C8A2C8] text-white font-semibold rounded-lg hover:bg-purple-500 transition">
            Lees meer
          </button>
        </article>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const services = [
  { title: "Overall Gezinsondersteuning", description: "Op maat gemaakte ondersteuning voor het hele gezin, en oppasservice in 1.", link: "/gezinsondersteuning" },
  { title: "Oppasservice", description: "Ervaren, gespecialiseerde en betrouwbare oppassers met extra services zoals sportconsulting en coachingen kindvolgsystemen.", link: "/oppasservice" },
  { title: "Consultancy & Advies", description: "Persoonlijk advies en begeleiding voor ouders.", link: "/consultancy" },
];
</script>
