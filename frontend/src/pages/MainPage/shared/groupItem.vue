<template>
  <div class="flex flex-row gap-1 items-center cursor-pointer border-2 border-border-second rounded-md py-0.5 px-2" :title="groupName">
    <div class="w-10 h-10 rounded-full overflow-hidden shrink-0">
      <img class="w-full h-full" src="@/assets/images/avatar-1.png" alt="Logo"/>
    </div>
    <div class="flex flex-col gap-0.5 overflow-hidden ">
      <h2 class=" whitespace-nowrap overflow-hidden text-ellipsis ">{{ groupName }}</h2>
      <p v-if="nextTopic" class="text-text-description text-sm">След. доклад: {{ nextTopic }} дня</p>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    groupId: {
      type: Number,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    nextTopic: {
      type: [Number, null],
      required: false,
      default: null,
    },
  }
}
</script>