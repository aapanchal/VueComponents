import { createApp } from 'vue'
import './scss/styles.scss'
import App from './App.vue'
import vuetify from './plugins/vuetify'

// Import RemixIcon
import 'remixicon/fonts/remixicon.css'

createApp(App)
  .use(vuetify)
  .mount('#app')