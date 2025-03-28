<template>
  <div class="min-h-screen flex flex-col items-center bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] p-6">
    <!-- Header -->
    <header class="w-full max-w-4xl text-center bg-white shadow-lg rounded-2xl px-6 py-4 mb-6 border border-gray-300">
      <h1 class="text-3xl md:text-4xl font-zen_loop text-gray-800">Ontdek het OuderPortaal</h1>
      <p class="text-lg font-dosis text-gray-700 mt-2">
        Alles wat je nodig hebt als ouder, op één plek. Van documentatie tot contact met je Nanny & Consultant.
      </p>
    </header>

    <!-- Video Preview -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300 text-center">
      <video controls class="w-full rounded-lg">
        <source src="/videos/OuderPortaalPreview.mp4" type="video/mp4" />
        Je browser ondersteunt deze video niet.
      </video>
      <p class="text-gray-600 font-dosis mt-2">Een eerste blik op het OuderPortaal.</p>
    </section>

    <!-- Wat krijg je als ouder? -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">Wat krijg je als klant?</h2>
      <ul class="mt-4 space-y-2 text-gray-700 font-dosis">
        <li>✅ Altijd inzicht in je afspraken en contactgegevens van je Nanny(s)/Consultant(s).</li>
        <li>✅ Volledig <strong>Kindvolgsysteem</strong>: Documenteer verslagen, foto's, mijlpalen en meer.</li>
        <li>✅ <strong>Direct contact</strong> met je Nanny of Consultant, allemaal vanuit één omgeving.</li>
        <li>✅ <strong>Jouw gezinsgegevens altijd bij de hand</strong> – alles overzichtelijk en veilig bewaard.</li>
        <li>✅ <strong>Documenteer en bekijk</strong> notities, afspraken, routines en speciale momenten.</li>
        <li>✅ <strong>Extra’s speciaal voor ouders</strong>: Dagboekopties, lifestyle journaling en een to-do systeem.</li>
      </ul>
    </section>

    <!-- Waarom kiezen voor het OuderPortaal? -->
    <section class="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-300">
      <h2 class="text-xl md:text-2xl font-zen_loop text-gray-700">Waarom het OuderPortaal?</h2>
      <p class="text-gray-700 font-dosis mt-2">
        Het OuderPortaal is ontworpen om ouders <strong>volledige controle en inzicht</strong> te geven in de zorg en begeleiding van hun kind.
        Met een overzichtelijk dashboard heb je altijd toegang tot afspraken, verslagen, foto's en speciale documenten.
        Bovendien biedt het een plek om zelf <strong>dagboeken, notities en taken</strong> bij te houden – voor een zorgeloze opvoedingservaring.
      </p>
    </section>

    <!-- Call to Action -->
    <section class="text-center w-full max-w-3xl">
      <NuxtLink to="/contact" class="px-6 py-3 bg-[#C8A2C8] text-white font-dosis rounded-lg shadow-md hover:bg-[#A983A2] transition">
        Word klant & ontdek het OuderPortaal
      </NuxtLink>
    </section>
  </div>
</template>
