<template>
  <div class="w-full">
    <h3 class="ml-2">{{ inpTitle }}</h3>
    <div class="flex flex-row items-center border-2 border-border-main rounded overflow-hidden bg-bg-input">
      <input type="text" class="grow border-none px-2 whitespace-nowrap overflow-hidden text-ellipsis" :value="inpLink" readonly/>
      <div class="bg-main p-2 cursor-pointer" @click="copyLinkToClipboard">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8M9 2H15C15.5523 2 16 2.44772 16 3V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V3C8 2.44772 8.44772 2 9 2Z" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import { useStatusWindowAPI } from '@/lib/StatusWindow/statusWindowAPI';

export default {
  props: {
    inpTitle: {
      type: String,
      required: true,
    },
    inpLink: {
      type: String,
      required: true,
    },
  },
  data(){
    return {
      StatusWindowAPI: useStatusWindowAPI(),
    }
  },
  methods: {
    async copyLinkToClipboard() {
      try {
        await navigator.clipboard.writeText(this.inpLink);
        this.StatusWindowAPI.createStatusWindow({
          status: this.StatusWindowAPI.getCodes.success,
          text: 'Ссылка скопирована в буфер обмена',
          time: 2000,
          showTimeBar: false,
        });
      } catch (err) {
        this.StatusWindowAPI.createStatusWindow({
          status: this.StatusWindowAPI.getCodes.error,
          text: 'Неудалось скопировать ссылку в буфер обмена!'
        });
      }
    }
  }
}
</script>