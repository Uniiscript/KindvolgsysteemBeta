<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] p-6">
    <!-- Header -->
    <header class="w-full max-w-4xl text-center bg-white shadow-lg rounded-2xl px-6 py-4 mb-6 border border-gray-300">
      <h1 class="text-3xl md:text-4xl font-zen_loop text-gray-800">Ontdek het MedewerkersPortaal</h1>
      <p class="text-lg font-dosis text-gray-700 mt-2">
        Alles wat je nodig hebt als medewerker, op één plek. Van planning tot communicatie met ouders.
      </p>
    </header>

    <!-- Video Preview -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300 text-center">
      <video controls class="w-full rounded-lg">
        <source src="/videos/MedewerkersPortaalPreview.mp4" type="video/mp4" />
        Je browser ondersteunt deze video niet.
      </video>
      <p class="text-gray-600 font-dosis mt-2">Een eerste blik op het MedewerkersPortaal.</p>
    </section>

    <!-- Wat krijg je als medewerker? -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">Wat krijg je als medewerker?</h2>
      <ul class="mt-4 space-y-2 text-gray-700 font-dosis">
        <li>✅ <strong>Overzichtelijke planning</strong> met al je opdrachten en afspraken.</li>
        <li>✅ <strong>Direct contact</strong> met ouders via het portaal, zonder gedoe.</li>
        <li>✅ <strong>Eigen dashboard</strong> met urenregistratie en belangrijke documenten.</li>
        <li>✅ <strong>Toegang tot gezinsgegevens</strong>, zodat je altijd weet wat nodig is.</li>
        <li>✅ <strong>Mogelijkheid om verslagen en notities bij te houden</strong> per kind.</li>
        <li>✅ <strong>Extra functies</strong> zoals dagjournaling en to-do lijsten om je werk efficiënt te plannen.</li>
      </ul>
    </section>

    <!-- Waarom kiezen voor het MedewerkersPortaal? -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">Waarom het MedewerkersPortaal?</h2>
      <p class="text-gray-700 font-dosis mt-2">
        Het MedewerkersPortaal helpt jou om <strong>efficiënter te werken en georganiseerd te blijven</strong>.
        Met een <strong>overzichtelijke planning, documentbeheer en communicatieopties</strong> heb je alles wat je nodig hebt om ouders en kinderen zo goed mogelijk te ondersteunen.
        Alles is <strong>veilig, snel en gemakkelijk</strong> toegankelijk vanuit één systeem.
      </p>
    </section>

    <!-- Call to Action -->
    <section class="text-center w-full max-w-3xl">
      <NuxtLink to="/ons-team" class="px-6 py-3 bg-[#C8A2C8] text-white font-semibold rounded-lg shadow-md hover:bg-[#A983A2] transition">
        Word medewerker & ontdek het MedewerkersPortaal
      </NuxtLink>
    </section>
  </div>
</template>
