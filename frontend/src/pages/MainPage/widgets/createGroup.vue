<template>
  <!--Blur + wrapper-->
  <div class="absolute flex flex-col justify-center items-center w-full h-full z-20 bg-bg-blur" @click.self="$emit('closeWindow')">
    <!--Create group window-->
    <div class="w-96 flex flex-col gap-4 items-stretch p-4 bg-bg-main rounded-lg relative">
      <!--Close window btn-->
      <div class="absolute right-2 top-2 cursor-pointer" @click="$emit('closeWindow')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#1E1E1E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h2 class="text-center text-xl cursor-default">Создание группы</h2>

      <inputText 
				:inp-type="'text'" 
				:inp-title="'Название группы:'" 
				:inp-placeholder="'Введите название группы'"
				:inp-show-error="true" 
				:inp-title-class="'text-base cursor-pointer ml-2'" 
        :inp-input-class="'create-group-input-tiny'"
				:inp-error="titleInput.error"
        :inp-default-value="titleInput.value"
        @update-value="(value: string) => validateInput(value, 'title')" 
      />

      <inputText 
				:inp-type="'password'" 
				:inp-title="'Пароль группы:'" 
				:inp-placeholder="'Введите пароль группы'"
				:inp-show-error="true" 
				:inp-title-class="'text-base cursor-pointer ml-2'" 
        :inp-input-class="'create-group-input-tiny'"
				:inp-error="passwordInput.error"
        :inp-default-value="passwordInput.value" 
        @update-value="(value: string) => validateInput(value, 'password')"
      />

      <iconButton class="btn-main" @click="initGroupCreate">
        <template #icon>
          <p>Создать</p>
        </template>
      </iconButton>
    </div>
  </div>
</template>
<script lang="ts">
import { useStatusWindowAPI } from '@/lib/StatusWindow/statusWindowAPI';
import { API_PostGroupCreate } from '@/api/groups.api';
import type { IPostGroupCreate, IPostGroupCreateAnswer, IValidator } from '@/helpers/constants';
import { ValidGroupName, ValidGroupPassword } from '@/helpers/validator';

export default {
  emits: ['closeWindow', 'createdGroup'],
  data(){
    return{
      StatusWindowAPI: useStatusWindowAPI(),

      titleInput: {value: '', error: ''} as IValidator<string>,
      passwordInput: {value: '', error: ''} as IValidator<string>,
    }
  },
  methods: {
    initGroupCreate(){
      if(this.titleInput.error === '' && this.titleInput.value !== '' && 
      this.passwordInput.error === '' && this.passwordInput.value !== ''){
        const body:IPostGroupCreate = {
          title: this.titleInput.value,
          password: this.passwordInput.value
        };

        API_PostGroupCreate(body)
        .then((res:IPostGroupCreateAnswer) => {
          this.StatusWindowAPI.createStatusWindow({
            status: this.StatusWindowAPI.getCodes.success,
            text: 'Группа успешно создана!'
          });

          //Clear input
          this.titleInput = {value: '', error: ''};
          this.passwordInput = {value: '', error: ''};

          this.$emit('createdGroup', res.id); // close this window and burger menu
        })
        .catch(err => {
          this.StatusWindowAPI.createStatusWindow({
            status: this.StatusWindowAPI.getCodes.error,
            text: 'Что-то пошло не так при создании группы!'
          });
        });
      }
    },
    validateInput(value: string, type: string){
      switch(type){
        case 'title': this.titleInput = ValidGroupName(value); break;
        case 'password': this.passwordInput = ValidGroupPassword(value); break;
      }
    },
  }
}
</script>
<style lang="css">
  .create-group-input-tiny > input{
    font-size: 16px;
  }
</style>