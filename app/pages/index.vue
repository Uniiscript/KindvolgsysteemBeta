<script setup lang="ts">
import { ref } from 'vue';

const services = [
  { title: 'Gezinsondersteuning', description: 'Individueel afgestemde begeleiding voor gezinnen en ouders.', link: '/gezinsondersteuning' },
  { title: 'Oppasservice', description: 'Betrouwbare en deskundige oppassers met extra begeleiding voor je kind.', link: '/oppasservice' },
  { title: 'Consultancy & Coaching', description: 'Professioneel advies en ondersteuning voor opvoeding en gezinsbalans.', link: '/consultingencoaching' },
];

// Reviews
const reviews = ref([
  { name: "Sanne & Mark", text: "Onze oppas van Little Steps Care was geweldig! Ze dacht echt mee met onze opvoeding en de kinderen vonden haar fantastisch!" },
  { name: "Eva", text: "Dankzij de coaching van LSC hebben we veel meer rust in huis. Hun persoonlijke aanpak is echt uniek!" },
  { name: "Lisa & Tom", text: "Onze nanny voelde meteen als familie. We kunnen ons geen betere hulp wensen!" },
]);

const currentReviewIndex = ref(0);

// Automatische carousel
onNuxtReady(() => {
  setInterval(() => {
    currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.value.length;
  }, 5000);
});

const showContactForm = ref(false);
</script>

<template>
  <div class="flex w-full flex-col items-center py-12">
    <!-- Hero Sectie -->
    <header class="max-w-3xl text-center">
      <h1 class="font-zen_loop text-4xl text-gray-500">
        <strong>Zorg met een ❤️ voor jouw gezin</strong>
      </h1>
    </header>

    <!-- Over Ons -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="rounded-2xl border border-purple-300 bg-white p-6 shadow-xl transition hover:shadow-2xl">
        <h2 class="mb-3 font-zen_loop text-2xl text-gray-800">
          Onze Missie
        </h2>
        <p class="font-dosis text-gray-700">
          Wij bieden liefdevolle en professionele opvang en gezinsondersteuning op maat.

          Little Steps Care is ontstaan vanuit mijn jarenlange ervaring als oppas en de waardevolle inzichten die ik van mijn moeder heb meegekregen. Wij geloven dat elk gezin uniek is en dat kleine hulpjes in het dagelijks leven een groot verschil kunnen maken.

          Ons platform biedt een breed scala aan diensten, van algemene gezinsondersteuning en betrouwbare oppasservice tot persoonlijk advies en consultancy. We werken samen met professionals die ik persoonlijk ken en vertrouw, zodat we de best mogelijke begeleiding kunnen garanderen.

          Bij ons draait alles om maatwerk en het vinden van het juiste pakket voor jouw gezin. Of je nu kiest voor het ‘Basis Oppas Pakket’, het ‘Activiteiten Pakket’, het ‘Avond Pakket’, een ‘Overnachting Pakket’, of een speciaal pakket met een ‘Specialistische Nanny’ of ‘Consultancy’ – elk pakket is zorgvuldig samengesteld om perfect aan te sluiten bij jullie wensen en behoeften.
        </p>
      </div>
    </section>

    <!-- Diensten -->
    <section class="mt-16 w-full max-w-5xl">
      <h2 class="mb-8 text-center font-zen_loop text-3xl text-gray-900">
        Onze Diensten
      </h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <NuxtLink v-for="(service, index) in services" :key="index" :to="service.link" class="block" aria-label="Meer over {{ service.title }}">
          <article class="rounded-2xl border border-gray-300 bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:border-purple-400 hover:bg-purple-50">
            <h3 class="mb-2 font-zen_loop text-2xl text-gray-800">
              {{ service.title }}
            </h3>
            <p class="font-dosis text-gray-600">
              {{ service.description }}
            </p>
            <button class="mt-4 rounded-lg bg-[#C8A2C8] px-4 py-2 font-semibold text-white transition hover:bg-[#A983A2]">
              Lees meer
            </button>
          </article>
        </NuxtLink>
      </div>
    </section>

    <!-- Waarom kiezen voor onze Nannies? -->
    <section class="mt-16 w-full max-w-4xl">
      <h2 class="mb-8 text-center font-zen_loop text-3xl text-gray-900">
        Wat maakt onze Nannies en Consultants uniek?
      </h2>
      <div class="flex flex-col items-center rounded-2xl border border-gray-300 bg-white p-6 shadow-lg md:flex-row md:items-start">
        <img src="/Nanny.jpeg" alt="Nanny met kind" class="w-full rounded-lg shadow-md md:w-1/2">
        <div class="mt-6 text-center md:ml-6 md:mt-0 md:text-left">

