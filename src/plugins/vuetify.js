import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md } from 'vuetify/iconsets/md'

// Define custom theme based on design system
const lightTheme = {
  dark: false,
  colors: {
    primary: '#0051CF',
    'primary-darken-1': '#003388',
    secondary: '#4F4F4F',
    'secondary-darken-1': '#333333',
    accent: '#FF5C00',
    error: '#F44336',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    background: '#FFFFFF',
    surface: '#F5F5F5',
  },
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
    },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: true,
    },
    VTextField: {
      variant: 'outlined',
      color: 'primary',
      hideDetails: 'auto',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      md,
    },
  },
})