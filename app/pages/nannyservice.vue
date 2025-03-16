<template>
  <div class="flex flex-col items-center justify-center min-h-screen py-12">
    <!-- Header -->
    <header class="mb-6 w-full max-w-4xl rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center shadow-lg">
      <h1 class="font-zen_loop text-3xl text-gray-800 md:text-4xl">
        👶✨ Oppasservice
      </h1>
      <p class="mt-2 font-dosis text-lg text-gray-700">
        Vind de perfecte nanny voor jouw gezin! ❤️
      </p>
    </header>

    <!-- Nannies Grid -->
    <section class="w-full max-w-4xl">
      <h2 class="mb-6 text-center font-zen_loop text-xl text-gray-800 md:text-2xl">
        👩‍🍼 Beschikbare Nannies
      </h2></section>
      <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <!-- Nanny Card 1 -->
        <Josjegridcard />

        <!-- Nanny Card 2 -->
        <Dominigridcard />

        <!-- Nanny Card 3 -->
         <Samgridcard />

      </section>

    <!-- Extra Info Over Ons Team -->
    <section class="mt-6 w-full max-w-3xl rounded-2xl border border-gray-300 bg-white p-6 shadow-md">
      <h2 class="text-center font-zen_loop text-xl text-gray-800 md:text-2xl">
        🌟 Leuke feitjes over het team die je vast nog niet wist!
      </h2>
      <ul class="mt-4 space-y-2 text-center font-dosis text-gray-700">
        <li>🍼 Josje verschoonde haar eerste luier op haar 12de!</li>
        <li>⚽ Sam zit zelf ook nog op voetbal!!</li>
        <li>🎓 Domini gaat binnenkort weer starten met een nieuwe opleiding!</li>
      </ul>
    </section>

    <!-- Call to Action -->
    <section class="mt-6 w-full max-w-3xl text-center">
      <NuxtLink to="/contact" class="rounded-lg bg-[#FF8C94] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#E5737A]">
        Boek een nanny vandaag! 🍼
      </NuxtLink>
    </section>
  </div>
</template>
