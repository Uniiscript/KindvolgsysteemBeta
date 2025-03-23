<script lang="ts" setup>
import { renderSVG } from 'uqr'

const qrcode = renderSVG('https://www.littlestepscare.nl/')
</script>

<template>
  <div class="size-screen flex items-center justify-center">
    <div
      class="size-[200px]"
      v-html="qrcode"
    />
  </div>
</template>
