<template>
  <div class="min-h-screen bg-gradient-to-r from-teal-100 via-pink-100 to-yellow-100 flex">
    <!-- Left Sidebar Menu -->
    <aside class="w-1/4 bg-gradient-to-b from-teal-500 via-pink-500 to-yellow-500 p-8 text-white rounded-r-3xl">
      <nav>
        <ul class="space-y-6">
          <!-- Jouw Gegevens Link -->
          <li>
            <NuxtLink to="/jouw-gegevens" class="text-lg font-dosis hover:text-gray-200">Jouw Gegevens</NuxtLink>
          </li>

          <!-- Gezinsgegevens Dropdown -->
          <li>
            <button class="text-lg font-dosis hover:text-gray-200 w-full text-left">
              Gezinsgegevens
            </button>
            <ul class="pl-4 space-y-4">
              <li>
                <NuxtLink to="/gezinsgegevens/stamboom" class="text-md hover:text-gray-200">Stamboom</NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Bullet Journal Link -->
          <li>
            <NuxtLink to="/bullet-journal" class="text-lg font-dosis hover:text-gray-200">Bullet Journal</NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow px-8 py-6">
      <!-- Ouderportaal Banner -->
      <header class="bg-gradient-to-r from-sand-300 via-mint-400 to-mint-500 p-8 text-center text-white rounded-b-3xl">
        <h1 class="text-4xl font-bold">Ouderportaal</h1>
      </header>

      <!-- Ouderportaal Overzicht -->
      <section class="text-center mb-8">
        <h2 class="text-3xl font-dosis text-teal-800">Welkom bij jouw Ouderportaal</h2>
        <p class="text-lg text-gray-700 mt-4">Hier kun je alle gezinsleden zien en beheren, en belangrijke updates ontvangen.</p>
      </section>

      <!-- Summary Section -->
      <section class="text-center mb-10">
        <h3 class="text-2xl font-dosis text-teal-700">Samenvatting van Alle Gegevens</h3>
        <div class="mt-6">
          <p class="text-lg text-gray-700 mb-4">Hier zie je een overzicht van de gegevens die je hebt ingevoerd:</p>

          <!-- Summary of Family Data -->
          <div class="bg-white p-6 rounded-2xl shadow-xl mb-4">
            <h4 class="text-xl font-dosis text-teal-800">Gezinsleden</h4>
            <ul class="mt-4">
              <li v-for="member in familyMembers" :key="member.id" class="text-gray-700">
                {{ member.name }} - {{ member.relationship }}
              </li>
            </ul>
          </div>

          <!-- Bullet Journal Summary -->
          <div class="bg-white p-6 rounded-2xl shadow-xl mb-4">
            <h4 class="text-xl font-dosis text-teal-800">Bullet Journal</h4>
            <p class="text-gray-700">Hier kun je je notities en belangrijke gebeurtenissen bijhouden.</p>
          </div>

          <!-- Jouw Gegevens Summary -->
          <div class="bg-white p-6 rounded-2xl shadow-xl mb-4">
            <h4 class="text-xl font-dosis text-teal-800">Jouw Gegevens</h4>
            <p class="text-gray-700">Hier kunnen ouders hun persoonlijke gegevens en voorkeuren invoeren.</p>
          </div>
        </div>
      </section>

      <!-- Button om gezinslid toe te voegen -->
      <section class="text-center">
        <button @click="addFamilyMember" class="bg-teal-500 text-white p-4 rounded-2xl shadow-lg hover:bg-teal-600">Voeg een Gezinslid Toe</button>
      </section>
    </main>

    <footer class="bg-gradient-to-r from-sand-300 via-mint-400 to-mint-500 py-6 text-center text-white mt-auto rounded-t-3xl">
      <p>© 2025 LittleStepsCare. Alle rechten voorbehouden.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Mock data voor gezinsleden
const familyMembers = ref([
  { id: 1, name: 'Jan de Vries', relationship: 'Vader' },
  { id: 2, name: 'Pietje de Vries', relationship: 'Moeder' },
  { id: 3, name: 'Lotte de Vries', relationship: 'Dochter' },
]);

const router = useRouter();

// Voeg een nieuw gezinslid toe (Dit zou verbonden moeten worden met een echte backend)
const addFamilyMember = () => {
  // Dit kan een formulier zijn om gezinsleden toe te voegen, hier simuleer ik het toevoegen van een nieuw lid.
  familyMembers.value.push({
    id: familyMembers.value.length + 1,
    name: 'Nieuw Lid',
    relationship: 'Nieuw',
  });
  alert('Gezinslid toegevoegd!');
};
</script>
