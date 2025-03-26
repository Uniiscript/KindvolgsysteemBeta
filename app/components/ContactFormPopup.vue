<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
      <h2 class="text-4xl font-zen_loop text-center mb-4">Contactformulier</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block font-dosis">Naam ouder:</label>
          <input v-model="parentName" type="text" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label class="block font-dosis">Contactmogelijkheden:</label>
          <div class="flex space-x-4">
            <label class="flex items-center text-dosis">
              <input type="checkbox" @change="toggleContact('phone')" /> Telefoon
            </label>
            <label class="flex items-center text-dosis">
              <input type="checkbox" @change="toggleContact('email')" /> E-mail
            </label>
          </div>
        </div>

        <div v-if="contactOptions.phone">
          <label class="block font-dosis">Telefoonnummer:</label>
          <input v-model="phone" type="tel" class="w-full p-2 border rounded" required />
        </div>

        <div v-if="contactOptions.email">
          <label class="block font-dosis">E-mailadres:</label>
          <input v-model="email" type="email" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label class="block font-dosis">Aantal kinderen:</label>
          <input v-model.number="numChildren" type="number" min="0" class="w-full p-2 border rounded" @input="updateChildrenFields" required />
        </div>

        <div v-if="numChildren >= 0">
          <label class="flex items-center space-x-2 font-dosis">
            <input type="checkbox" v-model="expecting" />
            <span>In verwachting</span>
          </label>
        </div>

        <div v-if="expecting">
          <label class="block font-dosis">Uitgerekende datum:</label>
          <input v-model="dueDate" type="date" class="w-full p-2 border rounded" :min="today" :max="maxDueDate" @input="calculatePregnancyDuration" required />
          <p v-if="pregnancyDuration" class="text-green-600 font-medium">Gefeliciteerd! U bent nu {{ pregnancyDuration }} zwanger.</p>
        </div>

        <div v-for="(child, index) in children" :key="index" class="p-4 bg-gray-100 rounded-lg relative">
          <h3 class="font-dosis">Kind {{ index + 1 }}</h3>
          <div>
            <label class="block font-dosis">Naam kind:</label>
            <input v-model="child.name" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block font-dosis">Geboortedatum:</label>
            <input
              v-model="child.birthdate"
              type="date"
              class="w-full p-2 border rounded"
              :min="minBirthdate"
              :max="today"
              @blur="calculateAge(index)"
              required
            />
            <p v-if="child.age" class="text-blue-600 font-dosis">Leeftijd: {{ child.age }}</p>
          </div>

          <transition name="fade">
            <div
              v-if="child.showBirthdayNotice"
              class="absolute top-0 left-0 right-0 bg-yellow-200 text-yellow-900 rounded-t-lg text-center py-2 shadow animate-bounce"
            >
              🎉 Wat leuk! {{ child.name || 'Je kind' }} wordt bijna {{ child.upcomingAge }} jaar!
            </div>
          </transition>
        </div>

        <button type="submit" class="w-full bg-purple-600 text-white text-2xl font-zen_loop py-2 rounded-lg hover:bg-purple-700 transition">
          Versturen
        </button>
      </form>

      <button @click="$emit('close')" class="mt-4 w-full text-gray-600 font-zen_loop text-2xl hover:underline">Sluiten</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['close']);

const parentName = ref('');
const contactOptions = ref({ phone: false, email: false });
const phone = ref('');
const email = ref('');
const numChildren = ref(0);
const expecting = ref(false);
const dueDate = ref('');
const pregnancyDuration = ref('');
const children = ref([]);

const todayDate = new Date();
const today = todayDate.toISOString().split('T')[0];
const maxDueDate = new Date(new Date().setMonth(todayDate.getMonth() + 10)).toISOString().split('T')[0];
const maxBirth = today;
const minBirthdate = new Date(todayDate.getFullYear() - 18, todayDate.getMonth(), todayDate.getDate()).toISOString().split('T')[0];

const toggleContact = (type) => {
  contactOptions.value[type] = !contactOptions.value[type];
};

const updateChildrenFields = () => {
  children.value = Array.from({ length: numChildren.value }, () => ({
    name: '',
    birthdate: '',
    age: '',
    showBirthdayNotice: false,
    upcomingAge: null,
  }));
};

const calculatePregnancyDuration = () => {
  if (!dueDate.value) return;
  const due = new Date(dueDate.value);
  const conceptionDate = new Date(due);
  conceptionDate.setDate(conceptionDate.getDate() - 280);
  const now = new Date();
  const diff = now - conceptionDate;

  if (diff < 0) {
    pregnancyDuration.value = 'Nog niet zwanger';
    return;
  }

  const weeksPregnant = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(weeksPregnant / 4);
  const weeks = weeksPregnant % 4;

  pregnancyDuration.value = `${months} maanden, ${weeks} weken zwanger`;
};

const calculateAge = (index) => {
  const child = children.value[index];
  if (!child.birthdate || child.birthdate.length < 10) return;

  const birth = new Date(child.birthdate);
  const now = new Date();

  let ageYears = now.getFullYear() - birth.getFullYear();
  let ageMonths = now.getMonth() - birth.getMonth();
  let ageDays = now.getDate() - birth.getDate();

  if (ageDays < 0) {
    ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    ageMonths--;
  }
  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }

  child.age = `${ageYears} jaar, ${ageMonths} maanden en ${ageDays} dagen`;

  const birthdayThisYear = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  const daysUntilBirthday = Math.floor((birthdayThisYear - now) / (1000 * 60 * 60 * 24));

  if (daysUntilBirthday >= 0 && daysUntilBirthday <= 31) {
    child.upcomingAge = ageYears + 1;
    child.showBirthdayNotice = true;
    setTimeout(() => {
      child.showBirthdayNotice = false;
    }, 5000);
  }
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
    await fetch('/api/contactform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    await fetch('/api/send-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    alert('Formulier succesvol verzonden! 🚀');
    resetForm();
    emit('close');
  } catch (error) {
    console.error('Fout bij verzenden formulier:', error);
    alert('Er is een fout opgetreden. Probeer het later opnieuw.');
  }
};

const resetForm = () => {
  parentName.value = '';
  phone.value = '';
  email.value = '';
  numChildren.value = 0;
  expecting.value = false;
  dueDate.value = '';
  children.value = [];
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
