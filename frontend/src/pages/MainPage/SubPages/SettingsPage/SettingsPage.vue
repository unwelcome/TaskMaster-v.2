<template>
	<div class="flex flex-col xl:flex-row h-full items-stretch gap-4 2xl:gap-0 scrollable scrollable-invisible">
		<div class="w-full xl:w-1/2 flex flex-col items-stretch 2xl:pr-40">
			<inputText 
				:inp-type="'text'" 
				:inp-title="'Название группы:'" 
				:inp-placeholder="'Введите название группы'"
				:inp-show-error="true" 
				:inp-error="''" 
				:inp-title-class="'text-base cursor-pointer ml-2'" />
			<inputText 
				:inp-type="'password'" 
				:inp-title="'Пароль группы:'" 
				:inp-placeholder="'Введите пароль группы'"
				:inp-show-error="true" 
				:inp-error="''" 
				:inp-title-class="'text-base cursor-pointer ml-2'" />
			<inputNumber 
				:inp-title="'Целевое кол-во баллов:'"
				:inp-placeholder="'Введите целевое кол-во баллов (необязательно)'" 
				:inp-show-description="true"
				:inp-description="'* Необходимое кол-во баллов, которое студенты должны набрать'" 
				:inp-show-error="true"
				:inp-default-value="null" 
				:inp-min-value="0" 
				:inp-max-value="1000" 
				:inp-hide-btns="true"
				:inp-title-class="'text-base cursor-pointer ml-2'" />
			<inputNumber 
				:inp-title="'Целевое кол-во докладов:'"
				:inp-placeholder="'Введите целевое кол-во докладов (необязательно)'" 
				:inp-show-description="true"
				:inp-description="'* Необходимое кол-во докладов, которое студенты должны выполнить'" 
				:inp-show-error="true"
				:inp-default-value="null" 
				:inp-min-value="0" 
				:inp-max-value="1000" 
				:inp-hide-btns="true"
				:inp-title-class="'text-base cursor-pointer ml-2'" />
			<copyLink 
				:inp-title="'Ссылка на вступление в группу:'"
				:inp-link="'https://taskmaster/join/group/123456?password=aSDSLaASSdsa30fsfg3e.43fes4tsegr65ydrs343rgs.ys45yseyfse54ys54hserawdaf'" />
			<div class="flex flex-col gap-2 mt-2">
				<inputSwitch 
					:inp-title="'Группа закрыта'" 
					:inp-default-value="false" />
				<inputSwitch 
					:inp-title="'Разрешить студентам писать в чате'" 
					:inp-default-value="true" />
			</div>
		</div>
		<div class="w-full xl:w-1/2 flex flex-col items-stretch gap-2">
			<inputSwitch 
        class="mt-2"
        :inp-title="'Добавить роль “Староста”'" 
        :inp-default-value="true" 
        :inp-show-description="true"
				:inp-description="'* Вы сможете сами назначить студента на роль “Староста”, а также изменить возможности роли ниже'" />
			<seniorsHandler 
        :users-list="usersList" 
      />
			<div class="flex flex-col gap-2">
        <h3>Возможностит роли “Староста”</h3>
        <inputSwitch 
          :inp-title="'Разрешить писать в закрытый чат'" 
          :inp-default-value="true" 
        />
        <inputSwitch 
          :inp-title="'Разрешить создавать семинары'" 
          :inp-default-value="true" 
        />
        <inputSwitch 
          :inp-title="'Разрешить создавать темы для докладов'" 
          :inp-default-value="true" 
        />
        <inputSwitch 
          :inp-title="'Разрешить оценивать доклады'" 
          :inp-default-value="true" 
        />
			</div>
		</div>
	</div>
</template>
<script lang="ts">

import { useApproveWindowAPI } from '@/lib/ApproveWindow/approveWindowAPI';

import copyLink from './features/copyLink.vue';
import seniorsHandler from './features/seniorsHandler.vue';

export default {
	components: {
		copyLink,
		seniorsHandler,
	},
	data() {
		return {
			ApproveWindowAPI: useApproveWindowAPI(),

			usersList: [
				{ id: 1, role: 'student', first_name: 'Абрам1', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 2, role: 'student', first_name: 'Абрам2', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 3, role: 'student', first_name: 'Абрам3', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 4, role: 'student', first_name: 'Абрам4', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 5, role: 'student', first_name: 'Абрам5', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 6, role: 'student', first_name: 'Абрам6', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 7, role: 'senior', first_name: 'Абрам7', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 8, role: 'student', first_name: 'Абрам8', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 9, role: 'student', first_name: 'Абрам9', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 10, role: 'senior', first_name: 'Абрам10', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 11, role: 'senior', first_name: 'Абрам11', second_name: 'Абрамов', third_name: 'Абрамович' },
				{ id: 12, role: 'student', first_name: 'Абрам12', second_name: 'Абрамов', third_name: 'Абрамович' },
			],
		}
	},
	mounted() {
		// this.ApproveWindowAPI.createApproveWindow('Warning', 'Test Approve Window 1! Lorem ipsum dolor sit amet xtnj nfv z [p xt tot nen gjyfgbcfnm cjukfcys kb ds c eckjdbzvb ljudjhf b nl b ng]',[
		//     {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'good'},
		//     {id: 2, type: this.ApproveWindowAPI.getApproveWindowAnswerType.bad, text: 'bad'},
		//     // {id: 1, type: this.ApproveWindowAPI.getApproveWindowAnswerType.good, text: 'good'},
		// ]).then((id: number) => {
		//     console.log('RESOLVE: ', id);
		// }).catch(err => {
		//     console.error(err);
		// }).finally(() => {
		//     console.log('promise end');
		// });
	},
	methods: {

	},
	watch: {
		usersList: {
			handler(newVal: any) {
				// console.log('watch: ', newVal);
			},
			deep: true,
		}
	}
}
</script>