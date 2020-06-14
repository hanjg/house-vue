import { formatDate } from '@/utils/date'

export function assembleOptions(result) {
  let options = {};
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
  options.avgUnitPriceOption = assembleAvgUnitPriceOption(dataX, legend, avgUnitPriceY);

  let avgTotalPriceY = {};
  for (let key in result.sumMap) {
    avgTotalPriceY[key] = [];
    for (let i = 0; i < result.sumMap[key].length; i++) {
      let node = result.sumMap[key][i];
      avgTotalPriceY[key].push(node.avgTotalPrice/10000);
    }
  }
  options.avgTotalPriceOption = assembleAvgTotalPriceOption(dataX, legend, avgTotalPriceY);

  let totalHouseY = {};
  for (let key in result.sumMap) {
    totalHouseY[key] = [];
    for (let i = 0; i < result.sumMap[key].length; i++) {
      let node = result.sumMap[key][i];
      totalHouseY[key].push(node.totalHouseCount);
    }
  }
  options.avgTotalHouseOption = assembleTotalHouseOption(dataX, legend, totalHouseY);
  return options;
}

/**
 * @param dataX 轴
 * @param legend 图例
 * @param dataY  legend:[]
 * @returns echarts option
 */
export function assembleAvgUnitPriceOption(dataX, legend, dataY) {
  let option = JSON.parse(JSON.stringify(optionTemplate))
  option.title.text = '均价'
  option.yAxis.axisLabel.formatter = '{value}'
  option.xAxis.data = dataX;
  option.legend.data = legend;
  option.series = assembleDataY(dataY);
  return option;
}

export function assembleAvgTotalPriceOption(dataX, legend, dataY) {
  let option = JSON.parse(JSON.stringify(optionTemplate))
  option.title.text = '总价'
  option.yAxis.axisLabel.formatter = '{value}万'
  option.xAxis.data = dataX;
  option.legend.data = legend;
  option.series = assembleDataY(dataY);
  return option;
}

export function assembleTotalHouseOption(dataX, legend, dataY) {
  let option = JSON.parse(JSON.stringify(optionTemplate))
  option.title.text = '总数'
  option.yAxis.axisLabel.formatter = '{value}'
  option.xAxis.data = dataX;
  option.legend.data = legend;
  option.series = assembleDataY(dataY);
  return option;
}

export function assembleDataY(dataY) {
  let lineList = [];
  for (let key in dataY) {
    let line = {};
    line.name = key;
    line.type = 'line';
    line.markLine = {
      data: [
        {type: 'average', name: '平均值'},
      ]
    };
    line.data = [];
    for (let i = 0; i < dataY[key].length; i++) {
      let node = dataY[key][i];
      line.data.push(node)
    }
    lineList.push(line);
  }
  return lineList;
}

var optionTemplate = {
  title: {
    text: '',
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
      formatter: '{value}'
    },
    scale:true,
  },
  series: [
    {
      name: '行政区1',
      type: 'line',
      data: [11, 44, 12],
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    }
  ]
};
