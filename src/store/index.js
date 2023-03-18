import { createStore } from "vuex";
import auth from "./modules/auth/auth";
import blog from "./modules/blog/blog";


const store = createStore({
    modules: {
      auth,
      blog
    }
  })


export default store;  