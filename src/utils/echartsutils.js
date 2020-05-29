/**
 * @param dataX 轴
 * @param legend 图例
 * @param dataY  legend:[]
 * @returns echarts option
 */
export function assembleAvgUnitPriceOption(dataX, legend, dataY) {
  let option = JSON.parse(JSON.stringify(optionTemplate))
  option.title.text = '均价'
  option.yAxis.axisLabel.formatter = '{value} 元/平米'
  option.xAxis.data = dataX;
  option.legend.data = legend;
  option.series = assembleDataY(dataY);
  return option;
}

export function assembleAvgTotalPriceOption(dataX, legend, dataY) {
  let option = JSON.parse(JSON.stringify(optionTemplate))
  option.title.text = '总价'
  option.yAxis.axisLabel.formatter = '{value} 元'
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
    }
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
