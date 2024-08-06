<script setup lang="ts">

import type {BoardModel} from "~/models/board-model";

defineProps<{ boardModel: BoardModel }>()
</script>

<template>
  <div class="board-card">
    <img :src="boardModel.photoUrl" width="30px">
    <div class="board-identity">
      <span class="board-name">{{ boardModel.name }}</span>
      <p class="board-description">
        {{ boardModel.description }}
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.board-card {
  border: var(--default-border-color) solid 1px;
  border-radius: var(--default-radius);
  width: fit-content;
  padding: var(--default-spacing);

  display: flex;
  flex-direction: row;
  gap: var(--default-spacing);
}

.board-identity {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.board-name {
  font-size: 1.2rem;
  font-weight: 400;
  text-transform: capitalize;
}

.board-description {
  font-size: 0.9rem;
  font-weight: 100;
}
</style>