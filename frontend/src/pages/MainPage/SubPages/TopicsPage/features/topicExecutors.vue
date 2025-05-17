<template>
  <div class="grid-table">
    <p style="grid-area: 1 / 1 / 2 / 2;">Выполняют:</p>

    <div class="flex flex-col gap-1" style="grid-area: 1 / 2 / 2 / 3;">

      <div v-for="_ in 3" class="flex flex-row items-center gap-1">
        <div class=" w-8 h-8 rounded-full overflow-hidden" style="background-color: #BAD28F;">
          <!-- <img /> -->
        </div>
        <p>Иванов Иван Иванович</p>
      </div>

    </div>

    <iconButton class="btn-main w-36 py-1" style="grid-area: 2 / 2 / 3 / 3;">
      <template #text>
        <p class="text-base">Присоединиться</p>
      </template>
    </iconButton>
  </div>
</template>
<script lang="ts">

export default {

}
</script>
<style lang="css" scoped>
  .grid-table{
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    column-gap: 8px;
    row-gap: 8px;
  }
</style>