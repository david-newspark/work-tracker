import router from "@/router";
import type { App } from "vue";
import pinia from "./pinia";

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
const vuetify = createVuetify({
  components,
  directives,
})

export default function registerPlugins(app: App){
    app
    .use(router)
    .use(pinia)
    .use(vuetify)
}