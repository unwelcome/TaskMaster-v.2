<template>
  <div class="flex flex-row gap-2 items-center bg-bg-second hover:bg-bg-second-hover transition-colors rounded px-2 py-1 cursor-pointer">
    <slot></slot>
    <p class="text-lg">{{ name }}</p>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true,
    }
  }
}
</script>