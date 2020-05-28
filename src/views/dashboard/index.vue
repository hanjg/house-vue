<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hello: {{ name }}</div>
    <div id="main" style="width: 1200px;height:600px;"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDistrictSecondHandHouseSummary } from '@/api/table'
import { formatDate } from '@/utils/date'
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
      option: {
        title: {
          text: '上海平均房价',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 元/平米'
          }
        },
        series: [
          {
            name: '行政区1',
            type: 'line',
            data: [11, 44 , 12],
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    fetchData() {
      getDistrictSecondHandHouseSummary().then(response => {
        let result = response.result;
        let dataX = [];
        for(let i = 0;i<result.timeList.length;i++){
          dataX.push(formatDate(result.timeList[i]));
        }
        this.option.xAxis.data = dataX;
        let group = result.districts;
        this.option.legend.data = group;
        let avgUnitPriceY = [];
        for (let key in result.sumMap) {
          let line = {};
          line.name = key;
          line.type = 'line';
          line.markLine = {
            data: [
              {type: 'average', name: '平均值'},
            ]
          };
          line.data = [];
          for (let i = 0; i < result.sumMap[key].length; i++) {
            let node = result.sumMap[key][i];
            line.data.push(node.avgUnitPrice)
          }
          avgUnitPriceY.push(line);
        }
        this.option.series = avgUnitPriceY;
        this.drawChart();
      });
    },
    drawChart() {
      let mychart = echarts.init(document.getElementById("main")).setOption(this.option);
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
