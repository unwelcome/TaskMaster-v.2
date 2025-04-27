import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import iconButton from './shared/iconButton.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.component('iconButton', iconButton);

app.mount('#app')
