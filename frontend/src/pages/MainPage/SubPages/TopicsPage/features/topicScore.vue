<template>
  <div class="flex flex-row items-center gap-1">
    <p class="mr-1">Оценка:</p>

    <inputNumber 
      :inp-show-title="false"
      :inp-placeholder="'Баллы за доклад...'" 
      :inp-show-error="true"
      :inp-error="''"
      :inp-error-class="'text-text-error text-sm select-none absolute -bottom-5'"
      :inp-default-value="null"
      :inp-min-value="0"
      :inp-max-value="1000"
      :inp-hide-btns="true"
      :inp-input-class="'topic-input-score-tiny'"
    />

    <iconButton class="btn-main p-1 cursor-pointer">
      <template #icon>
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V13H7V21M7 3V8H15M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="#F3F3F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </template>
    </iconButton>
  </div>
</template>
<script lang="ts">
export default {
  
}
</script>
<style lang="css">
  .topic-input-score-tiny{
    padding: 2px 4px;
  }
  .topic-input-score-tiny > input{
    padding: 0;
    font-size: 14px;
    width: 120px;
  }
</style>