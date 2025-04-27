<template>
<div class="flex flex-row items-stretch w-full h-svh bg-bg-main">
  <!--BurgeMenu-->
  <Transition name="fade">
    <burgerMenu v-if="burgerMenuFlag" @close-burger-menu="burgerMenuFlag = false"/>
  </Transition>
  <!--Left aside group list-->
  <groupList @show-burger-menu="burgerMenuFlag = true"/>
  <!--Main workspace-->
  <bookmarksView>
    <RouterView />
  </bookmarksView>
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
  },
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .05s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 50%;
}

.fade-enter-to,
.fade-leave-from{
  opacity: 1;
}
</style>