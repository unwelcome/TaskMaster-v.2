<template>
  <div class="flex flex-col items-start">
    <label v-if="inpShowTitle" :class="inpTitleClass" @click="($refs.inputEl as HTMLElement).focus()">{{ inpTitle }}</label>

    <div class="custom-input">
      <input 
        type="number" 
        :min="inpMinValue"
        :max="inpMaxValue"
        :class="{'hide-btns': inpHideBtns}" 
        :placeholder=inpPlaceholder 
        v-model="value" 
        ref="inputEl"
        @input="updateValue" 
      />
    </div>

    <p v-if="inpShowDescription" :class="inpDescriptionClass">{{ inpDescription }}</p>
    <p v-if="inpShowError" :class="inpErrorClass">{{ inpError }}</p>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['updateValue'],
  props:{
    inpTitle: {
      type: String,
      required: false,
      default: '',
    },
    inpShowTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    inpTitleClass: {
      type: String,
      required: false,
      default: 'text-base cursor-pointer',
    },

    inpPlaceholder: {
      type: String,
      required: false,
      default: '',
    },

    inpDescription: {
      type: String,
      required: false,
      default: '',
    },
    inpShowDescription: {
      type: Boolean,
      required: false,
      default: false,
    },
    inpDescriptionClass: {
      type: String,
      required: false,
      default: 'text-xs text-text-description select-none h-4',
    },

    inpError: {
      type: String,
      required: false,
      default: '',
    },
    inpShowError: {
      type: Boolean,
      required: false,
      default: false,
    },
    inpErrorClass: {
      type: String,
      required: false,
      default: 'text-text-error text-sm select-none h-5',
    },

    inpHideBtns: {
      type: Boolean,
      required: false,
      default: true,
    },
    inpMinValue: {
      type: Number,
      required: false,
      default: null,
    },
    inpMaxValue: {
      type: Number,
      required: false,
      default: null,
    },

    inpDefaultValue: {
      type: [Number, null],
      required: false,
      default: null,
    },
    inpResetValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data(){
    return{
      value: this.inpDefaultValue as number | null,
    }
  },
  methods: {
    updateValue(){
      this.$emit('updateValue', this.value);
    },
  },
  watch:{
    inpResetValue(newVal: boolean){
      if(newVal) this.value = null;
    },
    inpDefaultValue(newVal: number | null){
      this.value = newVal;
    }
  }
}
</script>
<style lang="css" scoped>
  .hide-btns::-webkit-outer-spin-button,
  .hide-btns::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
  
</style>