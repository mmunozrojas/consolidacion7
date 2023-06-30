<template>
  <div class="admin-view">
    <h1 class="admin-view__title">Interfaz de Administración</h1>
    <div class="btn-container">
      <v-btn class="admin-view__button btn-agregar" @click="openAgregarCursoDialog">Agregar Curso</v-btn>
    </div>
    <v-card>
      <v-data-table :headers="tableHeaders" :items="cursos" class="admin-view__table">
        <template slot="item.costo" slot-scope="{ item }">
          <td>
            <v-chip :color="getColor(item.costo)">
              {{ item.costo | formatCurrency }}
            </v-chip>
          </td>
        </template>
        <template slot="item.fecha_registro" slot-scope="{ item }">
          <td>
            <v-chip :color="getColor(item.fecha_registro)">
              {{ item.fecha_registro }}
            </v-chip>
          </td>
        </template>
        <template slot="item.completado" slot-scope="{ item }">
      <td>
        <v-switch v-model="item.completado"></v-switch>
      </td>
    </template>
        <template slot="item.acciones" slot-scope="{ item }">
          <td class="d-flex align-center">
            <v-icon @click="confirmarEliminacion(item)">mdi-delete</v-icon>
            <v-icon @click="openEditarCursoDialog(item)">mdi-pencil</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <div class="admin-view__info">
      <div v-for="(item, index) in infoItems" :key="index"
        :class="['admin-view__info-item', `admin-view__info-item--${index}`]">
        <v-alert border="left" colored-border color="deep-purple accent-4" elevation="2">
          <p :class="['admin-view__info-label', `admin-view__info-label--${index}`]">{{ item.label }}</p>
          <p :class="['admin-view__info-value', `admin-view__info-value--${index}`]">{{ item.value }}</p>
        </v-alert>
      </div>
    </div>

    <!-- Agregar diálogo para agregar curso -->
    <v-dialog v-model="agregarCursoDialog" max-width="600px">
      <v-card>
        <v-card-title>Agregar Curso</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="agregarCurso">
            <v-text-field v-model="nuevoCurso.nombre" label="Nombre del curso" required></v-text-field>
            <v-text-field v-model="nuevoCurso.urlImagen" label="URL de la imagen del curso"
              :rules="[urlValidationRule]"></v-text-field>
            <v-text-field v-model="nuevoCurso.cupos" type="number" label="Cupos disponibles" required></v-text-field>
            <v-text-field v-model="nuevoCurso.inscritos" type="number" label="Inscritos" required></v-text-field>
            <v-text-field v-model="nuevoCurso.duracion" label="Duración" required></v-text-field>
            <v-text-field v-model="nuevoCurso.costo" type="number" label="Costo"></v-text-field>
            <v-text-field v-model="nuevoCurso.descripcion" label="Descripción" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="agregarCursoDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="agregarCurso">Agregar Curso</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Editar diálogo para editar curso -->
    <v-dialog v-model="editarCursoDialog" max-width="600px">
      <v-card>
        <v-card-title>Editar Curso</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="editarCurso">
            <v-text-field v-model="cursoEditado.nombre" label="Nombre del curso" required></v-text-field>
            <v-text-field v-model="cursoEditado.urlImagen" label="URL de la imagen del curso"
              required></v-text-field>
            <img :src="cursoEditado.urlImagen" alt="Imagen del curso"
              style="width: 200px; height: auto; margin-bottom: 10px;">
            <v-text-field v-model="cursoEditado.cupos" type="number" label="Cupos disponibles" required></v-text-field>
            <v-text-field v-model="cursoEditado.inscritos" type="number" label="Inscritos" required></v-text-field>
            <v-text-field v-model="cursoEditado.duracion" label="Duración" required></v-text-field>
            <v-text-field v-model="cursoEditado.costo" type="number" label="Costo" required></v-text-field>
            <v-text-field v-model="cursoEditado.descripcion" label="Descripción" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editarCursoDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarCursoEditado">Guardar Cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación de eliminación -->
    <v-dialog v-model="eliminarDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Eliminar Curso</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este curso?</v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" class="white--text" @click="eliminarDialog = false">Cancelar</v-btn>
          <v-btn color="green darken-1" class="white--text" @click="eliminarCurso(cursoAEliminar)">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para mostrar validaciones -->
    <v-dialog v-model="validacionesDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Validaciones</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="validacion in uniqueValidaciones" :key="validacion">{{ validacion }}</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="validacionesDialog = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminView',
  filters: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value);
    },
  },
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
        { text: 'Costo Curso', value: 'costo' },
        { text: 'Terminado', value: 'completado' },
        { text: 'Fecha Ingreso', value: 'fecha_registro' },
        { text: 'Acciones', value: 'acciones', sortable: false },
      ];
    },
    urlValidationRule() {
      return [
        (value) => !!value || 'El campo URL es requerido',
        (value) => {
          const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
          return pattern.test(value) || 'URL inválida';
        },
      ];
    },
    uniqueValidaciones() {
      return [...new Set(this.validaciones)];
    },
  },
  data() {
    return {
      agregarCursoDialog: false,
      editarCursoDialog: false,
      eliminarDialog: false,
      validacionesDialog: false,
      validaciones: [],
      nuevoCurso: {
        nombre: '',
        urlImagen: '',
        cupos: 0,
        inscritos: 0,
        duracion: '',
        costo: '',
        descripcion: '',
      },
      cursoEditado: {},
      cursoAEliminar: null,
    };
  },
  methods: {
    ...mapActions(['agregarCurso', 'eliminarCurso', 'editarCurso']),
    openAgregarCursoDialog() {
      this.agregarCursoDialog = true;
    },
    openEditarCursoDialog(curso) {
      this.editarCursoDialog = true;
      this.cursoEditado = { ...curso };
      this.cursoEditado.urlImagen = curso.urlImagen;
    },
    agregarCurso() {
      if (
        this.nuevoCurso.nombre &&
        this.nuevoCurso.urlImagen &&
        this.nuevoCurso.cupos &&
        this.nuevoCurso.inscritos &&
        this.nuevoCurso.duracion &&
        this.nuevoCurso.costo &&
        /^\d+(\.\d+)?$/.test(this.nuevoCurso.costo) &&
        this.nuevoCurso.descripcion
      ) {
        if (parseInt(this.nuevoCurso.inscritos) <= parseInt(this.nuevoCurso.cupos)) {
          this.nuevoCurso.completado = false;
          this.nuevoCurso.fecha_registro = new Date().toLocaleDateString();
          this.nuevoCurso.cupos = parseInt(this.nuevoCurso.cupos);
          this.nuevoCurso.inscritos = parseInt(this.nuevoCurso.inscritos);
          this.nuevoCurso.costo = Number(this.nuevoCurso.costo);
          this.$store.dispatch('agregarCurso', { ...this.nuevoCurso });
          this.nuevoCurso = {
            nombre: '',
            urlImagen: '',
            cupos: 0,
            inscritos: 0,
            duracion: '',
            costo: '',
            descripcion: '',
          };
          this.agregarCursoDialog = false;
          this.clearValidations();
        } else {
          this.showValidation('La cantidad de inscritos no puede ser mayor a la cantidad de cupos disponibles');
        }
      } else {
        this.showValidation('Por favor, complete todos los campos correctamente antes de agregar un curso');
      }
    },
    confirmarEliminacion(curso) {
      this.cursoAEliminar = curso;
      this.eliminarDialog = true;
    },
    eliminarCurso(curso) {
      this.$store.dispatch('eliminarCurso', curso);
      this.eliminarDialog = false;
    },
    editarCurso() {
      const index = this.cursos.findIndex((c) => c.id === this.cursoEditado.id);
      if (index !== -1) {
        this.cursoEditado.cupos = parseInt(this.cursoEditado.cupos);
        this.cursoEditado.inscritos = parseInt(this.cursoEditado.inscritos);
        this.cursoEditado.costo = Number(this.cursoEditado.costo);
        this.cursos[index].urlImagen = this.cursoEditado.urlImagen;
        this.$store.dispatch('editarCurso', this.cursoEditado);
        this.editarCursoDialog = false;
        this.clearValidations();
      }
    },
    guardarCursoEditado() {
      if (
        this.cursoEditado.nombre &&
        this.cursoEditado.urlImagen &&
        this.cursoEditado.cupos &&
        this.cursoEditado.inscritos &&
        this.cursoEditado.duracion &&
        this.cursoEditado.costo &&
        /^\d+(\.\d+)?$/.test(this.cursoEditado.costo) &&
        this.cursoEditado.descripcion
      ) {
        if (parseInt(this.cursoEditado.inscritos) <= parseInt(this.cursoEditado.cupos)) {
          const index = this.cursos.findIndex((c) => c.id === this.cursoEditado.id);
          if (index !== -1) {
            this.cursoEditado.cupos = parseInt(this.cursoEditado.cupos);
            this.cursoEditado.inscritos = parseInt(this.cursoEditado.inscritos);
            this.cursoEditado.costo = Number(this.cursoEditado.costo);
            this.cursos[index].urlImagen = this.cursoEditado.urlImagen;
            this.$store.dispatch('editarCurso', this.cursoEditado);
            this.editarCursoDialog = false;
            this.clearValidations();
          }
        } else {
          this.showValidation('La cantidad de inscritos no puede ser mayor a la cantidad de cupos disponibles (si el valor es correcto ignore este mensaje)');
        }
      } else {
        this.showValidation('Por favor, complete todos los campos correctamente antes de guardar los cambios del curso');
      }
    },
    getColor(value) {
      return value > 0 ? 'green' : 'red';
    },
    getTerminadoText(value) {
      return value === true ? 'Sí' : 'No';
    },
    getTerminadoColor(value) {
      return value === true ? 'blue darken-1' : 'grey darken-2';
    },
    showValidation(message) {
      if (!this.validaciones.includes(message)) {
        this.validaciones.push(message);
      }
      this.validacionesDialog = true;
    },
    clearValidations() {
      this.validaciones = [];
      this.validacionesDialog = false;
    },
  },
};
</script>

