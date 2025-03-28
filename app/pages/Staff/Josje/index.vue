<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <header class="text-center py-6 mb-12 max-w-3xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug font-zen_loop">
        Mijn Reis als Pedagogisch Medewerker, Leidinggevende en Oppas, en nu mijn eigen bedrijf!
      </h1>
    </header>

    <!-- Verhaal -->
    <section class="bg-white shadow-lg rounded-2xl p-6 sm:p-10 mb-16 max-w-3xl mx-auto">
      <p class="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed font-dosis">
        Tijdens mijn werk als pedagogisch medewerker, leidinggevende en oppas heb ik veel gesprekken gevoerd met ouders. Wat mij al snel duidelijk werd, is wat ik echt voor gezinnen zou willen betekenen. Voor mij is oppassen nooit zomaar 'op passen'. Het gaat verder dan dat. Het is voor mij vanzelfsprekend om meer te doen, uit mezelf, omdat ik het leuk vind en het kind erdoor verder kan ontwikkelen. Maar vooral omdat ik ouders zonder zorgen de deur uit wil laten gaan, wetende dat hun kind in de allerbeste handen is.
      </p>

   <ul class="list-disc pl-6 text-base sm:text-lg text-gray-700 mb-6 space-y-3 font-dosis">
  <li>Ik heb een kindje voor het eerst naar groep 1 mogen brengen – een bijzonder moment vol vertrouwen van de ouders.</li>
  <li>Ik haalde kindjes van school en kookte daarna gezellig met ze thuis, iets wat vaak hét hoogtepunt van de dag was.</li>
  <li>We gingen samen op avontuur naar Monkey Town, speelden actief en kwamen thuis vol verhalen en blije gezichten.</li>
  <li>Ik bracht kinderen naar sportclubs en bleef aanmoedigen langs de lijn, zodat ouders even konden bijkomen of weg konden zijn.</li>
  <li>Ik heb een keer overnacht waarbij ouders 24 uur weg waren – bij terugkomst konden de ouders het zo weer van mij overnemen.</li>
  <li>Ik mocht aanwezig zijn bij een eindmusical – een emotioneel moment, want bij dit meisje begon ik met oppassen toen ze nog niet eens kon zitten. De cirkel voelde rond.</li>
  <li>In mijn adviserende en observerende rol heb ik meerdere oudergesprekken gevoerd - ouders konden na deze gesprekken aan de slag met de antwoorden, aan de hand van de vragen die zij mij stelden.</li>
</ul>



      <p class="text-base sm:text-lg text-gray-700 leading-relaxed font-dosis">
  In die meer dan tien jaar heb ik zóveel ouders en kinderen mogen ontmoeten. Juist hun waardering, vertrouwen en aanmoediging hebben ervoor gezorgd dat ik dit ben gaan doorpakken – voor hén, en voor anderen die dezelfde steun verdienen. Door al deze ervaringen merkte ik dat ik veel meer kon betekenen voor gezinnen. In de gesprekken die ik met ouders voerde, hoorde ik regelmatig dat ik écht iets met mijn ervaring moest doen. Dit heeft me doen inzien dat ik de pedagogiek en het oudercontact naar een hoger niveau wilde tillen. En zo ontstond vorig jaar <strong>Little Steps Care</strong> – een platform dat ouders echt ondersteunt en begeleidt, op een manier die ik als oppas altijd al heb gewild.
</p>
    </section>

    <!-- Over Josje -->
    <section class="bg-white shadow-lg rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto mb-16">
      <h2 class="text-2xl sm:text-3xl font-dosis text-gray-800 mb-8 font-zen_loop">Over Josje</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h3 class="text-lg font-dosis text-gray-800 mb-4 font-zen_loop">Opleiding & Ervaring</h3>
          <ul class="list-disc pl-6 text-base text-gray-700 space-y-3 font-dosis">
            <li>Pedagogisch Medewerker – 10+ jaar ervaring...</li>
            <li>Leidinggevende ervaring in kinderopvangsector.</li>
            <li>Oppaservaring bij meer dan 15 gezinnen - 15+ jaar ervaring.</li>
            <li>How2Talk2Kids en Pikler specialisatie betreft opvoeding en ontwikkelings methodes voor Ouder & Kind.</li>
            <li>Babyscholing afgerond '25.</li>
            <li>EHBK ervaring</li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-dosis text-gray-800 mb-4 font-zen_loop">Persoonlijke Vaardigheden</h3>
          <ul class="list-disc pl-6 text-base text-gray-700 space-y-3 font-dosis">
            <li>Empathisch en zorgzaam.</li>
            <li>Flexibel en oplossingsgericht.</li>
            <li>Communicatief sterk.</li>
            <li>Betrouwbaar en verantwoordelijk.</li>
            <li>Gestructureerd en gedisciplineerd.</li>
          </ul>
        </div>
      </div>

      <h3 class="text-lg font-dosis text-gray-800 mt-10 mb-3 font-zen_loop">Mijn Missie</h3>
      <p class="text-base text-gray-700 leading-relaxed font-dosis">
        Mijn missie is om ouders de steun en begeleiding te bieden die ze nodig hebben, wil ik het verschil maken in het dagelijks leven van gezinnen. Niet door enkel aanwezig te zijn, maar door écht mee te denken, mee te voelen en te ontzorgen op de momenten dat het er het meest toe doet.
      </p>
    </section>

    <!-- Reviews Carousel -->
    <section class="bg-white shadow-lg rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-dosis text-gray-800 mb-8 text-center font-zen_loop">Wat Ouders Zeggen</h2>

      <div class="relative">
        <div class="carousel-wrapper overflow-hidden">
          <div
            class="carousel flex space-x-6 transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="review-card bg-gray-100 p-6 rounded-xl shadow-md max-w-xs flex-shrink-0"
            >
              <div class="text-lg font-dosis-zen_loop text-gray-800 mb-2">{{ review.name }}, Oudergroep</div>
              <p class="text-gray-700 font-dosis mb-4 text-sm leading-relaxed">{{ review.text }}</p>
              <div class="stars text-yellow-400 text-lg">★★★★★</div>
            </div>
          </div>
        </div>

        <!-- Navigatieknoppen -->
        <button
          @click="prevReview"
          class="absolute top-1/2 left-0 -translate-y-1/2 p-3 bg-white border shadow rounded-full hover:bg-gray-100 transition"
        >
          ←
        </button>
        <button
          @click="nextReview"
          class="absolute top-1/2 right-0 -translate-y-1/2 p-3 bg-white border shadow rounded-full hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const currentIndex = ref(0);
const reviews = [
  {
    name: 'Sophie',
    text: 'Josje is een geweldige oppas. Ze is altijd betrokken en zorgt ervoor dat mijn kinderen zich veilig en gelukkig voelen...',
    rating: 5
  },
  {
    name: 'Mark',
    text: 'Wat een verschil maakt Josje! Niet alleen is ze professioneel, maar ze heeft ook een warme, persoonlijke benadering...',
    rating: 5
  },
  {
    name: 'Eva',
    text: 'Josje is een fantastische oppas! Ze helpt ons niet alleen met de kinderen, maar zorgt er ook voor dat het huishouden draait...',
    rating: 5
  }
];

const prevReview = () => {
  currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length;
};

const nextReview = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.length;
};
</script>
