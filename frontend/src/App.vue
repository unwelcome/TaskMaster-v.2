<template>
  <StatusWindow />
  <approveWindow />
  
  <RouterView />
</template>
<script lang="ts">
import StatusWindow from './lib/StatusWindow/components/statusWindow.vue';
import approveWindow from './lib/ApproveWindow/approveWindow.vue';
import { API } from './helpers/constants';

export default {
  components: {
    StatusWindow,
    approveWindow,
  },
  mounted() {
    console.log('API: ', API);
  },
}
</script>