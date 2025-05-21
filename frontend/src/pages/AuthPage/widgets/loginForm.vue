<template>
  <div class="flex flex-col gap-4 justify-start items-stretch">
    <inputText 
      :inp-type="'text'" 
      :inp-title="'Почта:'" 
      :inp-placeholder="'Введите вашу почту'"
      :inp-show-error="true" 
      :inp-error="emailInput.error" 
      :inp-default-value="emailInput.value"
      :inp-title-class="'text-lg cursor-pointer ml-2'" 
      @update-value="(value: string) => validateInput(value, 'email')"
    />
    <inputText 
      :inp-type="'password'" 
      :inp-title="'Пароль:'" 
      :inp-placeholder="'Введите ваш пароль'"
      :inp-show-error="true" 
      :inp-error="passwordInput.error" 
      :inp-default-value="passwordInput.value"
      :inp-title-class="'text-lg cursor-pointer ml-2'"
      @update-value="(value: string) => validateInput(value, 'password')"
    />
  </div>
  <iconButton class="btn-main" @click="initLogIn">
    <template #text>
      <p>Войти</p>
    </template>
  </iconButton>
</template>
<script lang="ts">

import { API_PostLogIn } from '@/api/user.api';
import type { IPostLogIn, IPostLogInAnswer, IValidator } from '@/helpers/constants';
import { SET_COOKIE } from '@/helpers/functions';
import { ValidUserEmail, ValidUserPassword } from '@/helpers/validator';
import { useStatusWindowAPI } from '@/lib/StatusWindow/statusWindowAPI';

export default {
  components:{
  },
  data(){
    return {
      StatusWindowAPI: useStatusWindowAPI(),

      emailInput: {value: '', error: ''} as IValidator<string>,
      passwordInput: {value: '', error: ''} as IValidator<string>,
    }
  },
  methods: {
    initLogIn(){
      if(this.emailInput.error === '' && this.passwordInput.error === ''){
        const body:IPostLogIn = {
          email: this.emailInput.value,
          password: this.passwordInput.value
        }

        API_PostLogIn(body)
        .then((res: IPostLogInAnswer) => {
          SET_COOKIE('access_token', res.access_token, new Date(Date.now() + 1000 * 60 * 60 * 24 * 4));

          this.StatusWindowAPI.createStatusWindow({
            status: this.StatusWindowAPI.getCodes.success,
            text: 'Вы успешно вошли в аккаунт!'
          });

          this.$router.push({name: 'MainPage'});
        })
        .catch(err => {
          this.StatusWindowAPI.createStatusWindow({
            status: this.StatusWindowAPI.getCodes.error,
            text: 'Не удалось войти в аккаунт, пожалуйста, попробуйте позже!',
            time: 5000
          });
        })
      }
    },
    validateInput(value: string, type: string){
      switch(type){
        case 'email': this.emailInput = ValidUserEmail(value); break;
        case 'password': this.passwordInput = ValidUserPassword(value); break;
      }
    },
  }
}
</script>