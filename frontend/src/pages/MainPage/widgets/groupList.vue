<template>
<div class="w-80 flex flex-col items-stretch shrink-0 bg-bg-second p-2 gap-4">
  <!--Logo-->
  <div class="flex flex-col items-center">
    <h1 class="text-[40px] text-text-logo"><strong class="font-medium text-main">Task</strong>Master</h1>
  </div>
  <!--Burger menu + Search bar-->
  <div class="flex flex-row items-stretch gap-1">
    <iconButton class="btn-main p-2" @click="$emit('showBurgerMenu')">
      <template #icon>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
    </iconButton>
    <searchBar />
  </div>
  <!--Groups list-->
  <div class="flex flex-col gap-2 grow scrollable scrollable-invisible">
    <groupItem :group-id="1" :group-name="'Фронтенд-бекенд разработка ЭФБО-01-23'" :next-topic="3"/>
    <groupItem :group-id="1" :group-name="'Фронтенд-бекенд разработка ЭФБО-01-23'"/>
    <groupItem :group-id="1" :group-name="'Фронтенд-бекенд разработка ЭФБО-01-23'"/>
  </div>
</div>
</template>
<script lang="ts">

import searchBar from '@/shared/searchBar.vue';
import groupItem from '../shared/groupItem.vue';

export default {
  emits: ['showBurgerMenu'],
  components: {
    searchBar,
    groupItem,
  }

}
</script>