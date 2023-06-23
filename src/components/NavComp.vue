<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
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
    
    <v-app-bar app color="primary" dark elevation="-1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
    </v-app-bar>
    
    <v-main class="nav-comp__main">
      <!-- Contenido principal de la página -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'nav-comp',
  data() {
    return {
      drawer: false
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

