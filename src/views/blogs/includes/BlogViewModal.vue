<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits(['singleBlogViewModalClose']);
const props = defineProps(['isBlogModalOpen']);


const blog = computed(() => store.getters['blog/blog']);

</script>


<template>
    <div class="container mx-auto">
        <div class="flex justify-center">
            <!-- <button @click="isBlogModalOpen = true" class="px-6 py-2 text-white bg-blue-600 rounded shadow " type="button">
                    Open Model
                </button> -->

            <div v-show="isBlogModalOpen" class="fixed inset-0 flex items-center justify-center
                        bg-gray-700 bg-opacity-50  z-50
                      ">

                <div class="w-full md:w-7/12 lg:w-6/12 min-w-[320px] p-6 mx-4 bg-white rounded-md shadow-xl max-h-screen overflow-y-scroll">
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Blog details</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="mt-4">
                        <div>
                            <span class="">Title</span>
                            <p class="">{{ blog?.title }}</p>
                        </div>
                        <div>
                            <p class="">Status</p>
                            <p class="">{{ blog?.status }}</p>
                        </div>
                        <button @click="$emit('singleBlogViewModalClose')"
                            class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
                            Cancel
                        </button>
                        <button class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>