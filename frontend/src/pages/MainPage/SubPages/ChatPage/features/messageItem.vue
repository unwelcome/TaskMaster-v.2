<template>
  <div class="flex flex-row items-end gap-2" :class="{'flex-row-reverse mr-2': msgIsSelf}">
    <div v-if="!msgIsSelf" class="w-10 h-10 shrink-0 overflow-hidden rounded-full">
      <img class="w-full h-full" src="../../../../../assets/images/avatar-4.png"/>
    </div>
    <div class="flex flex-col items-start relative p-2 rounded-lg max-w-[400px] bg-bg-chat-message-other" :class="{'bg-main rounded-br-none': msgIsSelf, 'rounded-bl-none': !msgIsSelf}">
      <h3 v-if="!msgIsSelf" class="text-text-chat text-sm">{{ msgAuthor }}</h3>
      <div class="flex flex-row text-base text-justify text-text-second">
        {{ msgText }}
        <span class="text-xs self-end mt-2 ml-2 text-text-second/60">{{ msgDate }}</span>
      </div>

      <div v-if="msgIsSelf" class="absolute -right-[7px] bottom-0">
        <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0C0 4.07951 3.05384 7.44331 7 7.93555V9H0V0Z" fill="#FF5900"/>
        </svg>
      </div>
      <div v-else class="absolute -left-[7px] bottom-0">
        <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 0C7 4.07951 3.94616 7.44331 8.34465e-07 7.93555V9H7L7 0Z" fill="#555555"/>
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    msgId: {
      type: Number,
      required: true,
    },
    msgAuthor: {
      type: String,
      required: true,
    },
    msgAuthorAvatarUrl: {
      type: String,
      required: true,
    },
    msgText: {
      type: String,
      required: true,
    },
    msgDate: {
      type: String,
      required: true,
    },
    msgIsSelf: {
      type: Boolean,
      required: true,
    }
  }
}
</script>