<template>
  <!-- Domini -->
  <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-blue-50 text-center">
    <h2 class="text-2xl font-semibold text-gray-700 mb-2">Domini</h2>
    <p class="text-gray-600">🎓 Gespecialiseerd in pedagogische ondersteuning</p>
    <p class="text-gray-600">🏥 Gediplomatiseerd Medische Ondersteuning</p>
    <p class="text-gray-600">🏡 Locatie: Flevoland e.o</p>
    <p class="text-gray-600">💖 Karakter: Geduldig - Empathisch - Meedenkend</p>
    <p class="text-gray-800 font-bold mb-4">🎂 Leeftijd: {{ calculateAge('1994-07-03') }} jaar</p>
    <NuxtLink to="#" class="mt-4 px-4 py-2 bg-blue-300 text-white font-semibold rounded-lg hover:bg-blue-400 transition">Domini stelt zich graag aan jullie voor.</NuxtLink>
    <br>
    <button @click="showAgenda = true" class="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Beschikbaarheid</button>
  </div>
</template>

<script lang="ts" setup>
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
