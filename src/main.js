import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  store  from './store';
import axios from 'axios';


// css
import './assets/main.css';
import 'vue-toast-notification/dist/theme-sugar.css';



axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.headers.common['Client-Secret'] = import.meta.env.VITE_APP_CLIENT_SECRET;


const app = createApp(App)

app.use(router);
app.use(store);

app.mount('#app')