<style scoped>
.admin-view {
  max-width: 900px;
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
  /* margin-bottom: 10px; */
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
/* .admin-view__info-item--0 {
  border: 1px solid #e53935;
} */

.admin-view__info-item--0 .admin-view__info-value--0,
.admin-view__info-item--0 .admin-view__info-label--0 {
  color: #e53935;
}

/* .admin-view__info-item--1 {
  border: 1px solid #ceb442;
} */

.admin-view__info-item--1 .admin-view__info-value--1,
.admin-view__info-item--1 .admin-view__info-label--1 {
  color: #ceb442;
}

/* .admin-view__info-item--2 {
  border: 1px solid #43a047;
} */

.admin-view__info-item--2 .admin-view__info-value--2,
.admin-view__info-item--2 .admin-view__info-label--2 {
  color: #43a047;
}

/* .admin-view__info-item--3 {
  border: 1px solid #1e88e5;
} */

.admin-view__info-item--3 .admin-view__info-value--3,
.admin-view__info-item--3 .admin-view__info-label--3 {
  color: #1e88e5;
}

/* .admin-view__info-item--4 {
  border: 1px solid #8e24aa;
} */

.admin-view__info-item--4 .admin-view__info-value--4,
.admin-view__info-item--4 .admin-view__info-label--4 {
  color: #8e24aa;
}

/* .admin-view__info-item--5 {
  border: 1px solid #6d4c41;
} */

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
  color: #fff !important;
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

.admin-view__table .v-icon {
  margin-right: 8px;
  cursor: pointer;
}
</style>
