<script lang="ts" setup>
const showAgenda = ref(false)

function calculateAge(birthdate: string) {
	const birthDate = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
		age--
  }
	return age
}
</script>

<template>
  <!-- Sam Grid Card -->
  <div class="rounded-2xl border border-purple-400 bg-white p-6 shadow-md transition hover:scale-105 hover:border-[#A8E6CF]">
    <h3 class="font-zen_loop text-xl text-gray-700">
      S a m
    </h3>
    <p class="text-xs text-gray-500">
      🎂 {{ calculateAge('2000-10-23') }} jaar
    </p>

    <p class="mt-2 font-dosis text-gray-600">
      ❤️ Gespecialiseerde Nanny
    </p>
    <ul class="mt-4 space-y-2 font-dosis text-gray-700">
      <li>🎓 Diploma: Sport en bewegingscoördinator</li>
      <li>🍼 Specialiteiten: Actieve activiteiten & Onderwijsondersteuning</li>
      <li>✨ Specials: Kinderen met speciale behoeften</li>
      <li>📍 Locatie: Hilversum e.o.</li>
      <li>📅 Werkbare dagen: ovb</li>
    </ul>
    <p class="my-4 text-lg font-semibold text-gray-800">
      💰 vanaf €20,5 per uur
    </p>

    <NuxtLink to="/staff/sam" class="mt-4 rounded-lg bg-purple-300 px-4 py-2 font-semibold text-white transition hover:bg-purple-400">
      Meer informatie
    </NuxtLink>
    <br>
    <button class="mt-2 inline-block rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600" @click="showAgenda = true">
      Beschikbaarheid
    </button>
  </div>
</template>

<style scoped>
</style>
