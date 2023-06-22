<template>
    <div class="admin-view">
      <h1 class="admin-view__title">Interfaz de Administración</h1>
      <div class="btn-container">
        <v-btn class="admin-view__button btn-agregar" @click="agregarCurso">Agregar Curso</v-btn>
      </div>
      <v-card>
        <v-data-table
          :headers="tableHeaders"
          :items="cursos"
          class="admin-view__table"
        >
          <template slot="item.costo" slot-scope="{ item }">
            <td>
              <v-chip color="green">
                {{ item.costo }}
              </v-chip>
            </td>
          </template>
          <template slot="item.fecha_registro" slot-scope="{ item }">
            <td>
              <v-chip color="green">
                {{ item.fecha_registro }}
              </v-chip>
            </td>
          </template>
          <!-- <template v-slot:item.acciones="{ item }">
            <v-btn @click="eliminarCurso(item.id)" color="error">Eliminar</v-btn>
            <v-btn @click="editarCurso(item.id)" color="primary">Editar</v-btn>
          </template> -->
        </v-data-table>
      </v-card>
      <div class="admin-view__info">
        <div v-for="(item, index) in infoItems" :key="index" :class="['admin-view__info-item', `admin-view__info-item--${index}`]">
          <p :class="['admin-view__info-label', `admin-view__info-label--${index}`]">{{ item.label }}</p>
          <p :class="['admin-view__info-value', `admin-view__info-value--${index}`]">{{ item.value }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    name: 'AdminView',
    computed: {
      ...mapState(['cursos']),
      ...mapGetters([
        'totalAlumnosPermitidos',
        'totalAlumnosInscritos',
        'cuposRestantes',
        'totalCursosTerminados',
        'totalCursosActivos',
        'totalCursos',
      ]),
      infoItems() {
        return [
          { label: 'Cantidad total de alumnos permitidos:', value: this.totalAlumnosPermitidos },
          { label: 'Cantidad total de alumnos inscritos:', value: this.totalAlumnosInscritos },
          { label: 'Cantidad total de cupos restantes:', value: this.cuposRestantes },
          { label: 'Cantidad total de cursos terminados:', value: this.totalCursosTerminados },
          { label: 'Cantidad total de cursos activos:', value: this.totalCursosActivos },
          { label: 'Cantidad total de cursos:', value: this.totalCursos },
        ];
      },
      tableHeaders() {
        return [
          { text: 'Curso', value: 'nombre', align: 'start' },
          { text: 'Cupos', value: 'cupos' },
          { text: 'Inscritos', value: 'inscritos' },
          { text: 'Duración', value: 'duracion' },
          { text: 'Costo', value: 'costo' },
          { text: 'Terminado', value: 'completado' },
          { text: 'Fecha', value: 'fecha_registro' },
          { text: 'Acciones', value: 'acciones', sortable: false },
        ];
      },
    },
    methods: {
    //   agregarCurso() {
    //     // Lógica para agregar un nuevo curso
    //   },
    //   eliminarCurso(cursoId) {
    //     // Lógica para eliminar un curso existente
    //   },
    //   editarCurso(cursoId) {
    //     // Lógica para editar un curso existente
    //   },
    },
  };
  </script>
  
  <style scoped>
  .admin-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 60px;
  }
  
  .admin-view__title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .admin-view__info {
    margin-bottom: 20px;
  }
  
  .admin-view__info-item {
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .admin-view__info-label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .admin-view__info-value {
    margin-top: 5px;
  }
  
  .admin-view__button {
    margin-right: 10px;
  }
  
  /* Colores para los bordes de los info-items */
  .admin-view__info-item--0 {
    border: 1px solid #e53935;
  }
  
  .admin-view__info-item--0 .admin-view__info-value--0,
  .admin-view__info-item--0 .admin-view__info-label--0 {
    color: #e53935;
  }
  
  .admin-view__info-item--1 {
    border: 1px solid #ceb442;
  }
  
  .admin-view__info-item--1 .admin-view__info-value--1,
  .admin-view__info-item--1 .admin-view__info-label--1 {
    color: #ceb442;
  }
  
  .admin-view__info-item--2 {
    border: 1px solid #43a047;
  }
  
  .admin-view__info-item--2 .admin-view__info-value--2,
  .admin-view__info-item--2 .admin-view__info-label--2 {
    color: #43a047;
  }
  
  .admin-view__info-item--3 {
    border: 1px solid #1e88e5;
  }
  
  .admin-view__info-item--3 .admin-view__info-value--3,
  .admin-view__info-item--3 .admin-view__info-label--3 {
    color: #1e88e5;
  }
  
  .admin-view__info-item--4 {
    border: 1px solid #8e24aa;
  }
  
  .admin-view__info-item--4 .admin-view__info-value--4,
  .admin-view__info-item--4 .admin-view__info-label--4 {
    color: #8e24aa;
  }
  
  .admin-view__info-item--5 {
    border: 1px solid #6d4c41;
  }
  
  .admin-view__info-item--5 .admin-view__info-value--5,
  .admin-view__info-item--5 .admin-view__info-label--5 {
    color: #6d4c41;
  }
  
  .btn-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .btn-agregar {
    background-color: #1976d2 !important;
    /* Cambia este color al color deseado para el botón "Agregar Curso" */
    color: #fff;
    margin-top: 1px;
  }
  
  .admin-view__table {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .v-data-table__wrapper {
    overflow-x: auto;
  }

  .admin-view__table .v-chip {
  border-radius: 16px;
  padding: 6px 12px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #1976d2;
}
  </style>
  