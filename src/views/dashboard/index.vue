<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello: {{ name }}</div>
    <div id="chart1" position="relative" style="width: 1000px;height:500px;"></div>
    <div id="chart2" position="relative" style="width: 1000px;height:500px;"></div>
    <div id="chart3" position="relative" style="width: 1000px;height:500px;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDistrictSecondHandHouseSummary } from '@/api/table'
import { formatDate } from '@/utils/date'
import { assembleAvgUnitPriceOption } from '@/utils/echartsutils'
import { assembleAvgTotalPriceOption } from '@/utils/echartsutils'
import { assembleTotalHouseOption } from '@/utils/echartsutils'

var echarts = require('echarts');

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      avgUnitPriceOption: {},
      avgTotalPriceOption: {},
      avgTotalHouseOption: {}
    }
  },
  methods: {
    fetchData() {
      getDistrictSecondHandHouseSummary().then(response => {
        let result = response.result;
        let dataX = [];
        for (let i = 0; i < result.timeList.length; i++) {
          dataX.push(formatDate(result.timeList[i]));
        }
        let legend = result.districts;

        let avgUnitPriceY = {};
        for (let key in result.sumMap) {
          avgUnitPriceY[key] = [];
          for (let i = 0; i < result.sumMap[key].length; i++) {
            let node = result.sumMap[key][i];
            avgUnitPriceY[key].push(node.avgUnitPrice);
          }
        }
        this.avgUnitPriceOption = assembleAvgUnitPriceOption(dataX, legend, avgUnitPriceY);

        let avgTotalPriceY = {};
        for (let key in result.sumMap) {
          avgTotalPriceY[key] = [];
          for (let i = 0; i < result.sumMap[key].length; i++) {
            let node = result.sumMap[key][i];
            avgTotalPriceY[key].push(node.avgTotalPrice);
          }
        }
        this.avgTotalPriceOption = assembleAvgTotalPriceOption(dataX, legend, avgTotalPriceY);

        let totalHouseY = {};
        for (let key in result.sumMap) {
          totalHouseY[key] = [];
          for (let i = 0; i < result.sumMap[key].length; i++) {
            let node = result.sumMap[key][i];
            totalHouseY[key].push(node.totalHouseCount);
          }
        }
        this.avgTotalHouseOption = assembleTotalHouseOption(dataX, legend, totalHouseY);


        this.drawChart();
      });
    },
    drawChart() {
      let mychart1 = echarts.init(document.getElementById("chart1")).setOption(this.avgUnitPriceOption);
      let mychart2 = echarts.init(document.getElementById("chart2")).setOption(this.avgTotalPriceOption);
      let mychart3 = echarts.init(document.getElementById("chart3")).setOption(this.avgTotalHouseOption);
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
