<template>
  <div class="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen p-6">
    <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- Header -->
      <header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-6">
        <h1 class="text-4xl font-bold">Kind Dashboard</h1>
      </header>

      <div class="p-6 space-y-8">
        <!-- Profiel Gegevens -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="flex items-center gap-6">
            <!-- Profielfoto -->
            <div class="relative w-36 h-36 sm:w-40 sm:h-40 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                @change="handleFileUpload"
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div v-if="photoUrl" class="w-full h-full rounded-full overflow-hidden">
                <img :src="photoUrl" alt="Profielfoto" class="w-full h-full object-cover" />
              </div>
              <div v-else class="text-gray-500 text-xl font-medium">+</div>
            </div>

            <div class="flex flex-col justify-between">
              <div>
                <label class="block text-gray-700 font-medium mb-2">Voornaam</label>
                <input type="text" class="w-full rounded-lg border border-gray-300 p-2" placeholder="Voornaam" />
              </div>
              <div>
                <label class="block text-gray-700 font-medium mb-2">Achternaam</label>
                <input type="text" class="w-full rounded-lg border border-gray-300 p-2" placeholder="Achternaam" />
              </div>
            </div>
          </div>

          <!-- Geboortedatum -->
          <div>
            <label class="block text-gray-700 font-medium mb-2">Geboortedatum</label>
            <input
              type="date"
              v-model="birthDate"
              :max="dateLimit"
              @input="calculateAge"
              class="rounded-lg border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none p-2 w-full"
            />
            <span v-if="age !== null" class="text-gray-600 mt-2">Leeftijd: {{ age }} jaar</span>
          </div>
        </div>

        <!-- Noodnummer en Informatie huisarts -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-2">Noodnummer</label>
            <input type="tel" class="w-full rounded-lg border border-gray-300 p-2" placeholder="Noodnummer" />
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-2">Informatie Huisarts</label>
            <textarea
              class="w-full rounded-lg border border-gray-300 p-2"
              rows="3"
              placeholder="Naam en contactinformatie huisarts"
            ></textarea>
          </div>
        </div>

        <!-- Dagritme Profiel -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Dagritme Profiel</h2>
          <div class="relative border-l-4 border-blue-500">
            <!-- Tijdlijn -->
            <div v-for="(event, index) in timeline" :key="index" class="mb-8 pl-8">
              <div class="absolute -left-3 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
              <div class="flex items-center">
                <h3 class="text-lg font-medium text-gray-800 cursor-pointer" @click="openPopup(event)">
                  {{ event.time }}
                </h3>
                <span v-if="event.type === 'sleep' && event.isActive" class="ml-4 text-blue-500 animate-pulse">Slaap (klik om eindtijd in te voeren)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Opslaan knop -->
        <div class="text-right">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
            Opslaan
          </button>
        </div>
      </div>
    </div>

    <!-- Popup voor tijdlijn details -->
    <div v-if="popupVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg w-1/3">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">Tijdlijn Optie</h3>
        <div class="mb-4">
          <label class="block text-gray-700">Kies een activiteit</label>
          <select v-model="selectedEvent.activity" class="w-full rounded-lg border border-gray-300 p-2">
            <option value="sleep">Slaap</option>
            <!-- Voeg andere opties toe indien nodig -->
          </select>
        </div>

        <div v-if="selectedEvent.activity === 'sleep'">
          <label class="block text-gray-700 mb-2">Begintijd Slaap</label>
          <input type="time" v-model="selectedEvent.startTime" class="w-full rounded-lg border border-gray-300 p-2" />
        </div>

        <div class="mt-6 flex justify-between">
          <button
            @click="closePopup"
            class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring focus:ring-gray-200 focus:outline-none">
            Annuleren
          </button>
          <button
            @click="saveEvent"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none">
            Opslaan
          </button>
        </div>
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
      photoUrl: null,
      dateLimit: new Date().toISOString().split('T')[0],
      timeline: [
        { time: '08:00', type: '', isActive: false },
        { time: '10:00', type: '', isActive: false },
        { time: '12:00', type: '', isActive: false },
        { time: '14:00', type: '', isActive: false },
        { time: '16:00', type: '', isActive: false },
        { time: '18:00', type: '', isActive: false }
      ],
      popupVisible: false,
      selectedEvent: {
        time: '',
        activity: 'sleep',
        startTime: '',
        endTime: ''
      }
    };
  },
  methods: {
    calculateAge() {
      if (!this.birthDate) return;
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
    },
    openPopup(event) {
      this.selectedEvent.time = event.time;
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    saveEvent() {
      if (this.selectedEvent.activity === 'sleep' && this.selectedEvent.startTime) {
        const event = this.timeline.find(e => e.time === this.selectedEvent.time);
        event.type = 'sleep';
        event.isActive = true;
      }
      this.closePopup();
    }
  }
};
</script>

