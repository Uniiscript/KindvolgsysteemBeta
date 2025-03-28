<template>
  <div class="bg-stone-300 py-16 px-8">
    <h1 class="text-4xl font-whiteheart text-center mb-12">Wat Ouders Zeggen</h1>

    <!-- Ouderovergetuigenissen -->
    <section class="mb-16">
      <h2 class="text-3xl font-poppins mb-6">Ouderovergetuigenissen</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Herhaal dit voor elke getuigenis -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <p class="text-lg italic text-stone-600 mb-4">"Mijn dochter heeft zoveel geleerd en is altijd vrolijk als ze terugkomt van de opvang. De verzorgers zijn geweldig!"</p>
          <p class="font-bold text-stone-800">– Joris en Sofie, ouders van Emma</p>
        </div>
        <!-- Einde herhaalblok -->
      </div>
    </section>

    <!-- Case Studies -->
    <section class="mb-16">
      <h2 class="text-3xl font-poppins mb-6">Case Studies</h2>
      <div class="space-y-8">
        <!-- Herhaal dit voor elke case study -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-2xl font-bold text-stone-800 mb-4">Case Study: De Ontwikkeling van Sam</h3>
          <p class="text-stone-600 mb-4">Sam begon als verlegen peuter, maar dankzij onze interactieve en zorgzame aanpak is hij nu een zelfverzekerde kleuter. We hebben zijn zelfvertrouwen kunnen opbouwen door hem nieuwe uitdagingen aan te bieden en zijn creativiteit te stimuleren.</p>
          <a href="#" class="text-stone-800 hover:text-stone-600 font-dosis">Lees meer</a>
        </div>
        <!-- Einde herhaalblok -->
      </div>
    </section>

    <!-- Verzorgers en Medewerkers Verhalen -->
    <section class="mb-16">
      <h2 class="text-3xl font-poppins mb-6">Onze Verzorgers en Medewerkers</h2>
      <div class="space-y-8">
        <!-- Herhaal dit voor elke medewerker -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-2xl font-bold text-stone-800 mb-4">Marianne, Pedagogisch Medewerker</h3>
          <p class="text-stone-600 mb-4">"Ik werk met passie om kinderen te helpen groeien, zowel sociaal als emotioneel. Het mooiste is om te zien hoe kinderen zich ontwikkelen in een veilige en stimulerende omgeving." </p>
        </div>
        <!-- Einde herhaalblok -->
      </div>
    </section>

    <!-- Statistieken en Resultaten -->
    <section>
      <h2 class="text-3xl font-poppins mb-6">Statistieken en Resultaten</h2>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <p class="text-lg text-stone-600 mb-4">97% van onze ouders geeft aan uiterst tevreden te zijn met onze opvangdiensten.</p>
        <p class="text-lg text-stone-600 mb-4">80% van de kinderen toont een significante verbetering in sociale vaardigheden binnen drie maanden na plaatsing.</p>
      </div>
    </section>

    <!-- Visuals -->
    <section class="mt-16">
      <h2 class="text-3xl font-poppins mb-6">Sfeer en Activiteiten</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Herhaal dit voor elke foto -->
        <!-- <div class="bg-gray-200 rounded-lg overflow-hidden">
          <img src="baby01.jpg" alt="Activiteit 1" class="w-full h-56 object-cover">
        </div> -->
        <!-- Einde herhaalblok -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ErvaringPage'
}
</script>

<style scoped>
/* Je kunt hier extra styling toevoegen indien nodig */
</style>
