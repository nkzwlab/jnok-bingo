<template>
  <button @click="newNumber">New Number</button>
</template>
<script setup lang="ts">
import { newNumber } from '@/gateway';
// import { currentNumber, grid, name } from '@/states';
// import { currentNumber, grid, name } from '@/gateway';
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
