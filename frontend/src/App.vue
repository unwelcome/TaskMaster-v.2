<template>
  <StatusWindow />
  <approveWindow />
  
  <RouterView />
</template>
<script lang="ts">
import StatusWindow from './lib/StatusWindow/components/statusWindow.vue';
import approveWindow from './lib/ApproveWindow/approveWindow.vue';

export default {
  components: {
    StatusWindow,
    approveWindow,
  },
}
</script>