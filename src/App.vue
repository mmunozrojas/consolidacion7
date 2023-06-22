<template>
  <div id="app">
    <NavComp />
    <router-view/>
  </div>
</template>

<script>
import NavComp from './components/NavComp.vue'

export default {
  name: 'App',
  // props: {},
  data: function(){
    return {}
  },
  // computed: {},
  //methods: {}
  // watch: {},
   components: {
    NavComp
   },
  // mixins: [],
  // filters: {},
  // -- Lifecycle Methods
  // -- End Lifecycle Methods
}
</script>

<style scoped>
  
</style>
