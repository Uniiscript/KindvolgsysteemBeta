<template>
  <HeaderFooter>
    <!-- Employee Functions -->
    <section class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold text-purple-700">{{ translations[selectedLanguage].employeeTitle }}</h2>
      <p class="text-gray-700">{{ translations[selectedLanguage].employeeText }}</p>
    </section>

    <!-- Parent Functions -->
    <section class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold text-blue-700">{{ translations[selectedLanguage].parentTitle }}</h2>
      <p class="text-gray-700">{{ translations[selectedLanguage].parentText }}</p>
    </section>

    <!-- Hiring Nannies -->
    <section class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-bold text-pink-700">{{ translations[selectedLanguage].nannyTitle }}</h2>
      <p class="text-gray-700">{{ translations[selectedLanguage].nannyText }}</p>
    </section>
  </HeaderFooter>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96">
      <h3 class="text-xl font-semibold text-center mb-4">{{ translations[selectedLanguage].login }}</h3>
      <div class="space-y-4">
        <button @click="selectRole('LittleStepsCare')" class="w-full bg-blue-500 text-white p-3 rounded-lg">LittleStepsCare</button>
        <button @click="selectRole('ParentCare')" class="w-full bg-green-500 text-white p-3 rounded-lg">ParentCare</button>
        <button @click="selectRole('NannyCare')" class="w-full bg-purple-500 text-white p-3 rounded-lg">NannyCare</button>
      </div>
      <button @click="showLoginModal = false" class="mt-4 w-full text-center text-gray-500">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderFooter from '@/components/HeaderFooter.vue';

const selectedLanguage = ref('nl');
const showLoginModal = ref(false);

const translations = {
  nl: {
    title: "LittleStepsCare",
    subtitle: "Een revolutionair platform voor kinderopvang, ouders en nannies",
    experience: "Ervaring",
    features: "Functies",
    contact: "Contact",
    footer: "Alle rechten voorbehouden.",
    login: "Log in om verder te gaan",
    employeeTitle: "Voor Medewerkers",
    employeeText: "Beheer roosters, rapporteer over de dag van het kind en communiceer met ouders via ons platform.",
    parentTitle: "Voor Ouders",
    parentText: "Bekijk de dagelijkse updates, voeg een dagplanning toe en boek eenvoudig extra opvang.",
    nannyTitle: "Nanny Inhuren",
    nannyText: "Huur gemakkelijk een gecertificeerde nanny via ons ouderportaal en beheer je boekingen eenvoudig.",
  },
  en: {
    title: "LittleStepsCare",
    subtitle: "A revolutionary platform for childcare, parents, and nannies",
    experience: "Experience",
    features: "Features",
    contact: "Contact",
    footer: "All rights reserved.",
    login: "Log in to continue",
    employeeTitle: "For Employees",
    employeeText: "Manage schedules, report on children's days, and communicate with parents via our platform.",
    parentTitle: "For Parents",
    parentText: "View daily updates, add a day schedule, and easily book extra care.",
    nannyTitle: "Hire a Nanny",
    nannyText: "Easily hire a certified nanny through our parent portal and manage your bookings efficiently.",
  }
};

function selectRole(role) {
  showLoginModal.value = false;
  console.log(`Selected role: ${role}`);
  // Redirect to role-specific login or dashboard
}
</script>
