<template>
  <div class="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen">
    <div class="container mx-auto p-6">
      <!-- Dashboard Header -->
      <div class="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h1 class="text-4xl font-semibold text-purple-800">Welkom op je Dashboard, {{ username }}</h1>
        <p class="text-lg text-gray-700 mt-2">Bekijk je aankomende diensten, zorg voor de kinderen en houd contact met ouders.</p>
      </div>

      <!-- Upcoming Services (Aankomende Diensten) -->
      <div class="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-2xl font-semibold text-purple-800 mb-4">Aankomende Diensten</h2>
        <div v-if="upcomingServices.length > 0" class="space-y-4">
          <div v-for="service in upcomingServices" :key="service.id" class="border-l-4 border-purple-600 pl-4">
            <p class="text-lg text-gray-800"><strong>{{ service.time }}</strong> - {{ service.description }}</p>
            <p class="text-sm text-gray-600">{{ service.location }}</p>
          </div>
        </div>
        <p v-else class="text-gray-600">Er zijn momenteel geen aankomende diensten.</p>
      </div>

      <!-- Children in Care (Kinderen in Zorg) -->
      <div class="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-2xl font-semibold text-purple-800 mb-4">Kinderen in Zorg</h2>
        <div v-if="childrenInCare.length > 0" class="space-y-4">
          <div v-for="child in childrenInCare" :key="child.id" class="border-b border-gray-300 pb-4">
            <h3 class="text-xl text-purple-600">{{ child.name }}</h3>
            <p class="text-sm text-gray-600">Leeftijd: {{ child.age }} jaar</p>
            <p class="text-sm text-gray-600">Notities: {{ child.notes }}</p>
          </div>
        </div>
        <p v-else class="text-gray-600">Er zijn momenteel geen kinderen in zorg.</p>
      </div>

      <!-- Important Notes or Messages (Belangrijke Notities/Berichten) -->
      <div class="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-2xl font-semibold text-purple-800 mb-4">Belangrijke Notities/Berichten</h2>
        <div v-if="importantMessages.length > 0" class="space-y-4">
          <div v-for="message in importantMessages" :key="message.id" class="border-l-4 border-yellow-600 pl-4">
            <p class="text-lg text-gray-800">{{ message.text }}</p>
            <p class="text-sm text-gray-500">{{ message.date }}</p>
          </div>
        </div>
        <p v-else class="text-gray-600">Er zijn momenteel geen nieuwe berichten of notities.</p>
      </div>

      <!-- Calendar (Agenda) -->
      <div class="bg-white p-6 rounded-lg shadow-xl mb-6">
        <h2 class="text-2xl font-semibold text-purple-800 mb-4">Je Agenda</h2>
        <div class="text-center">
          <p class="text-lg text-gray-700 mb-4">Bekijk je rooster en geplande diensten voor de komende week.</p>
          <button @click="showCalendar" class="bg-purple-600 text-white px-4 py-2 rounded-lg">Bekijk Kalender</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Mock data voor aankomende diensten, kinderen in zorg, en belangrijke berichten
const username = 'Medewerker'; // Dit kan worden ingesteld op basis van de ingelogde gebruiker
const upcomingServices = ref([
  { id: 1, time: '08:00 - 16:00', description: 'Diensten bij Kinderdagverblijf De Tuin', location: 'Amsterdam' },
  { id: 2, time: '12:00 - 18:00', description: 'Ophalen en zorgen voor Kinderen', location: 'Utrecht' },
]);

const childrenInCare = ref([
  { id: 1, name: 'Luca', age: 3, notes: 'Luca is erg energiek, houdt van tekenen.' },
  { id: 2, name: 'Sophie', age: 5, notes: 'Sophie houdt van knutselen en spelen met blokken.' },
]);

const importantMessages = ref([
  { id: 1, text: 'Let op! Nieuwe richtlijnen voor hygiëne', date: '2025-01-28' },
  { id: 2, text: 'Vergeet niet je vakantie aanvraag in te dienen!', date: '2025-01-20' },
]);

// Functie om de kalender weer te geven
const showCalendar = () => {
  // Dit zou een navigatie kunnen zijn naar een pagina die een kalender toont
  alert('Kalender wordt geopend...');
};

onMounted(() => {
  // Logica die wordt uitgevoerd zodra de component is geladen
  // Bijvoorbeeld: ophalen van gegevens van een API
});
</script>

<style scoped>
/* Voeg hier extra styling toe indien nodig */
</style>
