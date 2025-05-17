<template>
  <div class="flex flex-col items-stretch gap-2 h-full overflow-hidden">
    <seminarHeaderItem :can-create="true" @create-seminar="createSeminarFlag = true"/>

    <createSeminarItem v-if="createSeminarFlag" @reject="createSeminarFlag = false" @approve=""/>

    <div class="flex flex-col gap-2 items-stretch grow scrollable scrollable-invisible">

      <seminarItem 
        v-for="i in 3"
        :name="'Семинар №1 Основы работы с Docker и Docker-compose'"
        :topic-count="15"
        :topic-free-count="5"
        :date="'12.05.2024'"
        :can-delete="true"
      />

    </div>
    
  </div>
</template>
<script lang="ts">

import seminarItem from './features/seminarItem.vue';
import seminarHeaderItem from './features/seminarHeaderItem.vue';
import createSeminarItem from './features/createSeminarItem.vue';

export default {
  components:{
    seminarItem,
    seminarHeaderItem,
    createSeminarItem,
  },
  data(){
    return{
      createSeminarFlag: false,
    }
  }
}
</script>
<style lang="css" scoped>
  .grid-container{
    display: grid;
    grid-template-columns: 5fr clamp(50px, 10%, 100px) clamp(50px, 10%, 130px) clamp(50px, 10%, 100px);
    gap: 8px;
  }
</style>