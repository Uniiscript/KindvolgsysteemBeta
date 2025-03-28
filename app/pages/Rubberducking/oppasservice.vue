<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 via-yellow-100 to-pink-100 p-6">
    <header class="w-full text-center py-6 bg-white shadow-md rounded-lg">
      <h1 class="text-4xl font-bold text-gray-800">Welkom bij Onze Oppasservice</h1>
    </header>
    <main class="flex flex-col items-center w-full py-12">
      <p class="text-lg text-gray-700 max-w-2xl text-center mb-8">
        Vind de perfecte nanny voor jouw kinderen met onze betrouwbare oppasservice.
      </p>

      <!-- Flexbox voor Josje en Domini naast elkaar -->
      <div class="flex justify-between w-full max-w-5xl gap-6 mb-12">
        <!-- Josje Component -->
        <josjegridcard class="flex-1" />

        <!-- Domini Component -->
        <dominigridcard class="flex-1" />

        <!-- Sam Component -->
        <samgridcard class="flex-1" />
      </div>

      <h2 class="text-3xl font-bold text-gray-800 mt-12">Extra Diensten en Kosten</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-6">
        <div class="bg-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:bg-yellow-50">
          <ul class="list-disc pl-6 text-gray-700">
            <li><span class="font-dosis">Koken voor de kinderen</span> – €5 extra per dienst</li>
            <li><span class="font-dosis">Huiswerkbegeleiding</span> – €4 extra per uur</li>
            <li><span class="font-dosis">Licht huishoudelijk werk</span> – €6 extra per dienst</li>
            <li><span class="font-dosis">Brengen en halen</span> (school of sportclub) – €3 extra per rit</li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex gap-4">
        <NuxtLink to="/contact" class="px-6 py-3 bg-yellow-300 text-gray-800 font-dosis rounded-lg hover:bg-yellow-400 transition">
          Contacteer ons
        </NuxtLink>
        <NuxtLink to="/aanmelden" class="px-6 py-3 bg-pink-300 text-white font-dosis rounded-lg hover:bg-pink-400 transition">
          Meld je aan
        </NuxtLink>
      </div>
    </main>
    <footer class="w-full text-center py-6 bg-white mt-12 shadow-md rounded-lg">
      <p class="text-gray-600">© 2025 Onze Oppasservice. Alle rechten voorbehouden.</p>
    </footer>

    <div v-if="showAgenda" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button @click="showAgenda = false" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">X</button>
        <h2 class="text-xl font-dosis text-gray-800 mb-4 text-center">Agenda</h2>
        <Agenda />
      </div>
    </div>
  </div>
</template>

<script setup>
const showAgenda = ref(false);

function calculateAge (birthdate) {
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
