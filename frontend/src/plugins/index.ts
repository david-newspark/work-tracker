import router from "@/router";
import type { App } from "vue";
import { components, Inkline } from "@inkline/inkline";
import { InklineConfig } from "./inkline";
import pinia from "./pinia";



export default function registerPlugins(app: App){
    app
    .use(router)
    .use(pinia)
    .use(Inkline, {components})
}