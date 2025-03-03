<template>
  <button @click="emit('openModal')" class="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600">
    Login
  </button>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['openModal']); // Stuurt een event om de modaal te openen
</script>
