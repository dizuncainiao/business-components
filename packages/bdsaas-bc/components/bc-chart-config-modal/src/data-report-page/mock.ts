export const mockMenuData = {
  small: {
    my: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '企业云呼叫',
            open: false,
            children: [
              {
                title: '今日外呼任务数',
                desc: '今日外呼任务数描述',
                active: false,
                compName: 'TodayOutCallNumSmall'
              }
            ]
          }
        ]
      }
    ],
    team: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '企业云呼叫',
            open: false,
            children: [
              {
                title: '在线总时长',
                desc: '在线总时长描述',
                active: false,
                compName: 'DepTotalOnlineTimeSmall'
              }
            ]
          }
        ]
      }
    ]
  },
  big: {
    my: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '企业云呼叫',
            open: false,
            children: [
              {
                title: '外呼通次统计',
                desc: '外呼通次统计描述',
                active: false,
                compName: 'OutCallNumBig'
              },
              {
                title: '外呼任务统计',
                desc: '外呼任务统计描述',
                active: false,
                compName: 'OutCallTaskBig'
              }
            ]
          }
        ]
      }
    ],
    team: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '企业云呼叫',
            open: false,
            children: [
              {
                title: '外呼地区分布情况',
                desc: '外呼地区分布情况描述',
                active: false,
                compName: 'RegionDistributionBig'
              },
              {
                title: '外呼次数排行榜',
                desc: '外呼次数排行榜描述',
                active: false,
                compName: 'OutCallNumRankBig'
              }
            ]
          }
        ]
      }
    ]
  }
}

