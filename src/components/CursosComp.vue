<template>
  <v-container class="container" fluid>
    <v-hover v-slot="{ hover }">
      <v-card class="course-card ma-1 hover elevation-2">
        <div class="image-container">
          <v-img :src="curso.urlImagen" height="200px" contain>
            <v-expand-transition>
              <div v-if="hover" class="d-flex transition-fast-in-fast-out v-card--reveal align-center justify-center"
                style="background-color: rgba(255, 87, 34, 0.8); height: 100%;">
                <v-btn color="deep-purple" dark>
                  Inscribirme ahora
                </v-btn>
              </div>
            </v-expand-transition>
          </v-img>
        </div>
        <v-card-title>
          <v-spacer />
          <div class="text-center">
            <h4 class="headline title">{{ curso.nombre }}</h4>
          </div>
          <v-spacer />
        </v-card-title>
        <v-card-text class="text-center">
          <div class="subtitle-2 my-1 course-data text-center">
            <v-icon class="icon-cost" color="blue">mdi-currency-usd</v-icon>
            <strong class="highlight-text">Costo:</strong> {{ formattedCosto }}
          </div>
          <div class="subtitle-2 my-1 course-data text-center">
            <v-icon class="icon-duration" color="green">mdi-clock-outline</v-icon>
            <strong class="highlight-text">Duración:</strong> {{ curso.duracion }}
          </div>
          <div class="subtitle-2 my-1 course-data text-center">
            <v-icon class="icon-capacity" color="orange">mdi-account-group-outline</v-icon>
            <strong class="highlight-text">Cupos:</strong> {{ curso.cupos }}
          </div>
          <div class="subtitle-2 my-1 course-data text-center">
            <v-icon class="icon-enrollment" color="purple">mdi-account-check-outline</v-icon>
            <strong class="highlight-text">Inscritos:</strong> {{ curso.inscritos }}
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-container>
</template>


<script>
export default {
  name: 'CursosComp',
  props: {
    curso: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedCosto() {
      const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });
      return formatter.format(this.curso.costo);
    },
  },
};
</script>

<style scoped>
.headline.title {
  text-align: center;
  border-bottom: 2px solid rgba(169, 80, 177, 0.1);
  font-size: large !important;
}

.container {
  max-width: 100%;
  margin: auto;
}

.course-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 430px;
  width: 90%;
  transition: box-shadow 0.7s ease;
}

.hover:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2) !important;
}

.image-container {
  height: 200px;
}

.course-data {
  font-weight: bold;
  border-bottom: 2px solid rgba(83, 98, 110, 0.336);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.5);
  font-size: large;
  white-space: normal;
}

.icon-cost {
  margin-right: 4px;
}

.icon-duration {
  margin-right: 4px;
}

.icon-capacity {
  margin-right: 4px;
}

.icon-enrollment {
  margin-right: 4px;
}

.highlight-text {
  font-weight: bolder;
  text-shadow: 1px 1px 2px rgba(78, 77, 75, 0.5);
}
</style>
