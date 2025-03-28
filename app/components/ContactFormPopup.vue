<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])
const errorMessage = ref('')

const parentName = ref('')
const contactOptions = ref({ phone: false, email: false })
const phone = ref('')
const email = ref('')
const numChildren = ref(0)
const expecting = ref(false)
const dueDate = ref('')
const pregnancyDuration = ref('')
const children = ref([])

const todayDate = new Date()
const today = todayDate.toISOString().split('T')[0]
const maxDueDate = new Date(new Date().setMonth(todayDate.getMonth() + 10)).toISOString().split('T')[0]
const minBirthdate = new Date(todayDate.getFullYear() - 18, todayDate.getMonth(), todayDate.getDate()).toISOString().split('T')[0]

function toggleContact(type) {
	contactOptions.value[type] = !contactOptions.value[type]
}

function updateChildrenFields() {
	children.value = Array.from({ length: numChildren.value }, () => ({
		name: '',
		birthdate: '',
		age: '',
		showBirthdayNotice: false,
		upcomingAge: null,
		birthdayCountdown: 0,
	}))
}

function calculatePregnancyDuration() {
	if (!dueDate.value)
    return

	const due = new Date(dueDate.value)
	const conceptionDate = new Date(due)
	conceptionDate.setDate(conceptionDate.getDate() - 280)
	const now = new Date()
	const diff = now - conceptionDate

	if (diff < 0) {
		pregnancyDuration.value = 'Nog niet zwanger'
		return
	}

	const weeksPregnant = Math.floor(diff / (1000 * 60 * 60 * 24 * 7))
	const months = Math.floor(weeksPregnant / 4)
	const weeks = weeksPregnant % 4

	pregnancyDuration.value = `${months} maanden, ${weeks} weken zwanger`
}

function calculateAge(index) {
	const child = children.value[index]
	if (!child.birthdate || child.birthdate.length < 10)
    return

	const birth = new Date(child.birthdate)
	const now = new Date()

	let ageYears = now.getFullYear() - birth.getFullYear()
	let ageMonths = now.getMonth() - birth.getMonth()
	let ageDays = now.getDate() - birth.getDate()

	if (ageDays < 0) {
		ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
		ageMonths--
	}
	if (ageMonths < 0) {
		ageMonths += 12
		ageYears--
	}

	child.age = `${ageYears} jaar, ${ageMonths} maanden en ${ageDays} dagen`

	const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
	if (nextBirthday < now) {
		nextBirthday.setFullYear(now.getFullYear() + 1)
	}

	const daysUntilBirthday = Math.floor((nextBirthday - now) / (1000 * 60 * 60 * 24))

	if (daysUntilBirthday >= 0 && daysUntilBirthday <= 31) {
		child.upcomingAge = ageYears + 1
		child.birthdayCountdown = daysUntilBirthday
		child.showBirthdayNotice = true

		setTimeout(() => {
			child.showBirthdayNotice = false
		}, 8000)
	}
}

async function submitForm() {
	const formData = {
		parentName: parentName.value,
		contactOptions: contactOptions.value,
		phone: phone.value,
		email: email.value,
		numChildren: numChildren.value,
		expecting: expecting.value,
		dueDate: dueDate.value,
		children: children.value,
	}

	try {
		const res = await fetch('/api/contactform/send.post', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData),
		})

		const result = await res.json()

		if (!res.ok || !result.success) {
			throw new Error(result.error || 'Onbekende fout')
		}

		resetForm()
		emit('close')
    // OF gebruik een toast of een aparte melding buiten het formulier
  } catch (err) {
    console.error('Fout bij verzenden:', err)
    errorMessage.value = `Fout: ${err.message || 'Probeer het later opnieuw.'}`
  }
}

function resetForm() {
	parentName.value = ''
	phone.value = ''
	email.value = ''
	numChildren.value = 0
	expecting.value = false
	dueDate.value = ''
	children.value = []
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
      <h2 class="mb-4 text-center font-zen_loop text-4xl">
        Contactformulier
      </h2>
      <form class="space-y-4" @submit.prevent="submitForm">
        <p v-if="errorMessage" class="text-red-600">
          {{ errorMessage }}
        </p>
        <div>
          <label class="block font-dosis">Naam ouder:</label>
          <input v-model="parentName" type="text" class="w-full rounded border p-2" required>
        </div>

        <div>
          <label class="block font-dosis">Contactmogelijkheden:</label>
          <div class="flex space-x-4">
            <label class="text-dosis flex items-center">
              <input type="checkbox" @change="toggleContact('phone')"> Telefoon
            </label>
            <label class="text-dosis flex items-center">
              <input type="checkbox" @change="toggleContact('email')"> E-mail
            </label>
          </div>
        </div>

        <div v-if="contactOptions.phone">
          <label class="block font-dosis">Telefoonnummer:</label>
          <input v-model="phone" type="tel" class="w-full rounded border p-2" required>
        </div>

        <div v-if="contactOptions.email">
          <label class="block font-dosis">E-mailadres:</label>
          <input v-model="email" type="email" class="w-full rounded border p-2" required>
        </div>

        <div>
          <label class="block font-dosis">Aantal kinderen:</label>
          <input v-model.number="numChildren" type="number" min="0" class="w-full rounded border p-2" required @input="updateChildrenFields">
        </div>

        <div v-if="numChildren >= 0">
          <label class="flex items-center space-x-2 font-dosis">
            <input v-model="expecting" type="checkbox">
            <span>In verwachting</span>
          </label>
        </div>

        <div v-if="expecting">
          <label class="block font-dosis">Uitgerekende datum:</label>
          <input v-model="dueDate" type="date" class="w-full rounded border p-2" :min="today" :max="maxDueDate" required @input="calculatePregnancyDuration">
          <p v-if="pregnancyDuration" class="font-medium text-green-600">
            Gefeliciteerd! U bent nu {{ pregnancyDuration }} zwanger.
          </p>
        </div>

        <div v-for="(child, index) in children" :key="index" class="relative rounded-lg bg-gray-100 p-4">
          <h3 class="font-dosis">
            Kind {{ index + 1 }}
          </h3>
          <div>
            <label class="block font-dosis">Naam kind:</label>
            <input v-model="child.name" type="text" class="w-full rounded border p-2" required>
          </div>
          <div>
            <label class="block font-dosis">Geboortedatum:</label>
            <input
              v-model="child.birthdate"
              type="date"
              class="w-full rounded border p-2"
              :min="minBirthdate"
              :max="today"
              required
              @blur="calculateAge(index)"
            >
            <p v-if="child.age" class="font-dosis text-blue-600">
              Leeftijd: {{ child.age }}
            </p>
          </div>

          <transition name="fade">
            <div
              v-if="child.showBirthdayNotice"
              class="absolute inset-x-0 top-0 animate-bounce rounded-t-lg bg-yellow-200 py-2 text-center text-yellow-900 shadow"
            >
              🎉 Wat leuk! {{ child.name || 'Je kind' }} is bijna jarig over
              {{ child.birthdayCountdown }} dagen, alvast gefeliciteerd en wie weet tot snel!
            </div>
          </transition>
        </div>

        <button type="submit" class="w-full rounded-lg bg-purple-600 py-2 font-zen_loop text-2xl text-white transition hover:bg-purple-700">
          Versturen
        </button>
      </form>

      <button class="mt-4 w-full font-zen_loop text-2xl text-gray-600 hover:underline" @click="$emit('close')">
        Sluiten
      </button>
    </div>
  </div>
</template>

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
