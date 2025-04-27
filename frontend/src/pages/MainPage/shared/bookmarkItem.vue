<template>
  <div class="flex flex-row gap-2 w-48 items-centers border-2 border-border-main rounded-t-md px-2 py-1 cursor-pointer" :class="{'bg-border-main': selected}">
    <div>
      <slot></slot>
    </div>
    <p>{{ title }}</p>
  </div>
</template>
<script lang="ts">
export default {
  props:{
    title: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
  }
}
</script>