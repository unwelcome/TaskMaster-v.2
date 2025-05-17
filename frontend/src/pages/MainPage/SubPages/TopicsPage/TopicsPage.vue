<template>
  <div class="flex flex-col gap-2 overflow-hidden">
    <!--Btn back-->
    <div class="flex flex-row items-center cursor-pointer" @click="$router.push({name: 'SeminarsPage'})">
      <svg class="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.3333 16H6.66667M6.66667 16L16 25.3333M6.66667 16L16 6.66666" stroke="#FF5900" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h2 class="text-main text-lg hover:underline">Вернуться к семинарам</h2>
    </div>
    <!--Seminar title-->
    <div class="flex flex-row gap-1 items-center">
      <svg class="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11.6667C20 9.89856 19.2976 8.20286 18.0474 6.95262C16.7971 5.70238 15.1014 5 13.3333 5H3.33333V30H15C16.3261 30 17.5979 30.5268 18.5355 31.4645C19.4732 32.4021 20 33.6739 20 35M20 11.6667V35M20 11.6667C20 9.89856 20.7024 8.20286 21.9526 6.95262C23.2029 5.70238 24.8986 5 26.6667 5H36.6667V30H25C23.6739 30 22.4021 30.5268 21.4645 31.4645C20.5268 32.4021 20 33.6739 20 35" stroke="#1E1E1E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h2 class="text-xl cursor-default">Семинар №1 Основы работы с Docker и Docker-compose</h2>
    </div>
    <!--Topics list-->
    <topicHeader @create-topic="showCreateTopic = true"/>
    <createTopic v-if="showCreateTopic" @approve="" @reject="showCreateTopic = false"/>
    <div class="flex flex-col gap-2 scrollable scrollable-track-invisible pr-2">
      <topicItem v-for="_ in 3"/>
    </div>
  </div>
</template>
<script lang="ts">

import topicHeader from './widgets/topicHeader.vue';
import createTopic from './widgets/createTopic.vue';
import topicItem from './widgets/topicItem.vue';

export default {
  components: {
    topicHeader,
    createTopic,
    topicItem,
  },
  data(){
    return{
      showCreateTopic: false,
    }
  },
  methods: {
    
  }
}
</script>