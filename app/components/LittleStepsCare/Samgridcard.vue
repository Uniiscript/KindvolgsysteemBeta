<template>
    <!-- Sam -->
    <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-blue-50 text-center">
      <h2 class="text-2xl font-semibold text-gray-700 mb-2">Sam</h2>
      <p class="text-gray-600">👶 Oppaservaring 10+ jaar
        met ervaring met kinderen met spaciale behoeften</p>
      <p class="text-gray-600">🏡 Locatie: Hilversum e.o</p>
      <p class="text-gray-600">🧑‍🏫 Nanny en onderwijsondersteuning</p>
      <p class="text-gray-600">🎓 Gespecialiseerd Sport en bewegingscoordinator</p>
      <p class="text-gray-800 font-bold mb-4">🎂 Leeftijd: {{ calculateAge('2000-10-23') }} jaar</p>
      <NuxtLink to="/staff/sam" class="mt-4 px-4 py-2 bg-purple-300 text-white font-semibold rounded-lg hover:bg-purple-400 transition">Sam stelt zich graag aan jullie voor</NuxtLink>
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
