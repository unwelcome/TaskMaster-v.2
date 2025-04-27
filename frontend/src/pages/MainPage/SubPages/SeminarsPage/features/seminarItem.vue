<template>
  <div class="grid-container p-2 border-2 border-border-main rounded cursor-pointer">
    <div class="flex flex-col justify-center items-start">
      <h2>{{ name }}</h2>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>{{ topicFreeCount }}/{{ topicCount }}</p>
    </div>
    <div class="flex flex-col justify-center items-center cursor-default">
      <p>{{ date }}</p>
    </div>
    <div v-if="canDelete || canCreate" class="flex flex-col justify-center items-center">
      <svg v-if="canDelete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$emit('deleteSeminar')">
        <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#DA3A3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['deleteSeminar'],
  props: {
    name: {
      type: String,
      required: true,
    },
    topicCount: {
      type: Number,
      required: true,
    },
    topicFreeCount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    canDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
    canCreate:{
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>