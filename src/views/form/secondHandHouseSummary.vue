<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="行政区">
        <el-select v-model="form.district" placeholder="选择行政区">
          <el-option
            v-for="item in allDisctricts"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间段">
        <el-col :span="11">
          <el-date-picker v-model="form.from" type="date" placeholder="开始时间" style="width: 100%;"/>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.to" type="date" placeholder="结束时间" style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
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
import { getAllDistricts } from '@/api/table'
import { querySpecificDisctrict } from '@/api/form'
import { assembleOptions } from '@/utils/echartsutils'

var echarts = require('echarts');

export default {
  data() {
    return {
      form: {
        district: '',
        from: '',
        to: '',
      },
      allDisctricts: ['123','12'],
      avgUnitPriceOption: {},
      avgTotalPriceOption: {},
      avgTotalHouseOption: {},
      mychart1:{},
      mychart2:{},
      mychart3:{},
    }
  },
  methods: {
    onSubmit() {
      let form = JSON.parse(JSON.stringify(this.form));
      form.to = new Date(form.to).getTime();
      form.from = new Date(form.from).getTime();
      querySpecificDisctrict(form).then(response => {
        let result = response.result;
        this.assembleChart(result);
        this.drawChart();
      });
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    initForm() {
      this.form.from = new Date();
      this.form.from.setTime(this.form.from.getTime() - 1000 * 60 * 60 * 24 * 10);
      this.form.to = new Date();
      this.form.to.setTime(this.form.to.getTime() - 1000 * 60 * 60 * 24 * 3);
      getAllDistricts().then(response => {
        this.allDisctricts = response.result;
      });
    },
    assembleChart(result) {
      let options = assembleOptions(result);
      this.avgTotalHouseOption = options.avgTotalHouseOption;
      this.avgTotalPriceOption = options.avgTotalPriceOption;
      this.avgUnitPriceOption = options.avgUnitPriceOption;
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
    this.initForm();
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

