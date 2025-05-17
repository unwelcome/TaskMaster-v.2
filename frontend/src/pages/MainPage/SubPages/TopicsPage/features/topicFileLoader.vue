<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col items-center border-2 border-border-main rounded-lg p-4 cursor-default">
      <h2 class="text-4xl font-light text-text-description">Drag-n-Drop</h2>
      <h3 class="text-lg text-text-description">Перетащите сюда файлы вашей презентации</h3>
      <h6 class="text-sm text-text-description">или</h6>
      <iconButton class="btn-main w-44" @click="triggerFileSelect">
        <template #icon>
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M12 18V12M9 15H15" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        <template #text>
          <p class="text-base">Выберите файлы</p>
        </template>
      </iconButton>
      <input type="file" class=" appearance-none hidden w-0 h-0 absolute" ref="inputFile"/>
    </div>
    <div class="flex flex-col gap-1 scrollable scrollable-track-invisible max-h-36 pr-2">
      <topicFileItem v-for="_ in 10"/>
    </div>
  </div>
</template>
<script lang="ts">

import topicFileItem from './topicFileItem.vue';

export default {
  components: {
    topicFileItem,
  },
  methods: {
    triggerFileSelect(){
      (this.$refs.inputFile as HTMLElement).click();
    }
  }
}
</script>