<template>
  <v-container class="container" fluid>
    <v-card class="course-card ma-1">
      <v-img :src="curso.img" height="200px" contain></v-img>
      <v-card-title>
        <v-spacer />
        <div class="text-center">
          <h4 class="headline">{{ curso.nombre }}</h4>
        </div>
        <v-spacer />
      </v-card-title>
      <v-card-title class="headline text-center"></v-card-title>
      <v-card-subtitle class="text-center"></v-card-subtitle>
      <v-card-text class="text-center">
        <div class="subtitle-2 my-1 course-data text-center">Costo: {{ curso.costo }}</div>
        <div class="subtitle-2 my-1 course-data text-center">Duración: {{ curso.duracion }}</div>
        <div class="subtitle-2 my-1 course-data text-center">Cupos: {{ curso.cupos }}</div>
        <div class="subtitle-2 my-1 course-data text-center">Inscritos: {{ curso.inscritos }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CursosComp',
  props: {
    curso: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.headline {
  text-align: center;
  border-bottom: 2px solid rgba(169, 80, 177, 0.1);
}

.container {
  max-width: 100%;
  margin: auto;
}

.course-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  height: 450px;
  width: 80%;
}

.course-card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.course-data {
  font-weight: bold;
  border-bottom: 2px solid rgba(83, 98, 110, 0.336);
  box-shadow: 0 1px 0 0 rgba(255,255,255,0.5);
  font-size: large;
  white-space: normal;
}
</style>
