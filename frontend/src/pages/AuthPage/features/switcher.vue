<template>
  <div class="flex flex-row gap-x-2 w-full bg-bg-second rounded-md px-2 py-1">
    <div
      v-for="(header, index) of headersArray" 
      :key="index" 
      class="header text-center rounded-md text-lg cursor-pointer select-none"
      :class="{'selected-header': seletedHeader === index}"
      @click="selectHeader(index)">

      {{ header }}

    </div>
  </div>
</template>
<script lang="ts">
export default{
  emits: ['headerSelect'],
  props: {
    headersArray:{
      type: Array,
      required: true
    },
    selectedDefault: {
      type: Number,
      required: false,
      default: 0,
    }
  },
  data() {
    return{
      seletedHeader: this.selectedDefault,
    }
  },
  methods: {
    selectHeader(headerID: number){
      this.seletedHeader = headerID;
      this.$emit('headerSelect', headerID); 
    }
  }
}
</script>
<style lang="css" scoped>
  .selected-header{
    background-color: var(--color-bg-main);
  }
  .header{
    flex: 1 1 0%;
  }
</style>