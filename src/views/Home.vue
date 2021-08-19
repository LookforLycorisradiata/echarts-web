<template>
  <div class="main">
    <div class="header">
      <el-select
        v-model="currentDevice"
        filterable
        placeholder="请选择设备"
        size="small"
        @focus="getDeivcesList"
        @change="handleDeviceChange"
      >
        <el-option
          v-for="item in devicesList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>

    <div class="echarts">
      <!-- 电压 -->
      <line-chart
        :value="currentV"
        :time="currentTime"
        unit="V"
        echart="voltage"
        title="电压"
        ref="lineChart1"
      ></line-chart>

      <!-- 电流 -->
      <line-chart
        :value="currentC"
        :time="currentTime"
        unit="A"
        echart="current"
        title="电流"
        ref="lineChart2"
      ></line-chart>
    </div>
    <div class="echarts">
      <!-- 温度 -->
      <line-chart
        :value="currentIT"
        :time="currentTime"
        unit="°C"
        echart="temperature"
        title="温度"
        ref="lineChart3"
      ></line-chart>

      <!-- 角度 -->
      <line-chart
        :value="currentWA"
        :time="currentTime"
        unit="°C"
        echart="angle"
        title="角度"
        ref="lineChart4"
      ></line-chart>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import { getLastData, getDeivces } from '@/api'
import LineChart from '@/components/LineChart'
export default {
  name: 'Home',
  data() {
    return {
      currentV: 0, // 当前电压
      currentC: 0, // 当前电流
      currentIT: 0, // 当前温度
      currentWA: '', // 当前角度
      currentTime: '', // 当前时间
      currentDevice: null, // 当前设备
      devicesList: [], // 设备列表
      timer: 0 // 计时器
    }
  },
  components: {
    LineChart
  },
  created() {
    this.getDeivcesList()
    console.error(this.currentDevice)
    if (this.currentDevice) {
      this.getData()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 获取设备列表
    async getDeivcesList() {
      const { data: res } = await getDeivces()
      this.devicesList = []
      res.forEach((item) => {
        // 仅显示在线设备
        if (item.online === true) {
          this.devicesList.push(item.name)
        }
      })
      this.currentDevice = this.devicesList[0] // 默认选中第一个
    },

    // 获取数据
    async getData() {
      // clearInterval(this.timer)
      const t = 1000 // 暂时按1000ms
      this.timer = setInterval(async () => {
        // mock 数据，若改用真实请求，则注释下行代码，并取消下方第二行代码注释
        // const data = this.mockData()
        const data = await getLastData({ deviceId: this.currentDevice })

        this.handleData(data)
      }, t)
    },

    // mock 数据
    mockData() {
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

    handleData(data) {
      this.currentV = data.v
      this.currentC = data.c
      this.currentIT = data.it // 取采集温度
      this.currentWA = data.wa
      this.currentTime = data.time
    },

    /**
     * @description: 获取随机数
     * @param {*} min 最小值
     * @param {*} max 最大值
     * @param {*} fixed 有效位数
     * @return {*}
     */
    getRandom(min, max, fixed) {
      const num = Math.random() * max + min
      let result
      if (fixed) {
        result = parseInt(num * fixed * 10) / (fixed * 10)
      } else {
        result = parseInt(num)
      }
      return result
    },

    // 切换设备时重置 option
    handleDeviceChange() {
      this.$refs.lineChart1.resetOption()
      this.$refs.lineChart2.resetOption()
      this.$refs.lineChart3.resetOption()
      this.$refs.lineChart4.resetOption()
    }
  }
}
</script>
<style scoped>
.main {
  padding-top: 10px;
}

.header {
  text-align: left;
  margin-bottom: 20px;
}

.echarts {
  display: flex;
  justify-content: center;
  margin: 0 auto 20px;
}

::v-deep .el-input__inner {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(220, 223, 230, 0.4);
}
</style>
