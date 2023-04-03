import router from "@/router";
import type { App } from "vue";
import pinia from "./pinia";
import vuetify from "./vuetify";

export default function registerPlugins(app: App){
    app
    .use(router)
    .use(pinia)
    .use(vuetify)
}