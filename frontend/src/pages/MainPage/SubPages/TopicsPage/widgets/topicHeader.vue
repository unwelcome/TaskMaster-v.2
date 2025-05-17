<template>
  <div class="topic-grid mr-[14px] bg-bg-second rounded py-1">
    <div class="flex flex-col justify-center items-start cursor-pointer p-2">
      <p>Название</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>Оценка</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>Мест</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>Статус</p>
    </div>
    <!--Show more btn-->
    <div class="flex flex-col justify-center items-center">
      <p>Подробнее</p>
    </div>
    <!--Create topic btn-->
    <div class="flex flex-col item-center justify-center">
      <iconButton class="btn-main p-1 self-center" @click="$emit('createTopic')">
        <template #icon>
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </iconButton>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['createTopic'],
}
</script>