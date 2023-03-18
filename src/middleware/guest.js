export default function guest ({ next, store }){
    console.log('guest middleware', store.getters['auth/isAuthenticated']);
    if(store.getters['auth/isAuthenticated']) next({name: 'home'});
    else next();
}