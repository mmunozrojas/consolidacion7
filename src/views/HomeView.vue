<template>
  <div class="home-container">
    <v-container>
      <!-- <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <template v-slot:prev="{ on, attrs }">
      <v-btn
        color="success"
        v-bind="attrs"
        v-on="on"
      >Previous slide</v-btn>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn
        color="info"
        v-bind="attrs"
        v-on="on"
      >Next slide</v-btn>
    </template>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel> -->
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
  data () {
      return {
        // colors: [
        //   'indigo',
        //   'warning',
        //   'pink darken-2',
        //   'red lighten-1',
        //   'deep-purple accent-4',
        // ],
        // slides: [
        //   'First',
        //   'Second',
        //   'Third',
        //   'Fourth',
        //   'Fifth',
        // ],
      }
    },
  computed: {
    ...mapState(['cursos']),
    getColumnSize() {
      if (this.$vuetify.breakpoint.width < 800) {
        return 12; // Mostrar 1 curso por fila en pantallas menores a 1000px
      } else if (this.$vuetify.breakpoint.width < 1500) {
        return 6; // Mostrar 2 cursos por fila entre 1000px y 1500px
      } else {
        return 4; // Mostrar 3 cursos por fila en pantallas mayores a 1500px
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

