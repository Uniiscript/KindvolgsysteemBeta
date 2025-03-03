<template>
  <div :lang="selectedLanguage" class="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col">
    <!-- Language switcher -->
    <div class="absolute top-4 right-6 flex space-x-4">
      <select v-model="selectedLanguage" @change="changeLanguage" class="bg-white text-purple-800 p-2 rounded-lg shadow-md">
        <option value="nl">🇳🇱 Nederlands</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const selectedLanguage = ref('nl');

// Handle language change
function changeLanguage() {
  console.log(`Language changed to ${selectedLanguage.value}`);
}
</script>

<style scoped>
/* No additional styles needed for now */
</style>
