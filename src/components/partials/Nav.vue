<script setup>
import { RouterLink } from 'vue-router'
</script>


<template>
    <!-- Navbar -->
    <nav class=" py-4 bg-white/80
                        backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">

        <div class="px-2 sm:px-0 container mx-auto flex items-center">
            <!-- Logo Container -->
            <div class="flex items-center">
                <!-- Logo -->
                <a class="cursor-pointer">
                    <h3 class="text-2xl font-medium text-blue-500">
                        <img class="h-10" src="https://www.jatri.co/src/images/logo/logo.svg" alt="Logo">
                    </h3>
                </a>
            </div>
            <!-- Links Section -->
            <div class="flex ml-auto space-x-8">
                <div class="items-center hidden space-x-8 lg:flex">
                    <RouterLink to="/" class="flex text-gray-600 hover:text-primary-light
                                        cursor-pointer transition-colors duration-300">
                        Home
                    </RouterLink>
                </div>

                <div class="flex items-center space-x-5">
                    <RouterLink to="/login" class="flex text-gray-600
                                        cursor-pointer transition-colors duration-300
                                        font-semibold">
                        <svg class="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
                        </svg>
                        Login
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>