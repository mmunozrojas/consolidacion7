<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" color="secondary" dark router-link>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn to="/admin" color="secondary" dark router-link>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'nav-comp',
  // props: {},
  data() {
    return {};
  },
  // computed: {},
  // methods: {},
  // watch: {},
  // components: {},
  // mixins: [],
  // filters: {},
};
</script>

<style scoped>
/* Estilos CSS para el componente NavBar */
</style>
