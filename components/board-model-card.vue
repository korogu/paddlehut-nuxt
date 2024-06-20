<script setup lang="ts">

import type {BoardModel} from "~/types/board-model";

defineProps<{ boardModel: BoardModel }>()
</script>

<template>
  <div>
    {{ boardModel.name }}
    <br/>
    {{ boardModel.description }}
    <br/>
    <img :src="boardModel.photoUrl">
  </div>
</template>

<style scoped>

</style>