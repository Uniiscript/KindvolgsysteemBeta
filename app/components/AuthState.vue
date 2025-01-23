<script lang="ts" setup>
import { useUserSession } from '~/composables/session';

const { loggedIn, user, session, clear, ready } = useUserSession()
</script>

<template>
  <slot
    v-if="ready"
    v-bind="{ loggedIn, user, session, clear }"
  />
  <slot
    v-else
    name="placeholder"
  />
</template>
