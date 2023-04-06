// Vuetify
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const defaultTheme = 'dark';

export default createVuetify({
  components,
  directives,
})
