<template>
  <div class="main">
    <div class="echarts">
      <!-- 电压 -->
      <line-chart
        :value="currentV"
        :time="currentTime"
        unit="V"
        echart="voltage"
        title="电压"
      ></line-chart>

      <!-- 电流 -->
      <line-chart
        :value="currentC"
        :time="currentTime"
        unit="A"
        echart="current"
        title="电流"
      ></line-chart>
    </div>
    <div class="echarts">
      <!-- 温度 -->
      <line-chart
        :value="currentTA"
        :time="currentTime"
        unit="°C"
        echart="temperature"
        title="温度"
      ></line-chart>

       <!-- 角度 -->
      <line-chart
        :value="currentWA"
        :time="currentTime"
        unit="°C"
        echart="angle"
        title="角度"
      ></line-chart>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { getLastData } from '@/api'
import LineChart from '@/components/LineChart'
export default {
  name: 'Home',
  data () {
    return {
      currentV: 0, // 当前电压
      currentC: 0, // 当前电流
      currentTA: 0, // 当前温度
      currentWA: '', // 当前角度
      currentTime: '' // 当前时间
    }
  },
  components: {
    LineChart
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData () {
      const t = 1000 // 暂时按1000ms
      setInterval(async () => {
        // mock 数据，若改用真实请求，则注释下行代码，并取消下方第二行代码注释
        // const data = this.mockData()
        const data = await getLastData()

        this.handleData(data)
      }, t)
    },

    // mock 数据
    mockData () {
      const demo = {
        EN: '0', // 设备号
        ZD: 'SPE-HJSHC-ZD-1002', // 设备名称
        WPs: '0', // 工艺
        WrN: '0', // 焊工编码
        WN: 'EACY-G08-AWJ004+003-ZY03-B-CH', // 焊口编码
        FP: '0', // 前管号
        BP: '0', // 后管号
        CW: 'CW', // 焊接位置（左右）
        Time: '2009-0b-10 22:43:39.576', // 时间
        TA: 24.73, // 环境温度
        HA: 54.56, // 环境湿度
        V: 2.27, // 焊接电压
        C: 1.82, // 焊接电流
        FS: 0.15, // 送丝速度
        WPn: '0,0,0,0,May 24 2021', // 依次是4G信号，注网状态，服务器连接状态，焊口码扫码状态，版本号
        WA: '-42,8,46', // 焊接角度
        WB: 1, // 焊道计数
        WS: '0.00', // 焊接速度
        LE: '0.000000000', // 焊接线能量
        PT: '0.00', // 预热温度
        IT: 43.81 // 层间温度
      }
      demo.Time = new Date().toTimeString().split(' ')[0]
      demo.TA = this.getRandom(10, 50, 2)
      demo.V = this.getRandom(1, 10, 2)
      demo.C = this.getRandom(1, 5, 2)

      const arr = []
      arr[0] = this.getRandom(-90, 180, 0)
      arr[1] = this.getRandom(-90, 180, 0)
      arr[2] = this.getRandom(-90, 180, 0)
      demo.WA = arr.join(',')

      return demo
    },

    handleData (data) {
      this.currentV = data.v
      this.currentC = data.c
      this.currentTA = data.ta
      this.currentWA = data.wa
      this.currentTime = data.Time
    },

    /**
     * @description: 获取随机数
     * @param {*} min 最小值
     * @param {*} max 最大值
     * @param {*} fixed 有效位数
     * @return {*}
     */
    getRandom (min, max, fixed) {
      const num = Math.random() * max + min
      let result
      if (fixed) {
        result = parseInt(num * fixed * 10) / (fixed * 10)
      } else {
        result = parseInt(num)
      }
      return result
    }
  }
}
</script>
<style scoped>
.main{
  padding-top: 20px;
}

.echarts {
  display: flex;
  justify-content: center;
  margin: 0 auto 30px;
}
</style>
