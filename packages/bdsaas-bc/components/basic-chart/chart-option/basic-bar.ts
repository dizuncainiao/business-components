export default {
  xAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#9CA6B9'
      }
    }
  },
  yAxis: {
    type: 'category',
    nameTextStyle: {
      color: '#9CA6B9'
    },
    axisTick: {
      alignWithLabel: true,
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#9CA6B9',
        type: 'dashed'
      }
    },
    data: []
  },
  series: [
    {
      barMaxWidth: '80',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#0056FF',
        opacity: 0.8,
        borderWidth: 2
      },
      barMinHeight: 5,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
        formatter: '{c}次'
      }
    }
  ],
  grid: {
    top: '5%',
    left: '3%',
    right: '11%',
    bottom: '3%',
    containLabel: true
  }
}
