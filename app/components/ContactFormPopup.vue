<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
      <h2 class="text-2xl font-semibold text-center mb-4">Contactformulier</h2>
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Naam ouder -->
        <div>
          <label class="block font-medium">Naam ouder:</label>
          <input v-model="parentName" type="text" class="w-full p-2 border rounded" required />
        </div>

        <!-- Contactmogelijkheden -->
        <div>
          <label class="block font-medium">Contactmogelijkheden:</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input type="checkbox" @change="toggleContact('phone')" /> Telefoon
            </label>
            <label class="flex items-center">
              <input type="checkbox" @change="toggleContact('email')" /> E-mail
            </label>
          </div>
        </div>

        <!-- Telefoonnummer -->
        <div v-if="contactOptions.phone">
          <label class="block font-medium">Telefoonnummer:</label>
          <input v-model="phone" type="tel" class="w-full p-2 border rounded" :required="contactOptions.phone" />
        </div>

        <!-- E-mailadres -->
        <div v-if="contactOptions.email">
          <label class="block font-medium">E-mailadres:</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded" :required="contactOptions.email" />
        </div>

        <!-- Aantal kinderen -->
        <div>
          <label class="block font-medium">Aantal kinderen:</label>
          <input v-model.number="numChildren" type="number" min="0" class="w-full p-2 border rounded" @input="updateChildrenFields" required />
        </div>

        <!-- In verwachting optie -->
        <div v-if="numChildren >= 0">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="expecting" />
            <span>In verwachting</span>
          </label>
        </div>

        <!-- Uitgerekende datum -->
        <div v-if="expecting">
          <label class="block font-medium">Uitgerekende datum:</label>
          <input v-model="dueDate" type="date" class="w-full p-2 border rounded" :min="today" :max="maxDueDate" @input="calculatePregnancyDuration" required />
          <p v-if="pregnancyDuration" class="text-green-600 font-medium">Gefeliciteerd! U bent nu {{ pregnancyDuration }} zwanger.</p>
        </div>

        <!-- Kinderen gegevens -->
        <div v-for="(child, index) in children" :key="index" class="p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold">Kind {{ index + 1 }}</h3>
          <div>
            <label class="block font-medium">Naam kind:</label>
            <input v-model="child.name" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block font-medium">Geboortedatum:</label>
            <input v-model="child.birthdate" type="date" class="w-full p-2 border rounded" :min="minBirthdate" :max="today" @input="calculateAge(index)" required />
            <p v-if="child.age" class="text-blue-600 font-medium">Leeftijd: {{ child.age }}</p>
          </div>
        </div>

        <!-- Verzendknop -->
        <button type="submit" @click="execute" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
          Versturen
        </button>
      </form>

      <!-- Sluitknop -->
      <button @click="$emit('close')" class="mt-4 w-full text-gray-600 hover:underline">Sluiten</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const parentName = ref("");
const contactOptions = ref({ phone: false, email: false });
const phone = ref("");
const email = ref("");
const numChildren = ref(0);
const expecting = ref(false);
const dueDate = ref("");
const pregnancyDuration = ref("");
const children = ref([]);

// Bereken de datums
const today = new Date().toISOString().split("T")[0]; // Vandaag's datum in YYYY-MM-DD formaat
const maxDueDate = new Date(new Date().setMonth(new Date().getMonth() + 10)).toISOString().split("T")[0]; // 10 maanden vanaf vandaag
const minBirthdate = "2010-01-01"; // Minimaal geboortejaar vanaf 2010

const toggleContact = (type) => {
  contactOptions.value[type] = !contactOptions.value[type];
};

const updateChildrenFields = () => {
  children.value = Array.from({ length: numChildren.value }, () => ({ name: "", birthdate: "", age: "" }));
};

const calculatePregnancyDuration = () => {
  if (!dueDate.value) return;
  const due = new Date(dueDate.value);
  const now = new Date();
  const diff = due - now;
  const weeksPregnant = Math.floor(diff / (1000 * 60 * 60 * 24 * 7)); // in weken
  pregnancyDuration.value = `${Math.floor(weeksPregnant / 4)} maanden, ${weeksPregnant % 4} weken`;
};

const calculateAge = (index) => {
  const birthdate = children.value[index].birthdate;
  if (!birthdate) return;
  const birth = new Date(birthdate);
  const now = new Date();
  const ageYears = now.getFullYear() - birth.getFullYear();
  const ageMonths = now.getMonth() - birth.getMonth();
  const ageDays = now.getDate() - birth.getDate();
  children.value[index].age = `${ageYears} jaar, ${ageMonths} maanden en ${ageDays} dagen`;
};

const submitForm = async () => {
  const formData = {
    parentName: parentName.value,
    contactOptions: contactOptions.value,
    phone: phone.value,
    email: email.value,
    numChildren: numChildren.value,
    expecting: expecting.value,
    dueDate: dueDate.value,
    children: children.value,
  };

  try {
    const response = await fetch("http://localhost:3003/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Formulier succesvol verzonden! 🚀");
      resetForm();
    } else {
      alert("Er ging iets mis bij het verzenden van het formulier.");
    }
  } catch (error) {
    console.error("Fout bij verzenden formulier:", error);
    alert("Er is een fout opgetreden. Probeer het later opnieuw.");
  }
};

// Reset het formulier na verzenden
const resetForm = () => {
  parentName.value = "";
  phone.value = "";
  email.value = "";
  numChildren.value = 0;
  expecting.value = false;
  dueDate.value = "";
  children.value = [];
};

// useFetch om de API te triggeren
const { execute } = await useFetch("/api/send", { immediate: false });
</script>
