import blogActions from "./blogActions";



const auth = {
    namespaced: true,
    state: {
        blogs: [],
        blog:null,
        blogCategories: [],
        blogTags: [],
        status: {
            blogs: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            },
            blogCategories: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            },
            blogTags: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            },
            blog: {
                isSuccess: false,
                isLoading: false,
                isError: false,
                error: null,
            }

        },
    },
    getters: {
        
        blogs(state) {
            return state.blogs;
        },
        blogsStatus(state) {
            return state.status.blogs;
        },
        blogCategories(state) {
            return state.blogCategories;
        },
        blogCategoriesStatus(state) {
            return state.status.blogCategories;
        },
        blogTags(state) {
            return state.blogTags;
        },
        blogTagsStatus(state) {
            return state.status.blogTags;
        },
        blog(state) {
            return state.blog;
        },
        blogStatus(state) {
            return state.status.blog;
        }

    },
    mutations: {
        SET_IS_LOADING(state, { dataFor, value }) {
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
        SET_BLOG(state, blog) {
            state.blog = blog
        },
        SET_BLOGS(state, blogs) {
            state.blogs = blogs
        },
        SET_BLOG_CATEGORIES(state, blogCategories) {
            state.blogCategories = blogCategories
        },
        SET_BLOG_TAGS(state, blogTags) {
            state.blogTags = blogTags
        }

       
    },
    actions: blogActions,

}

export default auth;