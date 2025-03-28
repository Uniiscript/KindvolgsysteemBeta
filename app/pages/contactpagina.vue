<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-[400px] h-[250px] p-6 rounded-lg bg-gradient-to-b from-[rgb(214,201,174)] to-[#A8E6CF] shadow-xl flex justify-between items-center border border-gray-300 hover:scale-105 transform transition-all duration-300">
      <div class="flex-1 mr-6">
        <h2 class="text-2xl font-semibold text-gray-800 font-meow_script mb-2">Little Steps Care</h2>
        <p class="text-sm text-gray-600 mb-4">Een team van Nannies & Consultants, voor al jouw gezinsbehoeftes op maat.</p>
        <a href="https://www.littlestepscare.nl" class="text-blue-600 text-sm font-dosis hover:underline">www.littlestepscare.nl</a>
      </div>
      <div class="w-[120px] h-[120px]">
        <Qrcode :value="qrValue" :size="120" />
      </div>
    </div>
  </div>
</template>

<script>
import Qrcode from "vue-qrcode";

export default {
  components: {
    Qrcode,
  },
  data() {
    return {
      qrValue: "https://www.littlestepscare.nl", // De URL voor de QR-code
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Loop&family=Dosis:wght@400;600&family=Meow+Script&display=swap');

.font-zen-loop {
  font-family: 'Zen Loop', cursive;
}

.font-meow-script {
  font-family: 'Meow Script', cursive;
}

.font-dosis {
  font-family: 'Dosis', sans-serif;
}
</style>
