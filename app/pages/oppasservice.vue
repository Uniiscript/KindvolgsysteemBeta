<script setup lang="ts">
import { ref } from "vue";
import ContactFormPopup from "~/components/ContactFormPopup.vue";

const showContactForm = ref(false);
</script>

<template>
  <div class="flex w-full flex-col items-center py-12">
    <!-- 🌟 Hero Sectie -->
    <header class="max-w-3xl text-center">
      <h1 class="font-zen_loop text-4xl text-gray-900">Oppasservice 👶💜</h1>
      <p class="mt-4 text-lg text-gray-700 font-dosis">
        Meer dan alleen oppassen – wij bieden vertrouwen, aandacht en ondersteuning voor het hele gezin.
      </p>
    </header>

    <!-- 💡 Waarom kiezen voor ons? -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="rounded-2xl border border-purple-300 bg-white p-6 shadow-xl transition hover:shadow-2xl">
        <h2 class="mb-3 font-zen_loop text-2xl text-gray-800">💡 Waarom kiezen voor ons?</h2>
        <p class="font-dosis text-gray-700">
          Oppassen is bij ons niet simpelweg ‘aanwezig zijn’ – wij nemen écht de tijd voor jouw kind én voor jou als ouder. Wij bieden niet alleen zorg, maar ook ondersteuning en advies, waardoor het oppassen soepel en vertrouwd verloopt.
        </p>
      </div>
    </section>

    <!-- 🏡 Onze Aanpak -->
    <section class="mt-16 max-w-4xl text-center">
      <h2 class="font-zen_loop text-2xl text-gray-900">🏡 Onze Aanpak</h2>
      <p class="font-dosis text-gray-700">
        Wat ons onderscheidt van reguliere oppasservices? Wij nemen de tijd om écht te begrijpen wat jouw gezin nodig heeft.
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ <strong>Kennismaking</strong> – Een rustige eerste ontmoeting om de klik te voelen en routines te bespreken.</li>
        <li>✔️ <strong>Ouders ondersteunen</strong> – Niet alleen oppassen, maar ook adviseren en helpen bij opvoedvragen.</li>
        <li>✔️ **Maatwerk in contact** – Wij vragen hoe ouders het prettig vinden om updates te ontvangen.</li>
        <li>✔️ **Structuur & routines** – We bespreken gewoontes uitvoerig zodat het oppassen soepel verloopt.</li>
      </ul>
    </section>

    <!-- 🛡️ Vertrouwen & Communicatie -->
    <section class="mt-16 max-w-4xl text-center">
      <h2 class="font-zen_loop text-2xl text-gray-900">🛡️ Vertrouwen & Communicatie</h2>
      <p class="font-dosis text-gray-700">
        Wij begrijpen dat elke ouder andere behoeften heeft als het gaat om contact tijdens het oppassen. Daarom stellen wij zelf de vragen die ouders misschien niet durven te stellen:
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ **Updates bij baby’s** – Wil je een berichtje als je baby een flesje op heeft of slaapt?</li>
        <li>✔️ **Verslag bij thuiskomst** – Wij noteren belangrijke momenten, zodat je niets mist.</li>
        <li>✔️ **Foto’s en updates** – Wil je af en toe een foto ontvangen van je spelende kind?</li>
      </ul>
    </section>

    <!-- 🎯 Oppaspakketten -->
    <section class="mt-16 w-full max-w-5xl text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">🎯 Onze Oppaspakketten</h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🌟 Basis Oppas Pakket</h3>
          <p class="mt-2 font-dosis text-gray-600">Een vertrouwde en liefdevolle oppas voor jouw kind(eren).</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🎨 Activiteiten Pakket</h3>
          <p class="mt-2 font-dosis text-gray-600">Creatieve en educatieve activiteiten tijdens het oppassen.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🌙 Avond Pakket</h3>
          <p class="mt-2 font-dosis text-gray-600">Oppas in de avond, inclusief bedtijdroutine en nachtrust.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🛏️ Overnachting Pakket</h3>
          <p class="mt-2 font-dosis text-gray-600">Oppas inclusief overnachting en ochtendroutine.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">👩‍⚕️ Specialistische Nanny</h3>
          <p class="mt-2 font-dosis text-gray-600">Extra ondersteuning bij specifieke behoeften.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🗣️ Consultancy & Coaching</h3>
          <p class="mt-2 font-dosis text-gray-600">Ouderbegeleiding en opvoedadvies.</p>
        </div>
      </div>
    </section>

    <!-- 📞 Call-to-Action -->
    <section class="mt-16 text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">📞 Wil je kennismaken?</h2>
      <p class="mt-2 font-dosis text-lg text-gray-700">
        Plan een kennismaking en ontdek hoe wij jouw gezin kunnen ondersteunen met onze oppasservice.
      </p>
      <button
        class="mt-6 inline-block rounded-lg bg-[#C8A2C8] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-purple-500"
        @click="showContactForm = true"
      >
        Contactformulier
      </button>
    </section>

    <!-- Contact Form Popup -->
    <ContactFormPopup v-if="showContactForm" @close="showContactForm = false" />
  </div>
</template>
