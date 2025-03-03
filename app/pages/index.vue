<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 via-yellow-100 to-pink-100 p-6">
    <!-- Header -->
    <header class="w-full flex justify-between items-center py-6 bg-white shadow-md rounded-lg px-6">
      <h1 class="text-4xl font-bold text-gray-800">Little Steps Care</h1>
      <!-- Inlogknop met popup -->
      <button @click="showLogin = true" class="px-6 py-3 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
        Inloggen
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex flex-col items-center w-full py-12">
      <p class="text-lg text-gray-700 max-w-2xl text-center mb-8">
        Welkom bij Little Steps Care! Wij bieden liefdevolle en professionele opvang en gezinsondersteuning op maat.
      </p>

     <!-- Overkoepelend verhaal -->
<section class="mb-12 max-w-2xl text-center">
  <div class="bg-white shadow-lg rounded-2xl p-6">
    <p class="text-lg text-gray-700">
      Little Steps Care is ontstaan vanuit mijn jarenlange ervaring als oppas en de waardevolle inzichten die ik van mijn moeder heb meegekregen. Wij geloven dat elk gezin uniek is en dat de kleine hulpjes in het dagelijks leven een wereld van verschil kunnen maken.
    </p>
    <p class="text-lg text-gray-700 mt-4">
      Ons platform biedt een breed scala aan services – van algemene gezinsondersteuning en betrouwbare oppasservice tot persoonlijk advies en consultancy. Wij werken samen met professionals die ik persoonlijk ken en vertrouw, zodat we de best mogelijke begeleiding kunnen garanderen.
    </p>
    <p class="text-lg text-gray-700 mt-4">
      Bij ons staat de aandacht voor het aanbieden van de juiste pakketten centraal. Of het nu gaat om het 'Basis Oppas Pakket', het 'Activiteiten Pakket', het 'Avond Pakket', een 'Overnachting Pakket', of een pakket met een 'Specialistische Nanny' of 'Consultancy' – elk pakket is zorgvuldig samengesteld om perfect aan te sluiten bij de behoeften van jouw gezin.
    </p>
  </div>
</section>

      <!-- Services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <NuxtLink v-for="(service, index) in services" :key="index" :to="service.link" class="block">
          <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-purple-50">
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">{{ service.title }}</h2>
            <p class="text-gray-600">{{ service.description }}</p>
            <button class="mt-4 px-4 py-2 bg-purple-300 text-white font-semibold rounded-lg hover:bg-purple-400 transition">
              Lees meer
            </button>
          </div>
        </NuxtLink>
      </div>

      <!-- Pakketten -->
      <h2 class="text-3xl font-bold text-gray-800 mt-12">Onze Pakketten</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
        <div v-for="(packageItem, index) in packages" :key="index" class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-yellow-50">
          <h3 class="text-2xl font-semibold text-gray-700 mb-2">{{ packageItem.title }}</h3>
          <p class="text-gray-600 mb-4">{{ packageItem.description }}</p>
          <button class="px-4 py-2 bg-pink-300 text-white font-semibold rounded-lg hover:bg-pink-400 transition">
            Meer info
          </button>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-12 flex gap-4">
        <NuxtLink to="/contact" class="px-6 py-3 bg-yellow-300 text-gray-800 font-semibold rounded-lg hover:bg-yellow-400 transition">
          Contacteer ons
        </NuxtLink>
        <NuxtLink to="/aanmelden" class="px-6 py-3 bg-pink-300 text-white font-semibold rounded-lg hover:bg-pink-400 transition">
          Meld je aan
        </NuxtLink>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full text-center py-6 bg-white mt-12 shadow-md rounded-lg">
      <p class="text-gray-600">© 2025 Little Steps Care. Alle rechten voorbehouden.</p>
    </footer>

    <!-- Login Popup Component -->
    <LoginPopup :isOpen="showLogin" @close="showLogin = false" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const showLogin = ref(false);

const services = [
  { title: "Overall Gezinsondersteuning", description: "Op maat gemaakte ondersteuning voor het hele gezin.", link: "/gezinsondersteuning" },
  { title: "Oppasservice", description: "Betrouwbare oppassers met extra services zoals verslagen en kindvolgsystemen.", link: "/oppasservice" },
  { title: "Consultancy & Advies", description: "Persoonlijk advies en begeleiding voor ouders.", link: "/consultancy" },
];

const packages = [
  { title: "Basis Oppas Pakket", description: "Kinderen brengen/halen van school door gescreende nannies met rijbewijs." },
  { title: "Activiteiten Pakket", description: "Nanny biedt ontwikkelingsgerichte activiteiten en zorgt voor materialen." },
  { title: "Avond Pakket", description: "Nanny kookt, geeft kinderen eten en brengt ze naar bed." },
  { title: "Overnachting Pakket", description: "Nanny met overnachting en ondersteuning bij sportactiviteiten." },
  { title: "Specialistische Nanny", description: "Ervaren nanny met slaapcoaching skills of expertise in eetgedrag." },
  { title: "Consultancy Pakket", description: "Persoonlijke begeleiding en plan van aanpak op maat." },
];
</script>
