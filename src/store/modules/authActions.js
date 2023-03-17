import axios from "axios";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
export default {
    async login({ commit }, credentials) {

        commit('SET_IS_LOADING', {dataFor: 'login', value: true});
        commit('SET_IS_ERROR', {dataFor: 'login', value: false});
        commit('SET_AUTH_USER', {});
        commit('SET_IS_SUCCESS', {dataFor: 'login', value: false});

        const path = `v1/login-token`;

        try {
            const response = await axios.post(path, credentials);
            console.log(response, "respose");

            if (response?.data?.data?.user) {
                await commit('SET_IS_SUCCESS', {dataFor: 'login', value: true});
                await commit('SET_AUTH_USER', response.data.data.user);
            }

            if (response?.data?.data?.token) {
                await commit('SET_AUTH_TOKEN', response.data.data.token);
                await commit('SET_IS_SUCCESS', {dataFor: 'login', value: true});
            }
            commit('SET_IS_LOADING', {dataFor: 'login', value: false});
           


        } catch (error) {
            commit('SET_IS_LOADING', {dataFor: 'login', value: false});
            commit('SET_IS_ERROR', {dataFor: 'login', value: true});
            await commit('SET_IS_SUCCESS',{dataFor: 'login', value: false});

            const errorData = {};
            if (error?.response?.data?.message) {
                $toast.open({
                    message: `${error.response.data.message}`,
                    type: 'error',
                    // all of other options may go here
                });
                errorData.message = error?.response?.data?.message;

            }else {
                if (error?.message) {
                    $toast.open({
                        message: `${error.message}`,
                        type: 'error',
                        // all of other options may go here
                    });
                    errorData.message = error.message;
    
                }
            }
            
            if (error?.response?.data?.errors) {
                errorData.errors = error.response.data.errors;

            }
            await commit('SET_ERROR',{dataFor: 'login', value: errorData} );
        }
    },
    async attempt({ commit }, { token, user }) {
        if (token && user) {
            await commit('SET_AUTH_TOKEN', token);
            await commit('SET_AUTH_USER', user);
        }
    }
}