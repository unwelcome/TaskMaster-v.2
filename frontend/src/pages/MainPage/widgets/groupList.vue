<template>
<div class="w-80 flex flex-col items-stretch shrink-0 bg-bg-second p-2 gap-4" id="leftSidebar">
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
    <!-- <groupItem :group-id="1" :group-name="'Фронтенд-бекенд разработка ЭФБО-01-23'" :next-topic="3"/>-->
    <groupItem 
      v-for="group of groupList" 
      :key="group.group_id" 
      :group-id="group.group_id" 
      :group-name="group.title"
    />
    <!--Заглушка если нет групп-->
    <div v-if="groupList.length === 0" class="flex flex-col justify-center items-center grow cursor-default gap-4">
      <p class="text-text-description text-center">Вы не состоите ни в одной группе</p>
      <p class="text-text-description text-sm text-center">Нажмите на оранжевую кнопку слева сверху и найдите группу либо создайте ее</p>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { useStatusWindowAPI } from '@/lib/StatusWindow/statusWindowAPI';
import { API_GetUserGroups } from '@/api/api';
import type { IGetUserGroupsAnswer } from '@/helpers/constants';

import searchBar from '@/shared/searchBar.vue';
import groupItem from '../shared/groupItem.vue';

export default {
  emits: ['showBurgerMenu'],
  components: {
    searchBar,
    groupItem,
  },
  data(){
    return{
      StatusWindowAPI: useStatusWindowAPI(),

      groupList: [] as Array<IGetUserGroupsAnswer>,
    }
  },
  mounted() {
    this.loadUserGroups();
  },
  methods: {
    loadUserGroups(){
      API_GetUserGroups()
      .then((res: Array<IGetUserGroupsAnswer>) => {
        this.groupList = res;
      })
      .catch(err => {
        this.StatusWindowAPI.createStatusWindow({
          status: this.StatusWindowAPI.getCodes.error,
          text: 'Не удалось получить список ваших групп!'
        });
      });
    }
  }

}
</script>