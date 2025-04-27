<template>
  <div class="bg-bg-input rounded flex flex-row items-stretch overflow-hidden focus">
    <input type="text" class="px-2 py-1 text-lg outline-none bg-transparent grow shrink min-w-0 w-auto" :placeholder="placeholder" v-model="searchValue"/>
    <div class="flex flex-col justify-center items-center shrink-0 px-2 cursor-pointer">
      <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1053 21L15.9406 16.65M18.1905 11C18.1905 15.4183 14.7614 19 10.5313 19C6.30129 19 2.87218 15.4183 2.87218 11C2.87218 6.58172 6.30129 3 10.5313 3C14.7614 3 18.1905 6.58172 18.1905 11Z" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['searchValue'],
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Поиск...',
    }
  },
  data() {
    return{
      searchValue: '',
    }
  },
  watch: {
    searchValue(newVal: string){
      this.$emit('searchValue', newVal);
    }
  }
}
</script>
<style lang="css" scoped>

.focus:focus-within{
  outline: 2px solid var(--color-border-focus);
}

</style>