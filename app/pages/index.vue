<template>
  <div class="flex flex-col items-center w-full py-12">
    <!-- Hero Sectie -->
    <header class="text-center max-w-3xl">
      <h1 class="text-4xl font-zen_loop text-gray-900">
        Zorg met een ❤️ voor jouw gezin
      </h1>
    </header>

    <!-- Over Ons -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="bg-white shadow-xl border border-purple-300 rounded-2xl p-6 hover:shadow-2xl transition">
        <h2 class="text-2xl font-zen_loop text-gray-800 mb-3">Onze Missie</h2>
        <p class="font-dosis text-gray-700">
          Wij bieden liefdevolle en professionele opvang en gezinsondersteuning op maat.

          Little Steps Care is ontstaan vanuit mijn jarenlange ervaring als oppas en de waardevolle inzichten die ik van mijn moeder heb meegekregen. Wij geloven dat elk gezin uniek is en dat kleine hulpjes in het dagelijks leven een groot verschil kunnen maken.

          Ons platform biedt een breed scala aan diensten, van algemene gezinsondersteuning en betrouwbare oppasservice tot persoonlijk advies en consultancy. We werken samen met professionals die ik persoonlijk ken en vertrouw, zodat we de best mogelijke begeleiding kunnen garanderen.

          Bij ons draait alles om maatwerk en het vinden van het juiste pakket voor jouw gezin. Of je nu kiest voor het ‘Basis Oppas Pakket’, het ‘Activiteiten Pakket’, het ‘Avond Pakket’, een ‘Overnachting Pakket’, of een speciaal pakket met een ‘Specialistische Nanny’ of ‘Consultancy’ – elk pakket is zorgvuldig samengesteld om perfect aan te sluiten bij jullie wensen en behoeften.
        </p>
      </div>
    </section>

    <!-- Waarom kiezen voor onze Nannies? -->
    <section class="mt-16 w-full max-w-4xl">
      <h2 class="text-3xl font-zen_loop text-gray-900 text-center mb-8">
        Waarom kiezen voor onze Nannies?
      </h2>
      <div class="flex flex-col md:flex-row bg-white shadow-lg border border-gray-300 rounded-2xl p-6 items-center md:items-start">
        <img src="/Nanny.jpeg" alt="Nanny met kind" class="w-full md:w-1/2 rounded-lg shadow-md">
        <div class="md:ml-6 mt-6 md:mt-0 text-center md:text-left">
          <p class="font-dosis text-gray-700">
            Bij onze oppasservice bieden we méér dan alleen oppas – we creëren een warme, veilige en stimulerende omgeving waarin jouw kind zich optimaal kan ontwikkelen.
            Onze Nannies zijn niet alleen zorgvuldig geselecteerd op ervaring en betrouwbaarheid, maar ze bieden ook persoonlijke aandacht, educatieve activiteiten en ondersteuning op maat voor elk gezin.
          </p>
          <p class="mt-4 font-dosis text-gray-700">
            Wat ons uniek maakt? Wij koppelen gezinnen aan Nannies die niet alleen passen bij hun opvangbehoeften, maar ook aansluiten bij hun opvoedstijl en waarden.
            Of het nu gaat om een vaste routine, ontwikkelingsgerichte spelletjes of flexibiliteit in opvanguren – wij zorgen ervoor dat ouders met een gerust hart hun kind kunnen toevertrouwen aan een liefdevolle en professionele oppas.
          </p>
        </div>
      </div>
    </section>

    <!-- Diensten -->
    <section class="mt-16 w-full max-w-5xl">
      <h2 class="text-3xl font-zen_loop text-gray-900 text-center mb-8">Onze Diensten</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink v-for="(service, index) in services" :key="index" :to="service.link" class="block" aria-label="Meer over {{ service.title }}">
          <article class="bg-white shadow-lg border border-gray-300 rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-purple-50 hover:border-purple-400">
            <h3 class="text-2xl font-zen_loop text-gray-800 mb-2">{{ service.title }}</h3>
            <p class="font-dosis text-gray-600">{{ service.description }}</p>
            <button class="mt-4 px-4 py-2 bg-[#C8A2C8] text-white font-semibold rounded-lg hover:bg-[#A983A2] transition">
              Lees meer
            </button>
          </article>
        </NuxtLink>
      </div>
    </section>

    <!-- Waarom Ons? -->
    <section class="mt-16 w-full max-w-4xl text-center">
      <h2 class="text-3xl font-zen_loop text-gray-900">Waarom Kiezen Voor Ons?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-zen_loop text-gray-800">🌟 Ervaring & Deskundigheid</h3>
          <p class="font-dosis text-gray-600 mt-2">Jarenlange ervaring in gezinsondersteuning en opvoedkundig advies.</p>
        </div>
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-zen_loop text-gray-800">💜 Persoonlijke Aanpak</h3>
          <p class="font-dosis text-gray-600 mt-2">Elk gezin is uniek. Wij bieden maatwerk ondersteuning op basis van jouw behoeften.</p>
        </div>
        <div class="bg-white shadow-md border border-gray-300 rounded-xl p-6">
          <h3 class="text-xl font-zen_loop text-gray-800">🔒 Betrouwbaar & Veilig</h3>
          <p class="font-dosis text-gray-600 mt-2">Gekwalificeerde en gescreende professionals voor een veilige omgeving.</p>
        </div>
      </div>
    </section>

   <!-- Contact CTA -->
<section class="mt-16 w-full text-center">
  <h2 class="text-3xl font-zen_loop text-gray-900">
    Ben jij helemaal enthousiast geworden, en benieuwd naar de mogelijkheden?
  </h2>
  <p class="text-lg font-dosis text-gray-700 mt-2">
    Neem contact op via onderstaand contactformulier en wij nemen zo spoedig mogelijk contact met je op!
  </p>
  <button
    @click="showContactForm = true"
    class="mt-6 inline-block px-6 py-3 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-lg hover:bg-purple-500 transition"
  >
    Contactformulier
  </button>
</section>

<!-- Contact Form Popup -->
<ContactFormPopup v-if="showContactForm" @close="showContactForm = false" />

  </div>
</template>

<script setup>
import { ref } from 'vue';

const showContactForm = ref(false); // Declare the showContactForm ref

const services = [
  { title: "Gezinsondersteuning", description: "Individueel afgestemde begeleiding voor gezinnen en ouders.", link: "/gezinsondersteuning" },
  { title: "Oppasservice", description: "Betrouwbare en deskundige oppassers met extra begeleiding voor je kind.", link: "/oppasservice" },
  { title: "Consultancy & Coaching", description: "Professioneel advies en ondersteuning voor opvoeding en gezinsbalans.", link: "/consultancy" },
];
</script>
