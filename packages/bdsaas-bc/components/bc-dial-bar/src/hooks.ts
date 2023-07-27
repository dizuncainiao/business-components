export const initStatusConfig = [
  {
    label: '拨打中', // 打电话状态，拨号条上显示的文字
    status: 'DIALING', // 打电话状态，用于业务方操作逻辑
    startTime: 0, // 状态开始时间（时间戳）
    endTime: 0 // 状态结束时间（时间戳）
  },
  { label: '通话中', status: 'CALLING', startTime: 0, endTime: 0 }
]
