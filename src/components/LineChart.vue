<template>
  <div
    ref="chart"
    id="chart"
    class="chart"
  ></div>
</template>

<script>
const Echarts = require('echarts/lib/echarts') // 基础实例 注意不要使用import
require('echarts/lib/chart/line') // 按需引入 bar = 柱状图
export default {
  data () { return { chart: null } }, // 图表实例
  mounted () { this.init() },
  props: {
    list: {
      type: Object
    }
  },
  methods: {
    init () {
      // 2.初始化
      this.chart = Echarts.init(this.$refs.chart)
      // 3.配置数据
      const option = {
        title: {
          text: '数据分析'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访问人数', '支付件数', '支付人数', '支付金额', '搜索人数', '加购数', '收藏数'],
          selectedMode: 'single'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '访问人数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '支付件数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '支付人数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '支付金额',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '搜索人数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '加购数',
            type: 'line',
            stack: '总量',
            data: []
          },
          {
            name: '收藏数',
            type: 'line',
            stack: '总量',
            data: []
          }
        ]
      }
      this.list.data.map((item) => {
        option.xAxis.data.push(item.date.split('T')[0])
        option.series[0].data.push(item.visitor_num)
        option.series[1].data.push(item.pay_piece_num)
        option.series[2].data.push(item.pay_people_num)
        option.series[3].data.push(item.pay_amount_num)
        option.series[4].data.push(item.search_num)
        option.series[5].data.push(item.repurchase_num)
        option.series[6].data.push(item.collect_num)
      })
      option.title.text = this.list.data[0].type
      this.chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart{
  width: 100%;
  height: 300px;
  margin-bottom: 30px;
}
</style>
