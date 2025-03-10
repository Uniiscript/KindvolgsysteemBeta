<template>
  <!-- Navbar -->
  <header class="bg-gradient-to-r from-purple-500 to-blue-500 w-full py-8 shadow-lg rounded-b-3xl text-center relative">
    <h1 class="text-5xl font-bold text-white">{{ translations[selectedLanguage].title }}</h1>
    <p class="text-blue-200 mt-4">{{ translations[selectedLanguage].subtitle }}</p>

    <!-- Navbar links -->
    <nav class="absolute top-4 left-6 flex space-x-6">
      <NuxtLink to="/experience" class="text-white hover:text-yellow-300">{{ translations[selectedLanguage].experience }}</NuxtLink>
      <NuxtLink to="/features" class="text-white hover:text-yellow-300">{{ translations[selectedLanguage].features }}</NuxtLink>
      <NuxtLink to="/contact" class="text-white hover:text-yellow-300">{{ translations[selectedLanguage].contact }}</NuxtLink>
    </nav>

    <!-- Knoppen rechts uitgelijnd -->
    <div class="absolute top-4 right-6 flex items-center space-x-4">
      <LanguageTranslate @languageChange="changeLanguage" class="w-10 h-10" />
      <LoginButton @openModal="showLoginModal = true" />
    </div>
  </header>

  <!-- Content Section -->
  <main class="px-6 py-12">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-purple-600 to-blue-600 w-full py-6 rounded-t-3xl mt-auto text-center">
    <p class="text-blue-200">© 2025 LittleStepsCare. {{ translations[selectedLanguage].footer }}</p>
  </footer>

  <!-- Login Modal -->
  <LoginModal :show="showLoginModal" @closeModal="showLoginModal = false" />
</template>

<script setup>
import LanguageTranslate from './LanguageTranslate.vue';
import LoginButton from './Loginbutton.vue';
import LoginModal from './Loginmodal.vue';

const selectedLanguage = ref('nl');
const showLoginModal = ref(false); // Status van de modaal

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

function changeLanguage(language) {
  selectedLanguage.value = language;
}
</script>

<style scoped>
header {
  font-family: 'Poppins', sans-serif;
}

nav a:hover {
  color: #FBBF24; /* Hover effect op navbar links */
}

footer {
  font-size: 1rem;
  color: #cce0ff;
}
</style>
