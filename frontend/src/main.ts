import { createApp } from 'vue'

import App from './App.vue'


import '@inkline/inkline/inkline.scss';

import "@/assets/main.scss";
import registerPlugins from '@/plugins';

const app = createApp(App)
registerPlugins(app)

app.mount('#app')
