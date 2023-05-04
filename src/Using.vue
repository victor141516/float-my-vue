<script setup lang="ts">
import FloatMyVue from './FloatMyVue.vue'

const log = (e: string) => console.log(e)
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center bg-slate-800">
    <div class="min-w-[400px] text-center">
      <FloatMyVue :open="true" @open="() => log('open')" @close="() => log('close')">
        <template #reference>ref</template>
        <template #content>
          <span
            >123-123-123-123-123-12<br />123-123-123-123-123-12<br />123-123-123-123-123-12<br />123-123-123-123-123-12<br />123-123-123-123-123-12<br />
          </span>
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
