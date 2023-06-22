<template>
  <div class="home-container">
    <v-container>
      <v-row>
        <v-col v-for="curso in cursos" :key="curso.id" :cols="getColumnSize">
          <cursos-comp :curso="curso"></cursos-comp>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CursosComp from '@/components/CursosComp.vue'

export default {
  name: 'HomeView',
  computed: {
    ...mapState(['cursos']),
    getColumnSize() {
      if (this.$vuetify.breakpoint.width < 1000) {
        return 12; // Mostrar 1 curso por fila en pantallas menores a 600px
      } else if (this.$vuetify.breakpoint.width < 1500) {
        return 6; // Mostrar 2 cursos por fila entre 600px y 1150px
      } else {
        return 4; // Mostrar 3 cursos por fila en pantallas mayores a 1150px
      }
    }
  },
  components: {
    'cursos-comp': CursosComp
  }
}
</script>

<style scoped>
.home-container {
  width: 70%;
  margin: auto;
  margin-top: 100px;
}
</style>

