import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

// css
import './assets/main.css';
import 'vue-toast-notification/dist/theme-sugar.css';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
axios.defaults.headers.common['Client-Secret'] = import.meta.env.VITE_APP_CLIENT_SECRET;

store.subscribe((mutation, state) => {
    if (mutation.type === 'auth/SET_AUTH_TOKEN') {

        let tokenType = mutation.payload?.token_type ?? null;
        let accessToken = mutation.payload?.access_token ?? null;

        if (tokenType && accessToken) {
            axios.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`;
            localStorage.setItem('authToken', JSON.stringify(mutation.payload));
        }
        else {
            axios.defaults.headers.common['Authorization'] = null;
            localStorage.removeItem('authToken');
        }

    }
    if (mutation.type === 'auth/SET_AUTH_USER') {

        let authId = mutation.payload?.id ?? null;
        if (authId) {
            localStorage.setItem('authUser', JSON.stringify(mutation.payload));
        }
        else {
            localStorage.removeItem('authUser');
        }
    }

});


const app = createApp(App);
app.use(router);
app.use(store);

const authUser = localStorage.getItem('authUser');
const authToken = localStorage.getItem('authToken');

if (authToken && authUser) {
    store.dispatch('auth/attempt', { token: JSON.parse(authToken), user: JSON.parse(authUser) }).then(() => {
        app.mount('#app');
    });
}
else {
    app.mount('#app');
}



