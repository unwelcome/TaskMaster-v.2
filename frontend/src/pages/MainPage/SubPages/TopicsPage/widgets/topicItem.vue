<template>
  <div class="flex flex-col shrink-0 items-stretch border-2 border-border-main rounded overflow-hidden">
    <!--Header-->
    <div class="topic-grid" @click="showBody = !showBody">
      <div class="flex flex-col justify-center items-start cursor-pointer p-2">
        <p>Доклад №1 Знакомство с системой Docker</p>
      </div>
      <div class="flex flex-col justify-center items-center cursor-default">
        <p>5</p>
      </div>
      <div class="flex flex-col justify-center items-center cursor-default">
        <p>1/3</p>
      </div>
      <div class="flex flex-col justify-center items-center cursor-default">
        <!--Locked-->
        <svg v-if="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!--Unlocked-->
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11V7C6.99875 5.76005 7.45828 4.56387 8.28937 3.64367C9.12047 2.72347 10.2638 2.1449 11.4975 2.02029C12.7312 1.89568 13.9671 2.2339 14.9655 2.96931C15.9638 3.70472 16.6533 4.78485 16.9 6M5 11H19C20.1046 11 21 11.8954 21 13V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V13C3 11.8954 3.89543 11 5 11Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <!--Show more btn-->
      <div class="flex flex-col justify-center items-center">
        <svg class="w-6 h-6 cursor-pointer" :class="{'rotate-180': showBody}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <!--Delete btn-->
      <div class="flex flex-col justify-center items-center" @click.stop="console.log('delete topic')">
        <svg class="w-6 h-6 cursor-pointer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#DA3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <!--Body-->
    <div v-if="showBody" class="flex flex-row items-stretch border-0 border-t-2 border-border-main">
      <!--Left side-->
      <div class="w-1/2 flex flex-col gap-2 p-4 border-r-2 border-border-main">
        <topicScore />

        <topicExecutors />

        <inputSwitch 
          class="mt-2"
          :inp-title="'Закрыть доклад'" 
          :inp-default-value="true" 
          :inp-show-description="true"
          :inp-description="'* Другие студенты не смогут присоединиться к вашему докладу'" 
        />
      </div>
      <!--Right side-->
      <div class="w-1/2 flex flex-col gap-2 p-4">
        <topicFileLoader />
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import topicScore from '../features/topicScore.vue';
import topicExecutors from '../features/topicExecutors.vue';
import topicFileLoader from '../features/topicFileLoader.vue';

export default {
  components:{
    topicScore,
    topicExecutors,
    topicFileLoader,
  },
  data(){
    return {
      showBody: false,
    }
  }
}
</script>