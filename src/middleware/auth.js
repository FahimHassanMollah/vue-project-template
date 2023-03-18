export default function auth ({ next, store }){
    if(!store.getters['auth/isAuthenticated']) next({ name: 'login' });
    else next();
}