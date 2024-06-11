<script setup lang="ts">
import type {BoardModel} from "~/types/boardmodel";

defineProps<{ boardModel: BoardModel }>()
</script>

<template>
  {{ boardModel.name }} - {{ boardModel.boardCount }} in stock
</template>

<style scoped>

</style>