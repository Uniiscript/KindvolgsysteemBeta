<template>
  <div class="min-h-screen bg-gradient-to-r from-teal-100 via-pink-100 to-yellow-100 flex flex-col">
    <!-- Header -->
    <header class="bg-gradient-to-r from-sand-300 via-mint-400 to-mint-500 p-6 text-center text-white rounded-b-3xl">
      <h1 class="text-4xl font-bold">Ouder Gegevens</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow px-8 py-6">
      <!-- Parent Information -->
      <section class="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-teal-800 mb-4">Ouder Informatie</h2>
        <div class="space-y-4">
          <div class="flex flex-col">
            <label for="firstName" class="text-lg font-medium text-teal-700">Voornaam</label>
            <input v-model="parentInfo.firstName" id="firstName" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div class="flex flex-col">
            <label for="lastName" class="text-lg font-medium text-teal-700">Achternaam</label>
            <input v-model="parentInfo.lastName" id="lastName" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div class="flex flex-col">
            <label for="address" class="text-lg font-medium text-teal-700">Adres + Huisnummer</label>
            <input v-model="parentInfo.address" id="address" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div class="flex flex-col">
            <label for="postalCode" class="text-lg font-medium text-teal-700">Postcode + Woonplaats</label>
            <input v-model="parentInfo.postalCode" id="postalCode" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div class="flex flex-col">
            <label for="birthDate" class="text-lg font-medium text-teal-700">Geboortedatum (optioneel)</label>
            <input v-model="parentInfo.birthDate" id="birthDate" type="date" class="mt-2 p-2 border rounded-lg" />
          </div>
        </div>
      </section>

      <!-- Family Information -->
      <section class="bg-white p-6 rounded-2xl shadow-xl mb-8">
        <h2 class="text-2xl font-semibold text-teal-800 mb-4">Familie Informatie</h2>
        <div class="space-y-4">
          <!-- Add Parent Button -->
          <button @click="showPopup('addParent')" class="bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600">Voeg Ouder Toe</button>

          <!-- Add Child Button -->
          <button @click="showPopup('addChild')" class="bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600">Voeg Kind Toe (verplicht)</button>

          <!-- Add Grandparent Button -->
          <button @click="showPopup('addGrandparent')" class="bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600">Voeg Grootouder Toe</button>
        </div>
      </section>

      <!-- Family Tree (Stamboom) Summary -->
      <section class="bg-white p-6 rounded-2xl shadow-xl">
        <h2 class="text-2xl font-semibold text-teal-800 mb-4">Stamboom</h2>
        <!-- Family Members Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="(member, index) in familyTree" :key="member.id" class="relative flex flex-col items-center bg-teal-50 p-4 rounded-lg shadow-lg">
            <!-- Remove Button -->
            <button @click="removeMember(index)" class="absolute top-2 right-2 text-red-500 hover:text-red-600 text-xl">
              &times;
            </button>
            <img v-if="member.profilePicture" :src="member.profilePicture" alt="Profile Picture" class="w-24 h-24 object-cover rounded-full mb-4" />
            <h3 class="text-lg font-semibold text-teal-800">{{ member.name }}</h3>
            <p class="text-sm text-gray-600">{{ member.role }}</p>
            <p class="text-sm text-gray-600">{{ member.phoneNumber ? `Telefoon: ${  member.phoneNumber}` : '' }}</p>
            <p class="text-sm text-gray-600" v-if="member.isExpecting">{{ calculateDueDate(member.dueDate) }}</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-sand-300 via-mint-400 to-mint-500 py-6 text-center text-white mt-auto rounded-t-3xl">
      <p>© 2025 LittleStepsCare. Alle rechten voorbehouden.</p>
    </footer>

    <!-- Popup Modal -->
    <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h3 class="text-xl font-semibold text-teal-800 mb-4">Voeg een {{ popupType }} toe</h3>
        <form @submit.prevent="submitMemberInfo">
          <div v-if="popupType !== 'addChild'" class="flex flex-col mb-4">
            <label for="name" class="text-lg font-medium text-teal-700">Naam</label>
            <input v-model="newMember.name" id="name" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div v-if="popupType !== 'addChild'" class="flex flex-col mb-4">
            <label for="role" class="text-lg font-medium text-teal-700">Rol (Ouder, Grootouder, etc.)</label>
            <input v-model="newMember.role" id="role" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <div v-if="popupType !== 'addChild'" class="flex flex-col mb-4">
            <label for="phoneNumber" class="text-lg font-medium text-teal-700">Telefoonnummer</label>
            <input v-model="newMember.phoneNumber" id="phoneNumber" type="tel" class="mt-2 p-2 border rounded-lg" />
          </div>

          <div v-if="popupType !== 'addChild'" class="flex items-center mb-4">
            <input v-model="newMember.isEmergencyNumber" type="checkbox" id="isEmergencyNumber" class="mr-2" />
            <label for="isEmergencyNumber" class="text-sm text-teal-700">Markeer als Noodnummer</label>
          </div>

          <!-- "In Verwachting" Option for Child -->
          <div v-if="popupType === 'addChild'" class="flex items-center mb-4">
            <input v-model="newMember.isExpecting" type="checkbox" id="isExpecting" class="mr-2" />
            <label for="isExpecting" class="text-sm text-teal-700">In Verwachting</label>
          </div>

          <!-- Hide Name and Last Name when "In Verwachting" is checked -->
          <div v-if="popupType === 'addChild' && !newMember.isExpecting" class="flex flex-col mb-4">
            <label for="name" class="text-lg font-medium text-teal-700">Naam en Achternaam</label>
            <input v-model="newMember.name" id="name" type="text" class="mt-2 p-2 border rounded-lg" required />
          </div>

          <!-- Due Date for Expecting Members -->
          <div v-if="newMember.isExpecting" class="flex flex-col mb-4">
            <label for="dueDate" class="text-lg font-medium text-teal-700">Uitgerekende Datum</label>
            <input v-model="newMember.dueDate" id="dueDate" type="date" class="mt-2 p-2 border rounded-lg" />
            <p v-if="newMember.dueDate" class="text-sm text-gray-600">{{ calculateDueDate(newMember.dueDate) }}</p>
          </div>

          <div class="flex flex-col mb-4">
            <label for="profilePicture" class="text-lg font-medium text-teal-700">Profielfoto</label>
            <input type="file" @change="handleFileChange" id="profilePicture" class="mt-2 p-2 border rounded-lg" />
          </div>

          <button type="submit" class="bg-teal-500 text-white p-3 rounded-lg shadow-md hover:bg-teal-600">Opslaan</button>
          <button @click="closePopup" class="mt-4 text-teal-500 hover:text-teal-700">Annuleren</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const parentInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  postalCode: '',
  birthDate: '',
});

