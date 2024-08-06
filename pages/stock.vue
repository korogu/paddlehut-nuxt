<script setup lang="ts">
import type {Board} from "~/types/board";

const {data: boards} = await useFetch<Board[]>('/api/boards')
const {data: boardModels} = await useFetch<BoardModel[]>('/api/boardmodels')

</script>

<template>
  <h1 class="page-title">Stock</h1>
  <section>
    <ul class="models-list">
      <li v-for="boardModel in boardModels">
        <board-model-card :boardModel="boardModel"/>
      </li>
    </ul>
  </section>

  <section>
    <h2>All boards</h2>
    <PrimeDataTable :value="boards" tableStyle="min-width: 50rem">
      <PrimeColumn field="id" header="Name">
      </PrimeColumn>
      <PrimeColumn field="model.name" header="Model">
      </PrimeColumn>
      <PrimeColumn field="bookingCount" header="Booking count"></PrimeColumn>
    </PrimeDataTable>
  </section>
</template>

<style scoped>

.models-list {
  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
}

section:not(:last-child) {
  padding-bottom: var(--default-spacing);
}
</style>