<p class="mt-4 font-dosis text-gray-700">Wij kijken niet alleen naar beschikbaarheid, maar naar de perfecte match tussen gezin en Nanny of Consultant. Onze aanpak is persoonlijk en praktisch:</p>
<p class="mt-4 font-dosis text-gray-700">✔️ We sluiten aan bij jullie opvoedstijl en ondersteunen waar nodig.</p>
<p class="mt-4 font-dosis text-gray-700">✔️ We bieden begeleiding op maat – van vaste routines tot nieuwe inzichten.</p>
<p class="mt-4 font-dosis text-gray-700">✔️ We denken mee, kijken mee én doen mee in de praktijk, en helpen bij dagelijkse opvoedsituaties.</p>
<p class="mt-4 font-dosis text-gray-700">✔️ We zorgen voor continuïteit en een veilige, vertrouwde omgeving voor je kind.</p>

<p class="mt-4 font-dosis text-gray-700">Of het nu gaat om de eerste stap naar kinderopvang, schoolovergangen, opvoedvragen of de juiste communicatie met je kind, wij zijn er om je te helpen. Met zorg, aandacht en de juiste ondersteuning – stap voor stap. 💜</p>
        </div>
      </div>
    </section>

    <!-- Waarom Ons? -->
    <section class="mt-16 w-full max-w-4xl text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">
        Waarom kiezen voor Little Steps Care?
      </h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="font-zen_loop text-xl text-gray-800">
            🌟 Ervaring & Deskundigheid
          </h3>
          <p class="mt-2 font-dosis text-gray-600">
            Jarenlange ervaring in gezinsondersteuning en opvoedkundig advies.
          </p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="font-zen_loop text-xl text-gray-800">
            💜 Persoonlijke Aanpak
          </h3>
          <p class="mt-2 font-dosis text-gray-600">
            Elk gezin is uniek. Wij bieden maatwerk ondersteuning op basis van jouw behoeften.
          </p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="font-zen_loop text-xl text-gray-800">
            🔒 Betrouwbaar & Veilig
          </h3>
          <p class="mt-2 font-dosis text-gray-600">
            Gekwalificeerde en gescreende professionals voor een veilige omgeving.
          </p>
        </div>
      </div>
    </section>

    <div class="flex w-full flex-col items-center py-12">
    <h2 class="font-zen_loop text-3xl text-gray-900">
      Wat ouders zeggen over ons ❤️
    </h2>

    <!-- Reviews Carousel Component -->
    <ReviewCarousel />
  </div>

     <!-- Contact CTA -->
    <section class="mt-16 w-full text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">
        Ben jij enthousiast geworden en benieuwd naar de mogelijkheden?
      </h2>
      <p class="mt-2 font-dosis text-lg text-gray-700">
        Neem contact op via onderstaand contactformulier en wij nemen zo spoedig mogelijk contact met je op!
      </p>
      <button
        class="mt-6 inline-block rounded-lg bg-[#C8A2C8] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#A983A2]"
        @click="showContactForm = true"
      >
        Contactformulier
      </button>
    </section>

    <!-- Contact Form Popup -->
    <ContactFormPopup v-if="showContactForm" @close="showContactForm = false" />


  </div>


</template>
