<template>
  <div class="grid-container p-2 border-2 border-border-main rounded cursor-pointer bg-bg-second">
    <div class="flex flex-col justify-center items-start">
      <h2 class="text-lg">Название</h2>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p class="text-lg">Доклады</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p class="text-lg">Дата</p>
    </div>
    <div v-if="canCreate" class="flex flex-col justify-center items-center">
      <iconButton class="btn-main p-1" @click="$emit('createSeminar')" :title="'Создать семинар'">
        <template #icon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </iconButton>
    </div>
  </div>
</template>
<script lang="ts">
import IconButton from '@/shared/iconButton.vue';

export default {
  emits: ['createSeminar'],
  props: {
    canCreate: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>