<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96">
      <h3 class="text-xl font-dosis text-center mb-4">{{ translations[selectedLanguage].login }}</h3>
      <div class="space-y-4">
        <button @click="selectRole('LittleStepsCare')" class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
          LittleStepsCare
        </button>
        <button @click="selectRole('ParentCare')" class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
          ParentCare
        </button>
        <button @click="selectRole('NannyCare')" class="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600">
          NannyCare
        </button>
      </div>
      <button @click="emit('closeModal')" class="mt-4 w-full text-center text-gray-500 hover:text-gray-700">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const selectedLanguage = ref('nl');

const props = defineProps({
  show: Boolean, // Krijgt de status van de modaal
});

const emit = defineEmits(['closeModal']);

const translations = {
  nl: { login: "Log in om verder te gaan" },
  en: { login: "Log in to continue" }
};

function selectRole(role) {
  console.log(`Selected role: ${role}`);
  emit('closeModal'); // Sluit de modaal na selectie
}
</script>
