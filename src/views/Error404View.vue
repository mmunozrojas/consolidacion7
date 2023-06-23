<template>
  <div class="error404-container">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="error404-card">
            <v-card-title class="text-h4">
            </v-card-title>
            <v-card-text>
              <v-img
                src="https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg"
                alt="Error 404" height="300" contain></v-img>

              <p class="text-body-1">
                La página que estás buscando no existe.
              </p>
              <p class="text-body-1">
                Por favor, verifica la URL o regresa a la página de inicio.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" to="/" router-link class="mx-auto">
                Ir a la página de inicio
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Error404View',
};
</script>

<style scoped>
.error404-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error404-card {
  max-width: 400px;
  margin: auto;
  text-align: center;
}

.text-h4 {
  margin-bottom: 16px;
}

.text-body-1 {
  margin-bottom: 8px;
}
</style>

  