<template>
  <div class="flex flex-col items-start">
    <label v-if="inpShowTitle" :class="inpTitleClass" @click="($refs.inputEl as HTMLElement).focus()">{{ inpTitle
      }}</label>

    <div class="custom-input" :class="inpInputClass">
      <input :type=type :placeholder=inpPlaceholder v-model="value" @input="updateValue" ref="inputEl" />
      <div v-if="inpType === 'password'" class="flex flex-col justify-center cursor-pointer">
        <!--Eye Off-->
        <svg v-if="passwordShowed" @click="togglePassword(false)" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_5_40)">
            <path
              d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23"
              stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
        <!--Eye On-->
        <svg v-else @click="togglePassword(true)" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#1E1E1E"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    <p v-if="inpShowDescription" :class="inpDescriptionClass">{{ inpDescription }}</p>
    <p v-if="inpShowError" :class="inpErrorClass">{{ inpError }}</p>
  </div>
</template>
<script lang="ts">
export default {
  emits: ['updateValue'],
  props: {
    inpType: {
      type: String,
      required: false,
      default: 'text',
    },

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
      default: 'text-xs text-text-description select-none min-h-4',
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
      default: 'text-text-error text-sm select-none min-h-5',
    },

    inpInputClass: {
      type: String,
      required: false,
      default: '',
    },

    inpDefaultValue: {
      type: String,
      required: false,
      default: '',
    },
    inpResetValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      type: this.inpType as string,
      value: this.inpDefaultValue as string,

      passwordShowed: false as boolean,
    }
  },
  methods: {
    updateValue() {
      this.$emit('updateValue', this.value);
    },
    togglePassword(showPass: boolean) {
      this.type = showPass ? 'text' : 'password';
      this.passwordShowed = showPass;
      (this.$refs.inputEl as HTMLElement).focus();
    }
  },
  watch: {
    inpResetValue(newVal: boolean) {
      if (newVal) this.value = '';
    },
    inpDefaultValue(newVal: string) {
      this.value = newVal;
    }
  }
}
</script>