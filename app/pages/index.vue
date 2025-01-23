<script lang="ts" setup>
import { authConfig } from '~~/shared/authConfig';
</script>

<template>
  <div class="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col">
    <header class="bg-gradient-to-r from-purple-500 to-blue-500 w-full py-8 shadow-lg rounded-b-3xl">
      <h1 class="text-5xl font-bold text-center text-white">LittleStepsCare</h1>
      <p class="text-center text-blue-200 mt-4">Een alles-in-één platform voor kinderopvang en oudercommunicatie</p>
    </header>

    <main class="flex-grow flex flex-col items-center mt-8 px-6">
      <section class="text-center max-w-3xl mb-10">
        <h2 class="text-4xl font-semibold text-purple-800 mb-6">Geef kinderen een stapje voor in hun ontwikkeling</h2>
        <p class="text-gray-800 text-lg leading-relaxed">
          Beheer kindprofielen, volg ontwikkelingsmijlpalen, deel dagrapporten en communiceer direct met ouders. Alles wat je nodig hebt voor transparante en efficiënte kinderopvang.
        </p>
      </section>

      <div class="animate-bounce bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-full px-8 py-4 mb-8 shadow-xl">
        <NuxtLink external :to="`${authConfig.githubSigninURL}`" class="text-xl font-medium">
          Inloggen met Github
        </NuxtLink>
      </div>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Kindprofielen beheren</h3>
          <p class="text-gray-700">
            Houd belangrijke gegevens van kinderen bij, inclusief contactinformatie, medische gegevens en meer.
          </p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Ontwikkelingsmijlpalen</h3>
          <p class="text-gray-700">
            Volg de voortgang van kinderen in sociale, emotionele en fysieke vaardigheden.
          </p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Dagrapportages</h3>
          <p class="text-gray-700">
            Deel dagelijkse activiteiten, maaltijden en observaties rechtstreeks met ouders.
          </p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Communicatie</h3>
          <p class="text-gray-700">
            Eenvoudige communicatie tussen ouders en kinderopvangmedewerkers.
          </p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Overzichten en rapporten</h3>
          <p class="text-gray-700">
            Genereer gedetailleerde rapporten over aanwezigheid, voortgang en meer.
          </p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 border border-purple-300">
          <h3 class="text-2xl font-semibold mb-3 text-purple-800">Privacy en beveiliging</h3>
          <p class="text-gray-700">
            Geavanceerde beveiligingsfuncties om gegevens veilig te bewaren.
          </p>
        </div>
      </section>

      <section class="mt-12 text-center">
        <div class="bg-gradient-to-r from-pink-300 to-purple-300 text-purple-900 rounded-lg p-8 shadow-xl w-2/3 lg:w-1/3 mx-auto">
          <h3 class="text-2xl font-semibold mb-4">Samen bouwen aan een veilige en stimulerende omgeving</h3>
          <p class="text-gray-800 text-lg">
            LittleStepsCare helpt ouders en medewerkers bij het bieden van de beste zorg en ondersteuning aan kinderen.
          </p>
        </div>
      </section>
    </main>

    <footer class="bg-gradient-to-r from-purple-600 to-blue-600 w-full py-6 rounded-t-3xl mt-auto">
      <p class="text-center text-blue-200">© 2025 LittleStepsCare. Alle rechten voorbehouden.</p>
    </footer>
  </div>
</template>
