export default {
  color: [
    '#0056FF',
    '#2ED4A9',
    '#242934',
    '#FF7125',
    '#FFC420',
    '#F12525',
    '#646B7A',
    '#0056FF',
    '#2ED4A9',
    '#242934'
  ],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    align: 'left',
    x: '65%',
    y: 'center',
    itemGap: 25,
    icon: 'circle',
    textStyle: {
      color: 'rgba(156, 166, 185, 1)',
      fontSize: '14px',
      padding: [0, 0, 0, 5]
    },
    itemWidth: 6
  },
  series: [
    {
      name: '外呼任务统计',
      type: 'pie',
      radius: ['60', '90'],
      minAngle: 20,
      center: ['30%', '52.5%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '16',
          fontWeight: 'bold',
          color: '#646B7A'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { name: '今日任务', value: 50 },
        { name: '已完成任务', value: 50 },
        { name: '过期任务', value: 50 }
      ]
    }
  ]
}
