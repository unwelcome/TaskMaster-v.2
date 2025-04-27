<template>
  <div class="btn" :title="title">
    <slot v-if="$slots.icon" name="icon"></slot>
    <slot v-if="$slots.text" name="text"></slot>
  </div>
</template>
<script lang="ts">
export default {
  props:{
    title: {
      type: String,
      required: false,
      default: '',
    }
  }
}
</script>