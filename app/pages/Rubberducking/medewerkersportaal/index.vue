<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-r from-purple-100 via-yellow-100 to-pink-100 p-6">
    <!-- Header -->
    <header class="w-full flex justify-between items-center py-6 bg-white shadow-md rounded-lg px-6 mb-6">
      <h1 class="text-4xl font-bold text-gray-800">Little Steps Care Dashboard</h1>
      <button class="px-6 py-3 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
        Uitloggen
      </button>
    </header>

    <!-- Main Content -->
    <main class="w-full max-w-5xl">
      <!-- Welkomstbericht -->
      <section class="bg-white shadow-lg rounded-2xl p-6 mb-6 text-center">
        <h2 class="text-3xl font-semibold text-gray-800">Welkom, {{ username }}!</h2>
        <p class="text-lg text-gray-700 mt-2">
          Hier vind je je geplande diensten, informatie over de kinderen in je Bubble.Care en belangrijke mededelingen.
        </p>
      </section>

      <!-- Versleepbare Sections -->
      <draggable v-model="sections" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" :animation="200">
        <div v-for="section in sections" :key="section.id" class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105" :style="section.style">
          <h2 class="text-2xl font-semibold text-gray-700 mb-2">{{ section.title }}</h2>
          <div v-if="section.content.length > 0" class="space-y-4">
            <div v-for="item in section.content" :key="item.id" class="border-l-4 border-purple-600 pl-4">
              <p class="text-lg text-gray-800"><strong>{{ item.time || item.name }}</strong> - {{ item.description || item.notes }}</p>
              <p class="text-sm text-gray-600">{{ item.location || item.age }} {{ item.date || '' }}</p>
            </div>
          </div>
          <p v-else class="text-gray-600">{{ section.emptyMessage }}</p>
        </div>
      </draggable>

      <!-- Dag Journaling -->
      <section class="bg-white shadow-lg rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Dag Journaling</h2>
        <textarea v-model="journalEntry" class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" rows="4" placeholder="Schrijf hier je dagervaringen..."></textarea>
        <button @click="saveJournalEntry" class="mt-4 px-4 py-2 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-400 transition">
          Opslaan
        </button>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full text-center py-6 bg-white mt-12 shadow-md rounded-lg">
      <p class="text-gray-600">© 2025 Little Steps Care. Alle rechten voorbehouden.</p>
    </footer>
  </div>
</template>

<script setup>
const username = 'Medewerker';

const upcomingServices = [
  { id: 1, time: '08:00 - 16:00', description: 'Oppasdienst bij Familie de Vries', location: 'Amsterdam' },
  { id: 2, time: '14:00 - 18:00', description: 'Activiteitenbegeleiding', location: 'Utrecht' },
];

const childrenInCare = [
  { id: 1, name: 'Luca', age: 3, notes: 'Energiek, houdt van tekenen.' },
  { id: 2, name: 'Sophie', age: 5, notes: 'Speelt graag met blokken.' },
];

const importantMessages = [
  { id: 1, text: 'Nieuwe richtlijnen voor hygiëne.', date: '2025-01-28' },
  { id: 2, text: 'Denk aan je vakantieplanning!', date: '2025-01-20' },
];

const journalEntry = ref('');
function saveJournalEntry () {
  console.warn('Dagboek opgeslagen:', journalEntry.value);
  journalEntry.value = '';
}

// Define sections for drag-and-drop
const sections = ref([
  {
    id: 'welkomstbericht',
    title: 'Welkom, {{ username }}!',
    content: [],
    style: 'bg-white shadow-lg rounded-2xl p-6 text-center mb-6',
    emptyMessage: ''
  },
  {
    id: 'aankomendeDiensten',
    title: 'Aankomende Diensten',
    content: upcomingServices,
    style: 'bg-white shadow-lg rounded-2xl p-6 hover:bg-purple-50',
    emptyMessage: 'Geen geplande diensten.'
  },
  {
    id: 'bubbleCare',
    title: 'Bubble Care',
    content: childrenInCare,
    style: 'bg-white shadow-lg rounded-2xl p-6 hover:bg-yellow-50',
    emptyMessage: 'Geen kinderen in zorg.'
  },
  {
    id: 'belangrijkeMededelingen',
    title: 'Belangrijke Mededelingen',
    content: importantMessages,
    style: 'bg-white shadow-lg rounded-2xl p-6 hover:bg-pink-50',
    emptyMessage: 'Geen nieuwe mededelingen.'
  },
]);

onMounted(() => {
  // Possible API-call for data
});
</script>
