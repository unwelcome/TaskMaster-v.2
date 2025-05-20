<template>
  <div class="w-svw h-svh flex flex-row">
    <div class="login-bg-left h-full w-0 lg:w-1/2 ">
      <!--image background-->
    </div>
    <div class="h-full w-full lg:w-1/2 flex flex-col justify-center items-center login-bg-right">
      <div class="p-4 sm:p-10 rounded-xl w-auto lg:w-full xl:w-3/4 2xl:w-3/5 flex flex-col justify-start items-stretch gap-8 bg-bg-main z-20">
        <h2 class="text-center text-3xl font-light">Добро пожаловать в <span class=" text-main font-medium">Task</span><span class="text-text-logo font-medium">Master</span>!</h2>

        <switcher 
          :headers-array="['Вход', 'Регистрация']" 
          :selected-default="getSwitchDefault" 
          @header-select="redirectByAuthType" 
        />

        <RouterView />

      </div>
    </div>
  </div>
</template>
<script lang="ts">

import switcher from './features/switcher.vue';

export default {
  components:{
    switcher,
  },
  computed: {
    getSwitchDefault(){
      if(this.$route.name === 'SignUpForm') return 1;
      return 0;
    },
  },
  methods: {
    redirectByAuthType(type: number){
      switch(type){
        case 0: 
          this.$router.push({name: 'LoginForm'}); break;
        case 1:
          this.$router.push({name: 'SignUpForm'}); break;
      }
    }
  }
}
</script>
<style lang="css" scoped>
  .login-bg-left{
    background-image: none;
  }
  .login-bg-right{
    background-image: url('@/assets/images/auth-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  @media(min-width: 1024px){
    .login-bg-left{
      background-image: url('@/assets/images/auth-bg.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .login-bg-right{
      background-image: none;
    }
  }
</style>