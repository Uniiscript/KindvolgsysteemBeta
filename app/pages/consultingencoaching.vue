<script setup lang="ts">
import { ref } from "vue";

const showContactForm = ref(false);
</script>

<template>
  <div class="flex w-full flex-col items-center py-12">
    <!-- 🌟 Hero Sectie -->
    <header class="max-w-3xl text-center">
      <h1 class="font-zen_loop text-4xl text-gray-900">Consulting & Coaching 🤝</h1>
      <p class="mt-4 text-lg text-gray-700 font-dosis">
        Kleine stapjes, samen groeien. Wij geloven in begeleiding die aansluit op jouw tempo en behoeften.
      </p>
    </header>

    <!-- 💡 Waar Staan Wij Voor? -->
    <section class="mt-12 max-w-3xl text-center">
      <div class="rounded-2xl border border-purple-300 bg-white p-6 shadow-xl transition hover:shadow-2xl">
        <h2 class="mb-3 font-zen_loop text-2xl text-gray-800">💡 Waar Staan Wij Voor?</h2>
        <p class="font-dosis text-gray-700">
          Groei gebeurt niet in één dag. Net zoals een kind stap voor stap leert, geloven wij dat ouders ook groeien in kleine stappen. Samen werken we aan de beste ondersteuning, afgestemd op jouw gezin.
        </p>
      </div>
    </section>

    <!-- 🤝 Samen in Contact -->
    <section class="mt-16 max-w-4xl text-center">
      <h2 class="font-zen_loop text-2xl text-gray-900">🤝 Samen in Contact</h2>
      <p class="font-dosis text-gray-700">
        Wij geloven in open communicatie en samenwerking. Of het nu gaat om de eerste schooldag, een overstap naar de kinderopvang of het aangaan van gesprekken met een opvang, wij helpen je graag.
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ Voorbereiding op de eerste kinderopvangdag</li>
        <li>✔️ Ondersteuning bij oudergesprekken met school of opvang</li>
        <li>✔️ Hoe stel je de juiste vragen als je iets wilt weten?</li>
      </ul>
    </section>

    <!-- 🎓 Ervaring & Expertise -->
    <section class="mt-16 max-w-4xl text-center">
      <h2 class="font-zen_loop text-2xl text-gray-900">🎓 Ervaring & Expertise</h2>
      <p class="font-dosis text-gray-700">
        Al onze nannies en consultants hebben ervaring in/vanuit de kinderopvang of werken op een school. Zij helpen jou met liefde en kennis in alle dagelijkse situaties.
      </p>
      <ul class="mt-4 text-gray-700 text-lg">
        <li>✔️ Begeleiding bij dagelijkse uitdagingen</li>
        <li>✔️ Advies en ondersteuning door ervaren professionals</li>
        <li>✔️ Oudercoaching op maat</li>
      </ul>
    </section>

    <!-- 🎯 Thema’s waarop wij ondersteunen -->
    <section class="mt-16 w-full max-w-5xl text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">🎯 Thema’s waarop wij ondersteunen</h2>
      <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">👶 Eerste opvang</h3>
          <p class="mt-2 font-dosis text-gray-600">Samen zorgen voor een soepele overgang.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🏫 Schoolgesprekken</h3>
          <p class="mt-2 font-dosis text-gray-600">Hoe voer je effectieve gesprekken met school?</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">🗣️ Communicatie met je kind</h3>
          <p class="mt-2 font-dosis text-gray-600">Hoe stel je de juiste vragen?</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">😴 Slapen</h3>
          <p class="mt-2 font-dosis text-gray-600">Rustige avonden en betere nachtrust.</p>
        </div>
        <div class="rounded-xl border border-gray-300 bg-white p-6 shadow-md">
          <h3 class="text-xl font-zen_loop text-gray-800">👴 Opa’s & Oma’s</h3>
          <p class="mt-2 font-dosis text-gray-600">Balans vinden tussen verwennen en opvoeden.</p>
        </div>
      </div>
    </section>

    <!-- 📞 Call-to-Action -->
    <section class="mt-16 text-center">
      <h2 class="font-zen_loop text-3xl text-gray-900">📞 Samen kijken naar de juiste aanpak?</h2>
      <p class="mt-2 font-dosis text-lg text-gray-700">
        Wil je begeleiding bij de opvoeding, gesprekken of dagelijkse uitdagingen? Neem contact met ons op.
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
