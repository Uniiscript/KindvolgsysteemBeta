<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] p-6">
    <!-- Header -->
    <header class="w-full max-w-4xl text-center bg-white shadow-lg rounded-2xl px-6 py-4 mb-6 border border-gray-300">
      <h1 class="text-3xl md:text-4xl font-zen_loop text-gray-800">Tarieven & Pakketten</h1>
      <p class="text-lg font-dosis text-gray-700 mt-2">
        Kies het pakket dat bij jouw gezin past en ervaar ondersteuning op maat.
      </p>
    </header>

    <!-- Introductie -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300 text-center">
      <h2 class="text-xl md:text-2xl font-meow_script text-gray-800">Waarom slaapbegeleiding?</h2>
      <p class="text-gray-700 font-dosis mt-2">
        Slaap is essentieel voor zowel kinderen als ouders. Met onze op maat gemaakte <strong>slaappakketten</strong> helpen we jou en je kindje aan een betere nachtrust.
        Van eenmalig advies tot intensieve begeleiding: kies wat bij jullie past!
      </p>
    </section>

    <!-- Pakketten -->
    <section class="w-full max-w-4xl">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-800 text-center mb-6">Slaappakketten</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Basis Pakket -->
        <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition">
          <h3 class="text-lg md:text-xl font-zen_loop text-gray-700">✨ Basis Pakket</h3>
          <p class="text-gray-600 font-dosis mt-2">Voor ouders die eenmalig advies willen.</p>
          <ul class="mt-4 text-gray-700 font-dosis space-y-2 flex flex-col min-h-60">
            <li>✔️ 1x intakegesprek (45 min)</li>
            <li>✔️ Adviesplan op maat</li>
            <li>✔️ E-mail support (1 week)</li>
          </ul>
          <p class="text-lg font-dosis text-gray-800 mt-4">€99,-</p>
        </div>

        <!-- Premium Pakket -->
        <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition">
          <h3 class="text-lg md:text-xl font-zen_loop text-gray-700">🌙 Premium Pakket</h3>
          <p class="text-gray-600 font-dosis mt-2">Begeleiding met opvolging en ondersteuning.</p>
          <ul class="mt-4 text-gray-700 font-dosis space-y-2 flex flex-col min-h-60">
            <li>✔️ 1x intakegesprek (60 min)</li>
            <li>✔️ Persoonlijk slaapplan</li>
            <li>✔️ WhatsApp support (2 weken)</li>
            <li>✔️ 1x opvolggesprek (30 min)</li>
          </ul>
          <p class="text-lg font-dosis text-gray-800 mt-4">€149,-</p>
        </div>

        <!-- VIP Pakket -->
        <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition">
          <h3 class="text-lg md:text-xl font-zen_loop text-gray-700">🌟 Deluxe Pakket</h3>
          <p class="text-gray-600 font-dosis mt-2">Persoonlijke begeleiding voor intensieve hulp.</p>
          <ul class="mt-4 text-gray-700 font-dosis space-y-2 flex flex-col min-h-60">
            <li>✔️ 1x intakegesprek (90 min)</li>
            <li>✔️ Persoonlijk slaapplan</li>
            <li>✔️ Dagelijks WhatsApp support (4 weken)</li>
            <li>✔️ 2x opvolggesprek (45 min)</li>
            <li>✔️ Extra tips & 1x Live begeleiding</li>
            <li>✔️ Observatie & feedback tijdens slaaproutine</li>
          </ul>
          <p class="text-lg font-dosis text-gray-800 mt-4">€249,-</p>
        </div>

        <!-- Deluxe Pakket -->
        <div class="bg-white shadow-md rounded-2xl p-6 border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition lg:col-span-3">
          <h3 class="text-lg md:text-xl font-zen_loop text-gray-700">🌟✨ VIP Deluxe Pakket</h3>
          <p class="text-gray-600 font-dosis mt-2">Live observatie en begeleiding tijdens de slaaproutine.</p>
          <ul class="mt-4 text-gray-700 font-dosis space-y-2 flex flex-col min-h-60">
            <li>✔️ 1x uitgebreide intake (90 min)</li>
            <li>✔️ Persoonlijk slaapplan</li>
            <li>✔️ <strong>Meekijken, observeren & feedback</strong> tijdens slaaproutine</li>
            <li>✔️ 2x Live begeleiding</li>
            <li>✔️ Dagelijks WhatsApp support (6 weken)</li>
            <li>✔️ 3x opvolggesprek (45 min)</li>
            <li>✔️ <strong>Aanpassingsplan</strong> op basis van observaties en begeleiding</li>
          </ul>
          <p class="text-lg font-dosis text-gray-800 mt-4">€349,-</p>
        </div>
      </div>
    </section>

    <!-- Extra Diensten -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mt-6 border border-gray-300">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-800 text-center">Extra's</h2>
      <ul class="mt-4 text-gray-700 font-dosis space-y-2 text-center flex flex-col min-h-60">
        <li>🍼 <strong>Los opvolggesprek (30 min):</strong> €39,-</li>
        <li>📞 <strong>Extra week WhatsApp support:</strong> €29,-</li>
        <li>💤 <strong>Avondbegeleiding bij bedtijd (2 uur):</strong> €99,-</li>
      </ul>
    </section>

    <!-- Call to Action -->
    <section class="text-center w-full max-w-3xl mt-6">
      <NuxtLink to="/contact" class="px-6 py-3 bg-[#C8A2C8] text-white font-dosis rounded-lg shadow-md hover:bg-[#A983A2] transition">
        Kies jouw pakket & start vandaag
      </NuxtLink>
    </section>
  </div>
</template>
