<script setup>
import { ref, reactive,toRefs,onMounted,computed } from 'vue';
import { useStore } from 'vuex';
import Loader from '../../components/partials/Loader.vue';
import { useToastMessage } from '../../composables/useToastMessage';
import AppLayout from '../../layouts/AppLayout.vue';

// hooks
const store = useStore();
const {showToastMessage} = useToastMessage();


// states
const blogStatus = computed(() => store.getters['blog/blogsStatus']);
const blogs =  computed(() => store.getters['blog/blogs']);


const getBlogsParams = ref({
    paginate: 1,
    pagination: 10,
    page: 1,
    with_relation: ['blogCategory','blogTags']
})






// life cycle hooks
onMounted(async() => {
    await getAllBlogsHandler();
   
})

// methods
const getAllBlogsHandler = async () => {
    await store.dispatch('blog/getAllBlogs',{params:{...getBlogsParams.value}}); 
    if (blogStatus.value.isSuccess) {
        showToastMessage('success', 'Blogs fetched successfully');
    }

}


</script>


<template>
    <AppLayout>
        <div>
            <template v-if="blogStatus?.isLoading">
                <Loader />
            </template>  
            <div class="container mx-auto">
                <div class="overflow-x-auto">
                    <table class="w-full table-auto  rounded ">
                        <thead class="text-xs font-semibold uppercase text-gray-900 bg-gray-100">
                            <tr>
                                <th class="px-4 py-3 border-b border-gray-200 text-sm">
                                    <div class="font-semibold text-left">Title</div>
                                </th>
                                <th class="px-4 py-3 border-b border-gray-200 text-sm">
                                    <div class="font-semibold text-left">Category</div>
                                </th>
                                <th class="px-4 py-3 border-b border-gray-200 text-sm">
                                    <div class="font-semibold text-left">Image</div>
                                </th>
                                <th class=" px-4 py-3 border-b border-gray-200 text-sm">
                                    <div class="font-semibold text-left">Is featured</div>
                                </th>
                                <th class=" px-4 py-3 border-b border-gray-200 text-sm">
                                    <div class="font-semibold text-left">Status</div>
                                </th>
                               
                               
                                
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100">
                            <tr v-for="(blog,index) in blogs" :key="index" class="">
                                <td class="py-2 px-4 border-b border-gray-200 bg-white text-sm">
                                    <div class="text-left">{{ blog?.title  ?? ''}}</div>
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                    <div class="text-left">{{ blog?.blogCategory?.name  ?? ''}}</div>
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class=" flex-shrink-0"><img class="rounded-full h-10"
                                                :src="blog?.image ?? ''"
                                                alt=""></div>
                                    </div>
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                    <div class="text-left">{{ blog?.is_featured ?? '' }}</div>
                                </td>
                                <td class="py-2 px-4 border-b border-gray-200 bg-white text-sm whitespace-nowrap">
                                    <div class="text-left font-medium text-green-500">{{ blog?.status }}</div>
                                </td>
                             
                                <!-- <td class="p-2 ">
                                    <div class="text-lg text-center">??</div>
                                </td> -->
                            </tr>
                          
                           
                           
                          
                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
    </AppLayout>
</template>







