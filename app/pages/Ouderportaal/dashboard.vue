<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] p-6">
    <!-- Header -->
    <header class="w-full max-w-5xl flex justify-between items-center py-4 bg-white shadow-lg rounded-2xl px-6 mb-6 border border-gray-300">
      <h1 class="text-3xl md:text-4xl font-zen_loop text-gray-800">Ouder Dashboard</h1>
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
          Hier heb je toegang tot je gezinsgegevens, afspraken en gekoppelde Nannies & Consultants.
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
              <p class="text-lg font-dosis text-gray-800"><strong>{{ item.name || item.date }}</strong> - {{ item.description || item.role }}</p>
              <p class="text-sm text-gray-600">{{ item.extraInfo || '' }}</p>
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
          class="mt-4 px-4 py-2 bg-[#C8A2C8] text-white font-dosis font-zen_loop rounded-lg shadow-md hover:bg-[#A983A2] transition"
        >
          Opslaan
        </button>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = "Ouder";

// Data voor gekoppelde Nannies/Consultants
const linkedCaregivers = [
  { id: 1, name: "Sophie de Vries", role: "Nanny", extraInfo: "Beschikbaar op maandag en woensdag" },
  { id: 2, name: "Thomas Janssen", role: "Consultant", extraInfo: "Gespecialiseerd in opvoedadvies" },
];

// Data voor afspraken archief
const pastAppointments = [
  { id: 1, date: "2025-03-01", description: "Oppasdienst door Sophie de Vries", extraInfo: "Van 08:00 tot 16:00" },
  { id: 2, date: "2025-02-15", description: "Gezinscoaching met Thomas Janssen", extraInfo: "1-uur sessie" },
];

// Gezinsgegevens
const familyInfo = [
  { id: 3, name: "Lucas", description: "4 jaar oud, houdt van bouwen", extraInfo: "Heeft een notitie van de opvoedkundige" },
  { id: 4, name: "Emma", description: "2 jaar oud, houdt van knutselen", extraInfo: "Volgt een routine met vaste slaaptijden" },
];

// Dagboek invoer
const journalEntry = ref("");

function saveJournalEntry() {
  console.warn("Dagboek opgeslagen:", journalEntry.value);
  journalEntry.value = "";
}

// Secties met iconen en extra slots voor toekomstige functies
const sections = ref([
  {
    id: "linkedCaregivers",
    title: "Gekoppelde Nannies & Consultants",
    icon: "lucide:user-check",
    content: linkedCaregivers,
    emptyMessage: "Geen gekoppelde medewerkers.",
  },
  {
    id: "pastAppointments",
    title: "Archief van Afspraken",
    icon: "lucide:calendar-check",
    content: pastAppointments,
    emptyMessage: "Geen eerdere afspraken.",
  },
  {
    id: "familyInfo",
    title: "Gezinsgegevens",
    icon: "lucide:users",
    content: familyInfo,
    emptyMessage: "Geen gezinsgegevens toegevoegd.",
  },
  {
    id: "parentProfile",
    title: "Mijn Profiel",
    icon: "lucide:user",
    content: [],
    emptyMessage: "Bekijk en bewerk je profiel via de knop bovenaan.",
  },
  {
    id: "futureSlot1",
    title: "Kindvolgsysteem",
    icon: "lucide:clipboard-list",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  },
  {
    id: "futureSlot2",
    title: "Voeg Kindprofiel toe",
    icon: "lucide:user-plus",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  },
  {
    id: "futureSlot3",
    title: "Notities",
    icon: "lucide:sticky-note",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  },
  {
    id: "futureSlot4",
    title: "To Do",
    icon: "lucide:check-square",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  },
  {
    id: "futureSlot5",
    title: "Lifestyle Journaling",
    icon: "lucide:pen-tool",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  },
  {
    id: "futureSlot6",
    title: "Portfolio",
    icon: "fluent:content-view-gallery-16-regular",
    content: [],
    emptyMessage: "Binnenkort beschikbaar.",
  }
]);
</script>
