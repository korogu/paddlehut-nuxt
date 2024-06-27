<script setup lang="ts">

</script>

<template>
  <header>
    <img src="~/assets/images/paddlehut-logo.svg" alt="PaddleHut logo" class="logo"/>
    <h1><a href="/">PaddleHut</a></h1>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/stock">
            <PrimeButton label="Stock" link/>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/booking">
            <PrimeButton label="Bookings" link/>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/booking/new">
            <PrimeButton label="New booking"/>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  border-bottom: var(--default-border-color) solid 1px;
}

.logo {
  width: 4em;
  filter: var(--brand-color-filter);
  margin: var(--default-spacing);
}

h1 {
  margin: var(--default-spacing) 0;
  align-self: end;
}

nav {
  margin: var(--default-spacing);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

</style>