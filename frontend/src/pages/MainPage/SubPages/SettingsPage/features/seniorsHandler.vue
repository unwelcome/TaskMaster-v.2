<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 items-stretch">
      <h3>Староста(-ы) группы:</h3>

      <div class="flex flex-row flex-wrap gap-2">

        <div v-for="senior of seniorsList" :key="senior.id" class="bg-main/50 flex flex-row gap-2 rounded-full px-2 items-center py-1">
          <p class="text-white cursor-default select-none">{{ `${senior.second_name} ${senior.first_name} ${senior.third_name}` }}</p>
          <div class="cursor-pointer" @click="changeRole(senior.id, 'student')">
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <p v-if="seniorsList.length === 0" class="text-text-description">Нет старост</p>

      </div>
    </div>
    <div class="grid-table">
      <h3 style="grid-area: 1 / 1 / 2 / 2;" class=" self-center">Добавить:</h3>

      <input type="text" class="border-none bg-bg-input px-2 py-1 rounded" style="grid-area: 1 / 2 / 2 / 3;" placeholder="Введите ФИО студента" v-model="inputFio"/>

      <div class="flex flex-col gap-2 bg-bg-input p-2 rounded max-h-44 scrollable scrollable-track-invisible" style="grid-area: 2 / 2 / 3 / 3;">

        <div v-for="student of getFilteredStudentsList" :key="student.id" class="flex flex-row gap-2 items-center cursor-pointer" @click="changeRole(student.id, 'senior')">
          <div class="w-7 h-7 bg-gray-500 rounded-full overflow-hidden">
            <!-- <img /> -->
          </div>
          <p class="whitespace-nowrap overflow-hidden text-ellipsis">{{ `${student.second_name} ${student.first_name} ${student.third_name}` }}</p>
        </div>

        <p v-if="getFilteredStudentsList.length === 0" class="text-text-description">Ничего не найдено</p>

      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    usersList:{
      type: Array<{id: number, first_name: string, second_name: string, third_name: string, role: string}>,
      required: true,
    },
  },
  data(){
    return{
      inputFio: '',

      seniorsList: [] as Array<{id: number, first_name: string, second_name: string, third_name: string, role: string}>,
      studentsList: [] as Array<{id: number, first_name: string, second_name: string, third_name: string, role: string}>,
    }
  },
  computed: {
    getFilteredStudentsList(){
      return this.studentsList.filter(item => item.role === 'student' && `${item.second_name} ${item.first_name} ${item.third_name}`.includes(this.inputFio) );
    },
  },
  mounted() {
    this.updateLists();
  },
  methods: {
    updateLists(){
      this.seniorsList = [];
      this.studentsList = [];

      for(const user of this.usersList){
        if(user.role === 'senior') this.seniorsList.push(user);
        else if (user.role === 'student') this.studentsList.push(user);
      }
    },
    changeRole(id: number, newRole: string){
      for(const user of this.usersList){
        if(user.id === id){
          user.role = newRole;
          break;
        }
      }

      if(newRole === 'senior') this.inputFio = '';
      this.updateLists();
    } 
  }
}
</script>
<style lang="css" scoped>
  .grid-table{
    max-width: 500px;
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-template-rows: 32px 1fr;
    row-gap: 8px;
    column-gap: 4px;
  }
</style>