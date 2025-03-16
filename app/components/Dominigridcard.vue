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
  <div class="rounded-2xl border border-purple-400 bg-white p-6 shadow-md transition hover:scale-105 hover:border-[#A8E6CF]">
    <h3 class="font-zen_loop text-xl text-gray-700">
      👩‍⚕️ D o m i n i
    </h3>
    <p class="text-xs text-gray-500">
      🎂 {{ calculateAge('1994-07-03') }} jaar
    </p>

    <p class="mt-2 font-dosis text-gray-600">
      ❤️ Pedagogisch professional & Nanny
    </p>
    <ul class="mt-4 space-y-2 font-dosis text-gray-700">
      <li>🎓 Diploma: Pedagogiek & Kindercoaching</li>
      <li>🍼 Specialiteiten: Peuters & kleuters</li>
      <li>✨ Specials: Coaching en emotionele ontwikkeling</li>
      <li>📍 Locatie: Flevoland e.o.</li>
      <li>📅 Werkbare dagen: Ma - Vr</li>
    </ul>
    <p class="my-4 text-lg font-semibold text-gray-800">
      💰 vanaf €22,5 per uur
    </p>

    <NuxtLink to="/staff/domini" class="mt-4 rounded-lg bg-purple-300 px-4 py-2 font-semibold text-white transition hover:bg-purple-400">
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
