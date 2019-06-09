<template>
  <v-container fluid class="debug-border">
    <Highcharts :graphOptionsInput="graphOptionsInput" />
  </v-container>
</template>

<script>
import Highcharts from './Highcharts';
import { cloneDeep } from 'lodash';

export default {
  name: 'Plot',
  components: { Highcharts },
  props: {},
  data() {
    return {
      extent: [],
      graphOptionsInput: {},
      graphOptionsBase: {
        plotOptions: {
          series: {
            animation: false,
            compare: 'percent',
            showInNavigator: true
          }
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: false
        }
      }
    };
  },

  computed: {
    rowData() {
      return this.$store.getters['rowData'];
    },
    dims() {
      return this.$store.getters['plotDims'];
    }
  },
  watch: {
    rowData: {
      handler: function() {
        this.updateChart();
        this.updateExtentInit();
      },
      deep: true,
      immediate: true
    },
    dims: {
      handler: function() {
        this.updateChart();
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    buildSeries: function() {
      const dates = this.rowData.map(e => e.date);
      const hcSeries = Object.keys(this.rowData[0])
        .filter(e => !['date', 'no'].includes(e))
        .map(e => {
          const f = {
            name: e,
            data: this.rowData.map((g, i) => ({ x: dates[i], y: g[e] }))
          };
          return f;
        });
      return hcSeries;
    },

    updateChart: function() {
      if (!(this.rowData && this.dims)) return;

      const optBase = cloneDeep(this.graphOptionsBase);
      const that = this;
      this.graphOptionsInput = Object.assign(optBase, {
        chart: {
          width: this.dims.width,
          height: this.dims.height
        },
        series: this.buildSeries(this.rowData),
        xAxis: {
          events: {
            setExtremes: function(evt) {
              that.updateExtent(evt);
            }
          }
        }
      });
    },

    updateExtent(evt) {
      this.extent = [evt.min, evt.max];
      this.$store.dispatch('setExtent', this.extent);
    },

    updateExtentInit() {
      const N = this.rowData.length;

      if (N == 0) return;
      const evt = {
        min: this.rowData[0].date,
        max: this.rowData[N - 1].date
      };
      this.updateExtent(evt);
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
