<template>
  <div class="container">
    <div v-for="(list, i) in records" :key="i">
      <line-chart :list="list"></line-chart>
      <div class="table-container">
        <table class="table">
          <tr class="tr">
            <td>款式</td>
            <td>图片</td>
            <td>日期</td>
            <td>合计</td>
            <td v-for="item in list.data" :key="item.id">
              {{ formatDate(item.date) }}
            </td>
          </tr>
          <tr v-if="list.data[0].visitor_num">
            <td colspan="2">{{ list.data[0].goods_id }}</td>
            <td>访客人数</td>
            <td>{{ list.total.visitor }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.visitor_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].pay_piece_num">
            <td colspan="2"><div style="padding:0 10px 0 10px">{{list.data[0].title}}</div></td>
            <td>支付件数</td>
            <td>{{ list.total.piece }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.pay_piece_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].pay_people_num">
            <td colspan="2"><a :href="`https://detail.tmall.com/item.htm?id=${list.data[0].goods_id}`" target="_blank">{{`https://detail.tmall.com/item.htm?id=${list.data[0].goods_id}`}}</a></td>
            <td>支付人数</td>
            <td>{{ list.total.people }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.pay_people_num }}
            </td>
          </tr>
          <tr  v-if="list.data[0].pay_transform_percentage">
            <td></td>
            <td></td>
            <td>支付转化率</td>
            <td>{{ formatPercent(list.total.people / list.total.visitor) }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ formatPercent(item.pay_transform_percentage) }}
            </td>
          </tr>
          <tr v-if="list.data[0].pay_amount_num">
            <td></td>
            <td></td>
            <td>支付金额</td>
            <td>{{ list.total.amount }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.pay_amount_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].atv_num">
            <td></td>
            <td></td>
            <td>客单价</td>
            <td>{{ (list.total.amount / list.total.people).toFixed(0) }}</td>
            <td v-for="item in list.data" :key="item.id">{{ item.atv_num }}</td>
          </tr>
          <tr v-if="list.data[0].search_num">
            <td></td>
            <td></td>
            <td>搜索人数</td>
            <td>{{ list.total.search }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.search_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].search_percentage">
            <td></td>
            <td></td>
            <td>搜索占比</td>
            <td>{{ formatPercent(list.total.search / list.total.visitor) }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ formatPercent(item.search_percentage) }}
            </td>
          </tr>
          <tr v-if="list.data[0].repurchase_num">
            <td></td>
            <td></td>
            <td>加购数</td>
            <td>{{ list.total.repurchase }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.repurchase_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].repurchase_percentage">
            <td></td>
            <td></td>
            <td>加购率</td>
            <td>
              {{ formatPercent(list.total.repurchase / list.total.visitor) }}
            </td>
            <td v-for="item in list.data" :key="item.id">
              {{ formatPercent(item.repurchase_percentage) }}
            </td>
          </tr>
          <tr v-if="list.data[0].collect_num">
            <td></td>
            <td></td>
            <td>收藏数</td>
            <td>{{ list.total.collect }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.collect_num }}
            </td>
          </tr>
          <tr v-if="list.data[0].collect_percentage">
            <td></td>
            <td></td>
            <td>收藏率</td>
            <td>
              {{ formatPercent(list.total.collect / list.total.visitor) }}
            </td>
            <td v-for="item in list.data" :key="item.id">
              {{ formatPercent(item.collect_percentage) }}
            </td>
          </tr>
          <tr v-if="list.data[0].uv_value">
            <td></td>
            <td></td>
            <td>UV价值</td>
            <td>{{ (list.total.amount / list.total.visitor).toFixed(1) }}</td>
            <td v-for="item in list.data" :key="item.id">
              {{ item.uv_value }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { goodsInfo } from '@/api/goods'
import LineChart from '@/components/LineChart'
export default {
  name: '',
  data () {
    return {
      records: [],
      data: {
        totalVisitor: 0
      }
    }
  },
  components: {
    LineChart
  },
  mounted () {
    this.getGoodsInfo()
  },
  methods: {
    formatDate (date) {
      return date.split('T')[0]
    },
    formatPercent (num) {
      return (num * 100).toFixed(2) + '%'
    },
    sunList (list, name) {
      let sum = 0
      for (const item of list) {
        if (name === 'visitor') {
          sum += item.visitor_num
        }
      }
      return sum
    },
    async getGoodsInfo () {
      const result = await goodsInfo({ tableId: this.$route.params.id })
      this.records = result.data
      let total = {}
      for (const list in this.records) {
        total = {
          visitor: 0,
          piece: 0,
          people: 0,
          amount: 0,
          search: 0,
          repurchase: 0,
          collect: 0
        }
        this.records[list].data.map((item) => {
          total.visitor += item.visitor_num
          total.piece += item.pay_piece_num
          total.people += item.pay_people_num
          total.amount += item.pay_amount_num
          total.search += item.search_num
          total.repurchase += item.repurchase_num
          total.collect += item.collect_num
          // console.log(item.visitor_num)
        })
        this.records[list].total = total
      }
      console.log(this.records)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  overflow: auto;
  margin-top: 20px;
  margin-bottom: 40px;
}
.table {
  min-width: 100%;
  width: 100%;
  white-space: nowrap;
  margin-bottom: 60px;
  background: #eee;
  tr {
    height: 30px;
    background: #fff;
  }
  td {
    min-width: 120px;
    // width: 150px;
    text-align: center;
  }
}
</style>
