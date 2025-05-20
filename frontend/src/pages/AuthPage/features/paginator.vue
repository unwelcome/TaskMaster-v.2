<template>
  <div class="flex flex-col gap-y-4">
    <slot></slot>
    <div class="flex flex-row gap-x-4">
      <div v-for="page in pagesCount" :key="page" class="same-sizes" :class="{'selected-page': selectedPage === page-1}" @click="selectPage(page-1)"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default{
  emits: ['selectPage'],
  props: {
    pagesCount: {
      type: Number,
      required: true,
    },
    selectedPage: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods:{
    selectPage(page: number){
      this.$emit('selectPage', page); // запрашиваем разрешение на переход на страницу
    }
  },
}
</script>
<style lang="css" scoped>
  .same-sizes{
    flex: 1 1 0%;
    background-color: #D7D7D7;
    height: 8px;
    border-radius: 4px;
    transition: background-color .15ms linear;
    cursor: pointer;
  }
  .same-sizes:hover{
    background-color: #cacaca;
  }
  
  .selected-page{
    background-color: #b4b4b4;
  }
  .selected-page:hover{
    background-color: #a8a8a8;
  }
</style>