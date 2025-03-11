<template>
  <div class="flex w-full flex-col items-center py-12">
    <!-- 🌟 Hero Sectie -->
    <header class="max-w-3xl text-center">
      <h1 class="font-zen_loop text-4xl text-gray-900">Gezinsondersteuning 👨‍👩‍👧‍👦</h1>
      <p class="mt-4 text-lg text-gray-700 font-dosis">
        Elk gezin is uniek. Wij kijken niet naar standaardoplossingen, maar naar wat écht werkt voor jouw gezin.
      </p>
    </header>

    <!-- 💡 Wat Maakt Ons Uniek? -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="rounded-2xl border border-purple-300 bg-white p-6 shadow-xl transition hover:shadow-2xl">
        <h2 class="mb-3 font-zen_loop text-2xl text-gray-800">💡 Wat Maakt Ons Uniek?</h2>
        <p class="font-dosis text-gray-700">
          Geen standaard opvoedmethodes, maar maatwerk. Geen eenrichtingsverkeer, maar samenwerking. Geen kant-en-klare adviezen, maar praktische ondersteuning.
        </p>
      </div>
    </section>

    <!-- 👨‍👩‍👧‍👦 Individuele Gezinsondersteuning -->
    <section class="mt-16 max-w-3xl text-center">
      <h2 class="mb-3 font-zen_loop text-2xl text-gray-800">👨‍👩‍👧‍👦 Individuele Gezinsondersteuning</h2>
      <p class="font-dosis text-gray-700">
        Wij kijken samen naar wat bij jouw gezin past, met:
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ 1-op-1 oudercoaching</li>
        <li>✔️ Praktijkgerichte ondersteuning</li>
        <li>✔️ Gezinscoaching op maat</li>
      </ul>
    </section>

    <!-- 🔥 Het Competente Kind -->
    <section class="mt-16 max-w-4xl text-center">
      <h2 class="font-zen_loop text-2xl text-gray-900">🔥 Het Competente Kind</h2>
      <p class="font-dosis text-gray-700">
        Elk kind is van nature nieuwsgierig en leergierig. Wij helpen jou als ouder om deze kracht te benutten.
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ Gesprekken: inzichten en strategieën voor ouders</li>
        <li>✔️ Praktijkopdrachten: direct toepasbare oefeningen</li>
        <li>✔️ Live ondersteuning: meekijken en voordoen tijdens situaties</li>
      </ul>
    </section>

    <!-- 🎯 Thema’s waarop wij ondersteunen -->
    <section class="mt-16 w-full max-w-5xl text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">🎯 Thema’s waarop wij ondersteunen</h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🍽️ Eten</h3>
          <p class="mt-2 font-dosis text-gray-600">Rust aan tafel zonder strijd.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">😴 Slapen</h3>
          <p class="mt-2 font-dosis text-gray-600">Een fijne bedtijdroutine zonder discussies.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🧍 Zelfstandigheid</h3>
          <p class="mt-2 font-dosis text-gray-600">Leren loslaten en vertrouwen op je kind.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🗣️ Communicatie</h3>
          <p class="mt-2 font-dosis text-gray-600">Begrijpen en begrepen worden.</p>
        </div>
      </div>
    </section>

    <!-- 📞 Call-to-Action -->
    <section class="mt-16 text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">📞 Samen kijken naar wat werkt?</h2>
      <p class="mt-2 font-dosis text-lg text-gray-700">
        Wil je ontdekken hoe wij jouw gezin kunnen ondersteunen? Neem contact op en we kijken samen naar de beste aanpak.
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
