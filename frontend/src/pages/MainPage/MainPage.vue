<template>
<div class="flex flex-row items-stretch w-full h-svh bg-bg-main">
  <!--BurgeMenu-->
  <Transition name="fade">
    <burgerMenu v-if="burgerMenuFlag" @close-burger-menu="burgerMenuFlag = false"/>
  </Transition>
  <!--Left aside group list-->
  <groupList @show-burger-menu="burgerMenuFlag = true"/>
  <!--Main workspace-->
  <bookmarksView v-if="$route.name !== 'MainPage'">
    <RouterView />
  </bookmarksView>
  <!--Заглушка если не выбрана группа-->
  <div v-else class="flex flex-col justify-center items-center grow cursor-default">
    <div class="text-center text-text-description text-sm  flex flex-col gap-2">
      <span class="text-inherit text-base">Выберите группу слева</span>
      или
      <span class="text-inherit text-base">
        <span class="text-inherit cursor-pointer underline">Найдите</span>
        или 
        <span class="text-inherit cursor-pointer underline">создайте</span>
        группу
      </span>
    </div>
  </div>
</div>
</template>
<script lang="ts">

import groupList from './widgets/groupList.vue';
import bookmarksView from './widgets/bookmarksView.vue';
import burgerMenu from './widgets/burgerMenu.vue';

export default {
  components: {
    groupList,
    bookmarksView,
    burgerMenu,
  },
  data(){
    return{
      burgerMenuFlag: false,
    }
  }
}
</script>