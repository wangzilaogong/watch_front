import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
// import contractAbi from './assets/abi.json';
// import Web3 from 'web3';
// import Ether from 'ether.js';
import { createPinia } from 'pinia'
import './assets/styles/index.scss' // global css

const app = createApp(App)
app.use(createPinia()).use(Router).mount('#app')
