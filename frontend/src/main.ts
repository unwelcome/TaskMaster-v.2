import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import iconButton from './shared/iconButton.vue'
import inputText from './lib/customInput/inputText.vue'
import inputNumber from './lib/customInput/inputNumber.vue'
import inputSwitch from './lib/customInput/inputSwitch.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('iconButton', iconButton);
app.component('inputText', inputText);
app.component('inputNumber', inputNumber);
app.component('inputSwitch', inputSwitch);

app.mount('#app')