const familyTree = ref([]);
const isPopupVisible = ref(false);
const popupType = ref('');
const newMember = ref({
  name: '',
  role: '',
  phoneNumber: '',
  isEmergencyNumber: false,
  isExpecting: false,
  dueDate: '',
  profilePicture: '',
});

const showPopup = (type) => {
  popupType.value = type;
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
  resetNewMember();
};

const resetNewMember = () => {
  newMember.value = {
    name: '',
    role: '',
    phoneNumber: '',
    isEmergencyNumber: false,
    isExpecting: false,
    dueDate: '',
    profilePicture: '',
  };
};

const submitMemberInfo = () => {
  familyTree.value.push({
    ...newMember.value,
    id: familyTree.value.length + 1,
  });
  closePopup();
};

const removeMember = (index) => {
  familyTree.value.splice(index, 1);
};

const calculateDueDate = (dueDate) => {
  if (!dueDate) return '';
  const due = new Date(dueDate);
  const today = new Date();
  const diffInTime = due.getTime() - today.getTime();
  const days = Math.floor(diffInTime / (1000 * 3600 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  return `${months} maand(en), ${weeks} week(en), ${days} dag(en) te gaan`;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newMember.value.profilePicture = URL.createObjectURL(file);
  }
};
</script>

<style>
.bg-gradient-to-r {
  background-image: linear-gradient(to right, #a1c4fd, #c2e9fb);
}
</style>
