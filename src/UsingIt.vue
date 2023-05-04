<script setup lang="ts">
import FloatMyVue from './FloatMyVue.vue'
</script>

<template>
  <main class="h-screen w-screen flex items-end justify-center bg-slate-800">
    <div class="min-w-[400px] text-center scale-[4] mb-16">
      <FloatMyVue>
        <template #reference>🔥</template>
        <template #content>
          <p class="m-0">The content<br />here <img src="https://placekitten.com/200/300" /></p>
        </template>
      </FloatMyVue>
    </div>
  </main>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
