export type Status = 'NOT_STARTED' | 'DIALING' | 'CALLING'

export type CallType = 'CALLBACK' | 'FS'

export interface Options {
  phone: string | number // 电话号码
  number: number // 拨打次数
  todo: any // 点击代办的数据
}

export type MouseEventType = 'mouseover' | 'mouseout'

export type StatusConfig = {
  label: string
  status: string
  startTime: number
  endTime: number
}
