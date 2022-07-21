import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui';
import Pagination from 'v-pagination-3';
//import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);

app.component('v-pagination', Pagination);
app.use(naive);
app.use(router);
app.mount('#app');