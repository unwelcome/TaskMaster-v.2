<template>
  <div class="flex flex-col justify-start items-center h-full">
    <div class="flex flex-col w-[800px] gap-2 grow overflow-hidden">
      <!--Messages wrapper-->
      <div class="flex flex-col gap-2 scrollable scrollable-invisible">
        <messageItem 
          :msg-id="1" 
          :msg-author="'Иванов Иван'" 
          :msg-author-avatar-url="''" 
          :msg-text="'Привет всем!'" 
          :msg-date="'16:49'" 
          :msg-is-self="false"
        />
        <messageItem 
          :msg-id="1" 
          :msg-author="'Иванов Иван'" 
          :msg-author-avatar-url="''" 
          :msg-text="'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'" 
          :msg-date="'16:50'"
          :msg-is-self="false"
        />
        <messageItem 
          :msg-id="1" 
          :msg-author="'Петров Петр'" 
          :msg-author-avatar-url="''" 
          :msg-text="'Привет всем!'" 
          :msg-date="'16:49'" 
          :msg-is-self="true"
        />
        <messageItem 
          v-for="i in 10"
          :msg-id="1" 
          :msg-author="'Петров Петр'" 
          :msg-author-avatar-url="''" 
          :msg-text="'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'" 
          :msg-date="'16:49'" 
          :msg-is-self="true"
        />
      </div>
      <!--Message input-->
      <div class="flex flex-row gap-2 items-center">
        <input type="text" placeholder="Сообщение..." class="h-14 rounded-xl bg-bg-second border-none grow px-4 text-lg" />
        <div class="bg-bg-second rounded-full w-14 h-14 relative cursor-pointer">
          <svg class="absolute w-8 h-8 top-1/2 left-1/2" style="transform: translate(calc(-50% - 2px), calc(-50% + 2px));" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.3333 2.66669L14.6666 17.3334M29.3333 2.66669L20 29.3334L14.6666 17.3334M29.3333 2.66669L2.66663 12L14.6666 17.3334" stroke="#1E1E1E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import messageItem from './features/messageItem.vue';

export default {
  components:{
    messageItem,
  }
}
</script>