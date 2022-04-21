import { createApp } from 'vue'
import App from './App.vue'
import init, { greet } from '../my_crate/pkg';

init().then(() => {
  greet()
})

createApp(App).mount('#app')
