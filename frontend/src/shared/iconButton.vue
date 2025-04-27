<template>
  <div class="btn">
    <slot v-if="$slots.icon" name="icon"></slot>
    <slot v-if="$slots.text" name="text"></slot>
  </div>
</template>
<script lang="ts">
export default {

}
</script>