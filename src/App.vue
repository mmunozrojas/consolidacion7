<template>
  <v-app>
    <NavComp />
    <router-view></router-view>
    <FooterComp />
  </v-app>
</template>

<script>
import NavComp from './components/NavComp.vue'
import FooterComp from './components/FooterComp.vue'
import cursos from '/cursos.json';

export default {
  name: 'App',
  // props: {},
  data: function () {
    return {}
  },
  // computed: {},
  //methods: {}
  // watch: {},
  components: {
    NavComp,
    FooterComp,
  },
  // mixins: [],
  // filters: {},
  // -- Lifecycle Methods
  created() {
    this.$store.commit('cargarCursos', cursos);
  },
  // -- End Lifecycle Methods
}
</script>

<style scoped></style>
