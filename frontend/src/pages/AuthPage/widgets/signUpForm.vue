<template>
  <paginator :pages-count="2" @select-page="goToPage" :selected-page="selectedPage">

    <!--PAGE 0-->
    <div v-if="selectedPage === 0" class="flex flex-col gap-4 justify-start items-stretch">
      <inputText 
        :inp-type="'text'" 
        :inp-title="'Почта:'" 
        :inp-placeholder="'taskmaster@mail.ru'"
        :inp-show-error="true" 
        :inp-error="emailInput.error" 
        :inp-default-value="emailInput.value"
        :inp-title-class="'text-lg cursor-pointer ml-2'" 
        @update-value="(value: string) => validateInput(value, 'email')"
      />

      <inputText 
        :inp-type="'password'" 
        :inp-title="'Пароль:'" 
        :inp-placeholder="'myPassword123'"
        :inp-show-error="true" 
        :inp-error="passwordInput.error" 
        :inp-default-value="passwordInput.value"
        :inp-title-class="'text-lg cursor-pointer ml-2'"
        @update-value="(value: string) => validateInput(value, 'password')"
      />

      <iconButton class="btn-main"  @click="goToPage(1)">
        <template #text>
          <p>Продолжить</p>
        </template>
      </iconButton>
    </div>

    <!--PAGE 1-->
    <div v-if="selectedPage === 1" class="flex flex-col gap-4 justify-start items-stretch">
      <inputText 
        :inp-type="'text'" 
        :inp-title="'Ваша фамилия:'" 
        :inp-placeholder="'Иванов'"
        :inp-show-error="true" 
        :inp-error="lastNameInput.error" 
        :inp-default-value="lastNameInput.value"
        :inp-title-class="'text-lg cursor-pointer ml-2'"
        @update-value="(value: string) => validateInput(value, 'lastName')"
      />
      <inputText 
        :inp-type="'text'" 
        :inp-title="'Ваше имя:'" 
        :inp-placeholder="'Иван'"
        :inp-show-error="true" 
        :inp-error="firstNameInput.error" 
        :inp-default-value="firstNameInput.value"
        :inp-title-class="'text-lg cursor-pointer ml-2'"
        @update-value="(value: string) => validateInput(value, 'firstName')"
      />
      <inputText 
        :inp-type="'text'" 
        :inp-title="'Ваше отчество (при наличии):'" 
        :inp-placeholder="'Иванович'"
        :inp-show-error="true" 
        :inp-error="middleNameInput.error" 
        :inp-default-value="middleNameInput.value"
        :inp-title-class="'text-lg cursor-pointer ml-2'"
        @update-value="(value: string) => validateInput(value, 'middleName')"
      />

      <iconButton class="btn-main" @click="initLogIn">
        <template #text>
          <p>Зарегистрироваться</p>
        </template>
      </iconButton>
    </div>
  </paginator>

</template>
<script lang="ts">

import { useStatusWindowAPI } from '@/lib/StatusWindow/statusWindowAPI';

import paginator from '../features/paginator.vue';
import type { IAPIError, IPostLogIn, IPostLogInAnswer, IPostSignUp, IPostSignUpAnswer, IValidator } from '@/helpers/constants';
import { ValidUserEmail, ValidUserPassword, ValidUserFirstName, ValidUserLastName, ValidUserMiddleName } from '@/helpers/validator';
import { API_PostLogIn, API_PostSignUp } from '@/api/api';
import { SET_COOKIE } from '@/helpers/functions';

export default {
  components:{
    paginator,
  },
  data(){
    return {
      StatusWindowAPI: useStatusWindowAPI(),
      //выбранная страница
      selectedPage: 0,
      
      emailInput: {value: '', error: ''} as IValidator<string>,
      passwordInput: {value: '', error: ''} as IValidator<string>,

      firstNameInput: {value: '', error: ''} as IValidator<string>,
      lastNameInput: {value: '', error: ''} as IValidator<string>,
      middleNameInput: {value: '', error: ''} as IValidator<string>,
    }
  },
  methods: {
    goToPage(page: number){
      // this.selectedPage = page;
      // return;

      switch(page){
        case 0: this.selectedPage = page; break;
        case 1: {
          if(this.emailInput.error === '' && this.passwordInput.error === '' && this.emailInput.value !== '' && this.passwordInput.value !== '') this.selectedPage = page;
          else this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Не все обязательные поля заполнены!'});

          break;
        }
      }
    },
    initLogIn(){
      if(
        this.emailInput.error === '' && 
        this.passwordInput.error === '' && 
        this.firstNameInput.error === '' && 
        this.lastNameInput.error === '' && 
        this.middleNameInput.error === ''
      ){
        const body:IPostSignUp = {
          email: this.emailInput.value,
          password: this.passwordInput.value,
          last_name: this.lastNameInput.value,
          first_name: this.firstNameInput.value,
          middle_name: this.middleNameInput.value,
          avatar_url: '',
        }
        API_PostSignUp(body)
        .then((res: IPostSignUpAnswer) => {
          const loginBody:IPostLogIn = {
            email: body.email,
            password: body.password
          }
          API_PostLogIn(loginBody)
          .then((response: IPostLogInAnswer) => {
            SET_COOKIE('access_token', response.access_token, new Date(Date.now() + 1000 * 60 * 60 * 24 * 4));

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
        })
        .catch((err: IAPIError) => {
          this.StatusWindowAPI.createStatusWindow({
            status: this.StatusWindowAPI.getCodes.error,
            text: 'Не удалось создать в аккаунт, пожалуйста, попробуйте позже!',
            time: 5000
          });
        })
      }
    },
    validateInput(value: string, type: string){
      switch(type){
        case 'email': this.emailInput = ValidUserEmail(value); break;
        case 'password': this.passwordInput = ValidUserPassword(value); break;
        case 'firstName': this.firstNameInput = ValidUserFirstName(value); break;
        case 'lastName': this.lastNameInput = ValidUserLastName(value); break;
        case 'middleName': this.middleNameInput = ValidUserMiddleName(value); break;
      }
    },
  }
}
</script>