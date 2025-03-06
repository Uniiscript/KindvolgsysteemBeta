<template>
  <HeaderFooter>
    <!-- Contact Section -->
    <main class="flex-grow flex flex-col items-center mt-8 px-6 space-y-16">
      <h2 class="text-3xl font-poppins mb-6 text-center">{{ translations[selectedLanguage].contact }}</h2>

      <!-- Contact Options -->
      <section class="w-full max-w-4xl">
        <div class="flex flex-wrap justify-center gap-8">
          <!-- Email Option -->
          <div class="w-80 p-6 bg-purple-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-bold text-center text-purple-900 mb-2">📧 E-mail</h3>
            <p class="text-gray-700 text-center mb-4">Stuur ons een e-mail voor vragen of feedback.</p>
            <a href="mailto:info@voorbeeld.com" class="block text-center text-purple-800 hover:text-purple-600 font-semibold">
              Klik hier om een e-mail te sturen
            </a>
          </div>

          <!-- Ticket Option -->
          <div class="w-80 p-6 bg-blue-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-bold text-center text-blue-900 mb-2">🎟️ Ticket Aanmaken</h3>
            <p class="text-gray-700 text-center mb-4">Maak een ticket aan voor technische ondersteuning of vragen over onze diensten.</p>
            <a href="#" class="block text-center text-blue-800 hover:text-blue-600 font-semibold">
              Klik hier om een ticket aan te maken
            </a>
          </div>

          <!-- Live Chat Option -->
          <div class="w-80 p-6 bg-green-200 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 class="text-xl font-bold text-center text-green-900 mb-2">💬 Live Chat</h3>
            <p class="text-gray-700 text-center mb-4">Start een live chat met onze chatbot voor snel antwoord op je vragen.</p>
            <button
              @click="startChat"
              class="block text-center text-green-800 hover:text-green-600 font-semibold"
            >
              Klik hier om de chatbot te starten
            </button>
          </div>
        </div>
      </section>

      <!-- Chatbot Interface (Hidden by Default) -->
      <div v-if="isChatting" class="fixed bottom-6 right-6 w-80 bg-white shadow-lg p-4 rounded-lg">
        <div class="flex flex-col">
          <h4 class="text-xl font-bold mb-2">Chat met onze chatbot</h4>
          <div class="overflow-y-auto max-h-60 mb-4">
            <div class="flex flex-col space-y-2">
              <div v-for="(message, index) in chatMessages" :key="index" class="flex flex-col items-start">
                <p class="text-gray-700">{{ message }}</p>
              </div>
            </div>
          </div>
          <input
            v-model="chatInput"
            @keyup.enter="sendMessage"
            type="text"
            class="p-2 border rounded-lg mb-4"
            placeholder="Typ je bericht..."
          />
          <button @click="sendMessage" class="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
            Verstuur
          </button>
        </div>
      </div>
    </main>
  </HeaderFooter>
</template>

<script setup>
const selectedLanguage = ref('nl');
const isChatting = ref(false);
const chatMessages = ref([]);
const chatInput = ref('');

const translations = {
  nl: {
    contact: "Contact",
  },
  en: {
    contact: "Contact",
  }
};

function startChat () {
  isChatting.value = true;
  chatMessages.value.push('Chatbot: Hallo! Hoe kan ik je helpen?');
}

function sendMessage () {
  if (chatInput.value.trim() !== '') {
    chatMessages.value.push(`Jij: ${chatInput.value}`);
    chatInput.value = '';
    setTimeout(() => {
      chatMessages.value.push('Chatbot: Bedankt voor je bericht! We zullen je zo snel mogelijk helpen.');
    }, 1000);
  }
}
</script>

<style scoped>
/* Verberg de scrollbalken in de chatbot */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
