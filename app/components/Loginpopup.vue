<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold text-center">Log in</h2>

        <!-- Keuzemenu -->
        <div v-if="!roleSelected" class="mt-4 text-center">
          <p class="text-sm">Kies je rol om in te loggen:</p>
          <div class="flex flex-col gap-2 mt-2">
            <button @click="selectRole('ouder')" class="bg-blue-500 text-white p-2 rounded hover:bg-opacity-80">Ouder</button>
            <button @click="selectRole('consultant')" class="bg-green-500 text-white p-2 rounded hover:bg-opacity-80">Consultant / Nanny</button>
            <button @click="selectRole('admin')" class="bg-red-500 text-white p-2 rounded hover:bg-opacity-80">Admin</button>
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
            <button type="button" @click="showPassword = !showPassword" class="absolute right-2 top-9 text-sm">👁️</button>
          </div>

          <div class="mt-2 flex justify-between text-sm">
            <label class="flex items-center">
              <input type="checkbox" v-model="rememberMe" class="mr-1"> Onthoud mij
            </label>
            <button @click="forgotPassword" class="text-blue-500 hover:underline">Wachtwoord vergeten?</button>
          </div>

          <button @click="login" class="w-full bg-blue-500 text-white p-2 mt-4 rounded hover:bg-opacity-80">Log in</button>

          <div class="mt-4 text-center">
            <button @click="loginAsGuest" class="text-gray-600 hover:underline">Log in als gast</button>
          </div>

          <div class="mt-4 text-center">
            <button @click="register" class="text-blue-500 hover:underline">Nog geen account? Registreer hier</button>
          </div>

          <div class="mt-4 text-center border-t pt-4">
            <p class="text-sm">Of log in met</p>
            <div class="flex justify-center gap-4 mt-2">
              <button class="bg-red-500 text-white p-2 rounded hover:bg-opacity-80">Google</button>
              <button class="bg-blue-700 text-white p-2 rounded hover:bg-opacity-80">Facebook</button>
              <button class="bg-black text-white p-2 rounded hover:bg-opacity-80">Apple</button>
            </div>
          </div>

          <button @click="resetRole" class="mt-4 w-full bg-gray-300 p-2 rounded hover:bg-opacity-80">Terug</button>
        </div>

        <button @click="closePopup" class="mt-4 w-full bg-gray-300 p-2 rounded hover:bg-opacity-80">Sluiten</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router';

const _props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close']);
const router = useRouter();

const emailOrUsername = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);
const role = ref('');
const roleSelected = ref(false);

const closePopup = () => emit('close');

const forgotPassword = () => router.push('/forgot-password');
const register = () => router.push('/register');
const loginAsGuest = () => console.warn('Ingelogd als gast');

function login() {
  if (!role.value) {
    console.warn('Selecteer eerst een rol om in te loggen');
    return;
  }
  console.warn(`Inloggen als ${role.value} met: ${emailOrUsername.value}`);
}

function selectRole(selectedRole) {
  role.value = selectedRole;
  roleSelected.value = true;
}

function resetRole() {
  role.value = '';
  roleSelected.value = false;
}
</script>
