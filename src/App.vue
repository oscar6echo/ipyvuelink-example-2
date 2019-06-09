<template>
  <v-app id="my-app">
    <v-container ma-1 fluid class="debug-border">
      <v-layout column>
        <v-layout :style="style.header">
          <v-radio-group
            row
            class="justify-center my-dense-header"
            v-model="selection"
          >
            <v-radio label="Plot" color="blue" value="plot"></v-radio>
            <v-radio label="Table" color="green" value="table"></v-radio>
            <v-radio label="Both" color="red" value="both"></v-radio>
          </v-radio-group>
        </v-layout>
        <hr />
        <v-layout flex row>
          <Plot v-show="showPlot" />
          <Table v-show="showTable" />
        </v-layout>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Plot from './components/Plot';
import Table from './components/Table';
import util from './components/util';

import data from './data/sample.json';

export default {
  name: 'App',
  components: {
    Plot,
    Table
  },
  data() {
    return {
      // inputs
      width: { plot: 600, total: 1100 },
      height: { plot: 450 },

      //local
      selection: 'both'

      // technical
      //   dataModel: null,
      //   dataAvailable: false
    };
  },
  computed: {
    style() {
      return {
        width: `${this.width.total}px`
      };
    },
    showPlot() {
      return ['plot', 'both'].includes(this.selection);
    },
    showTable() {
      return ['table', 'both'].includes(this.selection);
    },
    exposed() {
      return this.$store.getters['exposed'];
    }
  },
  watch: {
    selection: {
      handler: function() {
        const plotDims =
          this.selection == 'plot'
            ? { width: this.width.total - 1, height: this.height.plot - 1 }
            : { width: this.width.plot - 1, height: this.height.plot - 1 };

        const tableDims =
          this.selection == 'table'
            ? { width: this.width.total, height: this.height.plot, wide: true }
            : {
                width: this.width.total - this.width.plot,
                height: this.height.plot - 30,
                wide: false
              };

        this.$store.dispatch('setPlotDims', plotDims);
        this.$store.dispatch('setTableDims', tableDims);
      },
      immediate: true
    },
    exposed: function() {
      console.log('SYNC TO PYTHON - exposed updated');
      console.log(this.exposed);
      //   this.dataModel.set('exposed', this.exposed);
      //   this.dataModel.save_changes();
      //   this.dataModel.touch();
    }
  },
  created() {
    const rowData = data.map((e, i) => {
      e.date = util.convertDateStringToUnixTime(e.date);
      e.no = i;
      return e;
    });
    this.$store.dispatch('setRowData', rowData);
  },
  mounted() {
    // document.querySelector("#app").removeAttribute("style");
    // requestWidget("data1").then(widgetView => {
    //   const model = widgetView.model;
    //   this.dataModel = model;
    //   this.price = model.get("price");
    //   model.on("change:price", () => (this.price = model.get("price")));
    //   this.dataAvailable = true;
    // });
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
.my-dense-header {
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 0px;
}
.v-input >>> .v-messages {
  background-color: red;
  display: none;
}
.v-input >>> .v-input__slot {
  margin-bottom: 0px;
}
</style>

<style>
/* override vuetify defaults in the context of standalone ipywidgets */
/* global css */
.application--wrap {
  flex: 0;
  min-height: 0;
}
</style>
