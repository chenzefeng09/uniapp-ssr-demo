import { createApp } from './app'
import App from "./App.vue";
App.mpType = "app";

console.log(99, App)

const { app } = createApp({
  ...App
})
app.$mount('#app')
