<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white p-6">
    <header class="w-full text-center py-6 bg-purple-200 shadow-md rounded-lg">
      <h1 class="text-3xl font-bold text-gray-800">Agenda van Josje</h1>
    </header>
    <main class="flex flex-col items-center w-full py-12">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=Europe/Amsterdam"
        style="border: 0"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no">
      </iframe>
    </main>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
