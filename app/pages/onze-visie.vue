<script setup lang="ts">
import BabyLedWeaning from '~/components/BabyLedWeaning.vue'

const showBlw = ref(false)

function handleBlwClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target?.dataset?.blw !== undefined) {
    e.preventDefault()
    showBlw.value = true
  }
}

const leeftijdsgroepen = ref([
  {
    leeftijd: '0-4 maanden',
    titel: 'Pasgeborenen',
    open: false,
    slapen:
      'In deze eerste levensfase draait alles om veiligheid, rust en nabijheid. Wij stemmen onze slaapaanpak volledig af op de signalen van het kind én op de wensen van de ouders. Denk aan tekenen van vermoeidheid zoals gapen of wegkijken. In overleg kunnen we onze eigen rustgevende methodes inzetten, zoals wiegende bewegingen of inbakeren, mits passend. Tijdens onze Coaching op locatie denken we met ouders mee over een veilige slaaphygiëne thuis.',
    eten:
      'Voeding gebeurt op verzoek en volledig in overleg. Wij respecteren het tempo van de baby en nemen de tijd om voeden tot een verbindend moment te maken. Indien er vragen zijn rondom borstvoeding of flesvoeding, bieden wij Consulting aan waarbij we ouders begeleiden in keuzes die passen bij hun situatie.',
    zelfstandigheid:
      'Zelfstandigheid begint al hier, met het stimuleren van vrij bewegen en het volgen van signalen. Wij laten baby’s zelf ontdekken in een veilige ruimte, zonder geforceerde houdingen of hulpmiddelen. Tijdens onze sessies op locatie kijken we mee naar de inrichting van de omgeving, zodat deze bewegingsvrijheid ondersteunt.',
    activiteiten:
      'Activiteiten zijn zacht en zintuiglijk: rustige muziek, knuffelmomenten, babymassage of het samen bekijken van illustraties. Alles is gericht op hechting en geborgenheid. We kunnen ouders ook begeleiden in het creëren van een passende speelhoek thuis, om het zelfstandig vermaken te bevorderen.',
	},
  {
    leeftijd: '4-6 maanden',
    titel: 'Ontdekkende baby',
    open: false,
    slapen:
      'Slaapritmes worden zichtbaarder. We voeren een consistente slaaproutine uit, afgestemd met ouders. Denk aan vaste volgordes, een slaapliedje of een specifieke knuffel. Tijdens Coaching op locatie ondersteunen we bij het vinden van een passend slaapritueel dat aansluit bij de thuissituatie, en eventueel bij het afbouwen van slaapassociaties.',
    eten:
      'Rond deze periode begint vaak de eerste kennismaking met vaste voeding. We observeren signalen van interesse en overleggen nauw met ouders. Oefenhapjes worden spelenderwijs aangeboden. Tijdens consults geven we ook advies over introductie van smaken en het vermijden van eetdruk.',
    zelfstandigheid:
      'Baby’s rollen, grijpen en tonen meer initiatief. Wij bieden veilige speelruimtes aan waarin dit volop geoefend kan worden. Door bewust níét alles voor te doen, ontstaat ruimte voor zelfstandige ontdekkingen. Ouders krijgen van ons tips over hoe ze dit thuis kunnen voortzetten.',
    activiteiten:
      'Spiegels, kiekeboe-spelletjes en liedjes stimuleren de zintuigen. Wij maken materiaal visueel aantrekkelijk en afwisselend, en stemmen het aanbod af op de interesse van het kind.',
	},
  {
    leeftijd: '6-10 maanden',
    titel: 'Actieve baby',
    open: false,
    slapen:
      'Er ontstaan meer vaste slaapmomenten. Wij bieden herkenbare structuren aan en ondersteunen zelfregulatie, bijvoorbeeld door voorspelbare overgangen en een rustgevende omgeving. Tijdens Coaching bespreken we hoe ouders dit thuis kunnen implementeren.',
    eten: [
      'Zelf eten ontdekken staat centraal. Wij stimuleren kinderen om met hun handen te voelen, proeven en experimenteren. Ouders die vragen hebben over ',
      { type: 'blw', label: 'Baby-Led Weaning' },
      ' of lepeltraining kunnen bij ons terecht voor praktische begeleiding.'
    ],
    zelfstandigheid:
      'Kruipen, optrekken, staan — wij volgen het initiatief van het kind en bieden ondersteuning zonder te sturen. Zo groeit het zelfvertrouwen. Tijdens onze consults denken we mee over veilige aanpassingen in huis die dit ondersteunen.',
    activiteiten:
      'We bieden spelvormen aan die motoriek en cognitieve ontwikkeling stimuleren. Bijvoorbeeld blokkentorens bouwen, bakjes vullen of muziek maken met ritmestokjes. We delen deze ideeën ook tijdens Coaching, afgestemd op de thuissituatie.',
	},
  {
    leeftijd: '10-12 maanden',
    titel: 'Dreumes in wording',
    open: false,
    slapen:
      'Slaap wordt meer gestructureerd, met vaak nog twee slaapjes. Wij houden een vast ritme aan en evalueren signalen van vermoeidheid of overstimulatie. Tijdens Coaching kunnen we helpen bij het afstemmen van deze overgangen naar één slaapmoment.',
    eten:
      'Kinderen mogen zelf eten met lepels of handen. Wij observeren en begeleiden met geduld. Als ouders vragen hebben over eetgedrag of vaste rituelen, bieden we begeleiding op maat.',
    zelfstandigheid:
      'Dreumesen willen veel zelf doen, van lopen tot iets aangeven. Wij geven ruimte, ondersteunen en versterken hun zelfbeeld door kleine successen te benoemen. Dit is ook een centraal thema in onze Coaching op locatie.',
    activiteiten:
      'Van bouwen en klimmen tot tekenen met dikke krijtjes — het spel wordt steeds gerichter. Wij observeren waar het kind blij van wordt, en delen dit ook met ouders om thuis op in te spelen.',
	},
  {
    leeftijd: '1+ jaar',
    titel: 'Dreumes & peuter',
    open: false,
    slapen:
      'De meeste kinderen doen één middagdutje. Wij creëren rustmomenten eromheen en nemen overgangen serieus. Via onze Coaching helpen we ouders om dit ritme thuis vast te houden, ook tijdens vakanties of opvangwissels.',
    eten:
      'We eten samen en maken het een sociaal moment. Zelf opscheppen, benoemen wat er gegeten wordt en keuzes mogen maken staan centraal. Als er sprake is van kieskeurigheid of spanningen rondom eten, denken wij mee tijdens consults.',
    zelfstandigheid:
      'Peuters willen "zelf doen". Wij creëren een omgeving waarin dat veilig kan, zoals een opstapje bij de wasbak of een jashaakje op kindhoogte. Ouders krijgen van ons praktische tips mee tijdens huisbezoeken.',
    activiteiten:
      'Vrij spel wordt afgewisseld met thematisch aanbod, afgestemd op seizoenen of interesses. We stimuleren zelfstandigheid in opruimen, kiezen en afronden.',
	},
  {
    leeftijd: '4+ jaar',
    titel: 'Kleuters',
    open: false,
    slapen:
      'Hoewel er vaak geen dutje meer is, blijven rustmomenten waardevol. Wij creëren een plek waar kleuters zich kunnen terugtrekken. Tijdens Coaching op locatie helpen we ouders bij het invoeren van een rustmoment in drukke middagen.',
    eten:
      'Kleuters worden betrokken bij het voorbereiden van eten, zoals tafel dekken of eenvoudige recepten maken. We moedigen gesprekken aan over wat gezond is en luisteren naar hun voorkeuren.',
    zelfstandigheid:
      'Wij stimuleren initiatief en verantwoordelijkheid, zoals zelf de jas pakken, toiletgebruik of kleine klusjes doen. Tijdens consults ondersteunen we ouders in het begeleiden van deze autonomie zonder druk.',
    activiteiten:
      'Thematisch werken, fantasierijk spel en projectjes helpen kleuters hun wereld te ordenen. Wij bouwen voort op interesses en maken ruimte voor creativiteit, wat ouders vaak ook thuis willen versterken — hierin begeleiden wij graag.',
	}
])
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-6 px-4 py-10 font-dosis">
    <h1 class="mb-6 font-zen_loop text-4xl">
      Onze Visie en Pedagogische Onderbouwing
    </h1>

    <p class="mb-6 text-gray-700">
      Bij <span class="font-zen_loop">Little Steps Care</span> stemmen we onze zorg, begeleiding en activiteiten volledig af op de leeftijd en ontwikkeling van het kind. Elk kind ontwikkelt zich in zijn eigen tempo, maar binnen elke fase zien we duidelijke ontwikkelingsmijlpalen. In onze werkwijze combineren we rust, structuur, signalen van het kind en respect voor ouderschap. Naast onze oppasservice bieden wij ook <span class="font-zen_loop">Consulting en Coaching op locatie</span> aan voor ouders die verdieping zoeken in het dagelijks ritme en pedagogische aanpak thuis.
    </p>

    <div
      v-for="groep in leeftijdsgroepen"
      :key="groep.leeftijd"
      class="rounded-2xl border bg-gradient-to-br from-[#fef6e4] to-[#d8f3dc] shadow-sm"
    >
      <button
        class="flex w-full items-center justify-between px-6 py-4 text-left font-zen_loop text-lg"
        @click="groep.open = !groep.open"
      >
        <span>{{ groep.leeftijd }} – {{ groep.titel }}</span>
        <span class="text-xl">{{ groep.open ? '−' : '+' }}</span>
      </button>

      <div v-if="groep.open" class="space-y-4 px-6 pb-6 text-gray-800">
        <div>
          <h3 class="font-zen_loop text-3xl">
            Slapen
          </h3>
          <p>{{ groep.slapen }}</p>
        </div>
        <div>
          <h3 class="font-zen_loop text-3xl">
            Eten
          </h3>
          <p>
            <template v-if="Array.isArray(groep.eten)">
              <template v-for="(deel, i) in groep.eten" :key="i">
                <span v-if="typeof deel === 'string'">{{ deel }}</span>
                <button
                  v-else-if="deel.type === 'blw'"
                  class="font-semibold text-[#C8A2C8] underline hover:text-[#a47fa9]"
                  @click="showBlw = true"
                >
                  {{ deel.label }}
                </button>
              </template>
            </template>
            <template v-else>
              {{ groep.eten }}
            </template>
          </p>
        </div>
        <div>
          <h3 class="font-zen_loop text-3xl">
            Zelfstandigheid
          </h3>
          <p>{{ groep.zelfstandigheid }}</p>
        </div>
        <div>
          <h3 class="font-zen_loop text-3xl">
            Activiteiten
          </h3>
          <p>{{ groep.activiteiten }}</p>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div
        v-if="showBlw"
        class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 px-4"
      >
        <div class="relative w-full max-w-xl space-y-4 rounded-2xl bg-white p-6 font-dosis shadow-xl">
          <BabyLedWeaning />
          <button
            class="absolute right-4 top-4 text-gray-500 hover:text-[#C8A2C8]"
            @click="showBlw = false"
          >
            ✕
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