export const mockMenuData2 = {
  small: {
    my: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '事儿电话',
            open: false,
            children: [
              {
                id: 98,
                menuLimit: 'THING',
                reportFormName: '事儿-话费余额',
                url: 'TelephoneBalance',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: ' ',
                scope: 0,
                active: false,
                title: '事儿-话费余额',
                desc: ' ',
                compName: 'TelephoneBalance'
              },
              {
                id: 99,
                menuLimit: 'THING',
                reportFormName: '事儿-号码数',
                url: 'PhoneNumbers',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: ' ',
                scope: 0,
                active: false,
                title: '事儿-号码数',
                desc: ' ',
                compName: 'PhoneNumbers'
              },
              {
                id: 100,
                menuLimit: 'THING',
                reportFormName: '事儿-当月消耗',
                url: 'CurrentMonthConsume',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: ' ',
                scope: 0,
                active: false,
                title: '事儿-当月消耗',
                desc: ' ',
                compName: 'CurrentMonthConsume'
              },
              {
                id: 101,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼总次数',
                url: 'SmallTotalOutboundCalls',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '公司外呼数量的总计',
                scope: 0,
                active: false,
                title: '事儿-外呼总次数',
                desc: '公司外呼数量的总计',
                compName: 'SmallTotalOutboundCalls'
              },
              {
                id: 102,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼接通次数',
                url: 'SmallNumberOfOutboundCallConnections',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '已接通状态的数量总计',
                scope: 0,
                active: false,
                title: '事儿-外呼接通次数',
                desc: '已接通状态的数量总计',
                compName: 'SmallNumberOfOutboundCallConnections'
              },
              {
                id: 103,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼接通率',
                url: 'SmallOutgoingCallCompletionRate',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '已接通状态在全部外呼状态的占比',
                scope: 0,
                active: false,
                title: '事儿-外呼接通率',
                desc: '已接通状态在全部外呼状态的占比',
                compName: 'SmallOutgoingCallCompletionRate'
              },
              {
                id: 104,
                menuLimit: 'THING',
                reportFormName: '事儿-平均通话时长',
                url: 'SmallAverageCallDuration',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '通话平均时长',
                scope: 0,
                active: false,
                title: '事儿-平均通话时长',
                desc: '通话平均时长',
                compName: 'SmallAverageCallDuration'
              },
              {
                id: 105,
                menuLimit: 'THING',
                reportFormName: '事儿-投诉总数',
                url: 'SmallTotalNumberOfComplaints',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队中，被投诉的总数',
                scope: 0,
                active: false,
                title: '事儿-投诉总数',
                desc: '我的团队中，被投诉的总数',
                compName: 'SmallTotalNumberOfComplaints'
              },
              {
                id: 106,
                menuLimit: 'THING',
                reportFormName: '事儿-通话时长',
                url: 'SmallTalkTime',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队，通话总时长',
                scope: 0,
                active: false,
                title: '事儿-通话时长',
                desc: '我的团队，通话总时长',
                compName: 'SmallTalkTime'
              },
              {
                id: 107,
                menuLimit: 'THING',
                reportFormName: '事儿-扣费金额',
                url: 'SmallDeductionAmount',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队，扣费金额总金额',
                scope: 0,
                active: false,
                title: '事儿-扣费金额',
                desc: '我的团队，扣费金额总金额',
                compName: 'SmallDeductionAmount'
              },
              {
                id: 108,
                menuLimit: 'THING',
                reportFormName: '事儿-活跃人员',
                url: 'SmallActivePersonnel',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队，使用了事儿电话进行外呼的人员',
                scope: 0,
                active: false,
                title: '事儿-活跃人员',
                desc: '我的团队，使用了事儿电话进行外呼的人员',
                compName: 'SmallActivePersonnel'
              },
              {
                id: 109,
                menuLimit: 'THING',
                reportFormName: '事儿-实名认证人数',
                url: 'SmallNumberOfRealNameAuthPersonnel',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队，实名认证的人员',
                scope: 0,
                active: false,
                title: '事儿-实名认证人数',
                desc: '我的团队，实名认证的人员',
                compName: 'SmallNumberOfRealNameAuthPersonnel'
              },
              {
                id: 110,
                menuLimit: 'THING',
                reportFormName: '事儿-异常跨域人员统计',
                url: 'SmallAbnormalCrossDomainPersonnelStatistics',
                type: 1,
                formType: 1,
                formProperty: 1,
                description: '我的团队，异常跨域人数统计',
                scope: 0,
                active: false,
                title: '事儿-异常跨域人员统计',
                desc: '我的团队，异常跨域人数统计',
                compName: 'SmallAbnormalCrossDomainPersonnelStatistics'
              }
            ]
          }
        ]
      }
    ],
    team: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '事儿电话',
            open: false,
            children: []
          }
        ]
      }
    ]
  },
  big: {
    my: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '事儿电话',
            open: false,
            children: []
          }
        ]
      }
    ],
    team: [
      {
        title: '营销中心',
        open: false,
        children: [
          {
            title: '事儿电话',
            open: false,
            children: [
              {
                id: 111,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼次数排行榜',
                url: 'ThingsOutboundNumberRanking',
                type: 2,
                formType: 1,
                formProperty: 2,
                description: ' ',
                scope: 0,
                active: true,
                title: '事儿-外呼次数排行榜',
                desc: ' ',
                compName: 'ThingsOutboundNumberRanking'
              },
              {
                id: 112,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼接通率排行榜',
                url: 'ThingsOutboundConnectionRateRanking',
                type: 2,
                formType: 1,
                formProperty: 2,
                description: ' ',
                scope: 0,
                active: true,
                title: '事儿-外呼接通率排行榜',
                desc: ' ',
                compName: 'ThingsOutboundConnectionRateRanking'
              },
              {
                id: 113,
                menuLimit: 'THING',
                reportFormName: '事儿-外呼接通次数排行榜',
                url: 'ThingsOutboundConnectionNumberRanking',
                type: 2,
                formType: 1,
                formProperty: 2,
                description: ' ',
                scope: 0,
                active: false,
                title: '事儿-外呼接通次数排行榜',
                desc: ' ',
                compName: 'ThingsOutboundConnectionNumberRanking'
              }
            ]
          }
        ]
      }
    ]
  }
}
