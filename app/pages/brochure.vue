<template>
  <div class="max-w-4xl mx-auto p-6 bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] shadow-lg rounded-2xl border border-gray-300">
    <!-- Paginanavigatie -->
    <div class="flex justify-between mb-6">
      <button @click="prevPage" :disabled="currentPage === 0" class="px-4 py-2 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-md hover:bg-[#A983A2] transition md:text-sm md:px-3 md:py-1">
        <span class="hidden md:inline">Vorige</span>
        <span class="md:hidden">&#60;</span>
      </button>
      <span class="text-2xl md:text-3xl font-bold text-gray-800 font-zen_loop">{{ pages[currentPage].title }}</span>
      <button @click="nextPage" :disabled="currentPage === pages.length - 1" class="px-4 py-2 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-md hover:bg-[#A983A2] transition md:text-sm md:px-3 md:py-1">
        <span class="hidden md:inline">Volgende</span>
        <span class="md:hidden">&#62;</span>
      </button>
    </div>

    <!-- Dynamische content per pagina -->
    <div v-html="pages[currentPage].content" class="text-gray-700 font-dosis bg-white p-6 rounded-xl shadow-md overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-[#C8A2C8] scrollbar-track-[#A8E6CF] scrollbar-thumb-rounded-lg">
    </div>
  </div>
</template>

<script setup>
const currentPage = ref(0);

const pages = ref([
  {
    title: "De Eerste Kleine Stapjes naar de Kinderopvang",
    content: `
      <p class='text-lg font-dosis text-gray-700 text-center'>Praktische tips & adviezen voor baby's vanaf 2,5 maand - De Newborn Fase</p>
      <section class="mb-6">
        <h2 class="text-xl font-zen_loop text-gray-700">Een grote stap voor ouder & kind</h2>
        <p class="text-gray-700 font-dosis mt-2">
          De afgelopen maanden heb je veel meegemaakt met je kleintje. Misschien was dit je eerste kindje,
          of beleef je dit opnieuw op een andere manier. De stap naar de kinderopvang is een <strong>grote mijlpaal</strong>
          en kan zowel spannend als emotioneel zijn.
        </p>
        <p class="text-gray-700 font-dosis mt-2">
          Het is helemaal normaal om vragen en twijfels te hebben. Hoe zal je baby reageren? Hoe wordt er gezorgd?
          En hoe combineer je dit met je eigen opvoedstijl?
          In deze brochure helpen we je op weg met <strong>praktische tips en inzichten</strong>.
        </p>
      </section>
      <section class="mb-6">
        <h2 class="text-xl font-zen_loop text-gray-700">Waarom kies je voor kinderopvang?</h2>
        <p class="text-gray-700 font-dosis mt-2">
          Er zijn verschillende redenen waarom ouders voor een kinderopvang kiezen. Dit kan zijn:
        </p>
        <ul class="list-disc ml-5 text-gray-700 font-dosis mt-2 space-y-1">
          <li>Terugkeer naar werk of studie</li>
          <li>Sociale interactie en ontwikkeling voor je baby</li>
          <li>Ondersteuning bij een gestructureerd dagritme</li>
          <li>Extra stimulatie en spelervaringen</li>
        </ul>
        <p class="text-gray-700 font-dosis mt-2">
          Denk goed na over wat jij belangrijk vindt voor je kindje. Iedere kinderopvang heeft een eigen <strong>beleid</strong> en aanpak.
          Vraag daarom altijd naar hoe zij werken en of dit aansluit bij jouw wensen.
        </p>
      </section>
    `
  },
  {
    title: "De Intake: Wat kun je verwachten?",
    content: `
      <h2 class='text-xl font-zen_loop text-gray-700'>Wat houdt de intake in?</h2>
      <p class='text-gray-700 font-dosis mt-2'>De intake is een kennismakingsgesprek waarin je met de pedagogisch medewerkers de dagelijkse routine van je baby bespreekt.</p>
      <h3 class='text-lg font-zen_loop text-gray-700 mt-4'>Belangrijke vragen die je kunt stellen:</h3>
      <ul class='list-disc ml-5 text-gray-700 font-dosis mt-2 space-y-1'>
        <li>Hoe ziet een doorsnee dag eruit voor baby's?</li>
        <li>Hoe wordt omgegaan met huilen en troosten?</li>
        <li>Wat zijn de protocollen voor voeding en slapen?</li>
      </ul>
    `
  },
  {
    title: "Een grote stap voor ouder & kind",
    content: `
      <h2 class='text-xl font-zen_loop text-gray-700'>Een grote stap voor ouder & kind</h2>
      <p class='text-gray-700 font-dosis mt-2'>De stap naar de kinderopvang kan zowel spannend als emotioneel zijn. In deze brochure helpen we je met praktische tips en inzichten.</p>
    `
  }
]);

function nextPage () {
  if (currentPage.value < pages.value.length - 1) {
    currentPage.value++;
  }
}

function prevPage () {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}
</script>

<style>
/* Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #A8E6CF;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #C8A2C8;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #A983A2;
}
</style>
