<template>
    <!-- Josje -->
    <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-blue-50 text-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Josje</h2>
      <p class="text-gray-600">👶 20+ jaar ervaring met baby's</p>
      <p class="text-gray-600">🏡 Functie: Founder Little Steps Care</p>
      <p class="text-gray-600">🧑‍🏫 Allround Gezinsondersteuning en Nanny</p>
      <p class="text-gray-800 font-bold mb-4">🎂 Leeftijd: {{ calculateAge('1991-06-15') }} jaar</p>
      <NuxtLink to="/staff/josje" class="mt-4 px-4 py-2 bg-purple-300 text-white font-semibold rounded-lg hover:bg-purple-400 transition">Josje stelt zich aan jullie voor</NuxtLink>
      <br>
      <button @click="showAgenda = true" class="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Beschikbaarheid</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showAgenda = ref(false);

const calculateAge = (birthdate: string) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
</script>

<style scoped>
</style>
