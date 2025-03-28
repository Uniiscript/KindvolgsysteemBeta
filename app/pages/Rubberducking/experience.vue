<template>
  <HeaderFooter>
    <!-- Experience Section -->
    <main class="flex-grow flex flex-col items-center mt-8 px-6 space-y-16">
      <!-- Ouderovergetuigenissen Carousel -->
      <section class="w-full max-w-4xl">
        <h2 class="text-3xl font-poppins mb-6 text-center">{{ translations[selectedLanguage].experience }}</h2>
        <div class="relative overflow-x-auto scrollbar-hidden">
          <div class="flex space-x-8 scroll-snap-x-mandatory">
            <!-- Herhaal dit voor elke getuigenis -->
            <div class="carousel-item w-80 p-6 bg-purple-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 scroll-snap-start">
              <p class="text-lg italic text-stone-600 mb-4">"Mijn dochter heeft zoveel geleerd en is altijd vrolijk als ze terugkomt van de opvang. De verzorgers zijn geweldig!"</p>
              <p class="font-bold text-stone-800">– Joris en Sofie, ouders van Emma</p>
            </div>
            <!-- Voeg meer items toe voor meerdere getuigenissen -->
            <div class="carousel-item w-80 p-6 bg-blue-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 scroll-snap-start">
              <p class="text-lg italic text-stone-600 mb-4">"De opvang heeft onze verwachtingen overtroffen. Onze zoon is er echt opgeknapt!"</p>
              <p class="font-bold text-stone-800">– Mark en Sarah, ouders van Noah</p>
            </div>
            <!-- Voeg meer items toe voor meerdere getuigenissen -->
          </div>
        </div>
      </section>

      <!-- Case Studies Carousel -->
      <section class="w-full max-w-4xl">
        <h2 class="text-3xl font-poppins mb-6 text-center">Case Studies</h2>
        <div class="relative overflow-x-auto scrollbar-hidden">
          <div class="flex space-x-8 scroll-snap-x-mandatory">
            <!-- Herhaal dit voor elke case study -->
            <div class="carousel-item w-80 p-6 bg-green-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 scroll-snap-start">
              <h3 class="text-2xl font-bold text-stone-800 mb-4">Case Study: De Ontwikkeling van Sam</h3>
              <p class="text-stone-600 mb-4">Sam begon als verlegen peuter, maar dankzij onze interactieve en zorgzame aanpak is hij nu een zelfverzekerde kleuter. We hebben zijn zelfvertrouwen kunnen opbouwen door hem nieuwe uitdagingen aan te bieden en zijn creativiteit te stimuleren.</p>
              <a href="#" class="text-stone-800 hover:text-stone-600 font-dosis">Lees meer</a>
            </div>
            <!-- Voeg meer items toe voor meer case studies -->
            <div class="carousel-item w-80 p-6 bg-yellow-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 scroll-snap-start">
              <h3 class="text-2xl font-bold text-stone-800 mb-4">Case Study: De Ontwikkeling van Laura</h3>
              <p class="text-stone-600 mb-4">Laura was altijd een beetje teruggetrokken, maar met de juiste zorg heeft ze enorme vooruitgang geboekt. Haar vertrouwen groeit dagelijks!</p>
              <a href="#" class="text-stone-800 hover:text-stone-600 font-dosis">Lees meer</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistieken en Resultaten -->
      <section class="w-full max-w-4xl">
        <h2 class="text-3xl font-poppins mb-6 text-center">Statistieken en Resultaten</h2>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <p class="text-lg text-stone-600 mb-4">97% van onze ouders geeft aan uiterst tevreden te zijn met onze opvangdiensten.</p>
          <p class="text-lg text-stone-600 mb-4">80% van de kinderen toont een significante verbetering in sociale vaardigheden binnen drie maanden na plaatsing.</p>
        </div>
      </section>
    </main>
  </HeaderFooter>
</template>

<script setup>
const selectedLanguage = ref('nl');

const translations = {
  nl: {
    experience: "Ervaring",
  },
  en: {
    experience: "Experience",
  }
};
</script>

<style scoped>
/* Verberg de scrollbalken */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Maak carrousel-elementen actief met scroll-snap */
.scroll-snap-x-mandatory {
  scroll-snap-type: x mandatory;
}

.carousel-item {
  flex-shrink: 0;
}
</style>
