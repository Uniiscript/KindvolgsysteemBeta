<template>
  <div class="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen p-6">
    <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- Header -->
      <header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-6">
        <h1 class="text-4xl font-bold">Kind Dashboard</h1>
      </header>

      <div class="p-6">
        <h2 class="text-2xl font-dosis text-gray-800 mb-4">Dagritme Tijdlijn</h2>

        <!-- Tijdlijn container -->
        <div
          class="relative w-full h-36 border-t border-gray-300"
          @click="handleTimelineClick($event)"
        >
          <!-- Tijdmarkeringen -->
          <div class="absolute top-0 left-0 w-full flex justify-between items-center">
            <div
              v-for="hour in 25"
              :key="hour"
              class="text-sm text-gray-500"
              :style="{ position: 'absolute', left: `${(hour - 1) * 4.2}%` }"
            >
              <div class="w-1 h-4 bg-gray-400 mx-auto"></div>
              <span class="block text-center mt-1 text-xs">
                {{ hour % 24 }}:00
              </span>
            </div>
          </div>

          <!-- Activiteiten op de tijdlijn -->
          <div class="absolute top-0 left-0 w-full h-full flex items-center">
            <div
              v-for="event in timeline"
              :key="event.startTime"
              :class="[ 'absolute h-12 rounded-md shadow-lg flex items-center justify-center cursor-pointer', event.isActive ? 'bg-blue-500 animate-pulse' : 'bg-blue-400']"
              :style="{
                left: `${getTimePosition(event.startTime)}%`,
                width: `${calculateDuration(event.startTime, event.endTime)}%`,
              }"
              @click.stop="handleEventClick(event)"
            >
              <img
                :src="getIcon(event.type)"
                alt="Activiteit icoon"
                class="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Popup voor nieuwe activiteit -->
      <div v-if="popupVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg w-1/3">
          <h3 class="text-2xl font-dosis text-gray-800 mb-4">Activiteit Bewerken</h3>
          <div class="mb-4">
            <label class="block text-gray-700">Activiteit</label>
            <select v-model="selectedEvent.type" class="w-full rounded-lg border border-gray-300 p-2">
              <option v-for="option in getActivityOptions()" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <!-- Extra velden voor borstvoeding en flesvoeding -->
          <div v-if="selectedEvent.type === 'Borstvoeding' || selectedEvent.type === 'Flesvoeding'">
            <div class="mb-4">
              <label class="block text-gray-700">Begintijd</label>
              <input type="time" v-model="selectedEvent.startTime" class="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Eindtijd</label>
              <input type="time" v-model="selectedEvent.endTime" class="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div v-if="selectedEvent.type === 'Flesvoeding'" class="mb-4">
              <label class="block text-gray-700">Hoeveelheid (cc)</label>
              <input
                type="number"
                v-model="selectedEvent.details.amount"
                class="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Bijv. 150"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Opmerkingen</label>
              <textarea
                v-model="selectedEvent.details.notes"
                class="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Bijv. kind was onrustig, etc."
              ></textarea>
            </div>
          </div>

          <!-- Algemene velden voor andere activiteiten -->
          <div v-else>
            <div class="mb-4">
              <label class="block text-gray-700">Begintijd</label>
              <input type="time" v-model="selectedEvent.startTime" class="w-full rounded-lg border border-gray-300 p-2" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">Eindtijd</label>
              <input type="time" v-model="selectedEvent.endTime" class="w-full rounded-lg border border-gray-300 p-2" />
            </div>
          </div>

          <div class="mt-6 flex justify-between">
            <button
              @click="removeEvent"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-200 focus:outline-none"
            >
              Verwijderen
            </button>
            <div>
              <button
                @click="closePopup"
                class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring focus:ring-gray-200 focus:outline-none"
              >
                Annuleren
              </button>
              <button
                @click="saveEvent"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [],
      popupVisible: false,
      selectedEvent: {
        type: "Slapen",
        startTime: "",
        endTime: "",
        isActive: false,
        details: {
          amount: "",
          notes: "",
        },
      },
    };
  },
  methods: {
    getTimePosition(time) {
      const [hours, minutes] = time.split(":".map(Number));
      return ((hours * 60 + minutes) / 1440) * 100;
    },
    calculateDuration(startTime, endTime) {
      const [startHours, startMinutes] = startTime.split(":".map(Number));
      const [endHours, endMinutes] = endTime.split(":".map(Number));

      const startInMinutes = startHours * 60 + startMinutes;
      const endInMinutes = endHours * 60 + endMinutes;

      const duration = endInMinutes - startInMinutes;
      return (duration / 1440) * 100;
    },
    handleTimelineClick(event) {
      const rect = event.target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      const timeInMinutes = Math.round((percentage / 100) * 1440);
      const hours = String(Math.floor(timeInMinutes / 60)).padStart(2, "0");
      const minutes = String(timeInMinutes % 60).padStart(2, "0");

      this.selectedEvent = {
        type: "Slapen",
        startTime: `${hours}:${minutes}`,
        endTime: "",
        isActive: true,
        details: {
          amount: "",
          notes: "",
        },
      };
      this.popupVisible = true;
    },
    handleEventClick(event) {
      this.selectedEvent = { ...event };
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    saveEvent() {
      const existingEventIndex = this.timeline.findIndex(
        (e) => e.startTime === this.selectedEvent.startTime
      );
      if (existingEventIndex !== -1) {
        this.timeline[existingEventIndex] = { ...this.selectedEvent, isActive: false };
      } else {
        this.timeline.push({ ...this.selectedEvent, isActive: false });
      }
      this.closePopup();
    },
    removeEvent() {
      this.timeline = this.timeline.filter(
        (e) => e.startTime !== this.selectedEvent.startTime
      );
      this.closePopup();
    },
    getActivityOptions() {
      const options = [
        "Borstvoeding",
        "Flesvoeding",
        "Fruithap",
        "Groentehap",
        "Brood",
        "Water",
        "Plasluier",
        "Poepluier",
        "Medicatie",
        "Verschoning",
      ];

      if (this.selectedEvent.age && this.selectedEvent.age >= 1) {
        return [
          "Fruit",
          "Rauwkost",
          "Maaltijd",
          "Tussendoortje",
        ];
      }

      return options;
    },
    requiresDetail(type) {
      return ["Fruit", "Rauwkost", "Maaltijd", "Tussendoortje"].includes(type);
    },
    getIcon(type) {
      const icons = {
        Slapen: "https://cdn-icons-png.flaticon.com/512/2971/2971384.png",
        Eten: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        Spelen: "https://cdn-icons-png.flaticon.com/512/4202/4202840.png",
        Leren: "https://cdn-icons-png.flaticon.com/512/3304/3304568.png",
        Borstvoeding: "icon-borstvoeding.png",
        Flesvoeding: "icon-flesvoeding.png",
        Fruit: "icon-fruit.png",
        // Add icons for other activities
      };
      return icons[type] || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    },
  },
};
</script>
