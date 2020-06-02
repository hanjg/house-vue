<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24">
        <div class="dashboard-text">Hello: {{ name }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="21">
        <div id="chart1" style="width: 100%;height:500px;"></div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="21">
        <div id="chart2" style="width: 100%;height:500px;"></div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="21">
        <div id="chart3" style="width: 100%;height:500px;"></div>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDistrictSecondHandHouseSummary } from '@/api/table'
import { assembleOptions } from '@/utils/echartsutils'

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
      avgTotalHouseOption: {},
      mychart1:{},
      mychart2:{},
      mychart3:{},
    }
  },
  methods: {
    fetchData() {
      getDistrictSecondHandHouseSummary().then(response => {
        let result = response.result;
        let options = assembleOptions(result);
        this.avgTotalHouseOption = options.avgTotalHouseOption;
        this.avgTotalPriceOption = options.avgTotalPriceOption;
        this.avgUnitPriceOption = options.avgUnitPriceOption;
        this.drawChart();
      });
    },
    drawChart() {
      this.mychart1 = echarts.init(document.getElementById("chart1")).setOption(this.avgUnitPriceOption);
      this.mychart2 = echarts.init(document.getElementById("chart2")).setOption(this.avgTotalPriceOption);
      this.mychart3 = echarts.init(document.getElementById("chart3")).setOption(this.avgTotalHouseOption);
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.mychart1.resize();
          this.mychart2.resize();
          this.mychart3.resize();
        }, 2000)
      });
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
