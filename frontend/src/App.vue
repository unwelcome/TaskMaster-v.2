<template>
  <StatusWindow />
  <RouterView />
</template>
<script lang="ts">
import StatusWindow from './lib/StatusWindow/components/statusWindow.vue';
import { useStatusWindowAPI } from './lib/StatusWindow/statusWindowAPI';

export default {
  components: {
    StatusWindow
  },
  data(){ 
    return{
      StatusWindowAPI: useStatusWindowAPI(),
    }
  },
  mounted(){
    // this.StatusWindowAPI.createStatusWindow({
    //   status: this.StatusWindowAPI.getCodes.success,
    //   text: 'Status window successfully installed!',
    //   type: this.StatusWindowAPI.getTypes.detail,
    //   time: 100000
    // });
  }
}
</script>