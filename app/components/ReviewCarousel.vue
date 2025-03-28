<script setup lang="ts">
import { onMounted, ref } from 'vue'

const reviews = ref([
	{ name: 'Jouw ervaring telt!', text: 'Onze community groeit door verhalen van ouders zoals jij. Help anderen door jouw ervaring te delen!' },
	{ name: 'Waarom een review?', text: 'Met jouw review help je andere ouders de juiste keuze maken en kunnen we onze service blijven verbeteren!' },
	{ name: 'Heb jij een mooi moment?', text: 'Deel een bijzonder moment met onze nannies of consultants. We horen graag jouw verhaal!' },
	{ name: 'Eenvoudig en snel!', text: 'Stuur ons je review per e-mail en laat weten wat jij van Little Steps Care vindt!' },
])

const currentReviewIndex = ref(0)

function prevReview() {
	currentReviewIndex.value = (currentReviewIndex.value - 1 + reviews.value.length) % reviews.value.length
}

function nextReview() {
	currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.value.length
}

// Automatische carousel
onMounted(() => {
	setInterval(() => {
		nextReview()
  }, 5000)
})
</script>

<template>
  <div class="relative mx-auto mt-6 w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-300 bg-gradient-to-br from-[#fef6e4] to-[#d8f3dc] p-6 shadow-lg">
    <p class="font-dosis text-lg italic text-gray-700">
      "{{ reviews[currentReviewIndex]?.text }}"
    </p>
    <p class="mt-2 font-dosis text-gray-800">
      — {{ reviews[currentReviewIndex]?.name }}
    </p>

    <!-- Knoppen om handmatig door de teksten te gaan -->
    <div class="absolute bottom-4 left-4">
      <button @click="prevReview">
        <Icon name="mdi:chevron-left" class="text-4xl text-[#C8A2C8] hover:text-[#A983A2]" />
      </button>
    </div>
    <div class="absolute bottom-4 right-4">
      <button @click="nextReview">
        <Icon name="mdi:chevron-right" class="text-4xl text-[#C8A2C8] hover:text-[#A983A2]" />
      </button>
    </div>

    <!-- Knop om review te sturen -->
    <div class="mt-6 text-center">
      <a
        href="mailto:little.steps.care4you@gmail.com?subject=Mijn%20ervaring%20met%20Little%20Steps%20Care"
        class="inline-block rounded-lg bg-[#C8A2C8] px-6 py-3 font-dosis text-white shadow-lg transition hover:bg-[#A983A2]"
      >
        Deel jouw ervaring 💜
      </a>
    </div>
  </div>
</template>
