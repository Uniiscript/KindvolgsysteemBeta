<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] p-6">
    <!-- Header -->
    <header class="w-full max-w-5xl flex justify-between items-center py-4 bg-white shadow-lg rounded-2xl px-6 mb-6 border border-gray-300">
      <h1 class="text-3xl md:text-4xl font-zen_loop text-gray-800">Little Steps Care Dashboard</h1>
      <NuxtLink to="/profiel" class="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
        <Icon name="lucide:user-circle" class="w-10 h-10 text-gray-800" />
        <span class="text-lg font-zen_loop text-gray-800 hidden md:inline">Mijn Profiel</span>
      </NuxtLink>
    </header>

    <!-- Main Content -->
    <main class="w-full max-w-5xl">
      <!-- Welkomstbericht -->
      <section class="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300 text-center">
        <h2 class="text-2xl md:text-3xl font-meow_script text-gray-800">Welkom, {{ username }}!</h2>
        <p class="text-lg font-dosis text-gray-700 mt-2">
          Hier vind je je geplande diensten, informatie over de kinderen in je Bubble.Care en belangrijke mededelingen.
        </p>
      </section>

      <!-- Draggable Sections -->
      <draggable v-model="sections" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" :animation="200">
        <div
          v-for="section in sections"
          :key="section.id"
          class="bg-white shadow-lg rounded-2xl p-6 border border-gray-300 transition-transform transform hover:scale-105 hover:border-purple-400 hover:bg-purple-50"
        >
          <div class="flex items-center space-x-3 mb-3">
            <Icon :name="section.icon" class="w-6 h-6 text-[#C8A2C8]" />
            <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">{{ section.title }}</h2>
          </div>
          <div v-if="section.content.length > 0" class="space-y-4">
            <div v-for="item in section.content" :key="item.id" class="border-l-4 border-[#C8A2C8] pl-4">
              <p class="text-lg font-dosis text-gray-800"><strong>{{ item.time || item.name }}</strong> - {{ item.description || item.notes }}</p>
              <p class="text-sm text-gray-600">{{ item.location || item.age }} {{ item.date || '' }}</p>
            </div>
          </div>
          <p v-else class="text-gray-600 font-dosis">{{ section.emptyMessage }}</p>
        </div>
      </draggable>

      <!-- Dag Journaling -->
      <section class="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300">
        <div class="flex items-center space-x-3 mb-3">
          <Icon name="lucide:book-open" class="w-6 h-6 text-[#C8A2C8]" />
          <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">Dag Journaling</h2>
        </div>
        <textarea
          v-model="journalEntry"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A2C8] font-dosis"
          rows="4"
          placeholder="Schrijf hier je dagervaringen..."
        ></textarea>
        <button
          @click="saveJournalEntry"
          class="mt-4 px-4 py-2 bg-[#C8A2C8] text-white font-semibold font-zen_loop rounded-lg shadow-md hover:bg-[#A983A2] transition"
        >
          Opslaan
        </button>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full max-w-5xl text-center py-6 bg-white mt-12 shadow-md rounded-2xl border border-gray-300">
      <p class="text-gray-600 font-dosis">© 2025 Little Steps Care. Alle rechten voorbehouden.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = "Medewerker";

// Data voor geplande diensten
const upcomingServices = [
  { id: 1, time: "08:00 - 16:00", description: "Oppasdienst bij Familie de Vries", location: "Amsterdam" },
  { id: 2, time: "14:00 - 18:00", description: "Activiteitenbegeleiding", location: "Utrecht" },
];

// Data voor kinderen in zorg
const childrenInCare = [
  { id: 1, name: "Luca", age: 3, notes: "Energiek, houdt van tekenen." },
  { id: 2, name: "Sophie", age: 5, notes: "Speelt graag met blokken." },
];

// Belangrijke mededelingen
const importantMessages = [
  { id: 1, text: "Nieuwe richtlijnen voor hygiëne.", date: "2025-01-28" },
  { id: 2, text: "Denk aan je vakantieplanning!", date: "2025-01-20" },
];

// Dagboek invoer
const journalEntry = ref("");

function saveJournalEntry() {
  console.warn("Dagboek opgeslagen:", journalEntry.value);
  journalEntry.value = "";
}

// Draggable secties met iconen en aangepaste fonts
const sections = ref([
  {
    id: "aankomendeDiensten",
    title: "Aankomende Diensten",
    icon: "lucide:list",
    content: upcomingServices,
    emptyMessage: "Geen geplande diensten.",
  },
  {
    id: "bubbleCare",
    title: "Klant.Care",
    icon: "lucide:users",
    content: childrenInCare,
    emptyMessage: "Geen kinderen in zorg.",
  },
  {
    id: "mijnAgenda",
    title: "Mijn Agenda",
    icon: "lucide:calendar",
    content: [],
    emptyMessage: "Geen afspraken gepland.",
  },
  {
    id: "blogCare",
    title: "Blog.Care",
    icon: "lucide:newspaper",
    content: [],
    emptyMessage: "Nog geen nieuwe blogposts.",
  },
  {
    id: "belangrijkeMededelingen",
    title: "Belangrijke Mededelingen",
    icon: "lucide:bell",
    content: importantMessages,
    emptyMessage: "Geen nieuwe mededelingen.",
  },
]);
</script>
