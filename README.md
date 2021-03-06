# echarts-web

### 项目信息

node 版本： 12.18.1

技术栈：vue + element-ui + echarts

安装依赖

```
cnpm install
```

本地运行

```
npm run serve
```

上线打包，运行下方命令后，生成 dist 目录 即为目标文件

```
npm run build
```

### 需求简述

- 实时数据展示

  - 初始无数据，随时间逐渐递增展示
  - 每 1 秒轮询一次，获取最新数据
  - 最多展示 30 条数据

- 温度、角度、电压、电流

- 设备选择
  - 获取焦点时重新获取最新设备列表
  - 设备变更时，展示数据初始化

### 数据格式

```
{
    "EN":"0",  //设备号
    "ZD":"SPE-HJSHC-ZD-1002", //设备名称
    "WPs":"0", //工艺
    "WrN":"0", //焊工编码
    "WN":"EACY-G08-AWJ004+003-ZY03-B-CH", //焊口编码
    "FP":"0", //前管号
    "BP":"0", //后管号
    "CW":"CW", //焊接位置（左右）
    "Time":"2009-0b-10 22:43:39.576", //时间
    "Data":{
        "TA":24.73, //环境温度
        "HA":54.56, //环境湿度
        "V":2.27,   //焊接电压
        "C":1.82,    //焊接电流
        "FS":0.15,   //送丝速度
        "WPn":"0,0,0,0,May 24 2021", //依次是4G信号，注网状态，服务器连接状态，焊口码扫码状态，版本号
        "WA":"-42,8,46", //焊接角度
        "WB":1, //焊道计数
        "WS":"0.00", //焊接速度
        "LE":"0.000000000", //焊接线能量
        "PT":"0.00",  //预热温度
        "IT":43.81   //层间温度
    }
}
```
