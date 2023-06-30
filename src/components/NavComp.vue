<template>
  <div>
    <v-app-bar app color="error" dark elevation="5">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn color="grey" class="white--text custom-button">
              <v-toolbar-title class="custom-title">Cursos AlfaWeb</v-toolbar-title>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-spacer></v-spacer>
      <v-switch v-model="darkMode" label="Modo oscuro" class="mr-3"></v-switch>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
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
      darkMode: false,
    };
  },
  watch: {
    darkMode(value) {
      this.$vuetify.theme.dark = value;
    },
  },
};
</script>

<style scoped>
.custom-title {
  text-align: center !important;
}

.custom-button {
  margin-left: 100px;
}
</style>
