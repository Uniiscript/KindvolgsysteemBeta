<script lang="ts" setup>
const showCSSDebug = ref(false)

function applyDevelopmentStyles() {
    document.querySelectorAll(`*`).forEach((el) => {
      if (el instanceof HTMLElement)
        el.style.border = showCSSDebug.value ? `1px solid red` : ``
    })
}

onMounted(() => {
  applyDevelopmentStyles()
})

watch(showCSSDebug, () => {
  applyDevelopmentStyles()
})
</script>

<template>
  <button
    class="fixed bottom-1 left-8 z-50 flex size-6 items-center justify-center rounded-full
           bg-gray-800 p-3 font-mono text-xs text-white transition-colors hover:bg-gray-700"
    @click="showCSSDebug = !showCSSDebug"
  >
    <span :class="{ 'text-green-400': showCSSDebug, 'text-gray-400': !showCSSDebug }">
      CSS
    </span>
  </button>
</template>
