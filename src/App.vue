<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<template>
 
  <!-- <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink> -->
  <RouterView />
</template>


<style>

  
/*multi select border color change on focus starts */

.multiselect__tags:focus-within {
    border-color: #ef4935;
}

.multiselect__tags {
    overflow: hidden !important;
    min-height: 38px !important;
    /* max-height: 38px !important; */
    border-color: #dfe3e7;
}

/* select tag css */
.multiselect__option--selected.multiselect__option--highlight {
    background: #ef4935 !important;
    color: #ffff !important;
}

.multiselect__option--highlight {
    background: #ef4935;
    outline: none;
    color: #fff;
}
.multiselect__tags {
    overflow: visible !important;
    /* max-height: auto !important; */
    /* max-height: 38px !important; */
    border-color: #dfe3e7;
}
</style>


