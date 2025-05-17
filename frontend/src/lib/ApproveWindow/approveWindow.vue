<template>
  <div v-if="ApproveWindowAPI.getApproveWindowQueue.length !== 0" class="absolute left-1/2 top-10 z-40 rounded-lg overflow-hidden" style="transform: translate(-50%, 0);">
    <div class="bg-sky-400 px-2">
      <h2 class="text-white font-medium">{{ getFirstWindow.title }}</h2>
    </div>
    <div class="bg-bg-main p-4 flex flex-col min-w-60 max-w-96 gap-4 border-2 border-t-0 border-border-main rounded-b-lg">
      <h3 class="text-justify">{{ getFirstWindow.text }}</h3>
      
      <div class="btns-wrapper">
        <iconButton
           v-for="btn of getFirstWindow.answers" 
           :key="btn.id"
           class="grow"
           :class="{
            'btn-main-good': btn.type === ApproveWindowAPI.getApproveWindowAnswerType.good,
            'btn-main-bad':  btn.type === ApproveWindowAPI.getApproveWindowAnswerType.bad,
            'btn-main': btn.type === ApproveWindowAPI.getApproveWindowAnswerType.normal,
            }"
            @click="resolveAppworveWindow(btn.id)"
          >
          <template #icon v-if="btn.icon !== undefined" v-html="btn.icon">
            <!--icon-->
          </template>
          <template #text>
            <p>{{ btn.text }}</p>
          </template>
        </iconButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useApproveWindowAPI } from './approveWindowAPI';

export default {
  data(){
    return{
      ApproveWindowAPI: useApproveWindowAPI(), 
    }
  },
  computed: {
    getFirstWindow(){
      return this.ApproveWindowAPI.getApproveWindowQueue[0];
    }
  },
  methods: {
    resolveAppworveWindow(returnID: number){
      this.ApproveWindowAPI.resolveFirst(returnID);
    }
  }
}
</script>
<style lang="css" scoped>
  .btns-wrapper{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    column-gap: 8px;
  }
</style>