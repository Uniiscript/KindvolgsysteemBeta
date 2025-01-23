<script lang="ts" setup>
import { authConfig } from '~~/shared/authConfig';
</script>

<template>
  <div>
    <NuxtLink external :to="`${authConfig.githubSigninURL}`">
      Signin with Github
    </NuxtLink>
  </div>
</template>
