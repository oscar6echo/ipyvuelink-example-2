<template>
  <v-container fluid class="debug-border">
    <v-layout column align-start>
      <input
        class="ma-1"
        type="text"
        id="filter-text-box"
        placeholder="Filter..."
        v-model="quickFilterText"
      />

      <ag-grid-vue
        :style="style"
        class="ag-theme-balham"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowDataTable"
        :quickFilterText="quickFilterText"
      ></ag-grid-vue>
    </v-layout>
  </v-container>
</template>

<script>
import 'ag-grid-community';
import { AgGridVue } from 'ag-grid-vue';
import util from './util';
import biz from './biz';
import { cloneDeep } from 'lodash';

export default {
  name: 'Table',
  components: {
    AgGridVue
  },

  data() {
    return {
      quickFilterText: '',
      rowDataTable: [],
      gridOptions: {
        defaultColDef: {
          editable: true,
          resizable: true,
          sortable: true,
          filter: true
        },
        animateRows: false,
        suppressColumnVirtualisation: true,
        enableRangeSelection: true
        // processDataFromClipboard: this.processDataFromClipboard
      }
    };
  },
  computed: {
    rowData() {
      return this.$store.getters['rowData'];
    },
    extent() {
      return this.$store.getters['extent'];
    },
    dims() {
      return this.$store.getters['tableDims'];
    },
    style() {
      return `width: ${this.dims.width}px; height: ${this.dims.height}px;`;
    }
  },
  watch: {
    rowData: {
      handler: function() {
        this.updateTable();
      },
      deep: true,
      immediate: true
    },
    dims: {
      handler: function() {
        this.updateTable();
      },
      deep: false,
      immediate: false
    },
    extent: {
      handler: function() {
        this.updateTable();
      },
      deep: true,
      immediate: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    updateTable() {
      if (!(this.rowData && this.extent)) return;

      const extent = this.extent;
      const rowDataSelected = this.rowData.filter(
        e => e.date >= extent[0] && e.date <= extent[1]
      );

      const fields = Object.keys(this.rowData[0]).filter(
        e => !['no', 'date'].includes(e)
      );

      // example of added data to the selection
      const analysisData = biz.buildAnalysisData(rowDataSelected, fields);
      console.log(analysisData);

      const rowDataTable = rowDataSelected.map((e, i) => {
        const f = cloneDeep(e);
        fields.forEach(g => {
          for (const name of ['volatility', 'sharpe']) {
            const n = g + ' ' + name;
            f[n] = analysisData[i][n];
          }
        });
        return f;
      });

      const fieldsAnalysisData = Object.keys(analysisData[1]).filter(
        e => e.endsWith('volatility') || e.endsWith('sharpe')
      );
      console.log(fieldsAnalysisData);

      this.columnDefs = [
        {
          headerName: '#',
          field: 'no',
          width: 50,
          editable: false,
          suppressPaste: true,
          suppressSizeToFit: true
        },
        {
          headerName: 'Date',
          field: 'date',
          editable: false,
          suppressPaste: true,
          valueFormatter: this.formatDate
        },
        ...fields.map(e => ({
          field: e,
          headerName: e,
          onCellValueChanged: this.onCellValueChanged,
          valueParser: this.numberParser
        })),
        ...fieldsAnalysisData.map(e => ({
          field: e,
          headerName: e,
          editable: false,
          valueFormatter: this.formatFloat3
        }))
      ];

      this.rowDataTable = rowDataTable;

      const firstRow = rowDataTable[0];
      const lastRow = rowDataTable[rowDataTable.length - 1];
      const exposed = {
        extent: {
          first: {
            no: firstRow.no,
            date: firstRow.date
          },
          last: {
            no: lastRow.no,
            date: lastRow.date
          },
          measure: lastRow
        }
      };
      this.$store.dispatch('setExposed', exposed);

      if (this.dims.wide) {
        this.autosizeColumns();
      } else {
        this.autosizeColumns();
        // this.sizeColumnsToFit();
      }
    },
    // processDataFromClipboard(params) {
    //   let data = params.data;
    //   return data;
    // },
    sizeColumnsToFit() {
      const that = this;
      setTimeout(() => that.gridOptions.api.sizeColumnsToFit(), 10);
    },
    autosizeColumns() {
      const that = this;
      setTimeout(() => {
        const allColumnIds = [];
        this.gridOptions.columnApi.getAllColumns().forEach(function(col) {
          allColumnIds.push(col.colId);
        });
        that.gridOptions.columnApi.autoSizeColumns(allColumnIds);
      }, 10);
    },
    formatDate(params) {
      const val = params.value;
      if (val) return util.formatDate(val);
      return val;
    },
    formatFloat3(params) {
      const val = params.value;
      return util.formatFloat3(val);
    },
    onCellValueChanged(params) {
      const rowDataNew = cloneDeep(this.rowData);
      for (const e of rowDataNew) {
        if (e.no == params.data.no) {
          rowDataNew[e.no] = cloneDeep(params.data);
          break;
        }
      }
      this.$store.dispatch('setRowData', rowDataNew);
    },
    numberParser(params) {
      return parseFloat(params.newValue);
    }
  }
};
</script>

<style scoped>
/* remove before build */
.debug-border {
  border: 1px solid red;
}

/* override vuetify defaults in the context of standalone ipywidgets */
/* scoped css */
.container {
  padding: 0px;
}
.my-dense {
  margin: 0px;
  padding: 0px;
}
</style>

<style lang="scss" scoped>
@import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import '../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
</style>
