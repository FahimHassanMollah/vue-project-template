import blogActions from "./blogActions";



const auth = {
    namespaced: true,
    state: {
        blogs: [],
        status: {
            blogs: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            },

        },
    },
    getters: {
        blogs(state) {
            return state.blogs;
        },
        blogsStatus(state) {
            return state.status.blogs;
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
        SET_BLOGS(state, blogs) {
            state.blogs = blogs
        },
       
    },
    actions: blogActions,

}

export default auth;