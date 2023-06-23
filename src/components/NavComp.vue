<template>
<!-- Si usamos un drawer debemos envolver todo en un div -->
<div>
  <!--el v-app-bar siempre debe envolver todo el nav y llevar el atributo app-->
  <!-- y el v-app solo se ocupa en el archivo app.vue y una sola vez -->
  <v-app-bar app color="error" dark elevation="5">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn color="grey" class="white--text mr-9"> <!-- Color del texto y fondo modificados aquí -->
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
<!-- El navigation drawer debe ir afuera del v-app-bar-->
    <v-navigation-drawer v-model="drawer" app temporary>
      <!-- Le agregué el atributo temporary que sirve para que el drawer se cierre 
      al hacer click en los items de la lista. -->
      <v-list>
        <v-list-item to="/" router-link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin" router-link>
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
  name: 'nav-comp',
  data() {
    return {
      drawer: false,
    };
  },
  
};
</script>

<style scoped>
.nav-comp__main {
  margin-top: 80px;
  height: calc(100vh - 80px);
}
</style>

