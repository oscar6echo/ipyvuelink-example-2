<template>
  <div id="my-chart"></div>
</template>

<script>
import Highcharts from 'highcharts';
import stockInit from 'highcharts/modules/stock';
stockInit(Highcharts);

import { cloneDeep } from 'lodash';

export default {
  name: 'Highcharts',
  components: {},
  props: {
    graphOptionsInput: { type: Object, required: true }
  },
  data() {
    return {
      chart: null,
      style: '',
      graphOptions: {}
    };
  },
  computed: {},
  watch: {
    graphOptionsInput: {
      handler: function() {
        this.updateChart();
      },
      immediate: false,
      deep: true
    }
  },

  mounted() {
    this.updateChart();
  },
  beforeDestroy() {
    if (this.chart) this.chart.destroy();
  },
  methods: {
    updateChart() {
      this.graphOptions = cloneDeep(this.graphOptionsInput);
      if (this.chart) this.chart.destroy();
      this.chart = Highcharts.stockChart('my-chart', this.graphOptions);
    }
  }
};
</script>

<style lang="scss" scoped></style>
