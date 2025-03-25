<template>
  <div class="max-w-3xl mx-auto px-4 py-10 space-y-6 font-dosis">
    <h1 class="text-3xl font-zen text-black mb-6">Onze Visie Per Leeftijdsfase</h1>

    <p class="mb-6 text-gray-700">
      Bij <span class="font-zen">[Bedrijfsnaam]</span> stemmen we onze zorg, begeleiding en activiteiten volledig af op de leeftijd en ontwikkeling van het kind.
    </p>

    <div
      v-for="groep in leeftijdsgroepen"
      :key="groep.leeftijd"
      class="border rounded-2xl shadow-sm"
    >
      <button
        @click="groep.open = !groep.open"
        class="w-full text-left px-6 py-4 font-zen text-lg flex justify-between items-center"
      >
        <span>{{ groep.leeftijd }} – {{ groep.titel }}</span>
        <span class="text-xl">{{ groep.open ? '−' : '+' }}</span>
      </button>

      <div v-if="groep.open" class="px-6 pb-6 space-y-4 text-gray-700 font-dosis">
        <div>
          <h3 class="font-zen">Slapen</h3>
          <p>{{ groep.slapen }}</p>
        </div>
        <div>
          <h3 class="font-zen">Eten</h3>
          <p>{{ groep.eten }}</p>
        </div>
        <div>
          <h3 class="font-zen">Zelfstandigheid</h3>
          <p>{{ groep.zelfstandigheid }}</p>
        </div>
        <div>
          <h3 class="font-zen">Activiteiten</h3>
          <p>{{ groep.activiteiten }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const leeftijdsgroepen = ref([
  {
    leeftijd: '0-4 maanden',
    titel: 'Pasgeborenen',
    open: false,
    slapen: 'We volgen het ritme van de baby en zorgen voor een veilige, prikkelarme slaapomgeving. Veilig slapen en nabijheid staan centraal.',
    eten: 'Voeding op verzoek. We respecteren het natuurlijke hongergevoel en zorgen voor rustige voedmomenten met aandacht en nabijheid.',
    zelfstandigheid: 'We stimuleren vrij bewegen zonder dwang. Baby’s krijgen de ruimte om te ontdekken in hun eigen tempo.',
    activiteiten: 'Rustige sensorische prikkels zoals zacht praten, muziek of het volgen van bewegingen zijn passend in deze fase.'
  },
  {
    leeftijd: '4-6 maanden',
    titel: 'Ontdekkende baby',
    open: false,
    slapen: 'Het slaapritme ontwikkelt zich. We ondersteunen met rust en voorspelbaarheid in een vaste slaaproutine.',
    eten: 'Oefenhapjes worden geïntroduceerd. Kinderen mogen op hun tempo kennismaken met smaken zonder druk.',
    zelfstandigheid: 'Gericht grijpen, rollen en reageren op geluid. We leggen niets op, maar volgen de interesse van het kind.',
    activiteiten: 'Zachte speeltjes, kiekeboe, zingen en visueel stimulerend materiaal dragen bij aan ontwikkeling.'
  },
  {
    leeftijd: '6-10 maanden',
    titel: 'Actieve baby',
    open: false,
    slapen: 'We houden een ritmische dagindeling aan met vaste slaapmomenten. Slaaprituelen worden belangrijker.',
    eten: 'Overgang naar vaste voeding. We stimuleren zelf eten ontdekken met handen en mond.',
    zelfstandigheid: 'We geven ruimte voor kruipen, grijpen en staan. Zelf proberen wordt aangemoedigd.',
    activiteiten: 'Actieve spelvormen zoals blokken, spiegels, klankenspeelgoed en liedjes zijn populair.'
  },
  {
    leeftijd: '10-12 maanden',
    titel: 'Dreumes in wording',
    open: false,
    slapen: 'Vaak nog twee slaapjes. We bieden veiligheid met vaste routines en vertrouwde objecten zoals een knuffel.',
    eten: 'Zelf eten wordt belangrijk. Wij bieden gevarieerde voeding en laten kinderen zelf ontdekken.',
    zelfstandigheid: 'Kinderen leren staan, stappen zetten en zelf voorwerpen gebruiken. Wij begeleiden met ruimte en vertrouwen.',
    activiteiten: 'Motorische activiteiten, klimmen en simpele opdrachtspelletjes stimuleren hun groei.'
  },
  {
    leeftijd: '1+ jaar',
    titel: 'Dreumes & peuter',
    open: false,
    slapen: 'Eén middagdutje wordt de norm. Rust en ritme blijven essentieel in de structuur.',
    eten: 'We eten samen aan tafel. Zelf doen staat centraal: zelf opscheppen, kiezen en proeven.',
    zelfstandigheid: 'We moedigen kinderen aan zelf hun jas aan te doen, op te ruimen of een beker te gebruiken.',
    activiteiten: 'Vrij spel, bouwen, buiten spelen en creatieve opdrachten helpen bij hun cognitieve en sociale ontwikkeling.'
  },
  {
    leeftijd: '4+ jaar',
    titel: 'Kleuters',
    open: false,
    slapen: 'Geen middagdutje meer, maar wel rustmomenten. Een rusthoek of luisterverhaal is beschikbaar.',
    eten: 'Kinderen leren bewuste keuzes maken, helpen mee met voorbereiden en praten over voeding.',
    zelfstandigheid: 'We geven verantwoordelijkheid: toiletgebruik, jas aantrekken, samen opruimen. Alles in hun tempo.',
    activiteiten: 'Projecten, groepsspel, thematisch werken en rollenspel helpen hen in sociaal gedrag en taalontwikkeling.'
  }
])
</script>
