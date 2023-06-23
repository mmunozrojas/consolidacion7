<template>
  <v-app>
    <NavComp />
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

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
