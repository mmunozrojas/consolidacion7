import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: []
  },
  getters: {
    totalAlumnosPermitidos: (state) => {
      // Calcular la cantidad total de alumnos permitidos sumando los cupos de todos los cursos
      return state.cursos.reduce((total, curso) => total + curso.cupos, 0);
    },
    totalAlumnosInscritos: (state) => {
      // Calcular la cantidad total de alumnos inscritos sumando los inscritos de todos los cursos
      return state.cursos.reduce((total, curso) => total + curso.inscritos, 0);
    },
    cuposRestantes: (state, getters) => {
      // Calcular los cupos restantes restando los alumnos inscritos de los alumnos permitidos
      return getters.totalAlumnosPermitidos - getters.totalAlumnosInscritos;
    },
    totalCursosTerminados: (state) => {
      // Obtener la cantidad total de cursos terminados contando los cursos que tienen completado en true
      return state.cursos.filter((curso) => curso.completado).length;
    },
    totalCursosActivos: (state) => {
      // Obtener la cantidad total de cursos activos contando los cursos que tienen completado en false
      return state.cursos.filter((curso) => !curso.completado).length;
    },
    totalCursos: (state) => {
      // Obtener la cantidad total de cursos contando todos los cursos
      return state.cursos.length;
    }
  },
  mutations: {
    agregarCurso(state, curso) {
      state.cursos.push(curso);
    },
    eliminarCurso(state, curso) {
      const index = state.cursos.findIndex(c => c.id === curso.id);
      if (index !== -1) {
        state.cursos.splice(index, 1);
      }
    },
    editarCurso(state, cursoEditado) {
      const index = state.cursos.findIndex(c => c.id === cursoEditado.id);
      if (index !== -1) {
        // Realizar una copia superficial del curso que se va a editar
        let updatedCurso = { ...cursoEditado };
        // Convertir 'inscritos' y 'cupos' en números
        updatedCurso.inscritos = Number(updatedCurso.inscritos);
        updatedCurso.cupos = Number(updatedCurso.cupos);
        // Usar Vue.set() para asegurarse de que Vuex pueda reaccionar a los cambios
        Vue.set(state.cursos, index, updatedCurso);
      }
    },
    cargarCursos(state, cursos) {
      state.cursos = cursos;
    }, 
  },
  actions: {
    agregarCurso({ commit }, curso) {
      // Aquí puedes realizar cualquier lógica adicional antes de agregar el curso
      commit('agregarCurso', curso);
    },
    eliminarCurso({ commit }, curso) {
      // Aquí puedes realizar cualquier lógica adicional antes de eliminar el curso
      commit('eliminarCurso', curso);
    },
    editarCurso({ commit }, cursoEditado) {
      // Aquí puedes realizar cualquier lógica adicional antes de editar el curso
      commit('editarCurso', cursoEditado);
    },
    async cargarCursos({ commit }) {
      try {
        const response = await fetch('/cursos.json'); 
        const data = await response.json();
        commit('cargarCursos', data);
      } catch (error) {
        console.log('Error al cargar los cursos:', error);
      }
    },
  },
  modules: {}
});
