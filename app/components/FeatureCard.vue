<template>
  <div class="flex flex-col items-center justify-center p-6">
    <!-- Feature Cards Container met flexbox en ruimte tussen de kaarten -->
    <div class="flex flex-wrap justify-center gap-8">
      <!-- Feature Card voor elke feature -->
      <div class="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white w-72 h-auto space-y-4 hover:scale-105 transition-transform duration-300">
        <!-- Feature Container met flexbox en kleur -->
        <div :class="['p-4 rounded-lg w-full h-full flex flex-col justify-between transition-colors duration-300', feature.color, 'group hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-purple-500']">
          <!-- Title -->
          <h3 class="text-xl font-bold text-center text-purple-900 mb-2">{{ feature.title }}</h3>
          <!-- Description -->
          <p class="text-gray-700 text-center">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feature: Object
});
</script>

<style scoped>
/* Styling wordt volledig beheerd door Tailwind CSS */
</style>
