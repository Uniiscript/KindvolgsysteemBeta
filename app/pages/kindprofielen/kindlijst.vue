<template>
  <div class="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 min-h-screen flex flex-col">
    <header class="bg-gradient-to-r from-purple-500 to-blue-500 w-full py-8 shadow-lg rounded-b-3xl">
      <h1 class="text-5xl font-bold text-center text-white">Kindprofielen - LittleStepsCare</h1>
    </header>

    <main class="flex-grow flex flex-col items-center mt-8 px-6">
      <section class="w-full max-w-6xl">
        <div class="flex justify-between items-center mb-6">
          <div>
            <label for="group-select" class="text-purple-800 text-lg font-medium">Kies een groep:</label>
            <select id="group-select" class="ml-4 p-2 rounded-lg border border-purple-300">
              <option>Babygroep</option>
              <option>Dreumesgroep</option>
              <option>Peutergroep</option>
            </select>
          </div>
          <div>
            <button class="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600">Sorteren: Voornaam A-Z</button>
            <button class="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 ml-4">Sorteren: Achternaam A-Z</button>
          </div>
        </div>

        <table class="w-full bg-white rounded-lg shadow-lg">
          <thead class="bg-gradient-to-r from-purple-400 to-blue-400 text-white">
            <tr>
              <th class="p-4 text-left">Profielfoto</th>
              <th class="p-4 text-left">Naam</th>
              <th class="p-4 text-left">Geboortedatum</th>
              <th class="p-4 text-left">Bijzonderheden</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-purple-100">
              <td class="p-4">
                <div class="w-12 h-12 border-2 border-purple-300 rounded-full flex justify-center items-center cursor-pointer" @click="openPhotoPopup('Emma Jansen')">
                  <span class="text-purple-800 text-2xl">+</span>
                </div>
              </td>
              <td class="p-4">
                <p class="font-medium text-purple-800">Emma Jansen</p>
              </td>
              <td class="p-4">15-03-2020</td>
              <td class="p-4">
                <div class="relative group">
                  <span class="text-purple-800">🌰</span>
                  <div class="absolute left-0 mt-2 w-48 bg-white text-gray-800 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition">
                    Pinda-allergie
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center">
                  <span class="text-purple-800">08:30</span>
                  <button class="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">Uitklokken</button>
                </div>
              </td>
            </tr>
            <tr class="hover:bg-purple-100">
              <td class="p-4">
                <div class="w-12 h-12 border-2 border-purple-300 rounded-full flex justify-center items-center cursor-pointer" @click="openPhotoPopup('Liam de Vries')">
                  <span class="text-purple-800 text-2xl">+</span>
                </div>
              </td>
              <td class="p-4">
                <p class="font-medium text-purple-800">Liam de Vries</p>
              </td>
              <td class="p-4">12-06-2019</td>
              <td class="p-4">
                <div class="relative group">
                  <span class="text-purple-800">✔️</span>
                  <div class="absolute left-0 mt-2 w-48 bg-white text-gray-800 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition">
                    Geen bijzonderheden
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center">
                  <span class="text-gray-500">Nog niet ingeklokt</span>
                  <button class="ml-2 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">Inklokken</button>
                </div>
              </td>
            </tr>
            <!-- Voeg meer dummy gegevens toe indien nodig -->
          </tbody>
        </table>
      </section>
    </main>

    <footer class="bg-gradient-to-r from-purple-600 to-blue-600 w-full py-6 rounded-t-3xl mt-auto">
      <p class="text-center text-blue-200">© 2025 LittleStepsCare. Alle rechten voorbehouden.</p>
    </footer>

    <!-- Pop-up voor het toevoegen of wijzigen van een profielfoto -->
    <div v-if="isPopupOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold text-purple-800 mb-4">Foto wijzigen voor {{ selectedChild }}</h2>
        <input type="file" @change="handleFileChange" class="mb-4" />
        <div class="flex justify-between">
          <button @click="closePopup" class="bg-gray-500 text-white px-4 py-2 rounded-lg">Annuleren</button>
          <button @click="savePhoto" class="bg-purple-500 text-white px-4 py-2 rounded-lg">Opslaan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPopupOpen: false,
      selectedChild: '',
    };
  },
  methods: {
    openPhotoPopup(childName) {
      this.selectedChild = childName;
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      // Voeg logica toe om de afbeelding te verwerken
    },
    savePhoto() {
      // Voeg logica toe om de foto op te slaan
      this.closePopup();
    }
  }
};
</script>

