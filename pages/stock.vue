<script setup lang="ts">
import type {Board} from "~/types/board";

const {data: boards} = await useFetch<Board[]>('/api/boards')
const {data: boardModels} = await useFetch<BoardModel[]>('/api/boardmodels')

</script>

<template>
  <h1 class="page-title">Stock</h1>
  <section>
    <h2>All models</h2>
    <ul class="models-list">
      <li v-for="boardModel in boardModels">
        <board-model-card :boardModel="boardModel"/>
      </li>
    </ul>
  </section>

  <section>
    <h2>All boards</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Model</th>
        <th>Booking count</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="board in boards">
        <td>{{ board.id }}</td>
        <td>{{ board.model.name }}</td>
        <td>{{ board.bookingCount }}</td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>

.models-list {
  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
}

h2 {
  font-weight: 400;
}

section:not(:last-child) {
  padding-bottom: var(--default-spacing);
}
</style>