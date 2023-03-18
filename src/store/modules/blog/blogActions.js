import axios from "axios";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
export default {
    async getAllBlogs({ commit }, dataObj) {

        commit('SET_IS_LOADING', {dataFor: 'blogs', value: true});
        commit('SET_IS_ERROR', {dataFor: 'blogs', value: false});
        commit('SET_BLOGS', []);
        commit('SET_IS_SUCCESS', {dataFor: 'blogs', value: false});

        const path = `v1/blogs`;

        try {
            console.log(dataObj, "dataObj");
            const response = await axios.get(path, dataObj);
           

            if (response?.data?.data) {
                await commit('SET_IS_SUCCESS', {dataFor: 'blogs', value: true});
                await commit('SET_BLOGS', response.data.data);
            }
            commit('SET_IS_LOADING', {dataFor: 'blogs', value: false});

         
        
        } catch (error) {
            commit('SET_IS_LOADING', {dataFor: 'blogs', value: false});
            commit('SET_IS_ERROR', {dataFor: 'blogs', value: true});
            await commit('SET_IS_SUCCESS',{dataFor: 'blogs', value: false});

            const errorData = {};
            if (error?.response?.data?.message) {
                $toast.open({
                    message: `${error.response.data.message}`,
                    type: 'error',
                });
                errorData.message = error?.response?.data?.message;

            }else {
                if (error?.message) {
                    $toast.open({
                        message: `${error.message}`,
                        type: 'error',
                    });
                    errorData.message = error.message;
    
                }
            }
            
            if (error?.response?.data?.errors) {
                errorData.errors = error.response.data.errors;

            }
            await commit('SET_ERROR',{dataFor: 'blogs', value: errorData} );
        }
    },
   
}