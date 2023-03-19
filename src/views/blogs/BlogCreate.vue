<script setup>
import AppLayout from '../../layouts/AppLayout.vue';
import VueMultiselect from 'vue-multiselect'
import { useStore } from 'vuex';
import { useToastMessage } from '../../composables/useToastMessage';
import { ref, reactive, toRefs, onMounted, computed } from 'vue';
import Loader from '../../components/partials/Loader.vue';
import { useRouter } from 'vue-router';

// hooks
const store = useStore();
const router = useRouter();
const { showToastMessage } = useToastMessage();



// states
const blogCategories = computed(() => store.getters['blog/blogCategories']);
const blogTags = computed(() => store.getters['blog/blogTags']);

const blogCategoriesStatus = computed(() => store.getters['blog/blogCategoriesStatus']);
const blogTagsStatus = computed(() => store.getters['blog/blogTagsStatus']);
const blogStatus = computed(() => store.getters['blog/blogStatus']);

const isUpdateButtonDisabled = computed(() => {
    return (!(blogTitle.value && blogDescription.value && selectedBlogCategory?.value?.name));
})

const selectedBlogCategory = ref("");
const selectedBlogTags = ref([]);
const blogTitle = ref("");
const blogDescription = ref("");
const blogActiveStatus = ref(true);


// life cycle hooks
onMounted(async () => {
    await getAllBlogCategoriesHandler();
    await getBlogTagsHandler();

})



// methods
const getAllBlogCategoriesHandler = async () => {
    await store.dispatch('blog/getBlogCategories');
    console.log(blogCategories, 'blogCategories');
}

const getBlogTagsHandler = async () => {
    await store.dispatch('blog/getBlogTags');
}

const blogCreateHandler = async () => {
   
    await store.dispatch('blog/createBlog', {
        title: blogTitle.value,
        description: blogDescription.value,
        blog_category_id: selectedBlogCategory.value.id,
        created_by: store.getters['auth/authUser'].id,
        // blog_tags: selectedBlogTags.value,
        status: blogActiveStatus.value ? 1 : 0,
        is_featured: 1
    });
    if (blogStatus.value.isSuccess) {
        showToastMessage('success', 'Blog created successfully');
        router.push({ name: 'blogList'})
    }

}
</script>


<template>
    <AppLayout>
        <div>
            <template v-if="(blogCategoriesStatus?.isLoading) || (blogTagsStatus?.isLoading) || (blogStatus?.isLoading)">
                <Loader />
            </template>
            <div class="container mx-auto">
                <form @submit.prevent="blogCreateHandler()" class="w-full py-20">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-first-name">
                                Title
                            </label>
                            <input
                                class="appearance-none block w-full  text-gray-700 border border-gray-200 focus:border-primary-light rounded py-2 px-4 mb-3 leading-tight focus:outline-none"
                                id="grid-first-name" type="text" placeholder="Title" v-model="blogTitle">
                        </div>
                        <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="blogCategories">
                                Blog Category
                            </label>
                            <VueMultiselect id="blogCategories" v-model="selectedBlogCategory" :options="blogCategories"
                                :show-labels="false" :searchable="false" class="" :allow-empty="false" label="name"
                                placeholder="Select one" track-by="id">
                            </VueMultiselect>
                        </div>

                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="grid-first-name focus:border-primary-light">
                                Description
                            </label>
                            <textarea v-model="blogDescription"
                                class="w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:border-primary-light"
                                name="" id="" cols="30" rows="10">

                                </textarea>

                        </div>
                        <div class="w-full md:w-1/3 px-3">
                            <div class="mb-6">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="blogTags">
                                    Blog Tags
                                </label>
                                <VueMultiselect :show-labels="false" class="" :multiple="true" id="blogTags"
                                    v-model="selectedBlogTags" :options="blogTags" :searchable="false" :allow-empty="false"
                                    label="name" placeholder="Select one" track-by="id">
                                </VueMultiselect>
                            </div>

                            <div>
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Blog
                                    status</label>
                                <div
                                    class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                    <input type="checkbox" v-model="blogActiveStatus" name="toggle" id="toggle"
                                        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                                    <label for="toggle"
                                        class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                </div>
                                <label for="toggle" class="text-xs text-gray-700">Active.</label>
                            </div>
                        </div>

                    </div>
                    <div class="flex justify-end">
                        <button
                            class="bg-primary hover:bg-primary-light disabled:opacity-75 text-white font-semibold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                            type="submit" :disabled="isUpdateButtonDisabled">
                            Create Blog
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </AppLayout>
</template>