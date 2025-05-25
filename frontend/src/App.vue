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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 50%;
}

.fade-enter-to,
.fade-leave-from{
  opacity: 1;
}
</style>