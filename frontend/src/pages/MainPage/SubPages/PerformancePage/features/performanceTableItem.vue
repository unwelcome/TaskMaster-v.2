<template>
  <div class="grid-table cursor-default">
    <!--FIO-->
    <div class="py-1 px-2" :class="itemBgColor">
      <p class="whitespace-nowrap overflow-hidden text-ellipsis">{{ itemName }}</p>
    </div>
    <!--Overall Score-->
    <div class="bg-bg-table-header">
      <p class="text-center">{{ itemAllScore }}</p>
    </div>
    <!--Overall topics counter-->
    <div :class="itemBgColor">
      <p class="text-center">{{ itemAllCount }}</p>
    </div>
    <!--Each seminar-->
    <div v-for="seminar of itemData" :class="itemBgColor">
      <p class="text-center">{{ itemIsHeader ? seminar.seminarDate : (seminar.seminarScore ? seminar.seminarScore : '-') }}</p>
    </div>
  </div>
</template>
<script lang="ts">

interface ISeminarData{
  seminarID: number,
  seminarDate: string,
  seminarScore: number | null,
}

export default {
  props: {
    itemName: {
      type: String,
      required: true,
    },
    itemAllScore: {
      type: [Number, String],
      required: true,
    },
    itemAllCount: {
      type: [Number, String],
      required: true,
    },
    itemData: {
      type: Array<ISeminarData>,
      required: false,
      default: [] as Array<ISeminarData>,
    },
    itemIsHeader: {
      type: Boolean,
      required: false,
      default: false
    },
    itemBgColor: {
      type: String,
      required: false,
      default: 'bg-transparent',
    }
  }
}
</script>
<style lang="css" scoped>
  .grid-table{
    display: grid;
    grid-template-columns: 300px 70px 75px;
    grid-auto-columns: 60px;
    grid-auto-flow: column;
    align-items: stretch;
  }
  .grid-table > div{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>