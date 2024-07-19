<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';

onMounted(() => {
  localStorage.setItem('pwd1234', 'true')
  router.push('/admin')
})

</script>
