<template>
  <div class="bg-stone-300 min-h-screen p-6">
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-semibold text-center mb-4">Kindgegevens Invoeren</h1>

      <!-- Profielfoto uploaden -->
      <div class="mb-6 text-center">
        <label class="block font-medium mb-2">Profielfoto</label>
        <div
          class="relative w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-500"
        >
          <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div v-if="photoUrl" class="w-full h-full rounded-full overflow-hidden">
            <img :src="photoUrl" alt="Profielfoto" class="w-full h-full object-cover" />
          </div>
          <div v-else class="text-gray-500 text-sm">+</div>
        </div>
      </div>

      <!-- Naam en Geboortedatum / Uitgerekende datum -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block font-medium mb-2">Voornaam</label>
          <input
            type="text"
            class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Voornaam"
          />
        </div>
        <div>
          <label class="block font-medium mb-2">Achternaam</label>
          <input
            type="text"
            class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Achternaam"
          />
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            v-model="isPregnant"
            id="pregnantCheck"
            class="rounded text-blue-500 focus:ring-blue-500"
          />
          <label for="pregnantCheck" class="text-sm">Momenteel zwanger</label>
        </div>
        <label class="block font-medium mb-2" v-if="isPregnant">Uitgerekende datum</label>
        <label class="block font-medium mb-2" v-else>Geboortedatum</label>
        <div class="flex gap-2 items-center">
          <input
            type="date"
            v-model="birthDate"
            :max="dateLimit"
            @input="calculateAge"
            class="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2 w-full"
          />
          <span v-if="age !== null && !isPregnant" class="text-gray-600">Leeftijd: {{ age }} jaar</span>
        </div>
      </div>

      <!-- Noodnummers -->
      <div class="mb-6">
        <label class="block font-medium mb-2">Noodnummer</label>
        <div class="flex gap-2 mb-2">
          <input
            type="text"
            class="flex-1 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Telefoonnummer"
          />
          <input
            type="text"
            class="flex-1 rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Naam contactpersoon"
          />
        </div>
        <p class="text-sm text-gray-500">Zorg dat dit iemand is die gebeld kan worden als de ouders niet bereikbaar zijn. Geen huisarts.</p>
      </div>

      <!-- Huisarts Informatie -->
      <div class="mb-6">
        <h2 class="text-lg font-medium mb-4">Informatie Huisarts</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            class="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Naam huisarts"
          />
          <input
            type="text"
            class="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
            placeholder="Telefoonnummer huisarts"
          />
        </div>
      </div>

      <!-- Extra Formulieren -->
      <div>
        <h2 class="text-lg font-medium mb-4">Extra Informatie</h2>
        <div class="space-y-4">
          <!-- Voeding -->
          <div>
            <label class="block font-medium mb-2">Voeding</label>
            <textarea
              class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
              rows="3"
              placeholder="Bijv. allergieën, dieet, etc."></textarea>
          </div>
          <!-- Slapen -->
          <div>
            <label class="block font-medium mb-2">Slapen</label>
            <textarea
              class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
              rows="3"
              placeholder="Bijv. bedtijd, slaaprituelen, etc."></textarea>
          </div>
          <!-- Bijzonderheden -->
          <div>
            <label class="block font-medium mb-2">Bijzonderheden</label>
            <textarea
              class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
              rows="3"
              placeholder="Bijv. angsten, voorkeuren, etc."></textarea>
          </div>
          <!-- Medisch -->
          <div>
            <label class="block font-medium mb-2">Medisch</label>
            <textarea
              class="w-full rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2"
              rows="3"
              placeholder="Bijv. medicijnen, medische aandoeningen, etc."></textarea>
          </div>
        </div>
      </div>

      <!-- Opslaan knop -->
      <div class="mt-6 text-right">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
          Opslaan
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birthDate: null,
      age: null,
      isPregnant: false,
      photoUrl: null
    };
  },
  computed: {
    dateLimit() {
      const today = new Date();
      if (this.isPregnant) {
        today.setFullYear(today.getFullYear() + 1);
        return today.toISOString().split('T')[0];
      } else {
        return new Date().toISOString().split('T')[0];
      }
    }
  },
  methods: {
    calculateAge() {
      if (!this.birthDate || this.isPregnant) {
        this.age = null;
        return;
      }
      const birthDate = new Date(this.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.photoUrl = URL.createObjectURL(file);
      }
    }
  }
};
</script>
