<template>
  <div class="flex flex-col items-start">
    <label class="flex flex-row items-center gap-1 text-base cursor-pointer select-none" :class="inpTitleClass">

      <input 
        type="checkbox" 
        class="custom-input-slider"
        :style="{'width': `${inpSize}px`, 'height': `${inpSize}px`, 'margin': `0 ${inpSize / 2 + 1}px`}"
        v-model="value" 
        @input="updateValue" 
      />

      {{ inpTitle }}
    </label>

    <p v-if="inpShowDescription" :class="inpDescriptionClass">{{ inpDescription }}</p>
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
    inpTitleClass: {
      type: String,
      required: false,
      default: '',
    },

    inpSize: {
      type: Number,
      required: false,
      default: 20,
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
      default: 'text-xs text-text-description select-none min-h-4',
    },

    inpDefaultValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    inpResetValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data(){
    return{
      value: this.inpDefaultValue as boolean,
    }
  },
  methods: {
    updateValue(){
      this.$emit('updateValue', this.value);
    },
  },
  watch:{
    inpResetValue(newVal: boolean){
      if(newVal) this.value = false;
    },
    inpDefaultValue(newVal: boolean){
      this.value = newVal;
    }
  }
}
</script>