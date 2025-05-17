<template>
  <div class="topic-grid mr-[14px] border-2 border-border-main rounded">
    <div class="flex flex-col justify-center items-start cursor-pointer p-2 pr-0">
      <inputText 
        class="w-full"
        :inp-type="'text'" 
				:inp-title-show="false" 
				:inp-placeholder="'Название доклада...'"
				:inp-title-class="'text-base cursor-pointer ml-2'" 
        :inp-input-class="'topic-input-create-tiny'"
      />
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>-</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default" style="grid-area: 1 / 3 / 2 / 5;">
      <inputNumber 
        class="w-full"
				:inp-title-show="false"
				:inp-placeholder="'Кол-во мест...'" 
				:inp-default-value="null" 
				:inp-min-value="0" 
				:inp-max-value="1000" 
				:inp-hide-btns="true"
        :inp-input-class="'topic-input-create-tiny'"
      />
    </div>
    <div class="flex flex-row justify-end items-center gap-2 pr-2" style="grid-area: 1 / 5 / 2 / 7;">
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
  emits: ['approve', 'reject'],
  data(){
    return{
      
    }
  }
}
</script>
<style lang="css">
  .topic-input-create-tiny{
    font-size: 14px;
  }
  .topic-input-create-tiny > input{
    font-size: 16px;
  }
</style>