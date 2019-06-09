import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    rowData: [],
    extent: [],
    plotDims: {},
    tableDims: {},
    exposed: {}
  },
  getters: {
    rowData: state => state.rowData,
    extent: state => state.extent,
    plotDims: state => state.plotDims,
    tableDims: state => state.tableDims,
    exposed: state => state.exposed
  },
  mutations: {
    setRowData: (state, data) => {
      Vue.set(state, 'rowData', data);
    },
    setExtent: (state, data) => {
      Vue.set(state, 'extent', data);
    },
    setPlotDims: (state, data) => {
      Vue.set(state, 'plotDims', data);
    },
    setTableDims: (state, data) => {
      Vue.set(state, 'tableDims', data);
    },
    setExposed: (state, data) => {
      Vue.set(state, 'exposed', data);
    }
  },
  actions: {
    setRowData: async (context, data) => {
      context.commit('setRowData', data);
    },
    setExtent: async (context, data) => {
      context.commit('setExtent', data);
    },
    setPlotDims: async (context, data) => {
      context.commit('setPlotDims', data);
    },
    setTableDims: async (context, data) => {
      context.commit('setTableDims', data);
    },
    setExposed: async (context, data) => {
      context.commit('setExposed', data);
    }
  }
});

export default store;
