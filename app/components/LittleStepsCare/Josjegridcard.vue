<template>
    <!-- Sam -->
    <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-blue-50 text-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Sam</h2>
      <p class="text-gray-600">👶 Oppaservaring 15+ jaar, en 20 jaar ervaring met kinderen.</p>
      <p class="text-gray-600">🏡 Locatie: Amsterdam +25km & Breda +25km</p>
      <p class="text-gray-600">🧑‍🏫 Founder Little Steps Care & overall gezinsondersteuner en Nanny</p>
      <p class="text-gray-600">🎓 Gespecialiseerd Pedagogisch Medewerker</p>
      <p class="text-gray-800 font-bold mb-4">🎂 Leeftijd: {{ calculateAge('1991-06-15') }} jaar</p>
      <NuxtLink to="/staff/sam" class="mt-4 px-4 py-2 bg-purple-300 text-white font-semibold rounded-lg hover:bg-purple-400 transition">Josje stelt zich graag aan jullie voor</NuxtLink>
      <br>
      <button @click="showAgenda = true" class="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Beschikbaarheid</button>
    </div>
</template>

<script lang="ts" setup>
const showAgenda = ref(false);

function calculateAge (birthdate: string) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
</script>

<style scoped>
</style>

