<template>
  <Menu/>
  <section class="main-content">
    <PrimeToast position="top-center" group="global-notifications"/>
    <NuxtPage/>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.main-content {
  margin: var(--default-spacing);
}
</style>