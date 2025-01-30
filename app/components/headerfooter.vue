<template>
  <div class="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col" :lang="selectedLanguage">
    <!-- Navbar -->
    <header class="bg-gradient-to-r from-purple-500 to-blue-500 w-full py-8 shadow-lg rounded-b-3xl text-center relative">
      <h1 class="text-5xl font-bold text-white">{{ translations[selectedLanguage].title }}</h1>
      <p class="text-blue-200 mt-4">{{ translations[selectedLanguage].subtitle }}</p>

      <!-- Navbar links -->
      <nav class="absolute top-4 left-6 flex space-x-6">
        <NuxtLink to="/experience" class="text-white">{{ translations[selectedLanguage].experience }}</NuxtLink>
        <NuxtLink to="/features" class="text-white">{{ translations[selectedLanguage].features }}</NuxtLink>
        <NuxtLink to="/contact" class="text-white">{{ translations[selectedLanguage].contact }}</NuxtLink>
      </nav>

      <!-- Language switcher and login button -->
      <div class="absolute top-4 right-6 flex space-x-4">
        <select v-model="selectedLanguage" @change="changeLanguage" class="bg-white text-purple-800 p-2 rounded-lg shadow-md">
          <option value="nl">🇳🇱 Nederlands</option>
          <option value="en">🇬🇧 English</option>
        </select>
        <button @click="showLoginModal = true" class="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md">Login</button>
      </div>
    </header>

    <!-- Content Section -->
    <slot />

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-purple-600 to-blue-600 w-full py-6 rounded-t-3xl mt-auto text-center">
      <p class="text-blue-200">© 2025 LittleStepsCare. {{ translations[selectedLanguage].footer }}</p>
    </footer>
  </div>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-xl w-96">
      <h3 class="text-xl font-semibold text-center mb-4">{{ translations[selectedLanguage].login }}</h3>
      <div class="space-y-4">
        <button @click="selectRole('LittleStepsCare')" class="w-full bg-blue-500 text-white p-3 rounded-lg">LittleStepsCare</button>
        <button @click="selectRole('ParentCare')" class="w-full bg-green-500 text-white p-3 rounded-lg">ParentCare</button>
        <button @click="selectRole('NannyCare')" class="w-full bg-purple-500 text-white p-3 rounded-lg">NannyCare</button>
      </div>
      <button @click="showLoginModal = false" class="mt-4 w-full text-center text-gray-500">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import router to handle redirects

const selectedLanguage = ref('nl');
const showLoginModal = ref(false);
const router = useRouter(); // Initialize router for navigation

const translations = {
  nl: {
    title: "LittleStepsCare",
    subtitle: "Dé ultieme tool voor kinderopvang, ouders en nannies",
    experience: "Ervaring",
    features: "Functies",
    contact: "Contact",
    footer: "Alle rechten voorbehouden.",
    login: "Log in om verder te gaan",
  },
  en: {
    title: "LittleStepsCare",
    subtitle: "The ultimate tool for childcare, parents, and nannies",
    experience: "Experience",
    features: "Features",
    contact: "Contact",
    footer: "All rights reserved.",
    login: "Log in to continue",
  }
};

// Handle language change
function changeLanguage() {
  console.log(`Language changed to ${selectedLanguage.value}`);
}

// Function to handle role selection and redirect
function selectRole(role) {
  showLoginModal.value = false;
  console.log(`Selected role: ${role}`);

  // Example redirects based on role selection
  if (role === 'LittleStepsCare') {
    router.push('/admin-dashboard'); // Redirect to admin dashboard or specific page
  } else if (role === 'ParentCare') {
    router.push('/parent-dashboard'); // Redirect to parent dashboard
  } else if (role === 'NannyCare') {
    router.push('/nanny-dashboard'); // Redirect to nanny dashboard
  }
}
</script>

<style scoped>
/* Add any additional styles you want here */

/* Customize your footer if needed */
footer {
  font-size: 1rem;
  color: #cce0ff;
}

header {
  font-family: 'Poppins', sans-serif;
}

/* Add additional customizations for the navbar and other sections */
</style>
