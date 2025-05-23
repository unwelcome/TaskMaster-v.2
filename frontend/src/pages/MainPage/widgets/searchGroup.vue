<template>
  <!--Blur + wrapper-->
  <div class="absolute flex flex-col justify-center items-center w-full h-full z-20 bg-bg-blur" @click.self="$emit('closeWindow')">
    <!--Search group window-->
    <div class="w-96 flex flex-col gap-4 items-stretch p-4 bg-bg-main rounded-lg relative">
      <!--Close window btn-->
      <div class="absolute right-2 top-2 cursor-pointer" @click="$emit('closeWindow')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#1E1E1E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h2 class="text-center text-xl cursor-default">Поиск группы</h2>
      
      <inputText 
				:inp-type="'text'" 
				:inp-title="'Название группы:'" 
				:inp-placeholder="'Введите название группы'"
				:inp-show-error="true" 
				:inp-error="''" 
				:inp-title-class="'text-base cursor-pointer ml-2'" 
        :inp-input-class="'create-group-input-tiny'"
      />

      <inputText 
				:inp-type="'password'" 
				:inp-title="'Пароль группы:'" 
				:inp-placeholder="'Введите пароль группы'"
				:inp-show-error="true" 
				:inp-error="''" 
				:inp-title-class="'text-base cursor-pointer ml-2'" 
        :inp-input-class="'create-group-input-tiny'"
      />

      <iconButton class="btn-main">
        <template #icon>
          <p>Присоединиться</p>
        </template>
      </iconButton>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['closeWindow'],
}
</script>