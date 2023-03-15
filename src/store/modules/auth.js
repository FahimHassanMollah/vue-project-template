import axios from "axios";
import {useToast} from 'vue-toast-notification';
const $toast = useToast();


const auth = {
    namespaced: true,
    state: {
        authUser: {},
        authToken: {
            accessToken: null,
            tokenType: null,
        },
        isLoading: false,
        isError: false,
        error: null,
        isScuccess: false,
    },
    getters: {
        authUser(state) {
            return state.authUser
        },
        authToken(state) {
            return state.authToken;
        },
        isLoading(state) {
            return state.isLoading;
        },
        isError(state) {
            return state.isError;
        },
        error(state) {
            return state.error;
        },
        isScuccess(state) {
            return state.isScuccess;
        }
    },
    mutations: {
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setIsError(state, isError) {
            state.isError = isError;
        },
        setError(state, error) {
            state.error = error;
        },
        setIsScuccess(state, isScuccess) {
            state.isScuccess = isScuccess;
        },
        setAuthUser(state, user) {
            state.authUser = user
        },
        setAuthToken(state, token) {
            state.authToken.accessToken = token.access_token;
            state.authToken.tokenType = token.token_type;

        }
    },
    actions: {
        async login({ commit }, credentials) {
            commit('setIsLoading', true);
            commit('setIsError', false);
            commit('setAuthUser', {});
            commit('setIsScuccess', false);

            const path = `v1/login-token`;

            try {
                const response = await axios.post(path, credentials);
                console.log(response);

                if (response?.data?.data?.user) {
                    await commit('setIsScuccess', true);
                    await commit('setAuthUser', response.data.data.user);
                }

                if (response?.data?.data?.token) {
                    await commit('setAuthToken', response.data.data.token);
                }
                commit('setIsLoading', false);


            } catch (error) {
                commit('setIsLoading', false);
                commit('setIsError', true);

                const errorData = {
                    message: null,
                    errors: null
                };
                if (error?.response?.data?.message) {
                    $toast.open({
                        message: `${error.response.data.message}`,
                        type: 'error',
                        // all of other options may go here
                    });
                    errorData.message = error?.response?.data?.message;

                }
                if (error?.response?.data?.errors) {
                    errorData.errors = error.response.data.errors;

                }
                await commit('setError', errorData);
            }
        },
        async attempt({ commit }, { token, user }) {
            if (token && user) {
                await commit('setAuthToken', token);
                await commit('setAuthUser', user);
            }
        }
    },

}

export default auth;