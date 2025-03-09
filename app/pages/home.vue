<template>
  <div class="flex flex-col items-center w-full py-12">
    <!-- Hero Sectie -->
    <header class="text-center max-w-3xl">
      <h1 class="text-4xl font-bold text-gray-900">
        Zorg met een ❤️ voor jouw gezin
      </h1>
      <p class="text-lg text-gray-700 mt-4">
        Professionele gezinsondersteuning, oppasservice en coaching op maat. Wij helpen ouders en kinderen met liefdevolle en deskundige begeleiding.
      </p>
      <NuxtLink to="/contact" class="mt-6 inline-block px-6 py-3 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-lg hover:bg-purple-500 transition">
        Plan een gratis kennismaking
      </NuxtLink>
    </header>

    <!-- Over Ons -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="bg-white shadow-xl border border-purple-300 rounded-2xl p-6 hover:shadow-2xl transition">
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">Onze Missie</h2>
        <p class="text-gray-700">
          Little Steps Care is ontstaan uit passie voor gezinsondersteuning. Met jarenlange ervaring als oppas en inzichten uit opvoedkunde, helpen wij gezinnen balans te vinden met maatwerk ondersteuning.
        </p>
      </div>
    </section>

    <!-- Diensten -->
    <section class="mt-16 w-full max-w-5xl">
      <h2 class="text-3xl font-semibold text-gray-900 text-center mb-8">Onze Diensten</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink v-for="(service, index) in services" :key="index" :to="service.link" class="block" aria-label="Meer over {{ service.title }}">
          <article class="bg-white shadow-lg border border-gray-300 rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-purple-50 hover:border-purple-400">
            <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
            <button class="mt-4 px-4 py-2 bg-[#C8A2C8] text-white font-semibold rounded-lg hover:bg-purple-500 transition">
              Lees meer
            </button>
          </article>
        </NuxtLink>
      </div>
    </section>

    <!-- Waarom Ons? -->
    <section class="mt-16 w-full max-w-4xl text-center">
      <h2 class="text-3xl font-semibold text-gray-900">Waarom Kiezen Voor Ons?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-gray-800">🌟 Ervaring & Deskundigheid</h3>
          <p class="text-gray-600 mt-2">Jarenlange ervaring in gezinsondersteuning en opvoedkundig advies.</p>
        </div>
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-gray-800">💜 Persoonlijke Aanpak</h3>
          <p class="text-gray-600 mt-2">Elk gezin is uniek. Wij bieden maatwerk ondersteuning op basis van jouw behoeften.</p>
        </div>
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-semibold text-gray-800">🔒 Betrouwbaar & Veilig</h3>
          <p class="text-gray-600 mt-2">Gekwalificeerde en gescreende professionals voor een veilige omgeving.</p>
        </div>
      </div>
    </section>

    <!-- Veelgestelde vragen -->
    <section class="mt-16 w-full max-w-3xl">
      <h2 class="text-3xl font-semibold text-gray-900 text-center">Veelgestelde Vragen</h2>
      <div class="mt-8 space-y-4">
        <details class="bg-white shadow-md border border-gray-300 rounded-xl p-4">
          <summary class="text-lg font-semibold text-gray-800 cursor-pointer">Hoe werkt de oppasservice?</summary>
          <p class="mt-2 text-gray-600">Onze oppassers zijn ervaren en gescreend. Je kunt eenvoudig een aanvraag indienen via onze website.</p>
        </details>
        <details class="bg-white shadow-md border border-gray-300 rounded-xl p-4">
          <summary class="text-lg font-semibold text-gray-800 cursor-pointer">Wat houdt gezinsondersteuning in?</summary>
          <p class="mt-2 text-gray-600">Wij bieden begeleiding en coaching voor ouders en kinderen, gericht op harmonie en balans binnen het gezin.</p>
        </details>
        <details class="bg-white shadow-md border border-gray-300 rounded-xl p-4">
          <summary class="text-lg font-semibold text-gray-800 cursor-pointer">Hoe kan ik een kennismaking plannen?</summary>
          <p class="mt-2 text-gray-600">Klik op de knop ‘Plan een gratis kennismaking’ en kies een moment dat jou uitkomt.</p>
        </details>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="mt-16 w-full text-center">
      <h2 class="text-3xl font-semibold text-gray-900">Klaar om jouw gezin te ondersteunen?</h2>
      <p class="text-lg text-gray-700 mt-2">Neem contact op en ontdek hoe wij jou kunnen helpen!</p>
      <NuxtLink to="/contact" class="mt-6 inline-block px-6 py-3 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-lg hover:bg-purple-500 transition">
        Neem contact op
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const services = [
  { title: "Gezinsondersteuning", description: "Individueel afgestemde begeleiding voor gezinnen en ouders.", link: "/gezinsondersteuning" },
  { title: "Oppasservice", description: "Betrouwbare en deskundige oppassers met extra begeleiding voor je kind.", link: "/oppasservice" },
  { title: "Consultancy & Coaching", description: "Professioneel advies en ondersteuning voor opvoeding en gezinsbalans.", link: "/consultancy" },
];
</script>
