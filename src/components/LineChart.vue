<!--
 * @Description:
-->
<template>
 <div class="line-chart" :id="echart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'line-chart',
  props: {
    value: [Number, String],
    time: String,
    unit: String,
    echart: String,
    title: String
  },
  data () {
    return {
      option: {},
      chart: {},
      stream: null,
      mediaRecorder: undefined,
      isRecording: false
    }
  },
  watch: {
    time (newVal) {
      if (this.value !== '') {
        this.update(this.value, newVal)
        this.chart.setOption(this.option)
      }
    }
  },
  components: {},
  created () {},
  mounted () {
    const vm = this
    vm.$nextTick(() => {
      vm.initChart()

      // setInterval(() => {
      //   vm.update(new Date())
      //   vm.chart.setOption(vm.option)
      // }, 2000)
    })
  },
  methods: {
    initChart () {
      const chart = echarts.init(document.getElementById(this.echart), 'dark')

      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        title: [{
          left: 'center',
          top: '5%',
          text: this.title
        }],
        series: [
          {
            data: [],
            type: 'line',
            showSymbol: false
          }
        ]
      }
      // this.initData()
      chart.setOption(this.option)

      this.chart = chart
    },

    initData () {
      const d = new Date()
      for (let i = 0; i < 30; i++) {
        this.update(new Date(d.getTime() - (30 - i) * 2000))
      }
    },

    update (value, time) {
      if (typeof value === 'string') {
        const arr = value.split(',')
        if (arr.length > 0) {
          arr.forEach((num, index) => {
            if (!this.option.series[index]) {
              this.option.series[index] = {
                data: [],
                type: 'line',
                showSymbol: false
              }
            } else {
              if (!this.option.series[index].name) {
                const names = ['X', 'Y', 'Z']
                this.option.series[index].name = names[index]
              }
            }

            this.option.series[index].data.push(parseInt(num))
            if (this.option.series[index].data.length > 30) {
              this.option.series[index].data.shift()
            }
          })
        }
        this.option.legend = {
          left: 'left',
          data: ['X', 'Y', 'Z']
        }
      } else {
        this.option.series[0].data.push(value)
        if (this.option.series[0].data.length > 30) {
          this.option.series[0].data.shift()
        }
      }

      this.option.xAxis.data.push(time)
      if (this.option.xAxis.data.length > 30) {
        this.option.xAxis.data.shift()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.line-chart {
  width: 800px;
  height: 360px;
  opacity: 0.8;
  & + .line-chart{
    margin-left: 30px;
  }
}

</style>
