<template>
  <div class="grid-container p-2 border-2 border-border-main rounded cursor-default">
    <div class="flex flex-col justify-center items-start">
      <input type="text" class="w-full px-2 py-1 rounded" placeholder="Название семинара..." v-model="seminarTitle"/>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>-</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <input type="date" class="w-full px-2 py-1 rounded" placeholder="Дата..."/>
    </div>
    <div class="flex flex-row gap-2 justify-center items-center">
      <svg class="w-6 h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('approve')">
        <path d="M20 6L9 17L4 12" stroke="#2BD036" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="w-6 h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('reject')">
        <path d="M18 6L6 18M6 6L18 18" stroke="#DA3A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['reject', 'approve'],
  data(){
    return{
      seminarTitle: '',
    }
  }
}
</script>