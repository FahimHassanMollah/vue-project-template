import axios from "axios";
import { useToast } from 'vue-toast-notification';
import authActions from "./authActions";
const $toast = useToast();


const auth = {
    namespaced: true,
    state: {
        authUser: {},
        authToken: {
            accessToken: null,
            tokenType: null,
        },
        status: {
            login: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            },

        },
    },
    getters: {
        status(state) {
            return state.status;
        },
        authUser(state) {
            return state.authUser
        },
        authToken(state) {
            return state.authToken;
        },

    },
    mutations: {
        SET_IS_LOADING(state, { dataFor, value }) {
            console.log(dataFor, value);
            console.log(state.status[dataFor], "state.status[dataFor].isLoading");
            state.status[dataFor].isLoading = value;
        },
        SET_IS_ERROR(state, { dataFor,value}) {
            state.status[dataFor].isError = value;
        },
        SET_ERROR(state, {dataFor, value}) {
            state.status[dataFor].error = value;
        },
        SET_IS_SUCCESS(state, {dataFor, value}) {
            state.status[dataFor].isSuccess = value;
        },
        SET_AUTH_USER(state, user) {
            state.authUser = user
        },
        SET_AUTH_TOKEN(state, token) {
            state.authToken.accessToken = token.access_token;
            state.authToken.tokenType = token.token_type;

        }
    },
    actions: authActions,

}

export default auth;