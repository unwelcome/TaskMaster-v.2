<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex flex-col grow items-stretch scrollable scrollable-x-y table-row-colors" :style="{'width': tableWidth}">
      <performanceTableItem 
        :item-name="'ФИО'" 
        :item-all-count="'Доклады'" 
        :item-all-score="'Баллы'" 
        :item-data="[
          { seminarID: 1, seminarDate: '12.05', seminarScore: null,},
          { seminarID: 2, seminarDate: '19.05', seminarScore: null,},
          { seminarID: 3, seminarDate: '26.05', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: null,},
        ]" 
        :item-is-header="true"
        :item-bg-color="'bg-bg-table-header'"
      />
      <performanceTableItem 
        v-for="i in 40"
        :item-name="'Абрамов Абрам Абрамович'" 
        :item-all-count="10" 
        :item-all-score="3" 
        :item-data="[
          { seminarID: 1, seminarDate: '12.05', seminarScore: 5,},
          { seminarID: 2, seminarDate: '19.05', seminarScore: null,},
          { seminarID: 3, seminarDate: '26.05', seminarScore: 2,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
          { seminarID: 4, seminarDate: '2.06', seminarScore: 3,},
        ]" 
        :item-is-header="false"
        :item-bg-color="i % 2 == 0 ? 'bg-bg-table-even': 'bg-bg-table-odd'"
      />
    </div>
  </div>
</template>
<script lang="ts">

import performanceTableItem from './features/performanceTableItem.vue';

export default {
  components:{
    performanceTableItem,
  },
  data() {
    return{
      leftSidebar: null as null | HTMLElement,
      tableWidth: 'auto' as string, 
    }
  },
  mounted() {
    this.leftSidebar = document.getElementById('leftSidebar');
    this.tableWidth = `${window.innerWidth - (this.leftSidebar?.clientWidth !== undefined ? this.leftSidebar?.clientWidth : 0) - 16 * 4 - 4}px`; // 4 * p-4 + 2 * border-2 

    window.addEventListener('resize', this.onWindowResize);
  },
  methods: {
    onWindowResize(){
      this.tableWidth = `${window.innerWidth - (this.leftSidebar?.clientWidth !== undefined ? this.leftSidebar?.clientWidth : 0) - 16 * 4 - 4}px`; // 4 * p-4 + 2 * border-2 
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  },
}
</script>