<template>
  <div class="bc-calendar">
    <div class="calendar__header">
      <!-- 年份 月份 -->
      <div
        class="calendar__control"
        :class="{ calendar__control_center: centerHeader }"
      >
        <div class="calendar__indicator">
          <span class="calendar__indicator-title">{{
            shownIndicator.title
          }}</span>
          <span class="calendar__indicator-detail"
            ><span class="fs-24">{{ shownIndicator.detail }}</span
            >月</span
          >
        </div>
      </div>
      <div class="calendar__action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="calendar__main">
      <div class="calendar__arrow left" @click="prevView">
        <bn-icon-arrow-left />
      </div>
      <div class="calendar__today" @click="goToday">今天</div>
      <div class="calendar__date">
        <!-- 星期 -->
        <div class="calendar__weekdays">
          <div
            v-for="weekDay in weekDays"
            :key="weekDay"
            class="calendar__weekday"
          >
            {{ weekDay }}
          </div>
        </div>
        <!-- 日期 -->
        <div class="calendar__days">
          <div
            class="calendar__day"
            v-for="(day, index) in days"
            :key="index"
            :class="{
              calendar__day_now: checkToday(day),
              calendar__day_selected: checkSelected(day),
              calendar__day_othermonth: checkOtherMonth(day),
              calendar__day_decorate: checkDecorate(day)
            }"
            @click="select(day)"
          >
            <span
              >{{ day.getDate()
              }}<i
                class="sub"
                v-if="checkSub(day)"
                :style="{ color: checkSub(day).color }"
                >{{ checkSub(day).content }}</i
              ></span
            >
          </div>
        </div>
      </div>
      <div class="calendar__arrow right" @click="nextView">
        <bn-icon-arrow-right />
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import '../style/index.less'
export default {
  name: 'bc-calendar',
  props: {
    decorate: {
      type: Object,
      default: function _default() {
        return {}
      }
    },
    choseDay: {
      type: Date,
      default: new Date()
    },
    sub: {
      type: Object,
      default: function _default() {
        return {}
      }
    },
    i18n: {
      type: String,
      default: 'zh-cn'
    },
    indicator: {
      type: Object,
      default: function _default() {
        return {}
      }
    },
    startMonday: {
      type: Boolean,
      default: false
    },
    view: {
      type: String,
      default: 'month'
    },
    centerHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      I18N: {
        'zh-cn': ['日', '一', '二', '三', '四', '五', '六'],
        en: ['SUN', 'MON', 'TUN', 'WED', 'THU', 'FRI', 'SAT']
      },
      startDate: new Date(),
      selectday: new Date(),
      currentView: {}
    }
  },
  computed: {
    shownIndicator: {
      get() {
        let indicator = {}
        if (this.indicator.title) {
          indicator.title = this.indicator.title
        } else {
          indicator.title = dayjs(this.startDate).format('YYYY')
        }
        if (this.indicator.detail) {
          indicator.detail = dayjs(this.indicator.detail).format('MM')
        } else {
          indicator.detail = dayjs(this.startDate).format('MM')
        }
        return indicator
      }
    },
    days: {
      get() {
        let days = []
        let dayslength = void 0
        let startDay = void 0
        let leftPadding = void 0
        let startDate = void 0
        if (this.view === 'month') {
          dayslength = 35
          startDate = new Date(
            this.startDate.getFullYear(),
            this.startDate.getMonth()
          )
          startDay = startDate.getDay()
        } else {
          dayslength = 7
          startDate = this.startDate
          startDay = startDate.getDay()
        }
        if (this.startMonday) {
          leftPadding = startDay ? startDay - 1 : 6
        } else {
          leftPadding = startDay
        }
        Array.from({ length: leftPadding }, function (v, k) {
          return -(k + 1)
        })
          .reverse()
          .forEach(function (minus) {
            days.push(
              new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + minus
              )
            )
          })
        days.push(startDate)
        Array.from({ length: dayslength - days.length }, function (v, k) {
          return k + 1
        }).forEach(function (plus) {
          days.push(
            new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + plus
            )
          )
        })
        return days
      }
    },
    weekDays: {
      get() {
        var weekDayNames = JSON.parse(JSON.stringify(this.I18N[this.i18n]))
        if (this.startMonday) {
          var sunday = weekDayNames.shift()
          weekDayNames.push(sunday)
        }
        return weekDayNames
      }
    }
  },
  watch: {
    days() {
      this.currentView = {
        start: this.days[0],
        end: this.days[this.days.length - 1]
      }
    },
    startDate(value) {
      this.$emit('onchange', value)
    }
  },
  methods: {
    checkToday(day) {
      let now = new Date()
      return !!(
        day.getFullYear() === now.getFullYear() &&
        day.getMonth() === now.getMonth() &&
        day.getDate() === now.getDate()
      )
    },
    checkSelected(day) {
      return !!(
        day.getFullYear() === this.choseDay.getFullYear() &&
        day.getMonth() === this.choseDay.getMonth() &&
        day.getDate() === this.choseDay.getDate()
      )
    },
    checkOtherMonth(day) {
      return day.getMonth() !== this.startDate.getMonth()
    },
    checkDecorate(day) {
      var dateFormat =
        day.getFullYear() +
        '-' +
        ('0' + (day.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + day.getDate()).slice(-2)
      return !!this.decorate[dateFormat]
    },
    checkSub(day) {
      var dateFormat =
        day.getFullYear() +
        '-' +
        ('0' + (day.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + day.getDate()).slice(-2)
      return this.sub[dateFormat]
    },
    prevView() {
      if (this.view === 'month') {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() - 1,
          this.startDate.getDate()
        )
      } else {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate() - 7
        )
      }
      this.$nextTick(() => {
        this.$emit('prev')
      })
    },
    nextView() {
      if (this.view === 'month') {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth() + 1,
          this.startDate.getDate()
        )
      } else {
        this.startDate = new Date(
          this.startDate.getFullYear(),
          this.startDate.getMonth(),
          this.startDate.getDate() + 7
        )
      }
      this.$nextTick(() => {
        this.$emit('next')
      })
    },
    select(day) {
      this.selectday = day
      this.$nextTick(() => {
        this.$emit('selected', this.selectday)
      })
    },
    goToday() {
      this.startDate = new Date()
      this.selectday = new Date()
      this.$nextTick(() => {
        this.$emit('today', this.startDate)
      })
    }
  },
  mounted() {
    this.currentView = {
      start: this.days[0],
      end: this.days[this.days.length - 1]
    }
  }
}
</script>
