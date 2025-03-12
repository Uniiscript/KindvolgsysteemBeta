<template>
  <div class="relative mt-6 w-full max-w-2xl mx-auto overflow-hidden rounded-2xl border border-gray-300 bg-white p-6 shadow-lg">
    <p class="font-dosis text-gray-700 italic text-lg">
      "{{ reviews[currentReviewIndex].text }}"
    </p>
    <p class="mt-2 font-semibold text-gray-800">— {{ reviews[currentReviewIndex].name }}</p>

    <!-- Knoppen om handmatig door de teksten te gaan -->
    <div class="absolute top-1/2 left-4 -translate-y-1/2">
      <button @click="prevReview" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        ◀
      </button>
    </div>
    <div class="absolute top-1/2 right-4 -translate-y-1/2">
      <button @click="nextReview" class="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        ▶
      </button>
    </div>

    <!-- Knop om review te sturen -->
    <div class="mt-6 text-center">
      <a
        href="mailto:little.steps.care4you@gmail.com?subject=Mijn%20ervaring%20met%20Little%20Steps%20Care"
        class="inline-block rounded-lg bg-[#C8A2C8] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#A983A2]"
      >
        Deel jouw ervaring 💜
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const reviews = ref([
  { name: "Jouw ervaring telt!", text: "Onze community groeit door verhalen van ouders zoals jij. Help anderen door jouw ervaring te delen!" },
  { name: "Waarom een review?", text: "Met jouw review help je andere ouders de juiste keuze maken en kunnen we onze service blijven verbeteren!" },
  { name: "Heb jij een mooi moment?", text: "Deel een bijzonder moment met onze nannies of consultants. We horen graag jouw verhaal!" },
  { name: "Eenvoudig en snel!", text: "Stuur ons je review per e-mail en laat weten wat jij van Little Steps Care vindt!" }
]);

const currentReviewIndex = ref(0);

// Automatische carousel
let interval: ReturnType<typeof onNuxtReady>;
onMounted(() => {
  interval = onNuxtReady(() => {
    nextReview();
  }, 5000);
});

const prevReview = () => {
  currentReviewIndex.value = (currentReviewIndex.value - 1 + reviews.value.length) % reviews.value.length;
};

const nextReview = () => {
  currentReviewIndex.value = (currentReviewIndex.value + 1) % reviews.value.length;
};
</script>
