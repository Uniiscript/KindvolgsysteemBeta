<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold text-center">Log in</h2>

        <!-- Keuzemenu -->
        <div v-if="!roleSelected" class="mt-4 text-center">
          <p class="text-sm">Kies je rol om in te loggen:</p>
          <div class="flex flex-col gap-2 mt-2">
            <button @click="selectRole('ouder')" class="bg-blue-500 text-white p-2 rounded">Ouder</button>
            <button @click="selectRole('consultant')" class="bg-green-500 text-white p-2 rounded">Consultant / Nanny</button>
            <button @click="selectRole('admin')" class="bg-red-500 text-white p-2 rounded">Admin</button>
          </div>
        </div>

        <!-- Inlogformulier -->
        <div v-else>
          <p class="text-sm text-center">Inloggen als: <strong>{{ role }}</strong></p>

          <div class="mt-4">
            <label class="block text-sm">E-mail of Gebruikersnaam</label>
            <input v-model="emailOrUsername" type="text" class="w-full p-2 border rounded mt-1" />
          </div>

          <div class="mt-4 relative">
            <label class="block text-sm">Wachtwoord</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" class="w-full p-2 border rounded mt-1" />
            <button @click="showPassword = !showPassword" class="absolute right-2 top-9 text-sm">👁️</button>
          </div>

          <div class="mt-2 flex justify-between text-sm">
            <label class="flex items-center">
              <input type="checkbox" v-model="rememberMe" class="mr-1"> Onthoud mij
            </label>
            <button @click="forgotPassword" class="text-blue-500">Wachtwoord vergeten?</button>
          </div>

          <button @click="login" class="w-full bg-blue-500 text-white p-2 mt-4 rounded">Log in</button>

          <div class="mt-4 text-center">
            <button @click="loginAsGuest" class="text-gray-600">Log in als gast</button>
          </div>

          <div class="mt-4 text-center">
            <button @click="register" class="text-blue-500">Nog geen account? Registreer hier</button>
          </div>

          <div class="mt-4 text-center border-t pt-4">
            <p class="text-sm">Of log in met</p>
            <div class="flex justify-center gap-4 mt-2">
              <button class="bg-red-500 text-white p-2 rounded">Google</button>
              <button class="bg-blue-700 text-white p-2 rounded">Facebook</button>
              <button class="bg-black text-white p-2 rounded">Apple</button>
            </div>
          </div>

          <button @click="resetRole" class="mt-4 w-full bg-gray-300 p-2 rounded">Terug</button>
        </div>

        <button @click="closePopup" class="mt-4 w-full bg-gray-300 p-2 rounded">Sluiten</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);

const emailOrUsername = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const role = ref('');
const roleSelected = ref(false);

const closePopup = () => emit('close');
const forgotPassword = () => alert('Wachtwoord resetten is nog niet geïmplementeerd');
const register = () => alert('Registratiepagina openen');
const loginAsGuest = () => alert('Ingelogd als gast');
const login = () => alert(`Inloggen als ${role.value} met: ${emailOrUsername.value}`);
const selectRole = (selectedRole) => {
  role.value = selectedRole;
  roleSelected.value = true;
};
const resetRole = () => {
  role.value = '';
  roleSelected.value = false;
};
</script>
