<template>
  <div class="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen p-6">
    <div class="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <!-- Header -->
      <header class="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-6">
        <h1 class="text-4xl font-bold">Kind Dashboard</h1>
      </header>

      <div class="p-6 space-y-8">
        <!-- Profiel Gegevens -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="flex items-center gap-6">
            <!-- Profielfoto -->
            <div class="w-36 h-36 sm:w-40 sm:h-40 border-4 border-dashed border-gray-300 rounded-full overflow-hidden">
              <img
                src="https://via.placeholder.com/150"
                alt="Profielfoto"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="flex flex-col justify-between">
              <div>
                <label class="block text-gray-700 font-medium mb-1">Voornaam</label>
                <p class="text-gray-900 font-medium">Jan</p>
              </div>
              <div>
                <label class="block text-gray-700 font-medium mb-1">Achternaam</label>
                <p class="text-gray-900 font-medium">Jansen</p>
              </div>
            </div>
          </div>

          <!-- Geboortedatum -->
          <div>
            <label class="block text-gray-700 font-medium mb-1">Geboortedatum</label>
            <p class="text-gray-900 font-medium">15-03-2015</p>
            <span class="text-gray-600 mt-2">Leeftijd: 9 jaar</span>
          </div>
        </div>

        <!-- Noodnummer en Informatie huisarts -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-gray-700 font-medium mb-1">Noodnummer</label>
            <p class="text-gray-900 font-medium">+31 6 12345678</p>
          </div>
          <div>
            <label class="block text-gray-700 font-medium mb-1">Informatie Huisarts</label>
            <p class="text-gray-900 font-medium">
              Dr. de Vries<br />
              Huisartspraktijk Centrum<br />
              Tel: +31 20 9876543
            </p>
          </div>
        </div>

        <!-- Tijdlijn Component -->
        <Kindtijdlijn />
      </div>
    </div>
  </div>
</template>
