<template>
  <div v-if="ApproveWindowAPI.getApproveWindowQueue.length !== 0" class="absolute left-1/2 top-10 z-40 bg-red-100" style="transform: translate(-50%, 0);">
    <div class="bg-gb-main p-4 rounded-lg flex flex-col gap-4 w-60">
      <h3>{{ getFirstWindow.title }}</h3>
      
      <div class="flex flex-row gap-2">
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
      console.log('returnID: ', returnID);
      this.ApproveWindowAPI.resolveFirst(returnID);
    }
  }
}
</script>